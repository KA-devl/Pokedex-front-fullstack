import AuthenticationService from "./authentication-service"


export default class PokemonService{

//GET REQUEST
static getPokemons(){
  return fetch('https://evening-thicket-97418.herokuapp.com/api/pokemons', {
    headers: {
      Authorization : `Bearer ${AuthenticationService.tokenValue}`
    }
  } )
  .then(reponse => reponse.json())
  .catch(error => this.handleError(error))
}


static getPokemon(id){
  return fetch(`https://evening-thicket-97418.herokuapp.com/api/pokemons/${id}`, {
    headers: {
      Authorization : `Bearer ${AuthenticationService.tokenValue}`
    }
  }
  )
  .then(reponse => reponse.json())
  .then(data => this.isEmpty(data) ? null : data)
  .catch(error => this.handleError(error))
}

static isEmpty(data){
  return Object.keys(data).length === 0
}

//UPDATE POKEMON

static updatePokemon(pokemon){
  delete pokemon.created
  return fetch(`https://evening-thicket-97418.herokuapp.com/api/pokemons/${pokemon.id}`, {method : 'PUT', 
  body: JSON.stringify(pokemon),
  headers: { 
    'Content-Type': 'application/json',
    Authorization : `Bearer ${AuthenticationService.tokenValue}`
  }
})
.then(reponse => reponse.json())
.catch(error => this.handleError(error))
}

//DELETE POKEMON REQUEST

static deletePokemon(pokemon){
  return fetch(`https://evening-thicket-97418.herokuapp.com/api/pokemons/${pokemon.id}`,
  { method: 'DELETE',
    headers: {
      Authorization : `Bearer ${AuthenticationService.tokenValue}`
    }
  })
  .then(reponse => reponse.json())
  .catch(error => this.handleError(error))
}

//POST UN NOUVEAU POKEMON

 static postPokemon(pokemon){
 delete pokemon.created
 delete pokemon.id
 console.log(pokemon)
  return fetch(`https://evening-thicket-97418.herokuapp.com/api/pokemons`, 
  {
  method : 'POST', 
  body: JSON.stringify(pokemon),
  headers: { 
    'Content-Type': 'application/json',
    Authorization : `Bearer ${AuthenticationService.tokenValue}`    
    
  }
  
})
  .then(response => response.json())
  .then(error => this.handleError(error))
}

//Chercher un pokemon specifique
static searchPokemon(term){
  return fetch(`https://evening-thicket-97418.herokuapp.com/api/pokemons?name=${term}`,
   {
    headers: {
      Authorization : `Bearer ${AuthenticationService.tokenValue}`
    }
  })
  .then(reponse => reponse.json())
  .catch(error => this.handleError(error))
}

//Anticiper les erreurs HTTP
static handleError(error){
  console.error(error)
}




}