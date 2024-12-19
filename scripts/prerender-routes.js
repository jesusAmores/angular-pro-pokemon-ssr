const TOTAL_POKEMONS = 10;
const TOTAL_PAGES = 10;

( async () => {

    const fs = require('fs');
    //const pokemonIds = Array.from( { length: TOTAL_POKEMONS }, ( _, i ) => i + 1 );
    const pagesIds = Array.from( { length: TOTAL_PAGES }, ( _, i ) => i + 1 );

    /* let pokemonsContent = pokemonIds.map(
        id => `/pokemons/${ id }`
    ).join('\n'); */

    let pokemonsContent = pagesIds.map(
        id => `/pokemons/page/${ id }`
    ).join('\n');

    pokemonsContent += '\n';


    const pokemonNameList = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${ TOTAL_POKEMONS }`)
        .then(res => res.json() );
    
    pokemonsContent += pokemonNameList.results.map(
        pokemon => `/pokemons/${ pokemon.name }`
    ).join( '\n' );

    /* let fileContent = pokemonsContent.concat(pagesContent);
    fs.writeFileSync('routes.txt', fileContent); */
    fs.writeFileSync('routes.txt', pokemonsContent);

    console.log('routes.txt generated');

} )();