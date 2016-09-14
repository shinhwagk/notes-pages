/**
 * Created by goku on 2016/9/13.
 */
import {Component, Input} from "@angular/core";
import {Command} from "./command";

@Component({
    selector: 'nb-app-note-template-command',
    templateUrl: `app/template/command.component.html`
})

export class CommandTemplateComponent {
    @Input() notes: Command[] = []
    @Input() title: string
}