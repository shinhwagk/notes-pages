package controllers

import javax.inject.Inject

import models.database.Labels
import models.database.table.Notes
import models.database.table.Notes.Note
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

  def labels = Action.async { implicit request =>
    db.run(Labels.table.map(_.name).result).map(rs => Ok(Json.toJson(rs)))
  }

  def label(label: String) = Action.async { implicit request =>
    db.run(Labels.table.filter(_.name === label).result.head)
      .map(rs => Ok(JsObject(Seq("name" -> JsString(rs.name), "edge" -> Json.parse(rs.edge), "notes" -> Json.parse(rs.notes)))))
  }

  def note(id: Int) = Action.async { implicit request =>
    db.run(Notes.table.filter(_.id === id).result.head)
      .map(row => Json.parse(row.data).as[JsObject] ++ Json.obj("category" -> row.category) ++ Json.obj("id" -> row.id))
      .map(rs => Ok(rs))
  }

  //  implicit val noteWrites: Writes[Note]
  implicit val noteReads = Json.reads[Note]
  implicit val noteWrites = Json.writes[Note]

  def insertNote = Action.async { implicit request =>
    request.body.asJson.map { optnote =>
      db.run(Notes.table += optnote.as[Note]).map(rs => Ok)
    }.getOrElse(Future(InternalServerError("xxx")))
  }
}
