import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [
  ]
})
export class PaisInputComponent implements OnInit {

  @Output() onEnter:EventEmitter<string> = new EventEmitter();
  // sin formularios reativos
  @Output() onDebounce:EventEmitter<string> = new EventEmitter();

  @Input() placeholder:string = '';

  debouncer:Subject<string>=new Subject();

  termino:string = '';

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.debouncer
      .pipe( debounceTime(300) )
      .subscribe( valor => {
        //console.log('debouncer: ', valor);
        this.onDebounce.emit( valor );
      });

    
  }

  buscar(): void {
    this.onEnter.emit( this.termino );
  }

  teclaPresionada( ) {
  // (input)="teclaPresionada( $event )"
  // teclaPresionada( event:any ) {
  //   const valor = event.target.value;
  //   console.log(valor);  
    console.log(this.termino);
    this.debouncer.next( this.termino );
  }

}
