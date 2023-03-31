import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DiaryEntry } from '../models/diary-entry.model';

@Injectable({
  providedIn: 'root'
})
export class DiaryEntryService {
  private diaryEntriesList: Array<DiaryEntry>;
  private IDCounter: number;

  constructor() {
    this.IDCounter = 2;
    this.diaryEntriesList = [
      {
        id: 1,
        title: 'Diary Entry 1',
        creationDate: '03/25/2023',
        content: 'This is my first diary entry'
      },
      {
        id: 2,
        title: 'Diary Entry 2',
        creationDate: '04/25/2023',
        content: 'This is my second diary entry'
      },
      {
        id: 3,
        title: 'Diary Entry 3',
        creationDate: '04/21/2023',
        content: 'This is my third diary entry'
      },
      {
        id: 4,
        title: 'Diary Entry 4',
        creationDate: '09/20/2023',
        content: 'This is my fourth diary entry'
      },
      {
        id: 5,
        title: 'Diary Entry 5',
        creationDate: '11/10/2023',
        content: 'This is my fifth diary entry'
      }
    ]
  }

  // Fetch diary entries list
  getDiaryEntriesList(): Observable<Array<DiaryEntry>> {
    return of(this.diaryEntriesList);
  }

  // Fetch diary entry details
  getDiaryEntryDetails(diaryEntryId: number): Observable<DiaryEntry> {
    let diaryEntry: any = this.diaryEntriesList.find(item => item.id == diaryEntryId);

    return of(diaryEntry);
  }

  // Add new diary entry
  addNewDiaryEntry(diaryEntry: DiaryEntry): Observable<Array<DiaryEntry>> {
    let diaryEntriesList:Array<DiaryEntry> = JSON.parse(JSON.stringify(this.diaryEntriesList));

    let diaryEntryWithMaxId = diaryEntriesList.reduce((prevObj, currObj) => (prevObj.id > currObj.id) ? prevObj : currObj);
    let diaryEntryMaxId = diaryEntryWithMaxId.id;

    let dateString = new Date().toLocaleDateString();
    console.log(dateString);

    diaryEntry['id'] = diaryEntryMaxId + 1;
    diaryEntry['creationDate'] = dateString;
    this.diaryEntriesList.push(diaryEntry);

    return of(this.diaryEntriesList);
  }

  // Delete diary entry
  deleteDiaryEntry(diaryEntryId: number): Observable<Array<DiaryEntry>> {
    let diaryEntriesList:Array<DiaryEntry> = JSON.parse(JSON.stringify(this.diaryEntriesList));
    diaryEntriesList = diaryEntriesList.filter(item => item.id !== diaryEntryId);
    
    this.diaryEntriesList = diaryEntriesList;

    return of(this.diaryEntriesList);
  }
}
