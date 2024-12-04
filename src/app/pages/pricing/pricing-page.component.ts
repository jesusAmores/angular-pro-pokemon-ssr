import { ChangeDetectionStrategy, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'pricing-page',
  standalone: true,
  imports: [],
  templateUrl: './pricing-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PricingPageComponent implements OnInit { 
  private _title = inject(Title)
  private _meta = inject(Meta)
  private _platform = inject(PLATFORM_ID)

  ngOnInit(): void {
    //isPlatformBrowser(this._platform)
    /* if (!isPlatformServer(this._platform)) {
      document.title = 'Pricing page'
    } */
    //console.log(isPlatformServer(this._platform))
    //console.log(this._platform)
    //document.title = 'Pricing page'
    this._title.setTitle('Pricing Page')
    this._meta.updateTag({ name: 'description', content: 'Este es mi Pricing Page' })
    this._meta.updateTag({ name: 'og:title', content: 'Pricing Page' })
    this._meta.updateTag({ name: 'keywords', content: 'Hola,Mundo,Fernando,Herrera,Curso,Angular,Pro' })
  }
}
