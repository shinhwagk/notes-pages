package models.database

import slick.driver.MySQLDriver.api._
/**
  * Created by zhangxu on 2016/8/17.
  */
object LabelsDocs {

  case class LabelsDoc(label_id: Int, doc_id: Int)

  class LabelsDocs(tag: Tag) extends Table[LabelsDoc](tag, "labelsdocs") {
    def label_id = column[Int]("label_id")

    def doc_id = column[Int]("doc_id")

    def * = (label_id, doc_id) <> (LabelsDoc.tupled, LabelsDoc.unapply)
  }

  val label = TableQuery[LabelsDocs]
}
