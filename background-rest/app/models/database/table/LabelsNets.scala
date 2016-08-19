package models.database

import slick.driver.MySQLDriver.api._

/**
  * Created by zhangxu on 2016/8/17.
  */
object LabelsNets {

  case class LabelsNet(center: String, edge: String)

  class LabelsNets(tag: Tag) extends Table[LabelsNet](tag, "labelsnets") {
    def center = column[String]("center")

    def edge = column[String]("edge")

    def * = (center, edge) <> (LabelsNet.tupled, LabelsNet.unapply)
  }

  val table = TableQuery[LabelsNets]
}
