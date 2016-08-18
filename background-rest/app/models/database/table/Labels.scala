package models.database

import slick.driver.MySQLDriver.api._

/**
  * Created by zhangxu on 2016/8/17.
  */
object Labels {

  case class Label(id: Int, name: String)

  class Labels(tag: Tag) extends Table[Label](tag, "labels") {
    def id = column[Int]("id", O.PrimaryKey)

    def name = column[String]("name")

    def * = (id, name) <> (Label.tupled, Label.unapply)
  }

  val table = TableQuery[Labels]
}

