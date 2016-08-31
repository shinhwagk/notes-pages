package models.database

import slick.driver.H2Driver.api._

object InitDatabase {
  val db = Database.forConfig("default")

//  def main(args: Array[String]): Unit = {
//    createTables
//    //    insertDataLabel
//    sleep
//  }
//
//
//  def createTables = {
//    val setup = DBIO.seq(
//      (Labels._table.schema
//        ++ LabelEdges._table.schema
//        ++ Notes._table.schema
//        ++ NoteCommands._table.schema
//        ++ NoteDocuments._table.schema
//        ++ NoteFiles._table.schema).create,
//      Labels._table += Label(1, "oracle", true),
//      Labels._table += Label(1, "install", true)
//    )
//
//    db.run(setup).onComplete {
//      case Success(_) => println("init database success.")
//      case Failure(ex) => println(ex.getMessage)
//    }
//  }

  //  def insertDataNote = {
  //    val note = Note(0, "command","""{"content_1": "xxxx", "content_2": "xxxx"}""", "[1]", new java.sql.Date(new java.util.Date().getTime), new java.sql.Date(new java.util.Date().getTime), 1)
  //    db.run(Notes._table.+=(note)).onComplete {
  //      case Success(_) => println("insert note success.")
  //      case Failure(ex) => println(ex.getMessage)
  //    }
  //  }
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