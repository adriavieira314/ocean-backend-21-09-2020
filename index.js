const express = require('express');
const bodyParser = require('body-parser');

//Executando o express
const app = express();
const port = process.env.PORT || 3000;

//Configurando o Body Parser
//Ele permite ter o body no req.
//Dessa forma consigo ler o JSON do body da requisição
const jsonParser = bodyParser.json();
app.use(jsonParser);

//Endpoints de envio de mensagens
//CRUD - Create, Read(Read All e Read Single), Update and Delete
const mensagens = [
    {
        id: 0,
        texto: 'Cachorro quente'

    },
    {
        id: 1,
        texto: 'Sushi'
    }  
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
    //Adquiro o objeto do corpo
    const mensagem = req.body;
    //Capturando o tamanho do objeto mensagens
    const id = mensagens.length;
    //adicionando o campo id na nova mensagem
    mensagem.id = id;
    //Insiro a mensagem na lista
    mensagens.push(mensagem);

    res.send(`A sua mensagem ${mensagem.texto} foi adicionada. ID: ${id}`);
});

//Read Single
app.get('/mensagens/:id', (req, res) => {
    //Acessando o id
    const id = req.params.id;
    //Identificando qual é a mensagem pelo o id
    const mensagem = mensagens[id];

    res.json(`${mensagem.texto}`);
});

//Update
app.put('/mensagens/:id', (req, res) => {
    // Acessando o paramentro id
    const id = req.params.id;
    //Capturando a nova mensagem do body da requisição
    const novoTexto = req.body.texto;
    //Atualizando a nova mensagem ao objeto especificado pelo id
    mensagens[id].texto = novoTexto;

    res.send(`Mensagem com id ${id} foi atualizada. ${mensagens[id].texto}`);
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