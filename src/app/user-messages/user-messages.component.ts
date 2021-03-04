import { Component, OnInit,ViewEncapsulation } from '@angular/core';

declare const clickSideBarToggler:any;
declare const addMessage:any;

@Component({
  selector: 'app-user-messages',
  templateUrl: './user-messages.component.html',
  styleUrls: ['./user-messages.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class UserMessagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    clickSideBarToggler();
    addMessage();
  }

}
