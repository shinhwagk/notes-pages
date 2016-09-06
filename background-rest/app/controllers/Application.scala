package controllers

import javax.inject.Inject

import database.Dao
import database.table.Notes
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

  val db = dbConfigProvider.get[JdbcProfile].db

  def index = Action(Ok("<h1>test index</h1>").as("text/html"))

  def allLabels = Action.async { implicit request =>
    db.run(Labels._table.filter(_.status).map(_.name).result)
      .map(rs => Ok(Json.toJson(rs)))
  }

  def getLabel(name: String) = Action.async { implicit request =>
    db.run(Labels._table.filter(_.status).filter(_.name === name).result.head)
      .map(l => RestLabel(l.name, l.edges, l.notes))
      .map(rl => Ok(Json.toJson(rl).toString()))
  }

  def getNote(id: Int) = Action.async { implicit request =>
    db.run(Notes._table.filter(_.status).filter(_.id === id).result.head)
      .map(note => RestNote(note.id, note.category, note.content))
      .map(rl => Ok(Json.toJson(rl).toString()))
  }

  def addLabel = Action.async { implicit request =>
    request.body.asJson.map { restLabel =>
      val rn = restLabel.as[RestAddLabel]
      dao.addLabel(rn.name).map(_ => Ok("{}"))
    }.getOrElse(Future(InternalServerError("xxx")))
  }

  def addNote = Action.async { implicit request =>
    request.body.asJson.map { restNote =>
      val rn = restNote.as[RestAddNote]
      dao.addNote(rn).map(_ => Ok("{}"))
    }.getOrElse(Future(InternalServerError("xxx")))
  }
}
