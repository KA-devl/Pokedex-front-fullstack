export default class UserService {

static createUser(user){
  console.log(user)
  return fetch (`https://evening-thicket-97418.herokuapp.com/api/signup`, 
  {
  method : 'POST', 
  body: JSON.stringify(user),
  headers: { 
    'Content-Type': 'application/json'   
  }
})
  .then(response => response)
  .then(error => {
    console.log(error)
    return error
})
 
}
}