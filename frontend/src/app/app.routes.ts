import { Routes } from '@angular/router';
import { PageComponent } from './page.component';

export const routes: Routes = [
  { path: '', component: PageComponent, data: { pageId: 'main' } },
  { path: 'profile', component: PageComponent, data: { pageId: 'profile' } },
  { path: 'mission-vision', component: PageComponent, data: { pageId: 'mission-vision' } },
  { path: 'achievements', component: PageComponent, data: { pageId: 'achievements' } },
  { path: 'contract-company', component: PageComponent, data: { pageId: 'contract-company' } },
  { path: 'hobby', component: PageComponent, data: { pageId: 'hobby' } },
  { path: '**', redirectTo: '' },
];
