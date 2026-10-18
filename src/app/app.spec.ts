import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  it('crea el contenedor de rutas', () => {
    TestBed.configureTestingModule({ imports: [App] });
    expect(TestBed.createComponent(App).componentInstance).toBeTruthy();
  });
});
