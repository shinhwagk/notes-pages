package database

import java.io.File

import database.table.Notes
import models.database.Labels
import play.api.libs.json.{Json, Writes}
import slick.driver.H2Driver.api._

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future
import scala.io.Source
import scala.util.{Failure, Success}

object InitDatabase {
  lazy val db = Database.forConfig("default")

  def main(args: Array[String]): Unit = {
    //    val setup = createTables
    //     val setup =   insertDataLabel
    //    val setup = query
    //    val setup = DBIO.seq(
    //      createTables,
    //      Labels._table += Label(0, "aaa"),
    //      Labels._table += Label(0, "aaa2"),
    //      Labels._table += Label(0, "aaa3"),
    //      Labels._table += Label(0, "aaa4")
    //    )
    //    db.run(Notes._table.filter(_.id < 16).delete).onComplete {
    //      case Success(_) => println("init database success.")
    //      case Failure(ex) => println(ex.getMessage)
    //    }
    //
    //    val notesIds: Future[List[Int]] = db.run(Notes._table.map(_.id).to[List].result)
    //    val labels: Future[Seq[(String, List[Int])]] = db.run(Labels._table.map(l => (l.name, l.notes)).result)
    //
    //    val b: Future[Future[Seq[Int]]] = for {
    //      notes <- notesIds
    //      l <- labels.map(_.map { case (a, b) => (a, b.filter(e => notes.contains(e))) })
    //    } yield Future.sequence(l.map { case (name, noteId) => db.run(Labels._table.filter(_.name === name).map(_.notes).update(noteId)) })
    //val c = b.flatMap(p=>p)

    //    exportAllLabels
    exportALLNotes
    //    db.run(Labels._table.filter(_.name inSet (List("aaa", "aaa2"))).result).onComplete {
    //      case Success(rs) => println("init database success.")
    //        rs.foreach(println)
    //      case Failure(ex) => println(ex.getMessage)
    //    }
    sleep
  }

  def createTables = {
    DBIO.seq((Labels._table.schema ++ Notes._table.schema).create)
  }

  def query = {
    Labels._table.result
  }

  //    def insertDataNote = {
  //      val note = Note(0, "command","""{"content_1": "xxxx", "content_2": "xxxx"}""", "[1]", new java.sql.Date(new java.util.Date().getTime), new java.sql.Date(new java.util.Date().getTime), 1)
  //      db.run(Notes._table.+=(note)).onComplete {
  //        case Success(_) => println("insert note success.")
  //        case Failure(ex) => println(ex.getMessage)
  //      }
  //    }
  //
  //  def insertDataLabel = {
  //    val label = Label("oracle", "[]", "[1,2]", 1)
  //    db.run(Labels._table.+=(label)).onComplete {
  //      case Success(_) => println("insert note success.")
  //      case Failure(ex) => println(ex.getMessage)
  //    }
  //  }

  def sleep = {
    while (true) {
      println("sleep")
      Thread.sleep(1111)
    }
  }

  /**
    * export operation: all label
    */
  def exportAllLabels: Unit = {
    urlToFile(s"http://127.0.0.1:9000/api/labels", s"labels.json", "exportAllLabels")
  }

  /**
    * export operation: all note
    */
  def exportALLNotes: Unit = {
    val allNoteIdsStr = Source.fromURL("http://127.0.0.1:9000/api/noteidall").mkString
    val noteIdList = Json.parse(allNoteIdsStr).as[List[Int]]
    noteIdList.foreach { id =>
      urlToFile(s"http://127.0.0.1:9000/api/note/${id}", s"notes\\${id}", "exportALLNotes")
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