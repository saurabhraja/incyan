import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaryEntriesListPageComponent } from './diary-entries-list-page.component';

describe('DiaryEntriesListPageComponent', () => {
  let component: DiaryEntriesListPageComponent;
  let fixture: ComponentFixture<DiaryEntriesListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiaryEntriesListPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiaryEntriesListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
