import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";
import { SimplePokemon } from "../../interfaces";
import { PokemonCardComponent } from "./pokemon-card.component";

const mockPokemon: SimplePokemon = {
    id: '1',
    name: 'bulbasaur'
}

describe('PokemonCardComponent', () => {
    let fixture: ComponentFixture<PokemonCardComponent>;
    let component: PokemonCardComponent;
    let compiled: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PokemonCardComponent],
            providers: [provideRouter([])]
        });
        fixture = TestBed.createComponent(PokemonCardComponent);
        fixture.componentRef.setInput('pokemon', mockPokemon);

        compiled = fixture.nativeElement as HTMLElement;
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create component', () => {
        expect(component).toBeTruthy();
    });

    it('should have the SimplePokemon signal inputValue', () => {
        expect(component.pokemon()).toEqual(mockPokemon);
    });

    it('should render the pokemon name and image correctly', () => {
        const image = compiled.querySelector('img')!;
        const nameH2 = compiled.querySelector('h2')!;
        expect(image).toBeDefined();
        expect(nameH2).toBeDefined();

        expect(image.src).toBe(component.pokemonImage());
        expect(nameH2.innerHTML).toBe(component.pokemon().name);
    });

    it('should have the proper ng-reflect-router-link', () => {
        const mainDiv = compiled.querySelectorAll('div')[0];

        const link = mainDiv.getAttribute('ng-reflect-router-link')!;
        expect(link).toBeDefined();
        expect(link).toBe(`/pokemons/,${component.pokemon().name}`);
    });
});