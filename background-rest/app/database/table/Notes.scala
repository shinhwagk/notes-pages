package database.table

import slick.driver.H2Driver.api._

/**
  * Created by zhangxu on 2016/8/23.
  */
object Notes {

  import CustomColumnType._

  object NoteCategory {
    val command = "COMMAND"
    val concept = "CONCEPT"
    val operation = "OPERATION"
    val file = "FILE"
  }

  case class Note(id: Int,
                  category: String,
                  content: String,
                  createDate: Long = System.currentTimeMillis(),
                  updateDate: Long = System.currentTimeMillis(),
                  status: Boolean = true)

  class Notes(tag: Tag) extends Table[Note](tag, "NOTES") {

    def id = column[Int]("ID", O.PrimaryKey, O.AutoInc)

    def category = column[String]("CATEGORY")

    def content = column[String]("CONTENT")

    def createDate = column[Long]("CREATE_DATE")

    def updateDate = column[Long]("UPDATE_DATE")

    def status = column[Boolean]("STATUS")

    def * = (id, category, content, createDate, updateDate, status) <> (Note.tupled, Note.unapply)
  }

  val _table = TableQuery[Notes]
}
