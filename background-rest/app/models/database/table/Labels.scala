package models.database

import slick.driver.MySQLDriver.api._

/**
  * Created by zhangxu on 2016/8/17.
  */
object Labels {

  case class Label(name: String)

  class Labels(tag: Tag) extends Table[Label](tag, "labels") {

    def name = column[String]("name")

    def * = (name) <> (Label, Label.unapply)
  }

  val table = TableQuery[Labels]
}

