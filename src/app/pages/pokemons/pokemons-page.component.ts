import { CommonModule } from '@angular/common';
import { Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map, tap } from 'rxjs';
import { PokemonListComponent } from '../../pokemons/components/pokemon-list/pokemon-list.component';
import { SimplePokemon } from '../../pokemons/interfaces';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { PokemonListSkeletonComponent } from './ui/pokemon-list-skeleton/pokemon-list-skeleton.component';

@Component({
  selector: 'pokemons-page',
  standalone: true,
  imports: [
    PokemonListComponent, 
    PokemonListSkeletonComponent,
    CommonModule,
    RouterLink
  ],
  templateUrl: './pokemons-page.component.html'
})
export default class PokemonsPageComponent /*implements OnInit , OnDestroy */ { 

  private pokemonsService = inject(PokemonsService);
  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);

  public pokemons = signal<SimplePokemon[]>([]);

  public currentPage = toSignal<number>(
    this.route.params.pipe(
      map(params => params['page'] ?? '1'),
      map(page => ( isNaN(Number(page)) ? 1 : Number(page) )),
      map((page) => Math.max(1, page))
    ));

  /* public isLoading = signal(true);
  private _appRef = inject(ApplicationRef);

  private _$appState = this._appRef.isStable.subscribe((isStable) => console.log({isStable})); */


  /**
   * Con SSR ya nos crea los componentes del lado del servidor,
   * por lo que estas cargas típicas y flags de loading no tendrian
   * sentido aplicarlos en OnInit, ni en template
   */

  /**
   * Con ApplicationRef podemos saber el estado de la app, si está estable
   * o si está renderizando componentes del server side
   */
  /* ngOnInit() {
    this.loadPokemons();
    setTimeout(() => {
      this.isLoading.set(false);
    }, 5000);
  } */

  /* ngOnDestroy() {
    this._$appState.unsubscribe();
  } */

  public loadOnPageChanged = effect(() => {
    this.loadPokemons(this.currentPage());
  }, {
    allowSignalWrites: true,
  })

  public loadPokemons(page = 0) {
    const pageToLoad = page;

    this.pokemonsService.loadPage(pageToLoad).pipe(
      //Nota: no se efectúa una navegación, solo se cambia
      //los queryParams para efectuar la paginación, por ello
      //no se especifica en el array ['pokemons']
      /* tap(() => this.router.navigate([], { 
        queryParams: { page: pageToLoad } 
      })), */
      tap(() => this.title.setTitle(
        `Pokemon SSR - Page ${pageToLoad}`
      )),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((pokemons) => {
      this.pokemons.set(pokemons);
    });
  }

}
