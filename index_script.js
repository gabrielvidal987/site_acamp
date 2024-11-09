// Limpa todo o localStorage. o localstorage é uma variavel que fica armazenada no navegador do usuario e pode ser acessada de qualquer parte do site
localStorage.clear();
// Variavel da url do servidor
const urlServ = 'http://192.168.1.7:3000';
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
    //faz a requisição enviando esses dados como argumento
    fetch(`${urlServ}/api/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    //pega o retorno e o trata
    .then(response => {
        console.log(`status http da resposta: ${response.status}`);  // Verifique o status HTTP da resposta
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
            window.location.href = 'score_geral.html'
        }
        else 
        {
            alert('Senha não encontrada no banco de dados')
        }
    })
    //caso dê erro em algo ele irá notificar no inspecionar
    .catch((error) => {
        console.error('Error:', error);
    });
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