import { CardModel } from './../../shared/card.model';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() items: CardModel[] = [];
  @Input() filteredProperty: string;
  @Output() searchCompleted = new EventEmitter<CardModel[]>();
  @Output() isSearching = new EventEmitter();

  private behavSubject = new BehaviorSubject<string>('');
  constructor() {}
  ngOnInit() {}

  ngAfterViewInit() {
    this.behavSubject
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((searchText: string) => {
        if (!this.items) {
          this.searchCompleted.emit([]);
          return;
        }
        if (!searchText) {
          this.searchCompleted.emit(this.items);
          return;
        }
        const filteredCards = this.items.filter((item) => {
          return item[this.filteredProperty]
            .toLowerCase()
            .includes(searchText.toLowerCase());
        });
        this.searchCompleted.emit(filteredCards);
      });
  }
  ngOnDestroy(): void {
    this.behavSubject.unsubscribe();
  }

  handleSearch(event: { target: { value: string } }) {
    const searchText: string = event.target.value;
    this.isSearching.emit();
    this.behavSubject.next(searchText);
  }
}
