package controllers

/**
  * Created by zhangxu on 2016/8/17.
  */
object ApplicationObject {

  case class RestConcept(id: Int, title: String, labelId: Int)

  case class RestFile(id: Int, title: String, labelId: Int)

  case class RestOperation(id: Int, title: String, labelId: Int)

  case class RestCommand(id: Int, contentOne: String, contentTwo: String, labelId: Int)

}
