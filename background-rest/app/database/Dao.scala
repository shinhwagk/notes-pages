package database

import javax.inject.Inject

import database.table.LabelsNotesRelations.LabelsNotesRelation
import database.table.Notes.Note
import database.table.NotesNotesRelations.NotesNotesRelation
import database.table._
import models.database.Labels
import models.database.Labels.Label
import play.api.db.slick.DatabaseConfigProvider
import play.api.libs.json.Json
import slick.driver.H2Driver.api._
import slick.driver.JdbcProfile

import scala.concurrent.{ExecutionContext, Future}

/**
  * Created by goku on 2016/8/31.
  */
class Dao @Inject()(implicit dbConfigProvider: DatabaseConfigProvider, ec: ExecutionContext) {

  import controllers.ApplicationObject._
  import CustomColumnType._

  val db = dbConfigProvider.get[JdbcProfile].db

  def insertNote(rNote: RestAddNote): Future[Int] = {
    val futureNodeId: Future[Int] = db.run(Notes._table returning Notes._table.map(_.id) += Note(rNote.id, rNote.category, rNote.content))
    futureNodeId.flatMap(id =>
      Future.sequence(rNote.labels.map(name => LabelsNotesRelation(name, id))
        .map(lnr => db.run(LabelsNotesRelations._table += lnr)))
    ).flatMap(_ => futureNodeId)
  }

  def insertLabel(name: String): Future[Int] = {
    db.run(Labels._table += Label(name))
  }

  def getNoteById(id: Int): Future[Note] = {
    db.run(Notes._table.filter(_.id === id).result.head)
  }

  def deleteLabelsNotesRelationsById(noteId: Int): Future[Int] = {
    db.run(LabelsNotesRelations._table.filter(_.noteId === noteId).delete)
  }

  def deleteNotesNotesRelationsById(noteId: Int): Future[Int] = {
    db.run(NotesNotesRelations._table.filter(_.noteId === noteId).delete)
  }

  def insertLabelsNotesRelations(lnr: LabelsNotesRelation): Future[Int] = {
    db.run(LabelsNotesRelations._table += lnr)
  }

  def insertNotesNotesRelations(nnr: NotesNotesRelation): Future[Int] = {
    db.run(NotesNotesRelations._table += nnr)
  }

  def deleteLabelsNotesRelations(id: Int): Future[Int] = {
    db.run(LabelsNotesRelations._table.filter(_.noteId === id).delete)
  }

  def deleteNotesNotesRelations(id: Int): Future[Int] = {
    db.run(NotesNotesRelations._table.filter(_.noteId === id).delete)
      .flatMap(_ => db.run(NotesNotesRelations._table.filter(_.relationId === id).delete))
  }

  def updateNoteById(id: Int, rpn: RestPutNote): Future[Int] = {
    for {
      deleteLN <- deleteLabelsNotesRelationsById(id)
      deleteNN <- deleteNotesNotesRelationsById(id)
      insertLN <- Future.sequence(rpn.labels.map(name => insertLabelsNotesRelations(LabelsNotesRelation(name, id))))
      insertNN <- Future.sequence(rpn.relations.map(rid => insertNotesNotesRelations(NotesNotesRelation(id, rid))))
      updateNote <- db.run(Notes._table.filter(_.id === id).map(n => (n.category, n.content, n.updateDate, n.status)).update(rpn.category, rpn.content, System.currentTimeMillis(), true))
    } yield 0
  }

  def selectNoteById(id: Int): Future[Note] = {
    db.run(Notes._table.filter(_.id === id).result.head)
  }
}
