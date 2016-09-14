/**
 * Created by goku on 2016/9/13.
 */
export class  Command {
    id: number
    content: {contentOne: string, contentTwo: string}
    relations: number[]

    constructor(id: number, content: {contentOne: string, contentTwo: string}, relations: number[]) {
        this.id = id
        this.content = content
        this.relations = relations
    }
}