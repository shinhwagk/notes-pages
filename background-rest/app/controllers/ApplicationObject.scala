package controllers

import database.table.Notes.Note
import play.api.libs.json.Json

/**
  * Created by zhangxu on 2016/8/17.
  */
object ApplicationObject {

  case class RestAddNote(id: Int, category: String, content: String, labels: List[String])

  case class RestPutNote(id: Int, category: String, content: String, relations: List[Int], labels: List[String])

  case class RestAddLabel(name: String)

  case class RestLabel(name: String, edge: List[String], notes: List[Int])

  case class RestNote(id: Int, category: String, content: String, relations: List[Int])

  implicit val noteReads = Json.reads[Note]
  implicit val noteWrites = Json.writes[Note]
  implicit val restNoteAddReads = Json.reads[RestAddNote]
  implicit val restLabelAddReads = Json.reads[RestAddLabel]
  implicit val restLabelReads = Json.reads[RestLabel]
  implicit val restLabelWrites = Json.writes[RestLabel]
  implicit val restNoteReads = Json.writes[RestNote]
  implicit val restPutNoteReads = Json.reads[RestPutNote]
  implicit val restPutNoteWrites = Json.writes[RestPutNote]
}
