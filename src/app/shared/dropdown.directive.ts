import { Directive, ElementRef, Output, EventEmitter, HostListener, Renderer2, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

@HostBinding('class.open') isOpen = false;
  // @Output('dropdownItemOnSelect')
  // public onSelect = new EventEmitter<void>();

  constructor(private ele: ElementRef, private render: Renderer2) { }

  // public select() {
    //   this.onSelect.emit();
    // }
    // @HostListener('click') click(eventData: Event) {
    //   this.isOpen = !this.isOpen;
    // }

    @HostListener('document:click', ['$event']) click(eventData: Event) {
      this.isOpen = this.ele.nativeElement.contains(eventData.target)? !this.isOpen : false;
    }

}
