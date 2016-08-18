package controllers

import javax.inject.Inject
import slick.driver.MySQLDriver.api._
import scala.concurrent.ExecutionContext.Implicits.global
import models.database.Labels
import models.database.Labels.Label
import play.api.db.slick.DatabaseConfigProvider
import play.api.libs.json.Json
import play.api.mvc._
import slick.driver.JdbcProfile

/**
  * Created by zhangxu on 2016/8/17.
  */
class Application @Inject()(dbConfigProvider: DatabaseConfigProvider) extends Controller {
  val db = dbConfigProvider.get[JdbcProfile].db

  def index = Action {
    Ok("A")
  }

  def labels = Action.async { implicit request =>
    import models.transition.JsonTransitions._
    db.run(Labels.table.result).map(rs => Ok(Json.toJson(rs)))
  }
}
