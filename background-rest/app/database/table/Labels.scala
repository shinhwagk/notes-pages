package models.database

import slick.driver.H2Driver.api._

/**
  * Created by zhangxu on 2016/8/17.
  */
object Labels {

  case class Label(name: String, status: Boolean = true)

  class Labels(tag: Tag) extends Table[Label](tag, "LABELS") {

    def name = column[String]("NAME", O.PrimaryKey)

    def status = column[Boolean]("STATUS")

    def * = (name, status) <> (Label.tupled, Label.unapply)

    def unqName = index("UNQ_NAME", name, unique = true)
  }

  val _table = TableQuery[Labels]
}
