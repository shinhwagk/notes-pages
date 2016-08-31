package database.table

import slick.driver.H2Driver.api._

/**
  * Created by zhangxu on 2016/8/29.
  */
object NoteConcepts {

  case class NoteConcept(id: Int, title: String, noteId: Int)

  class NoteConcepts(tag: Tag) extends Table[NoteConcept](tag, "NOTE_CONCEPTS") {

    def id = column[Int]("ID", O.PrimaryKey, O.AutoInc)

    def title = column[String]("TITLE")

    def noteId = column[Int]("NOTE_ID")

    def * = (id, title, noteId) <> (NoteConcept.tupled, NoteConcept.unapply)

    def noteFk = foreignKey("FK_NOTES_CONCEPTS_ID", noteId, Notes._table)(_.id)
  }

  val _table = TableQuery[NoteConcepts]
}