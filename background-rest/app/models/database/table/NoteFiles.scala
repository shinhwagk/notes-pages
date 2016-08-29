package models.database.table

import slick.driver.H2Driver.api._

/**
  * Created by zhangxu on 2016/8/29.
  */
object NoteFiles {

  case class NoteFile(id: Int, title: String, noteId: Int)

  class NoteFiles(tag: Tag) extends Table[NoteFile](tag, "NOTE_FILES") {

    def id = column[Int]("ID", O.PrimaryKey, O.AutoInc)

    def title = column[String]("TITLE")

    def noteId = column[Int]("NOTE_ID")

    def * = (id, title, noteId) <> (NoteFile.tupled, NoteFile.unapply)

    def noteFk = foreignKey("FK_NOTES_FILES_ID", noteId, Notes._table)(_.id)
  }

  val _table = TableQuery[NoteFiles]
}
