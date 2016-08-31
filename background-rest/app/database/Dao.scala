package database

import javax.inject.Inject

import database.table.NoteCommands.NoteCommand
import database.table.NoteConcepts.NoteConcept
import database.table.NoteFiles.NoteFile
import database.table.NoteOperations.NoteOperation
import database.table._
import database.table.Notes.{Note, NoteCategory}
import play.api.db.slick.DatabaseConfigProvider
import slick.driver.JdbcProfile
import slick.driver.H2Driver.api._
import scala.concurrent.{ExecutionContext, Future}

/**
  * Created by goku on 2016/8/31.
  */
class Dao @Inject()(implicit dbConfigProvider: DatabaseConfigProvider, ec: ExecutionContext) {

  import controllers.ApplicationObject._

  val db = dbConfigProvider.get[JdbcProfile].db

  def addConcept(rConcept: RestConcept): Future[Int] = {
    addNote(rConcept.labelId)
      .flatMap(noteId => db.run(NoteConcepts._table += NoteConcept(0, rConcept.title, noteId)))
  }

  def addFile(rFile: RestFile): Future[Int] = {
    addNote(rFile.labelId)
      .flatMap(noteId => db.run(NoteFiles._table += NoteFile(0, rFile.title, noteId)))
  }

  def addOperation(rOperation: RestOperation): Future[Int] = {
    addNote(rOperation.labelId)
      .flatMap(noteId => db.run(NoteOperations._table += NoteOperation(0, rOperation.title, noteId)))
  }

  def addCommand(rCommand: RestCommand): Future[Int] = {
    addNote(rCommand.labelId)
      .flatMap(noteId => db.run(NoteCommands._table += NoteCommand(0, rCommand.contentOne, rCommand.contentTwo, noteId)))
  }

  def addNote(labelId: Int): Future[Int] = {
    val currTime: Long = System.currentTimeMillis()
    val note: Note = Note(0, NoteCategory.concept, currTime, currTime, true, labelId)
    db.run(Notes._table returning Notes._table.map(_.id) += note)
  }
}
