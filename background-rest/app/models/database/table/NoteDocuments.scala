package models.database.table

import slick.driver.H2Driver.api._

/**
  * Created by zhangxu on 2016/8/29.
  */
object NoteDocuments {

  case class NoteDocument(id: Int, title: String, noteId: Int)

  class NoteDocuments(tag: Tag) extends Table[NoteDocument](tag, "NOTE_DOCUMENTS") {

    def id = column[Int]("ID", O.PrimaryKey, O.AutoInc)

    def title = column[String]("TITLE")

    def noteId = column[Int]("NOTE_ID")

    def * = (id, title, noteId) <> (NoteDocument.tupled, NoteDocument.unapply)

    def noteFk = foreignKey("FK_NOTES_DOCUMENTS_ID", noteId, Notes._table)(_.id)
  }

  val _table = TableQuery[NoteDocuments]
}