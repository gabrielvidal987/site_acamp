const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Configuração da conexão com o banco de dados

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Vid@l9871',
    database: 'acampestre'
});

// Conectar ao banco de dados
db.connect(err => {
    if (err) throw err;
    console.log('Conectado ao banco de dados!');
});

// Habilitar CORS
app.use(cors());

// Habilitar o middleware para parsing do corpo das requisições
app.use(express.json()); // Mover essa linha para cima

// Endpoint para receber os nomes das atividades
app.get('/api/unidades/:nome_unidade', (req, res) => {
    // Extrai o nome da atividade da URL
    const nome_unidade = req.params.nome_unidade;
    console.log(`Requisição para pegar os pontos da unidade ${nome_unidade}`)
    const sql = `SELECT * FROM unidades WHERE nome = '${nome_unidade}'`
    console.log(`comando sql -> ${sql}`)
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao consultar o banco de dados:', err);
            return res.status(500).json({ erro: 'Erro no servidor' });
        }
        res.json(results[0]);
    });
});

// Endpoint para receber os nomes das atividades
app.get('/api/atividades', (req, res) => {
    console.log(`Requisição para pegar os dados das atividades`)
    const sql = `SELECT * FROM atividades`
    console.log(`comando sql -> ${sql}`)
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao consultar o banco de dados:', err);
            return res.status(500).json({ erro: 'Erro no servidor' });
        }
        res.json(results);
    });
});

// Endpoint para verificar se a senha existe e retornar os dados do usuario daquela senha
app.post('/api/login', (req, res) => {
    //pega o nome e senha que vieram na requisição
    const nome = req.body.nome;
    const senha = req.body.senha;
    console.log(`Requisição para verificar se está correta a senha; nome recebido > ${nome} senha recebida > ${senha}`)
    //cria o comando sql puxando tudo daquela senha informada. caso não exista ele irá retornar vazio e informar que não existe a senha
    const sql = `SELECT * FROM usuario WHERE senha = '${senha}';`
    console.log(`SQL DO PEDIDO: ${sql}`)
    db.query(sql, (err, result) => {
        //caso dê erro irá informar o erro
        if (err) {
            console.error('Erro ao inserir produto no banco de dados:', err);
            return res.status(500).json({ error: 'Erro no servidor' });
        }
        //caso não tenha dados irá retornar de que a senha não existe
        if (result.length === 0) {
            return res.json({ mensagem: 'Senha não encontrada no banco de dados' });
        }
        //tendo dados ele irá retornar a mensagem de senha correta e os dados retornados do banco
        return res.json({
            mensagem: 'Senha correta',
            dados: result[0]  // Retorna os dados do usuário
        });
    });
});

// Endpoint para alterar a pontuação da unidade na prova determinada
app.post('/api/alterascore', (req, res) => {
    //pega o nome e senha que vieram na requisição
    const nome_atividade = req.body.nome_atividade;
    const nome_unidade = req.body.nome_unidade;
    const novo_valor = req.body.novo_valor;
    console.log(`Requisição para alterar a pontuação da atividade ${nome_atividade} na unidade ${nome_unidade}`)
    //cria o comando sql puxando tudo daquela senha informada. caso não exista ele irá retornar vazio e informar que não existe a senha
    const sql = `UPDATE unidades SET ${nome_atividade} = ${novo_valor} WHERE nome = '${nome_unidade}';`
    console.log(`SQL DO PEDIDO: ${sql}`)
    db.query(sql, (err, result) => {
        //caso dê erro irá informar o erro
        if (err) {
            console.error('Erro ao inserir produto no banco de dados:', err);
            return res.status(500).json({ error: 'Erro no servidor' });
        }
        //dando certo ele irá retornar para o fetch a mensagem de "Valor alterado!"
        return res.json({
            mensagem: 'Valor alterado!',
        });
    });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});