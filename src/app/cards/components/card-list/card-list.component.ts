import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit {
  @Input() listName: string;
  @Input() items: string[];
  @Input() alertFn: any;
  constructor() {}

  ngOnInit() {}
}
