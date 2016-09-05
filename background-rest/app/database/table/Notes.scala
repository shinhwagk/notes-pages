package database.table

import models.database.Labels
import slick.driver.H2Driver.api._

/**
  * Created by zhangxu on 2016/8/23.
  */
object Notes {

  object NoteCategory {
    val command = "COMMAND"
    val concept = "CONCEPT"
    val operation = "OPERATION"
    val file = "FILE"
  }

  case class Note(id: Int, category: String, createDate: Long, updateDate: Long, status: Boolean)

  class Notes(tag: Tag) extends Table[Note](tag, "NOTES") {

    def id = column[Int]("ID", O.PrimaryKey, O.AutoInc)

    def category = column[String]("CATEGORY")

    def createDate = column[Long]("CREATE_DATE")

    def updateDate = column[Long]("UPDATE_DATE")

    def status = column[Boolean]("STATUS")

    def * = (id, category, createDate, updateDate, status) <> (Note.tupled, Note.unapply)
  }

  val _table = TableQuery[Notes]
}
