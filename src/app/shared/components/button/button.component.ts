import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'formidable-button',
    templateUrl: './button.component.html',
})
export class ButtonComponent {
    @Input()
    text = 'Submit';
    @Input()
    matIcon: string;
    @Input()
    loading = false;
    @Input()
    disabled = false;
    @Input()
    routerLink: string;
    @Input()
    color: 'primary' | 'accent' | 'warn' | 'link' = 'primary';
    @Input()
    type: 'button' | 'submit' | 'reset' = 'button';
    @Output()
    action: EventEmitter<Event> = new EventEmitter<Event>();
}
