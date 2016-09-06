package database.table

import play.api.libs.json.Json
import slick.driver.H2Driver.api._
/**
  * Created by zhangxu on 2016/9/6.
  */
object CustomColumnType {
  implicit val ListIntColumnType = MappedColumnType.base[List[Int], String](
    s => Json.toJson(s).toString(),
    i => Json.parse(i).as[List[Int]]
  )
}
