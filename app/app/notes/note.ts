export class Note<T> {
    constructor(id: number, content: T, category: string) {
        this.id = id
        this.content = content
        this.category = category
    }

    id: number;
    content: T;
    category: string;

}