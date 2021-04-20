import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rocket',
  templateUrl: './rocket.component.html',
  styleUrls: ['./rocket.component.scss']
})
export class RocketComponent implements OnInit {

  @Input() type = 'white';

  constructor() { }

  ngOnInit(): void {
  }

}
