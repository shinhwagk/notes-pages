package controllers

import javax.inject.Inject

import models.database.{Labels, LabelsNets}
import play.api.db.slick.DatabaseConfigProvider
import play.api.libs.json.{JsValue, Json}
import play.api.mvc._
import slick.driver.JdbcProfile
import slick.driver.MySQLDriver.api._

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

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

  def labelsByLabels = Action.async { implicit request =>
    val body: AnyContent = request.body
    val jsonBody: Option[JsValue] = body.asJson
    jsonBody.map { json =>
      db.run(LabelsNets.table.filter(_.center inSet json.as[List[String]]).map(_.edge).result)
        .map(p => Ok(Json.toJson(p)))
    }.getOrElse {
      Future(BadRequest("Expecting application/json request body"))
    }
  }
}
