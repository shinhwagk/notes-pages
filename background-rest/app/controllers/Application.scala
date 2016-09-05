package controllers

import javax.inject.Inject

import database.Dao
import database.table.Notes.Note
import models.database.Labels
import models.transition.DataObject
import play.api.db.slick.DatabaseConfigProvider
import play.api.libs.json._
import play.api.mvc._
import slick.driver.H2Driver.api._
import slick.driver.JdbcProfile

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

/**
  * Created by zhangxu on 2016/8/17.
  */
class Application @Inject()(dbConfigProvider: DatabaseConfigProvider, dao: Dao) extends Controller {

  import controllers.ApplicationObject._

  val db = dbConfigProvider.get[JdbcProfile].db

  def index = Action(Ok("<h1>test index</h1>").as("text/html"))

  implicit val noteReads = Json.reads[Note]
  implicit val noteWrites = Json.writes[Note]
  implicit val labelWrites = Json.writes[DataObject.Label]
  implicit val restConceptReads = Json.reads[RestConcept]
  implicit val restFileReads = Json.reads[RestFile]
  implicit val restOperationtReads = Json.reads[RestOperation]
  implicit val restCommandReads = Json.reads[RestCommand]

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


  //  def insertNote = Action.async { implicit request =>
  //    request.body.asJson.map { optnote =>
  //      db.run(Notes._table += optnote.as[Note]).map(rs => Ok)
  //    }.getOrElse(Future(InternalServerError("xxx")))
  //  }

  def addCommand = Action.async { implicit request =>
    request.body.asJson.map { jsValue =>
      val rCommand: RestCommand = jsValue.as[RestCommand]
      dao.addCommand(rCommand)
    }.map(_.map(_ => Ok)).getOrElse(Future(InternalServerError))
  }

  def addConcept = Action.async { implicit request =>
    request.body.asJson.map { jsValue =>
      val rConcept: RestConcept = jsValue.as[RestConcept]
      dao.addConcept(rConcept)
    }.map(_.map(_ => Ok)).getOrElse(Future(InternalServerError))
  }

  def addFile = Action.async { implicit request =>
    request.body.asJson.map { jsValue =>
      val rFile: RestFile = jsValue.as[RestFile]
      dao.addFile(rFile)
    }.map(_.map(_ => Ok)).getOrElse(Future(InternalServerError))
  }

  def addOperation = Action.async { implicit request =>
    request.body.asJson.map { jsValue =>
      val rOperation: RestOperation = jsValue.as[RestOperation]
      dao.addOperation(rOperation)
    }.map(_.map(_ => Ok)).getOrElse(Future(InternalServerError))
  }


}
