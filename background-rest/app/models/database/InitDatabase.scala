import models.database.Labels
import models.database.Labels.Label
import models.database.table.Notes
import models.database.table.Notes.Note
import slick.driver.H2Driver.api._

import scala.concurrent.ExecutionContext.Implicits.global
import scala.util.{Failure, Success}

object InitDatabase {
  val db = Database.forConfig("default")

  def main(args: Array[String]): Unit = {
//        createTables
//    insertDataLabel
    insertDataNote
    sleep
  }


  def createTables = {
    //    db.run(Notes.table.schema.create).onComplete {
    //      case Success(_) => println("init database success.")
    //      case Failure(ex) => println(ex.getMessage)
    //    }
    db.run(Labels.table.schema.create).onComplete {
      case Success(_) => println("init database success.")
      case Failure(ex) => println(ex.getMessage)
    }
  }

  def insertDataNote = {
    val note = Note(0, "command","""{"content_1": "xxxx", "content_2": "xxxx"}""", "[1]", new java.sql.Date(new java.util.Date().getTime), new java.sql.Date(new java.util.Date().getTime), 1)
    db.run(Notes.table.+=(note)).onComplete {
      case Success(_) => println("insert note success.")
      case Failure(ex) => println(ex.getMessage)
    }
  }

  def insertDataLabel = {
    val label = Label("oracle", "[]", "[1,2]", 1)
    db.run(Labels.table.+=(label)).onComplete {
      case Success(_) => println("insert note success.")
      case Failure(ex) => println(ex.getMessage)
    }
  }

  def sleep = {
    while (true) {
      println(1)
      Thread.sleep(1111)
    }
  }
}