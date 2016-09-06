package test

/**
  * Created by zhangxu on 2016/9/6.
  */
object ABC extends App {
  val b = List((1, 2), (1, 3), (1, 4), (2, 4), (3, 4))
  val c: List[List[Int]] = b.groupBy(_._2).map { case (k, v) => (k, v.map(_._1)) }.map(_._2).toList
  val e = c.flatMap { labelIds =>
    labelIds match {
      case List(id) => List((id, Nil))
      case _ => labelIds.map(id => (id, labelIds.filter(_ != id)))
    }
  }
  println(c)
  println(e)

}
