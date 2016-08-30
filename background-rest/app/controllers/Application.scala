package controllers

import java.sql.Date
import javax.inject.Inject

import models.database.Labels
import models.database.Labels.Label
import models.database.table.NoteCommands.NoteCommand
import models.database.table.{NoteCommands, Notes}
import models.database.table.Notes.{Note, NoteCategory}
import models.transition.DataObject
import play.api.db.slick.DatabaseConfigProvider
import play.api.libs.json._
import play.api.mvc._
import slick.driver.JdbcProfile
import slick.driver.H2Driver.api._

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

/**
  * Created by zhangxu on 2016/8/17.
  */
class Application @Inject()(dbConfigProvider: DatabaseConfigProvider) extends Controller {
  val db = dbConfigProvider.get[JdbcProfile].db

  def index = Action(Ok("<h1>test index</h1>").as("text/html"))

  implicit val noteReads = Json.reads[Note]
  implicit val noteWrites = Json.writes[Note]
  implicit val labelWrites = Json.writes[DataObject.Label]

  def allLabels = Action.async { implicit request =>
    db.run(Labels._table.filter(_.status).map(rs => (rs.id, rs.name)).result)
      .map(_.map(rs => DataObject.Label(rs._1, rs._2)))
      .map(rs => Ok(Json.toJson(rs)))
  }

  //  def label(label: String) = Action.async { implicit request =>
  //    db.run(Labels._table.filter(_.name === label).result.head)
  //      .map(rs => Ok(JsObject(Seq("name" -> JsString(rs.name), "edge" -> Json.parse(rs.edge), "notes" -> Json.parse(rs.notes)))))
  //  }
  //
  //  def note(id: Int) = Action.async { implicit request =>
  //    db.run(Notes._table.filter(_.id === id).result.head)
  //      .map(row => Json.parse(row.data).as[JsObject] ++ Json.obj("category" -> row.category) ++ Json.obj("id" -> row.id))
  //      .map(rs => Ok(rs))
  //  }

  //  implicit val noteWrites: Writes[Note]


  def insertNote = Action.async { implicit request =>
    request.body.asJson.map { optnote =>
      db.run(Notes._table += optnote.as[Note]).map(rs => Ok)
    }.getOrElse(Future(InternalServerError("xxx")))
  }

  def insertCommand = Action.async { implicit request =>
    request.body.asJson.map { jsValue =>
      val contentOne = (jsValue \ "contentOne").as[String]
      val contentTwo = (jsValue \ "contentTwo").as[String]
      val labelId = (jsValue \ "labelId").as[Int]
      val note = Note(0, NoteCategory.command, new Date(new java.util.Date().getTime), new Date(new java.util.Date().getTime), true, labelId)
      db.run((Notes._table returning Notes._table.map(_.id)) += note).flatMap(id =>
        db.run(NoteCommands._table += NoteCommand(0, contentOne, contentTwo, id))
      ).map(rs => Ok)
    }.getOrElse(Future(InternalServerError("xxx")))

    Future(Ok)
  }
}
