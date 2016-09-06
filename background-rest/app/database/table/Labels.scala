package models.database

import slick.driver.H2Driver.api._

/**
  * Created by zhangxu on 2016/8/17.
  */
object Labels {

  import database.table.CustomColumnType._

  case class Label(id: Int, name: String, status: Boolean = true, edges: List[Int] = Nil, notes: List[Int] = Nil)

  class Labels(tag: Tag) extends Table[Label](tag, "LABELS") {

    def id = column[Int]("ID", O.PrimaryKey, O.AutoInc)

    def name = column[String]("NAME")

    def status = column[Boolean]("STATUS")

    def edges = column[List[Int]]("EDGES")

    def notes = column[List[Int]]("NOTES")

    def * = (id, name, status, edges, notes) <> (Label.tupled, Label.unapply)

    def unqName = index("UNQ_NAME", name, unique = true)
  }

  val _table = TableQuery[Labels]
}
