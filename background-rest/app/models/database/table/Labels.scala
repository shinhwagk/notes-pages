package models.database

import slick.driver.H2Driver.api._

/**
  * Created by zhangxu on 2016/8/17.
  */
object Labels {

  case class Label(name: String, edge: String, notes: String, status: Int)

  class Labels(tag: Tag) extends Table[Label](tag, "labels") {

    def name = column[String]("name", O.PrimaryKey)

    def edge = column[String]("edge")

    def notes = column[String]("notes")

    def status = column[Int]("status")

    def * = (name, edge, notes, status) <> (Label.tupled, Label.unapply)
  }

  val table = TableQuery[Labels]

}
