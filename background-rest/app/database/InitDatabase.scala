package database

import java.io.File

import database.table.LabelsNotesRelations.LabelsNotesRelation
import database.table.Notes.Note
import database.table.NotesNotesRelations.NotesNotesRelation
import database.table.{LabelsNotesRelations, Notes, NotesNotesRelations}
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
    //    Thread.sleep(1000)
    //    updateNodesCategoryById(27, "keymap")

    List(36, 35, 30).foreach { i =>
      db.run(Notes._table.filter(_.id === i).map(_.category).update("command")).onComplete {
        case Success(_) => println("create table success.")
        case Failure(ex) => println(ex.getMessage)
      }
    }

    //    insertTestData
    //    exportAllLabelName
    //    exportALLabel
    //    exportALLNote
    sleep
  }

  def createTables = {
    db.run(DBIO.seq((Labels._table.schema
      ++ Notes._table.schema
      ++ NotesNotesRelations._table.schema
      ++ LabelsNotesRelations._table.schema
      ).create)).onComplete {
      case Success(_) => println("create table success.")
      case Failure(ex) => println(ex.getMessage)
    }
  }

  def updateNodesCategoryById(id: Int, category: String) = {
    db.run(Notes._table.filter(_.id === id).map(_.category).update(category)).onComplete {
      case Success(_) => println(s"update id:${id},categor:${category}  success.")
      case Failure(ex) => println(ex.getMessage)
    }
  }

  def insertTestData = {
    db.run(DBIO.seq(
      Labels._table += Label("oracle"),
      Labels._table += Label("install"),
      Labels._table += Label("hadoop"),
      Labels._table += Label("silent"),
      Notes._table += Note(1, "file", List("fff")),
      Notes._table += Note(1, "concept", List("install")),
      Notes._table += Note(1, "concept", List("hadoop install")),
      Notes._table += Note(1, "command", List("hadoop install", "xxx")),
      LabelsNotesRelations._table += LabelsNotesRelation("oracle", 2),
      LabelsNotesRelations._table += LabelsNotesRelation("install", 2),
      LabelsNotesRelations._table += LabelsNotesRelation("silent", 2),
      LabelsNotesRelations._table += LabelsNotesRelation("oracle", 1),
      LabelsNotesRelations._table += LabelsNotesRelation("hadoop", 3),
      LabelsNotesRelations._table += LabelsNotesRelation("install", 3),
      LabelsNotesRelations._table += LabelsNotesRelation("install", 4),
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

  def exportTemplate = {
    exportAllLabelName
    Thread.sleep(1000)
    exportALLabel
    Thread.sleep(1000)
    exportALLNote
  }

  /**
    * export operation: all label name
    */
  def exportAllLabelName: Unit = {
    urlToFile(s"http://127.0.0.1:9000/api/labels", s"labels.json", "exportAllLabelName")
  }

  /**
    * export operation: all note
    */
  def exportALLNote: Unit = {
    val allNoteId = Source.fromURL("http://127.0.0.1:9000/api/noteidall").mkString
    val noteIdList = Json.parse(allNoteId).as[List[Int]]
    noteIdList.foreach { id =>
      createDir(s"notes\\${id}")
      urlToFile(s"http://127.0.0.1:9000/api/note/${id}", s"notes\\${id}\\data.json", "exportALLNotes")
    }
  }

  /**
    * export operation: all label info
    */
  def exportALLabel: Unit = {
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

  def createDir(path: String) = {
    val f = new File(path)
    val bool = f.mkdir()
    println(path, bool)
  }
}