/**
 * Created by goku on 2016/9/13.
 */
export class Titie {
    id: number
    content: {title: string}
    relations: number[]

    constructor(id: number, content: {title: string}, relations: number[]) {
        this.id = id
        this.content = content
        this.relations = relations
    }
}