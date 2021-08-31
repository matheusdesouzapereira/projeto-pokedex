var quantidade = document.getElementById('quantidade');

quantidade.addEventListener('keyup', ()=>{
    pegaPokemons(quantidade.value);
});
pegaPokemons(4);
function pegaPokemons(quantidade){
    
    fetch('https://pokeapi.co/api/v2/pokemon?limit='+quantidade)
.then(response => response.json())
.then(aLLpokemon => {
    
    var pokemons = [];

    aLLpokemon.results.map((val)=>{    
        fetch(val.url)
        .then(response => response.json())
        .then(pokemonSingle => {
            pokemons.push({nome: val.name, imagem:pokemonSingle.sprites.front_default});

            if(pokemons.length == quantidade){
                // Finalizo a requisição
                var pokemonBoxes = document.querySelector('.pokemon-boxes');
                pokemonBoxes.innerHTML = "";
                pokemons.map((val)=>{
                pokemonBoxes.innerHTML+= `
                    
                    <div class="pokemon-box">
                        <div class="imagem-pokemon"><img src="`+val.imagem+`" alt=""></div>
                        <p>`+val.nome+`</p>
                    </div>                
                `;                    
                   
                })
            }
        });
    });
});
}