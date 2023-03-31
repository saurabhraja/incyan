import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaryEntryDetailsPageComponent } from './diary-entry-details-page.component';

describe('DiaryEntryDetailsPageComponent', () => {
  let component: DiaryEntryDetailsPageComponent;
  let fixture: ComponentFixture<DiaryEntryDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiaryEntryDetailsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiaryEntryDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
