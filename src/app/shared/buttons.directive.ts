import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from "@angular/core";

@Directive({
  selector: '[appButtons]'
})

export class ButtonsDirective{
  @HostBinding('style.backgroundColor') backgroundColor: string = 'blue';
  @HostBinding('style.color') color: string = 'yellow';

  constructor(private render: Renderer2, private ele: ElementRef){
    this.render.setStyle(ele.nativeElement, 'backgroundColor', 'black')
    this.render.setStyle(ele.nativeElement, 'color', 'white')

  }

  @HostListener('mouseenter') mouseenter(eventData: Event) {
    this.backgroundColor = 'black';
    this.color = 'white';
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.backgroundColor = 'transparent';
    this.color = 'black';
  }


  @HostListener('mouseclick') mouseclick(eventData: Event) {
    this.backgroundColor = 'blue';
    this.color = 'yellow';
  }
}
