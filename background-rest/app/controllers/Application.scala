package controllers

import javax.inject.Inject

import models.database.Labels
import models.database.table.Notes
import play.api.db.slick.DatabaseConfigProvider
import play.api.libs.json._
import play.api.mvc._
import slick.driver.JdbcProfile
import slick.driver.MySQLDriver.api._

import scala.concurrent.ExecutionContext.Implicits.global

/**
  * Created by zhangxu on 2016/8/17.
  */
class Application @Inject()(dbConfigProvider: DatabaseConfigProvider) extends Controller {
  val db = dbConfigProvider.get[JdbcProfile].db

  def index = Action {
    Ok("A")
  }

  def labels = Action.async { implicit request =>
    db.run(Labels.table.map(_.name).result).map(rs => Ok(Json.toJson(rs)))
  }

  def label(label: String) = Action.async { implicit request =>
    db.run(Labels.table.filter(_.name === label).result.head)
      .map(rs => Ok(JsObject(Seq("name" -> JsString(rs.name), "edge" -> Json.parse(rs.edge), "notes" -> Json.parse(rs.notes)))))
  }

  def note(id: Int) = Action.async { implicit request =>
    db.run(Notes.table.filter(_.id === id).map(_.data).result.head)
      .map(rs => Ok(rs))
  }
}
