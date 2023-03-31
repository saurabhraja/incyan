import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { DiaryEntry } from 'src/app/models/diary-entry.model';
import { DiaryEntryService } from 'src/app/services/diary-entry.service';

@Component({
  selector: 'app-diary-entries-list-page',
  templateUrl: './diary-entries-list-page.component.html',
  styleUrls: ['./diary-entries-list-page.component.css']
})
export class DiaryEntriesListPageComponent implements OnInit, OnDestroy {
  diaryEntriesList: DiaryEntry[];
  getDiaryEntriesListSubscription: Subscription;
  addNewDiaryEntrySubscription: Subscription;
  deleteDiaryEntrySubscription: Subscription;

  @ViewChild('deListTable') deListTable: Table | undefined;

  constructor(
    private diaryEntryService: DiaryEntryService,
    private router: Router
  ) {
    this.diaryEntriesList = [];
    this.getDiaryEntriesListSubscription = Subscription.EMPTY;
    this.addNewDiaryEntrySubscription = Subscription.EMPTY;
    this.deleteDiaryEntrySubscription = Subscription.EMPTY;
  }

  ngOnInit(): void {
    this.getDiaryEntriesListSubscription = this.diaryEntryService.getDiaryEntriesList()
      .subscribe(data => {
        this.diaryEntriesList = data;
        console.log(this.diaryEntriesList);
      });
  }
  ngOnDestroy(): void {
    if(this.getDiaryEntriesListSubscription) {
      this.getDiaryEntriesListSubscription.unsubscribe();
    }
    if(this.addNewDiaryEntrySubscription) {
      this.addNewDiaryEntrySubscription.unsubscribe();
    }
    if(this.deleteDiaryEntrySubscription) {
      this.deleteDiaryEntrySubscription.unsubscribe();
    }
  }
  applyFilterGlobal($event: any, stringVal: any): void {
    this.deListTable!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  onAddNewDiaryEntryClick(): void {
    this.router.navigate(['./diary-entry-details'])
  }
  onViewDiaryEntryDetailsClick(diaryEntryId: number): void {
    this.router.navigate(['./diary-entry-details',diaryEntryId]);
  }
  onDeleteDiaryEntryClick(diaryEntryId: number): void {
    this.addNewDiaryEntrySubscription = this.diaryEntryService.deleteDiaryEntry(diaryEntryId)
      .subscribe(data => {
        this.diaryEntriesList = data;
      });
  }
}
