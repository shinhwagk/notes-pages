package models.database.table

import java.sql.Date
import models.database.Labels
import slick.driver.H2Driver.api._

/**
  * Created by zhangxu on 2016/8/23.
  */
object Notes {

  case class Note(id: Int, category: String, createDate: Date, updateDate: Date, status: Boolean, labelId: Int)

  class Notes(tag: Tag) extends Table[Note](tag, "NOTES") {

    def id = column[Int]("ID", O.PrimaryKey, O.AutoInc)

    def category = column[String]("CATEGORY")

    def createDate = column[Date]("CREATE_DATE")

    def updateDate = column[Date]("UPDATE_DATE")

    def status = column[Boolean]("STATUS")

    def labelId = column[Int]("LABEL_ID")

    def * = (id, category, createDate, updateDate, status, labelId) <> (Note.tupled, Note.unapply)

    def labelFk = foreignKey("FK_LABELS_FILES_ID", labelId, Labels._table)(_.id)
  }

  val _table = TableQuery[Notes]
}
