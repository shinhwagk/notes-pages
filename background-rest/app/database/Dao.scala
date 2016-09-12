package database

import javax.inject.Inject

import database.table.Notes.Note
import database.table._
import models.database.Labels
import models.database.Labels.Label
import play.api.db.slick.DatabaseConfigProvider
import slick.driver.H2Driver.api._
import slick.driver.JdbcProfile

import scala.concurrent.{ExecutionContext, Future}
import scala.util.{Failure, Success}

/**
  * Created by goku on 2016/8/31.
  */
class Dao @Inject()(implicit dbConfigProvider: DatabaseConfigProvider, ec: ExecutionContext) {

  import controllers.ApplicationObject._
  import database.table.CustomColumnType._

  val db = dbConfigProvider.get[JdbcProfile].db

  def addNote(rNote: RestAddNote): Future[Int] = {
    //    db.run(Labels._table.map(_.edges).update(Nil)).flatMap(_ =>
    val futureNodeId = db.run(Notes._table returning Notes._table.map(_.id) += Note(rNote.id, rNote.category, rNote.content))

    futureNodeId.flatMap(noteId => Future.sequence(rNote.labels.map(updateLabelSinceAddNote(_, noteId))))
      .flatMap(_ => updateLabelsColumnEdges)
      .flatMap(_ => futureNodeId)
  }

  def addLabel(name: String): Future[Int] = {
    db.run(Labels._table += Label(name))
  }

  def updateLabelSinceAddNote(name: String, noteId: Int): Future[Int] = {
    db.run(Labels._table.filter(_.name === name).map(_.notes).result.head)
      .flatMap(notes => db.run(Labels._table.filter(_.name === name).map(_.notes).update(noteId :: notes)))
  }

  def updateLabelsColumnEdges: Future[List[Int]] = {
    val c1: Future[List[(String, List[Int])]] = db.run(Labels._table.map(p => (p.name, p.notes)).to[List].result)
    val c2: Future[List[(String, Int)]] = c1.map(_.flatMap(p => p._2.map((p._1, _))))
    val c3: Future[List[List[String]]] = c2.map(_.groupBy(_._2).map { case (k, v) => (k, v.map(_._1)) }.map(_._2).toList)
    c3.flatMap { labelGroup =>
      Future.sequence(labelGroup.map { labelNames =>
        labelNames match {
          case List(name) => updateLabelsColumnEdgesByid(name, Nil)
          case _ => Future.sequence(labelNames.map(name => updateLabelsColumnEdgesByid(name, labelNames.filter(_ != name)))).map(_.sum)
        }
      })
    }
  }

  def updateLabelsColumnEdgesByid(name: String, es: List[String]): Future[Int] = {
    db.run(Labels._table.filter(_.name === name).map(_.edges).result.head)
      .flatMap(ee => db.run(Labels._table.filter(_.name === name).map(_.edges).update((ee ::: es).distinct)))
  }

  def getNoteById(id: Int): Future[Note] = {
    db.run(Notes._table.filter(_.id === id).result.head)
  }

  //  def selectNoteById(id: Int) = {
  //    db.run(Notes._table.filter(_.id === id))
  //  }
}
