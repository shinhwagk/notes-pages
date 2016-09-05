package database

import javax.inject.Inject

import database.table.LabelWithNoteRelations.LabelWithNoteRelation
import database.table.NoteCommands.NoteCommand
import database.table.NoteConcepts.NoteConcept
import database.table.NoteFiles.NoteFile
import database.table.NoteOperations.NoteOperation
import database.table.Notes.{Note, NoteCategory}
import database.table._
import play.api.db.slick.DatabaseConfigProvider
import slick.driver.H2Driver.api._
import slick.driver.JdbcProfile

import scala.concurrent.{ExecutionContext, Future}

/**
  * Created by goku on 2016/8/31.
  */
class Dao @Inject()(implicit dbConfigProvider: DatabaseConfigProvider, ec: ExecutionContext) {

  import controllers.ApplicationObject._

  val db = dbConfigProvider.get[JdbcProfile].db

  def addConcept(rConcept: RestConcept) = {
    addNote(NoteCategory.concept)
      .flatMap(noteId => db.run(NoteConcepts._table += NoteConcept(0, rConcept.title, noteId))
        .flatMap(_ => Future.sequence(rConcept.labelIds.map(lid => addLabelWithNoteRelations(LabelWithNoteRelation(lid, noteId)))))
      )
  }

  def addFile(rFile: RestFile) = {

    addNote(NoteCategory.file)
      .flatMap(noteId => db.run(NoteFiles._table += NoteFile(0, rFile.title, noteId))
        .flatMap(_ => Future.sequence(rFile.labelIds.map(lid => addLabelWithNoteRelations(LabelWithNoteRelation(lid, noteId)))))
      )
  }

  def addOperation(rOperation: RestOperation) = {
    addNote(NoteCategory.operation)
      .flatMap(noteId => db.run(NoteOperations._table += NoteOperation(0, rOperation.title, noteId))
        .flatMap(_ => Future.sequence(rOperation.labelIds.map(lid => addLabelWithNoteRelations(LabelWithNoteRelation(lid, noteId)))))
      )
  }

  def addCommand(rCommand: RestCommand) = {
    addNote(NoteCategory.command)
      .flatMap(noteId => db.run(NoteCommands._table += NoteCommand(0, rCommand.contentOne, rCommand.contentTwo, noteId))
        .flatMap(_ => Future.sequence(rCommand.labelIds.map(lid => addLabelWithNoteRelations(LabelWithNoteRelation(lid, noteId)))))
      )
  }

  def addNote(noteCategory: String): Future[Int] = {
    val currTime: Long = System.currentTimeMillis()
    val note: Note = Note(0, noteCategory, currTime, currTime, true)
    db.run(Notes._table returning Notes._table.map(_.id) += note)
  }

  def addLabelWithNoteRelations(lwnr: LabelWithNoteRelation): Future[Int] = {
    db.run(LabelWithNoteRelations._table += lwnr)
  }
}
