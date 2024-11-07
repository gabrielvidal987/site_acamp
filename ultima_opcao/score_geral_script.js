//url do servidor
const urlServ = 'http://localhost:3000';
//variavel do cardscontainer que é a div que ficam os cards
const cardsContainer = document.getElementById('cards-container');
//funcao para carregar os cards dinamicamente
function load_itens() {
    //cria o dicionario com os dados das unidades (isso será substituido e usado os dados do bd, mas para testes pode usar esse dicionario)
    const unidades = [
        { nome: "Panda",idade_min:10,idade_max:11, logo: "logo_unidades/logo_exemplo.png"},
        { nome: "Aguia Real",idade_min:12,idade_max:13, logo: "logo_unidades/logo_exemplo.png"},
        { nome: "Raposa",idade_min:14,idade_max:14, logo: "logo_unidades/logo_exemplo.png"},
        { nome: "Pantera",idade_min:15,idade_max:15, logo: "logo_unidades/logo_exemplo.png"},
        { nome: "Falcão",idade_min:10,idade_max:11, logo: "logo_unidades/logo_exemplo.png"},
        { nome: "Tigre",idade_min:12,idade_max:13, logo: "logo_unidades/logo_exemplo.png"},
        { nome: "Urso",idade_min:14,idade_max:14, logo: "logo_unidades/logo_exemplo.png"},
        { nome: "Lobo",idade_min:15,idade_max:15, logo: "logo_unidades/logo_exemplo.png"},
    ]
    //itera sobre os dados criando um card para cada unidade
    unidades.forEach(unidade => {
        //cria uma div que será o card
        const produto_div = document.createElement('div');
        //atribui a classe á div
        produto_div.className = 'column ';
        //edita a div colocando uma div dentro contendo  <p> que é o nome da unidade, <p> com faixa de idade da unidade, <img> logo da unidade,<p>pontuação da unidade,<input> mostra a pontuação da unidade
        produto_div.innerHTML = `
            <div class="card clicavel" onclick="passa_pagina('${unidade.nome}','${unidade.logo}')">
                <div class="card-content has-text-centered">
                    <p class="title">${unidade.nome}</p>
                    <p class="subtitle">Idade: ${unidade.idade_min} - ${unidade.idade_max} </p>
                    <img src="${unidade.logo}" alt="${unidade.nome}">
                    <p class="subtitle">PONTUAÇÃO:</p>
                    <input type="number" class="quantity" value="0" id="pontos_${unidade.nome}" readonly>
                </div>
            </div>
        `;
        //adiciona essa div criada na div de cards
        cardsContainer.appendChild(produto_div);
    });
}
//passa a pagina para verificar o score daquela unidade em especifico
function passa_pagina(unidade_nome,unidade_logo) {
    console.log(`SELECIONADA UNIDADE: ${unidade_nome}`)
    //armazena a variavel com o nome e a logo da unidade
    localStorage.setItem('unidade_nome', unidade_nome);
    localStorage.setItem('unidade_logo', unidade_logo);
    //joga para a pagina de pontuação
    window.location.href = 'pontuacao.html';
}
//chama a função para carregar os cards
load_itens()