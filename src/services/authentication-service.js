
export default class AuthenticationService {
  
isAuthenticated = false;
tokenValue = '';


static fetchToken(username, password){
  return fetch('https://evening-thicket-97418.herokuapp.com/api/login', {
    method: 'POST',
    body: JSON.stringify({username: username, password: password}),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((res) =>res.json())
  .then ((res) => {
    this.tokenValue = res.token
    this.isAuthenticated = true
    return res.token
  })
 
}

}