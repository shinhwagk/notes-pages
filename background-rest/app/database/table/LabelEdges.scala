package database.table

import models.database.Labels
import slick.driver.H2Driver.api._

/**
  * Created by zhangxu on 2016/8/29.
  */
object LabelEdges {

  case class LabelEdge(centreId: Int, edgeId: Int, status: Boolean)

  class LabelEdges(tag: Tag) extends Table[LabelEdge](tag, "LABEL_EDGE") {

    def centreId = column[Int]("CENTRE_ID")

    def edgeId = column[Int]("EDGE_ID")

    def status = column[Boolean]("STATUS")

    def * = (centreId, edgeId, status) <> (LabelEdge.tupled, LabelEdge.unapply)

    def centreIdFk = foreignKey("FK_LABEL_CENTRE_ID", centreId, Labels._table)(_.id)

    def edgeIdFk = foreignKey("FK_LABEL_EDGE_ID", edgeId, Labels._table)(_.id)
  }

  val _table = TableQuery[LabelEdges]
}
