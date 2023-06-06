const express = require('express') // Importar

const app = express() // Crear el webservice

app.use(express.json());

const users = [];
let _id=0;

app.get('/', function (req, res) {
    res.send('Una API en express')
});

app.get('/users', (request, response) => {
    response.json(users);
});

app.get('/users/:id', (request, response) => {
    const { id } = request.params;

    const user = users.find((u) => u.id === +id);
  
    response.json(user.name);
});

app.post('/users', (request, response) => {
    const {name, phone, id} = request.body;

    if (users.some(u => u.name === name) || users.some(u => u.id === id)) {
      return response.status(400).json({ error: 'User already exists' });
    }else if (name === ''){
      return response.status(400).json({ error: 'No name was provided' });
    }
    _id += 1;
    const newUser = {
      id:_id,
      name,
      phone
    }
    users.push(newUser);
    response.status(201).json(newUser);
})

app.put('/users/:id', (request, response) => {
  const { id } = request.params;
  const { name, phone } = request.body;

  const user = users.find((u) => u.id === +id);
  user.name = name;
  user.phone = phone;

  response.json(user);


})


app.listen(3000, () => console.log('Running at port 3000'));