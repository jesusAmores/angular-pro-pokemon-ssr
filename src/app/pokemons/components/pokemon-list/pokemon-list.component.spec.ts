import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";
import { SimplePokemon } from "../../interfaces";
import { PokemonListComponent } from "./pokemon-list.component";

const mockPokemos: SimplePokemon[] = [
    {
        id: '1', name: 'bulbasaur'
    },
    {
        id: '2', name: 'ivisaur'
    }
]

describe('PokemonListComponent', () => {
    let fixture: ComponentFixture<PokemonListComponent>;
    let component: PokemonListComponent;
    let compiled: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PokemonListComponent],
            providers: [provideRouter([])]
        });
        fixture = TestBed.createComponent(PokemonListComponent);
        compiled = fixture.nativeElement as HTMLElement;
        component = fixture.componentInstance;
    });

    it('should create component', () => {
        fixture.componentRef.setInput('pokemons', []);
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should render the pokemon list with two pokemon-card', () => {
        fixture.componentRef.setInput('pokemons', mockPokemos);
        fixture.detectChanges();
        
        expect(compiled.querySelectorAll('pokemon-card').length).toBe(mockPokemos.length);
    });

    it('should render "No hay pokemons"', () => {
        fixture.componentRef.setInput('pokemons', []);
        fixture.detectChanges();
        expect(compiled.querySelector('div')?.textContent).toContain('No hay pokemons');
    });
});