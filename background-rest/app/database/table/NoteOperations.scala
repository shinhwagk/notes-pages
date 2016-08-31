package database.table

import slick.driver.H2Driver.api._

/**
  * Created by zhangxu on 2016/8/29.
  */
object NoteOperations {

  case class NoteOperation(id: Int, title: String, noteId: Int)

  class NoteOperations(tag: Tag) extends Table[NoteOperation](tag, "NOTE_OPERATIONS") {

    def id = column[Int]("ID", O.PrimaryKey, O.AutoInc)

    def title = column[String]("TITLE")

    def noteId = column[Int]("NOTE_ID")

    def * = (id, title, noteId) <> (NoteOperation.tupled, NoteOperation.unapply)

    def noteFk = foreignKey("FK_NOTES_OPERATIONS_ID", noteId, Notes._table)(_.id)
  }

  val _table = TableQuery[NoteOperations]
}