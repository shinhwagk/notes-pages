package models.database.table

import slick.driver.H2Driver.api._

/**
  * Created by zhangxu on 2016/8/29.
  */
object NoteCommands {

  case class NoteCommand(id: Int, contentOne: String, contentTwo: String, noteId: Int)

  class NoteCommands(tag: Tag) extends Table[NoteCommand](tag, "NOTE_COMMANDS") {

    def id = column[Int]("ID", O.PrimaryKey, O.AutoInc)

    def contentOne = column[String]("CONTENT_ONE")

    def contentTwo = column[String]("CONTENT_TWO")

    def noteId = column[Int]("NOTE_ID")

    def * = (noteId, contentOne, contentTwo, noteId) <> (NoteCommand.tupled, NoteCommand.unapply)

    def noteFk = foreignKey("FK_NOTES_COMMANDS_ID", noteId, Notes._table)(_.id)
  }

  val _table = TableQuery[NoteCommands]
}
