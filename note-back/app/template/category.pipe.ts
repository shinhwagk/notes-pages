/**
 * Created by goku on 2016/9/14.
 */
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'notesFilterByCategory'})
export class NotesFilterByCategory implements PipeTransform {
  transform(notes: {category: string}[], category: string) {
    return notes.filter(note=>note.category == category)
  }
}