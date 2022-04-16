import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: 'app-alert',
  templateUrl: './app-alert.component.html',
  styleUrls: ['./app-alert.component.css']
})
export class AlertComponent {

  @Input('error')
  public error: string;

  @Output('close')
  public close: EventEmitter<void> = new EventEmitter();

  onClose() {
    this.close.next();
  }
}
