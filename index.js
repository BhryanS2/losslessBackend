const token =
  "Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY2NTU4MDA0NywiZXhwIjoxNjY1NjY2NDQ3fQ.0RIt4JikFu3KIHos2BZCyhcc3bJTy1VoDJl2lTvDjUI";
const regex = /\s+/;
const [Bearer, jwt] = token.split(regex);

console.log(Bearer, jwt);
console.log(token.split(/\s/));
