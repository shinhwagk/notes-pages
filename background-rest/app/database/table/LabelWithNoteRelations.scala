package database.table

import slick.driver.H2Driver.api._

/**
  * Created by goku on 2016/9/5.
  */
object LabelWithNoteRelations {

  case class LabelWithNoteRelation(id: Int, noteId: Int)

  class LabelWithNoteRelations(tag: Tag) extends Table[LabelWithNoteRelation](tag, "LABEL_WITH_NOTE_RELATIONS") {

    def id = column[Int]("ID", O.PrimaryKey, O.AutoInc)

    def noteId = column[Int]("NOTE_ID")

    def * = (id, noteId) <> (LabelWithNoteRelation.tupled, LabelWithNoteRelation.unapply)
  }

  val _table = TableQuery[LabelWithNoteRelations]

}
