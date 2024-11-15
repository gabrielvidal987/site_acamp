// Limpa todo o localStorage. o localstorage é uma variavel que fica armazenada no navegador do usuario e pode ser acessada de qualquer parte do site
localStorage.clear();
// Variavel da url do servidor
// const urlServ = 'http://192.168.1.7:3000';
const urlServ = 'http://217.77.9.21:3000';
//cria o dicionario com os dados das unidades para substituir o nome do bd pelo nome certo de ser exibido
const converte_nome = {
    "panda": "PANDA",
    "aguia_real": "AGUIA REAL",
    "raposa": "RAPOSA",
    "pantera": "PANTERA",
    "falcao": "FALCÃO",
    "tigre": "TIGRE",
    "urso": "URSO",
    "lobo": "LOBO"
}
// Verifica se os campos foram preenchidos
function campo_preenchido() {
    const nome = document.getElementById('nome');
    const senha = document.getElementById('senha');
    if (nome.value) 
    {
        localStorage.setItem('nome', nome.value);
    }
    else 
    {
        nome.focus()
        return
    }
    if (senha.value) 
    {
        localStorage.setItem('senha', senha.value);
    }
    else 
    {
        senha.focus()
        return
    }
    passa_pagina()
}
// Função para passar para a proxima pagina
function passa_pagina() {
    //cria o dicionario com os dados do nome e senha
    const data = {
        nome: localStorage.getItem('nome'),
        senha: localStorage.getItem('senha'),
    };
    // Define o tempo máximo em milissegundos (por exemplo, 5 segundos)
    const TIMEOUT = 3000; 

    const controller = new AbortController(); // Cria um AbortController
    const signal = controller.signal; // Obtém o sinal para cancelar a requisição
    //faz a requisição enviando esses dados como argumento
    fetch(`${urlServ}/api/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        signal: signal  // Passa o sinal para o fetch
    })
    //pega o retorno e o trata
    .then(response => {
        if (!response.ok) {
            alert('Erro de conexão com banco de dados')
            throw new Error('Erro ao enviar pedido');
        }
        return response.json();
    })
    //pega os dados do retorno e dá o alerta com a mensagem da resposta do servidor e caso tenham dados existentes ele prossegue para a pagina de score geral
    .then(data => {
        if (data.dados) 
        {
            localStorage.setItem('acesso_prova', data.dados.acesso_prova);
            localStorage.setItem('unidade_nome', data.dados.unidade);
            localStorage.setItem('controle_unidade', data.dados.unidade);
            localStorage.setItem('unidade_nome_formatado', converte_nome[data.dados.unidade])
            localStorage.setItem('unidade_logo', `logo_unidades/${data.dados.unidade}.png`);
            if (localStorage.getItem('controle_unidade') == 'staff' || localStorage.getItem('controle_unidade') == 'diretor') 
            {
                window.location.href = 'score_geral.html'
            }
            else 
            {
                window.location.href = 'pontuacao.html'
            }
        }
        else 
        {
            alert('Senha não encontrada no banco de dados')
        }
    })
    //caso dê erro em algo ele irá notificar no inspecionar
    .catch((error) => {
        // Caso o erro seja causado por timeout ou outro erro de rede
        if (error.name === 'AbortError') {
            alert('A requisição demorou demais para ser concluída. Verifique a conexão com o Banco de dados.');
        } else {
            console.error('Erro ao processar a requisição:', error);
        }
    });

    // Configura o timeout para abortar a requisição
    setTimeout(() => {
        controller.abort();  // Aborta a requisição após o tempo limite
    }, TIMEOUT);

}

// Seleciona todos os elementos de input
const inputs = document.querySelectorAll("input");
// Adiciona um evento para verificar as teclas pressionadas
inputs.forEach(input => {
    input.addEventListener("keydown", function(event) {
        // Checa se a tecla pressionada foi Enter
        if (event.key === "Enter") {
            campo_preenchido()
        }
    });
});