package models.database

import database.table.Notes

import scala.concurrent.ExecutionContext.Implicits.global
import models.database.Labels.Label
import slick.driver.H2Driver.api._

import scala.util.{Failure, Success}

object InitDatabase {
  val db = Database.forConfig("default")

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

    db.run(Labels._table.result).onComplete {
      case Success(rs) => println("init database success." + rs)
      case Failure(ex) => println(ex.getMessage)
    }
    sleep
  }

  //
  //
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
      println(1)
      Thread.sleep(1111)
    }
  }
}