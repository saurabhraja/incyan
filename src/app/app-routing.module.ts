import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiaryEntriesListPageComponent } from './components/diary-entries-list-page/diary-entries-list-page.component';
import { DiaryEntryDetailsPageComponent } from './components/diary-entry-details-page/diary-entry-details-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'diary-entries-list',
    pathMatch: 'full'
  },
  {
    path: 'diary-entries-list',
    component: DiaryEntriesListPageComponent
  },
  {
    path: 'diary-entry-details',
    redirectTo: 'diary-entry-details/', pathMatch: 'full'
  },
  {
    path: 'diary-entry-details/:id',
    component: DiaryEntryDetailsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
