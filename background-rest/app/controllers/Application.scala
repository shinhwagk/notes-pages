package controllers

import javax.inject.Inject

import database.Dao
import database.table.{LabelsNotesRelations, Notes, NotesNotesRelations}
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
    val query = for {
      (l, ln) <- Labels._table joinLeft LabelsNotesRelations._table on (_.name === _.labelName)
    } yield (l.name, ln.map(_ => 1).getOrElse(0))

    val query2 = query.groupBy(_._1).map(c => (c._1, c._2.length)).sortBy(_._2.desc).map(_._1)
    db.run(query2.result)
      .map(rs => Ok(Json.toJson(rs)))
  }

  def getLabel(name: String) = Action.async { implicit request =>
    val restLabel = for {
      notes <- db.run(LabelsNotesRelations._table.filter(_.labelName === name).map(_.noteId).to[List].result)
      edges <- Future.sequence(notes.map(id => db.run(LabelsNotesRelations._table.filter(_.noteId === id).map(_.labelName).result)))
        .map(_.flatten.distinct)
        .map(_.filterNot(_ == name))
    } yield {
      RestLabel(name, edges, notes)
    }
    restLabel.map(rl => Ok(Json.toJson(rl).toString()))
  }

  def getNote(id: Int) = Action.async { implicit request =>
    val restNote = for {
      note <- dao.selectNoteById(id)
      relations <- db.run(NotesNotesRelations._table.filter(_.noteId === id).map(_.relationId).to[List].result)
    } yield RestNote(note.id, note.category, note.content, relations)
    restNote.map(rl => Ok(Json.toJson(rl).toString()))
  }

  def addLabel = Action.async { implicit request =>
    request.body.asJson.map { restLabel =>
      println(restLabel)
      val rn = restLabel.as[RestAddLabel]
      dao.insertLabel(rn.name).map(_ => Ok("{}"))
    }.getOrElse(Future(InternalServerError("xxx")))
  }

  def addNote = Action.async { implicit request =>
    request.body.asJson.map { restNote =>
      val rn = restNote.as[RestAddNote]
      dao.insertNote(rn).map(id => Ok(Json.parse(s"[${id}]").toString()))
    }.getOrElse(Future(InternalServerError("xxx")))
  }

  def putNote(id: Int) = Action.async { implicit request =>
    request.body.asJson.map { restPutNote =>
      val rpn = restPutNote.as[RestPutNote]
      dao.updateNoteById(id, rpn).map(_ => Ok("{}"))
    }.getOrElse(Future(InternalServerError("xxx")))
  }

  def getPutNote(id: Int) = Action.async { implicit request =>
    db.run(Notes._table.filter(_.id === id).result.head)
      .flatMap(note => {
        for {
          labels <- db.run(LabelsNotesRelations._table.filter(_.noteId === id).map(_.labelName).to[List].result)
          notes <- db.run(NotesNotesRelations._table.filter(_.noteId === id).map(_.relationId).to[List].result)
        } yield RestPutNote(note.id, note.category, note.content, notes, labels)
      })
      .map(rl => Ok(Json.toJson(rl).toString()))
  }

  def deleteNote(id: Int) = Action.async { implicit request =>
    val del = for {
      delNote <- db.run(Notes._table.filter(_.id === id).delete)
      dlnr <- dao.deleteLabelsNotesRelations(id)
      dnnr <- dao.deleteNotesNotesRelations(id)
    } yield 0
    del.map(_ => Ok)
  }

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
