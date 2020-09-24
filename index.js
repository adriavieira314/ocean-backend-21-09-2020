const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');

//Criando um bloco assíncrono e já executando ele
(async () => {

    console.info('Conectando ao banco de dados MongoDB!');
    //Conexão com o banco de dados
    const connectionString = 'mongodb+srv://admin:adria1997@ocean.ehdbu.mongodb.net/ocean_mongodb?retryWrites=true&w=majority';
    const client = await mongodb.MongoClient.connect(connectionString, {
        useUnifiedTopology: true
    })

    console.info('Banco de dados conectado com sucesso!');

    //Executando o express
    const app = express();
    const port = process.env.PORT || 3000;

    //Configurando o Body Parser
    //Ele permite ter o body no req.
    //Dessa forma consigo ler o JSON do body da requisição
    const jsonParser = bodyParser.json();
    app.use(jsonParser);

    const db = await client.db('ocean_mongodb');
    //Variável mensagens está recebendo a collection do banco de dados
    const mensagens = await db.collection('mensagens');
    
    //Endpoints de envio de mensagens
    //CRUD - Create, Read(Read All e Read Single), Update and Delete
    app.get('/', (req, res) => {
        res.send('Hello World com MongoDB.');
    });

    //Read All
    app.get('/mensagens', async (req, res) => {
        const find = await mensagens.find({}).toArray();
        res.json(find);    
    });

    //Create
    app.post('/mensagens', async (req, res) => {
        //Obtendo a mensagem do corpo da requisição
        const mensagem = req.body;
        //OBS: MongoDB adiciona o ID sozinho

        //Resultado esta recebendo a chamada da collection que esta inserindo uma nova mensagem
        const resultado = await mensagens.insertOne(mensagem);
        //ops[0] é onde está o objeto inserido
        const objetoInserido = resultado.ops[0];

        //Devo colocar esse res para que o insomnia pare de rodar
        res.json(objetoInserido);
    });

    //Read Single
    app.get('/mensagens/:id', async (req, res) => {
        //Acessando o id
        const id = req.params.id;
        //Identificando qual é a mensagem pelo o id
        const mensagem = await mensagens.findOne({ _id: mongodb.ObjectId(id) });

        res.json(mensagem);
    });

    //Update
    app.put('/mensagens/:id', async (req, res) => {
        // Acessando o paramentro id
        const id = req.params.id;
        //Capturando a nova mensagem do body da requisição
        const novoMensagem = req.body;
        //Capturando a mensagemAtual do objeto identificado pelo id
        const mensagemAtual = await mensagens.findOne({ _id: mongodb.ObjectId(id) });
        //O campo texto de mensagemAtual vai receber o texto da novaMensagem enviada pelo body
        mensagemAtual.texto = novoMensagem.texto;
        //Atualizando a mensagem identificada pelo ID na collection mensagens diretamente
        //com o novo texto de mensagemAtual
        await mensagens.updateOne({ _id: mongodb.ObjectId(id) }, { $set: mensagemAtual });

        res.send('Atualizado com sucesso!');
    });

    //Delete
    app.delete('/mensagens/:id', async (req, res) => {
        // Acessando o paramentro id
        const id = req.params.id;
        //Deletando a mensagem que foi identificada na collection pelo seu id
        await mensagens.deleteOne({ _id: mongodb.ObjectId(id) });

        res.send(`Mensagem de id ${id} deletada com sucesso!`);
    });

    //Ouvindo a porta e recebendo suas requisições
    app.listen(port, () => {
        console.log(`Listening on port http://localhost:${port}`);
    })

})();
//Finalizando o bloco e ja executando ele