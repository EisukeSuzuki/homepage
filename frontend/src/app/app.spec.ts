import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    })
      .compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the portfolio navigation', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('nav')?.textContent).toContain('Profile');
  });

  it('should render a portrait hero and navigation cards on the main menu', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await TestBed.inject(Router).navigateByUrl('/');
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.home-portrait img')?.getAttribute('src')).toContain('main-menu.png');
    expect(compiled.querySelectorAll('.home-menu-card')).toHaveLength(5);
    expect(compiled.querySelector('.partner-rail')?.textContent).toContain('STRYKE');
  });

  it('should show a dedicated education layout on the profile page', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await TestBed.inject(Router).navigateByUrl('/profile');
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.profile-photo img')?.getAttribute('src')).toContain('profile-portrait.png');
    expect(compiled.querySelector('.education-list')?.textContent).toContain('HARVARD UNIVERSITY');
    expect(compiled.querySelector('.education-list')?.textContent).toContain('PURDUE UNIVERSITY');
  });
});
