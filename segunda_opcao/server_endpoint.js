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
app.get('/api/unidades', (req, res) => {
    // Extrai o nome da atividade da URL
    console.log(`\n\nRequisição para pegar os dados gerais de atividades e pontos`)
    const sql = `SELECT * FROM atividades_unidades;`
    console.log(`comando sql -> ${sql}`)
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao consultar o banco de dados:', err);
            return res.status(500).json({ erro: 'Erro no servidor' });
        }
        res.json(results);
    });
});

// Endpoint para receber os nomes das atividades
app.get('/api/atividades', (req, res) => {
    console.log(`\n\nRequisição para pegar os dados das atividades`)
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
    console.log(`\n\nRequisição para verificar se está correta a senha; nome recebido > ${nome} senha recebida > ${senha}`)
    //cria o comando sql puxando tudo daquela senha informada. caso não exista ele irá retornar vazio e informar que não existe a senha
    const sql = `SELECT * FROM usuario WHERE senha = '${senha}';`
    console.log(`comando sql: ${sql}`)
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

// Função que itera sobre a lista de unidades de forma assincrona para poder atualizar o valor total de cada uma. é chamada pelo endpoint atualizapontos
async function processaUnidades(lista_unidades) {
    for (let unidade of lista_unidades) {
        // Aguardamos a resolução da Promise retornada por atualiza_valor_total
        await atualiza_valor_total(unidade);
    }
}

// Endpoint para chamar a atualização de pontos totais de cada unidade
app.get('/api/atualizapontos', (req, res) => {
    console.log(`\n\nRequisição para atualização de pontos totais de cada unidade`)
    const lista_unidades = ['panda','agua_real','raposa','pantera','falcao','tigre','urso','lobo'];
    processaUnidades(lista_unidades)
});

// Função que atualiza a pontuação total
async function atualiza_valor_total(nome_unidade) {
    console.log(`\n\nrequisição para pegar lista de pontos do ${nome_unidade}`);
    const sql = `SELECT ${nome_unidade} FROM atividades_unidades WHERE nome_atividade != 'Pontuação total' AND nome_atividade != 'caminho_foto_unidade';`;
    console.log(`comando sql: ${sql}`);
    // Usar Promise para envolver o callback da consulta SQL
    const resultado = await new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if (err) {
                return reject('Erro ao consultar dados: ' + err);
            }
            resolve(result);  // Resolver a Promise com o resultado da consulta
        });
    });
    // Calcula a pontuação total
    let pontuacao_total = 0;
    resultado.forEach(row => {
        pontuacao_total += parseInt(row[nome_unidade]);
    });

    // Atualiza a pontuação total no banco
    console.log(`\n\nRequisição para atualizar pontuação total da unidade ${nome_unidade}`);
    const sql_pontos_totais = `UPDATE atividades_unidades SET ${nome_unidade} = ${pontuacao_total} WHERE nome_atividade = 'Pontuação total'`;
    console.log(`comando sql: ${sql_pontos_totais}`);

    // Aguardar a atualização dos pontos totais
    await new Promise((resolve, reject) => {
        db.query(sql_pontos_totais, (err, result) => {
            if (err) {
                return reject('Erro ao atualizar dados: ' + err);
            }
            resolve(result);  // Resolve a Promise após a atualização
        });
    });
    console.log('Pontuação total atualizada com sucesso!!');
}

// Endpoint para alterar a pontuação da unidade na prova determinada
app.post('/api/alterascore', (req, res) => {
    //pega o nome e senha que vieram na requisição
    const nome_atividade = req.body.nome_atividade;
    const nome_unidade = req.body.nome_unidade;
    const novo_valor = req.body.novo_valor;
    console.log(`\n\nRequisição para alterar a pontuação da atividade ${nome_atividade} na unidade ${nome_unidade}`)
    //cria o comando sql puxando tudo daquela senha informada. caso não exista ele irá retornar vazio e informar que não existe a senha
    const sql = `UPDATE atividades_unidades SET ${nome_unidade} = ${novo_valor} WHERE nome_atividade = '${nome_atividade}';`
    console.log(`comando sql: ${sql}`)
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
    atualiza_valor_total(nome_unidade)
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});