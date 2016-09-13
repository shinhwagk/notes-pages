package database

import java.io.File

import database.table.LabelsLabelsRelations.LabelsLabelsRelation
import database.table.LabelsNotesRelations.LabelsNotesRelation
import database.table.Notes.Note
import database.table.NotesNotesRelations.NotesNotesRelation
import database.table.{LabelsLabelsRelations, LabelsNotesRelations, Notes, NotesNotesRelations}
import models.database.Labels
import models.database.Labels.Label
import play.api.libs.json.{Json, Writes}
import slick.driver.H2Driver.api._

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future
import scala.io.Source
import scala.util.{Failure, Success}

object InitDatabase {
  lazy val db = Database.forConfig("default")

  def main(args: Array[String]): Unit = {
    //    createTables
    insertTestData
    //    exportALLLabel
    sleep
  }

  def createTables = {
    db.run(DBIO.seq((Labels._table.schema
      ++ Notes._table.schema
      ++ NotesNotesRelations._table.schema
      ++ LabelsLabelsRelations._table.schema
      ++ LabelsNotesRelations._table.schema
      ).create)).onComplete {
      case Success(_) => println("create table success.")
      case Failure(ex) => println(ex.getMessage)
    }
  }

  def insertTestData = {
    db.run(DBIO.seq(
      Labels._table += Label("oracle"),
      Labels._table += Label("install"),
      Notes._table += Note(1, "file","""{"title","fff"}"""),
      Notes._table += Note(1, "concept","""{"title","fff2"}"""),
      LabelsLabelsRelations._table += LabelsLabelsRelation("oracle", "install"),
      LabelsLabelsRelations._table += LabelsLabelsRelation("install", "oracle"),
      LabelsNotesRelations._table += LabelsNotesRelation("oracle", 1),
      LabelsNotesRelations._table += LabelsNotesRelation("install", 2),
      LabelsNotesRelations._table += LabelsNotesRelation("install", 1),
      NotesNotesRelations._table += NotesNotesRelation(1, 2)
    )).onComplete {
      case Success(_) => println("insert test data success.")
      case Failure(ex) => println(ex.getMessage)
    }


  }

  def sleep = {
    while (true) {
      println("sleep")
      Thread.sleep(1111)
    }
  }

  /**
    * export operation: all label
    */
  def exportAllLabelName: Unit = {
    urlToFile(s"http://127.0.0.1:9000/api/labels", s"labels.json", "exportAllLabels")
  }

  /**
    * export operation: all note
    */
  def exportALLNote: Unit = {
    val allNoteId = Source.fromURL("http://127.0.0.1:9000/api/noteidall").mkString
    val noteIdList = Json.parse(allNoteId).as[List[Int]]
    noteIdList.foreach { id =>
      urlToFile(s"http://127.0.0.1:9000/api/note/${id}", s"notes\\${id}.json", "exportALLNotes")
    }
  }

  def exportALLLabel: Unit = {
    val allLabelName = Source.fromURL("http://127.0.0.1:9000/api/labels").mkString
    val labelNameList = Json.parse(allLabelName).as[List[String]]
    labelNameList.foreach { name =>
      urlToFile(s"http://127.0.0.1:9000/api/label/${name}", s"labels\\${name}.json", "exportALLLabel")
    }
  }

  def jsonToString[T](json: T)(implicit tjs: Writes[T]): String = {
    Json.toJson(json).toString()
  }

  def urlToFile(url: String, fileName: String, name: String) = {
    Future {
      val content: String = Source.fromURL(url).mkString
      stringToFile(fileName, content)
    }.onSuccess { case x => println(s"operation success: ${name}") }
  }

  def stringToFile(path: String, content: String) = {
    val npath = "data\\" + path
    val pw = new java.io.PrintWriter(new File(npath))
    try pw.write(content) finally pw.close()
  }
}