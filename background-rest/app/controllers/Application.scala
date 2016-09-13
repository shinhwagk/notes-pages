package controllers

import javax.inject.Inject

import database.Dao
import database.table.LabelsNotesRelations.LabelsNotesRelation
import database.table.{LabelsLabelsRelations, LabelsNotesRelations, Notes, NotesNotesRelations}
import models.database.Labels
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
  import database.table.CustomColumnType._

  val db = dbConfigProvider.get[JdbcProfile].db

  def index = Action(Ok("<h1>test index</h1>").as("text/html"))

  def allLabels = Action.async { implicit request =>
    db.run(Labels._table.filter(_.status).map(_.name).result)
      .map(rs => Ok(Json.toJson(rs)))
  }

  def getLabel(name: String) = Action.async { implicit request =>
    val restLabel = for {
      edges <- db.run(LabelsLabelsRelations._table.filter(_.center === name).map(_.edge).to[List].result)
      notes <- db.run(LabelsNotesRelations._table.filter(_.labelName === name).map(_.noteId).to[List].result)
    } yield RestLabel(name, edges, notes)
    restLabel.map(rl => Ok(Json.toJson(rl).toString()))
  }

  def getNote(id: Int) = Action.async { implicit request =>
    val restNote = for {
      note <- db.run(Notes._table.filter(_.id === id).result.head)
      relations <- db.run(NotesNotesRelations._table.filter(_.noteId === id).map(_.relationId).to[List].result)
    } yield RestNote(note.id, note.category, note.content, relations)
    restNote.map(rl => Ok(Json.toJson(rl).toString()))
  }

  def addLabel = Action.async { implicit request =>
    request.body.asJson.map {
      restLabel =>
        val rn = restLabel.as[RestAddLabel]
        dao.addLabel(rn.name).map(_ => Ok("{}"))
    }.getOrElse(Future(InternalServerError("xxx")))
  }

//  def addNote = Action.async { implicit request =>
//    request.body.asJson.map {
//      restNote =>
//        val rn = restNote.as[RestAddNote]
//        dao.addNote(rn).map(id => Ok(Json.parse(s"[${id}]").toString()))
//    }.getOrElse(Future(InternalServerError("xxx")))
//  }

//  def putNote(id: Int) = Action.async { implicit request =>
//    request.body.asJson.map {
//      restPutNote =>
//        val rpn = restPutNote.as[RestPutNote]
//        dao.putNoteById(id, rpn).map(_ => Ok("{}"))
//    }.getOrElse(Future(InternalServerError("xxx")))
//  }

//  def getPutNote(id: Int) = Action.async { implicit request =>
//    db.run(Notes._table.filter(_.id === id).result.head)
//      .flatMap(note => {
//        val labelInfo = db.run(Labels._table.map(l => (l.name, l.notes)).to[List].result)
//        val labels: Future[List[String]] = labelInfo.map(_.filter(_._2.contains(note.id)).map(_._1))
//        labels.map(RestPutNote2(note.id, note.category, note.content, note.relations, _))
//      })
//      .map(rl => Ok(Json.toJson(rl).toString()))
//  }

  //  def getNote(id: Int) = Action.async { implicit request =>
  //
  //
  //    request.body.asJson.map { restNote =>
  //      val rn = restNote.as[RestAddNote]
  //      dao.addNote(rn).map(_ => Ok("{}"))
  //    }.getOrElse(Future(InternalServerError("xxx")))
  //  }

  /**
    * export operation
    */
  def getNoteIdAll = Action.async { implicit request =>
    db.run(Notes._table.filter(_.status).map(_.id).to[List].result)
      .map(ids => Ok(Json.toJson(ids).toString()))
  }
}
