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

// Endpoint para verificar os dados de login
app.get('/api/ef/', (req, res) => {
    const nome = req.query.nome;
    const senha = req.query.senha;
    console.log(`Requisição para verificar se está correta a senha para o ${nome}`)
    db.query(`SELECT * FROM usuario WHERE senha = '${senha}'`, (err, results) => {
        if (err) {
            console.error('Erro ao consultar o banco de dados:', err);
            return res.status(500).json({ erro: 'Erro no servidor' });
        }
        // Verifica se existe algum resultado
        if (results.length === 0) {
            return res.status(404).json({ erro: 'Usuario não encontrado no banco de dados' });
        }
        return res.json({
            sucesso: true,
            mensagem: 'Senha correta',
            dados: results[0]  // Retorna os dados do usuário
        });
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

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});