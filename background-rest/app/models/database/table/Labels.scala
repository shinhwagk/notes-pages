package models.database

import slick.driver.MySQLDriver.api._

/**
  * Created by zhangxu on 2016/8/17.
  */
object Labels {

  case class Label(name: String, edge: String, notes: String)

  class Labels(tag: Tag) extends Table[Label](tag, "vlabels") {

    def name = column[String]("name")

    def edge = column[String]("edge")

    def notes = column[String]("notes")

    def * = (name, edge, notes) <> (Label.tupled, Label.unapply)
  }

  val table = TableQuery[Labels]

}
