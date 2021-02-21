import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'formidable-button',
    templateUrl: './button.component.html',
    styles: [],
})
export class ButtonComponent {
    @Input()
    text = 'Submit';
    @Input()
    disabled = false;
    @Input()
    color: 'primary' | 'accent' | 'warn' | 'link' = 'primary';
    @Input()
    type: 'button' | 'submit' | 'reset' = 'button';
    @Output()
    buttonClick: EventEmitter<Event> = new EventEmitter<Event>();
}
