const express = require('express');
const bodyParser = require('body-parser');

//Executando o express
const app = express();
const port = 3000;

//Configurando o Body Parser
//Ele permite ter o body no req.
//Dessa forma consigo ler o JSON do body da requisição
const jsonParser = bodyParser.json();
app.use(jsonParser);

//Endpoints de envio de mensagens
//CRUD - Create, Read(Read All e Read Single), Update and Delete
const mensagens = [
    'Sou uma mensagem',
    'Sou outra mensagem'
];

app.get('/', (req, res) => {
    res.send('Hello, Adria');
});

//Read All
app.get('/mensagens', (req, res) => {
    res.json(mensagens);    
});

//Create
app.post('/mensagens', (req, res) => {
    //Adquiro a mensagem do corpo da requisição
    const mensagem = req.body.mensagem;
    //Insiro a mensagem na lista
    mensagens.push(mensagem);
    //Identificando o id da mensagem
    const id = mensagens.length;

    res.send(`A sua mensagem ${mensagem} foi adicionada. ID: ${id}`);
});

//Read Single
app.get('/mensagens/:id', (req, res) => {
    //Acessando o id
    const id = req.params.id;
    //Identificando qual é a mensagem pelo o id
    const mensagem = mensagens[id];

    res.json(`${mensagem}: ${id}`);
});

//Update
app.put('/mensagens/:id', (req, res) => {
    // Acessando o paramentro id
    const id = req.params.id;
    //Identificando a mensagem no array pelo o id e atualizando a mensagem
    mensagens[id] = req.body.mensagem;

    res.send(`Mensagem com id ${id} foi atualizada. ${mensagens[id]}`);
});

//Delete
app.delete('/mensagens/:id', (req, res) => {
    // Acessando o paramentro id
    const id = req.params.id;
    //Deltando a mensagem com o id selecionado
    delete mensagens[id];

    res.send(`Mensagem de id ${id} apagada`);
});

//Ouvindo a porta e recebendo suas requisições
app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
})