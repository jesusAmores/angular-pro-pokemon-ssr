import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'contact-page',
  standalone: true,
  imports: [],
  templateUrl: './contact-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContactPageComponent implements OnInit { 
  private _title = inject(Title)
  private _meta = inject(Meta)

  ngOnInit(): void {
    this._title.setTitle('Contact Page')
    this._meta.updateTag({ name: 'description', content: 'Este es mi Contact Page' })
    this._meta.updateTag({ name: 'og:title', content: 'Contact Page' })
    this._meta.updateTag({ name: 'keywords', content: 'Hola,Mundo,Fernando,Herrera,Curso,Angular,Pro' })
  }
}
