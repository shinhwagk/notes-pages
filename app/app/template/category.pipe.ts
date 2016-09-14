/**
 * Created by goku on 2016/9/14.
 */
import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 |  exponentialStrength:10}}
 *   formats to: 1024
 */
@Pipe({name: 'categoryfilter'})
export class CategoryFilterPipe implements PipeTransform {
    transform(notes, category: string) {
        let newNotes = notes.filter(note=>note.category == category)
        return newNotes
    }
}