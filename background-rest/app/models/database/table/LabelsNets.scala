package models.database

import slick.driver.MySQLDriver.api._
/**
  * Created by zhangxu on 2016/8/17.
  */
object LabelsNets {

  case class LabelsNet(center_id: Int, edge_id: Int)

  class LabelsNets(tag: Tag) extends Table[LabelsNet](tag, "labelsnets") {
    def center_id = column[Int]("center_id")

    def edge_id = column[Int]("edge_id")

    def * = (center_id, edge_id) <> (LabelsNet.tupled, LabelsNet.unapply)
  }

  val label = TableQuery[LabelsNets]
}
