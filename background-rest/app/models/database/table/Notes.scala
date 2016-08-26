package models.database.table

import java.sql.Date

import slick.driver.H2Driver.api._

/**
  * Created by zhangxu on 2016/8/23.
  */
object Notes {

  case class Note(id: Int, category: String, data: String, relate: String, createdate: Date, updatedate: Date, status: Int)


  class Notes(tag: Tag) extends Table[Note](tag, "notes") {

    def id = column[Int]("id", O.PrimaryKey, O.AutoInc)

    def category = column[String]("category")

    def data = column[String]("data")

    def relate = column[String]("relate")

    def createdate = column[Date]("createdate")

    def updatedate = column[Date]("updatedate")

    def status = column[Int]("status")

    def * = (id, category, data, relate, createdate, updatedate, status) <> (Note.tupled, Note.unapply)
  }

  val table = TableQuery[Notes]

}
