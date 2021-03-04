import { Component,OnInit, ViewEncapsulation } from '@angular/core';


declare const AddListenerForSearchInput:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation:ViewEncapsulation.None //https://angular.io/api/core/ViewEncapsulation#description
})

export class AppComponent implements OnInit {

  ngOnInit():void{
    AddListenerForSearchInput();
  }



  title = 'ang-user-gallery';
}
