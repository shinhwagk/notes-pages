package models.database

import slick.driver.H2Driver.api._

/**
  * Created by zhangxu on 2016/8/17.
  */
object Labels {

  import database.table.CustomColumnType._

  case class Label(name: String, status: Boolean = true, edges: List[String] = Nil, notes: List[Int] = Nil)

  class Labels(tag: Tag) extends Table[Label](tag, "LABELS") {

    def name = column[String]("NAME", O.PrimaryKey)

    def status = column[Boolean]("STATUS")

    def edges = column[List[String]]("EDGES")

    def notes = column[List[Int]]("NOTES")

    def * = (name, status, edges, notes) <> (Label.tupled, Label.unapply)

    def unqName = index("UNQ_NAME", name, unique = true)
  }

  val _table = TableQuery[Labels]
}
