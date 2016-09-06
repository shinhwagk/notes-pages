package database

import javax.inject.Inject

import database.table.Notes.Note
import database.table._
import models.database.Labels
import play.api.db.slick.DatabaseConfigProvider
import slick.driver.H2Driver.api._
import slick.driver.JdbcProfile

import scala.concurrent.{ExecutionContext, Future}

/**
  * Created by goku on 2016/8/31.
  */
class Dao @Inject()(implicit dbConfigProvider: DatabaseConfigProvider, ec: ExecutionContext) {

  import controllers.ApplicationObject._
  import database.table.CustomColumnType._

  val db = dbConfigProvider.get[JdbcProfile].db

  def addNote(rNote: RestNote) = {
    db.run(Notes._table returning Notes._table.map(_.id) += Note(rNote.id, rNote.category, rNote.content))
      .flatMap(noteId => Future.sequence(rNote.labelIds.map(id => updateLabelSinceAddNote(id, noteId))))
      .flatMap(_ => updateLabelsColumnEdges)
  }

  def updateLabelSinceAddNote(id: Int, noteId: Int): Future[Int] = {
    db.run(Labels._table.filter(_.id === id).map(_.notes).result.head)
      .flatMap(notes => db.run(Labels._table.filter(_.id === id).map(_.notes).update(noteId :: notes)))
  }

  def updateLabelsColumnEdges = {
    val c1: Future[List[(Int, List[Int])]] = db.run(Labels._table.map(p => (p.id, p.notes)).to[List].result)
    val c2: Future[List[(Int, Int)]] = c1.map(_.flatMap(p => p._2.map((p._1, _))))
    val c3: Future[List[List[Int]]] = c2.map(_.groupBy(_._2).map { case (k, v) => (k, v.map(_._1)) }.map(_._2).toList)
    c3.flatMap { labelGroup =>
      Future.sequence(labelGroup.map { labelIds =>
        labelIds match {
          case List(id) => updateLabelsColumnEdgesByid(id, Nil)
          case _ => Future.sequence(labelIds.map(id => updateLabelsColumnEdgesByid(id, labelIds.filter(_ != id)))).map(_.sum)
        }
      })
    }
  }

  def updateLabelsColumnEdgesByid(labelId: Int, e: List[Int]): Future[Int] = {
    db.run(Labels._table.filter(_.id === labelId).map(_.edges).result.head)
      .flatMap(edges => db.run(Labels._table.filter(_.id === labelId).map(_.edges).update((edges ::: e).distinct)))
  }
}
