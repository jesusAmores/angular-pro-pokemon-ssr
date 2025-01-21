import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let compiled: HTMLDivElement;

  @Component({
    selector: 'app-navbar',
    standalone: true
  })
  class NavbarComponentMock {}
  
  beforeEach(async () => {
    //!alternativa: no recomendada por si se requiere hacer 
    //!importaciones, inyecciones de servicios, etc.
    /* TestBed.overrideComponent(AppComponent, {
      set: {
        imports: [NavbarComponentMock],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }
    }); */

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([])]
    })
    .overrideComponent(AppComponent, {
      add: {
        imports: [NavbarComponentMock]
      },
      remove: {
        imports: [NavbarComponent]
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement;
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should render navbar and router-outlet', () => {
    expect(compiled.querySelector('app-navbar')).toBeTruthy();
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
});
