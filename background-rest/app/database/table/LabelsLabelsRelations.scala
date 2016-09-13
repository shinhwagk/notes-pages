package database.table

import slick.driver.H2Driver.api._

/**
  * Created by goku on 2016/9/12.
  */
object LabelsLabelsRelations {

  case class LabelsLabelsRelation(center: String, edge: String)

  class LabelsLabelsRelations(tag: Tag) extends Table[LabelsLabelsRelation](tag, "LABELS_LABELS_RELATION") {

    def center = column[String]("center")

    def edge = column[String]("edge")

    def * = (center, edge) <> (LabelsLabelsRelation.tupled, LabelsLabelsRelation.unapply)
  }

  val _table = TableQuery[LabelsLabelsRelations]
}
