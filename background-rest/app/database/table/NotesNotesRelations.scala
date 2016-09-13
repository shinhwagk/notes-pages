package database.table

import slick.driver.H2Driver.api._

/**
  * Created by goku on 2016/9/12.
  */
object NotesNotesRelations {

  case class NotesNotesRelation(center: Int, relationId: Int)

  class NotesNotesRelations(tag: Tag) extends Table[NotesNotesRelation](tag, "NOTES_NOTES_RELATION") {

    def noteId = column[Int]("NOTE_ID")

    def relationId = column[Int]("RELATION_ID")

    def * = (noteId, relationId) <> (NotesNotesRelation.tupled, NotesNotesRelation.unapply)
  }

  val _table = TableQuery[NotesNotesRelations]
}
