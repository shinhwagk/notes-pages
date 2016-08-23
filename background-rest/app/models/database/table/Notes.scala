package models.database.table

import slick.driver.MySQLDriver.api._

/**
  * Created by zhangxu on 2016/8/23.
  */
object Notes {

  case class Note(id: Int, category: String, status: Int, data: String)

  class Notes(tag: Tag) extends Table[Note](tag, "vnotes") {

    def id = column[Int]("id")

    def status = column[Int]("status")

    def category = column[String]("category")

    def data = column[String]("data")

    def * = (id, category, status, data) <> (Note.tupled, Note.unapply)
  }

  val table = TableQuery[Notes]

}
