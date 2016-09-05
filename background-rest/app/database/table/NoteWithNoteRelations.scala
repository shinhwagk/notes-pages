package database.table

import slick.driver.H2Driver.api._

/**
  * Created by goku on 2016/9/5.
  */
object NoteWithNoteRelations {

  case class NoteWithNoteRelation(id: Int, relationId: Int)

  class NoteWithNoteRelations(tag: Tag) extends Table[NoteWithNoteRelation](tag, "NOTE_WITH_NOTE_RELATIONS") {

    def id = column[Int]("ID")

    def relationId = column[Int]("RELATION_ID")

    def * = (id, relationId) <> (NoteWithNoteRelation.tupled, NoteWithNoteRelation.unapply)
  }

  val _table = TableQuery[NoteWithNoteRelations]

}
