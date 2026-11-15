import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ContentStore } from './content.store';

@Component({
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  readonly store = inject(ContentStore);
  readonly navigationOpen = signal(false);

  closeNavigation(): void {
    this.navigationOpen.set(false);
  }

  toggleNavigation(): void {
    this.navigationOpen.update((open) => !open);
  }
}
