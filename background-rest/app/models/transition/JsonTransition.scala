package models.transition

import models.database.Labels.Label
import play.api.libs.json.Json

/**
  * Created by zhangxu on 2016/8/17.
  */
object JsonTransitions {
  implicit val residentReads = Json.writes[Label]
}
