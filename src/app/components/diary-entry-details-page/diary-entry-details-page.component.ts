import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DiaryEntryService } from 'src/app/services/diary-entry.service';

@Component({
  selector: 'app-diary-entry-details-page',
  templateUrl: './diary-entry-details-page.component.html',
  styleUrls: ['./diary-entry-details-page.component.css']
})
export class DiaryEntryDetailsPageComponent {
  diaryEntryId: number;
  diaryEntryForm: FormGroup;

  getDiaryEntryDetailsSubscription: Subscription;
  addNewDiaryEntryDetailsSubscription: Subscription;

  constructor(private diaryEntryService: DiaryEntryService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.diaryEntryId = 0;

    this.diaryEntryForm = this.formBuilder.group({
      title: new FormControl(null,[Validators.required]),
      creationDate: new FormControl(null),
      content: new FormControl(null,[Validators.required]),
    });

    this.getDiaryEntryDetailsSubscription = Subscription.EMPTY;
    this.addNewDiaryEntryDetailsSubscription = Subscription.EMPTY;
  }

  ngOnInit(): void {
    this.diaryEntryId = this.activatedRoute.snapshot.params['id'];
    if(this.diaryEntryId) {
      this.getDiaryEntryDetails(this.diaryEntryId);
    }
    this.onDiaryEntryFormChanges();
  }
  ngOnDestroy(): void {
    if(this.getDiaryEntryDetailsSubscription) {
      this.getDiaryEntryDetailsSubscription.unsubscribe();
    }
    if(this.addNewDiaryEntryDetailsSubscription) {
      this.addNewDiaryEntryDetailsSubscription.unsubscribe();
    }
  }
  private getDiaryEntryDetails(diaryEntryId: number): void {
    this.getDiaryEntryDetailsSubscription = this.diaryEntryService.getDiaryEntryDetails(diaryEntryId)
        .subscribe((data) => {
          let diaryEntryData = JSON.parse(JSON.stringify(data));
          
          // Prefill the form with shift details
          for(let formControl in this.diaryEntryForm.controls) {
            this.diaryEntryForm.get(formControl)?.setValue(diaryEntryData[formControl]);
          }
        });
  }
  private onDiaryEntryFormChanges(): void {
    this.diaryEntryForm.get('type')?.valueChanges
      // .pipe(debounceTime(2000),distinctUntilChanged())
      .subscribe(formValue => {
      });
  }
  onSubmit(): void {
    let diaryEntryFormData = JSON.parse(JSON.stringify(this.diaryEntryForm.value));
    
    this.addNewDiaryEntryDetailsSubscription = this.diaryEntryService.addNewDiaryEntry(diaryEntryFormData)
      .subscribe(data => {
        this.router.navigate(['./diary-entries-list']);
      });
  }
  onCancel(): void {
    this.router.navigate(['./diary-entries-list']);
  }
}
