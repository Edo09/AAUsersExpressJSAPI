const express = require('express')
const serve = express()

serve.use(express.json());

const port = process.env.PORT || 3000;

let users = [
  { id: 1, nombre: "Jose" },
  { id: 2, nombre: "Josefina" },
  { id: 3, nombre: "Joselito" },
  { id: 4, nombre: "Josefa" }
]

// npm init
// npm i express
// npm i -g nodemon
// npm i -D nodemon
// npm install express

// http://localhost:3000/


// Rutas para Usuarios
serve.get('/', (req, res) => res.send("Hello World!"));

serve.get('/users', function (request, response) {
  response.json(users);
});

serve.get('/users/:id', function (request, response) {
  const { id } = request.params;
  const user = users.find((u) => u.id === parseInt(id));
  response.json(user);
});

serve.post('/users', function (request, response) {
  const { id, nombre } = request.body;

  if (!id || !nombre) {
      return response.status(400).json({ error: 'Campos vacios' });
    }

  if (users.some(u => u.nombre === nombre) || users.some(u => u.id === id)) {
    return response.status(400).json({ error: 'Usuario ya existe' });
  }else if (nombre === ''){
    return response.status(400).json({ error: 'Campo nombre vacio' });
  }else if (Object.keys(request.body).length === 0) {
    return response.status(400).json({ error: 'Sin Data' });
  }


  users.push({ id, nombre });
  response.json({ id, nombre })
});

serve.put('/users/:id', function (request, response) {
    const { id } = request.params;
    const { nombre } = request.body;


    if (!id || !nombre) {
        return response.status(400).json({ error: 'Campos vacios' });
      }else if (Object.keys(request.body).length === 0) {
        return response.status(400).json({ error: 'Sin Data' });
      }
  
    const user = users.find((u) => u.id === +id);
    if (!user) {
        return response.status(404).json({ error: 'ERROR 404: NOT FOUND!!!!!' });
    }
    user.nombre = nombre;

  response.send('<h1>Hello User '+nombre+'</h1>')
});

serve.delete('/users/:id', function (request, response) {
    const { id } = request.params;
    const user = users.find((u) => u.id === +id);
    if (!user) {
        return response.status(404).json({ error: 'ERROR 404: NOT FOUND!!!!!' });
    }
    
    const index = users.findIndex((u) => u.id === +id);
    users.splice(index, 1);


  response.send('<h1>The user '+user.nombre+' Has been deleted</h1>')
});


serve.listen(port, () => {
  console.log(`Server Running at 3000`);
})