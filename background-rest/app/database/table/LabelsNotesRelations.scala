package database.table

import slick.driver.H2Driver.api._

/**
  * Created by goku on 2016/9/12.
  */
object LabelsNotesRelations {

  case class LabelsNotesRelation(labelName: String, noteId: Int)

  class LabelsNotesRelations(tag: Tag) extends Table[LabelsNotesRelation](tag, "LABELS_NOTES_RELATION") {

    def labelName = column[String]("label_Name")

    def noteId = column[Int]("note_Id")

    def * = (labelName, noteId) <> (LabelsNotesRelation.tupled, LabelsNotesRelation.unapply)
  }

  val _table = TableQuery[LabelsNotesRelations]
}
