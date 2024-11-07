//url do servidor
const urlServ = 'http://localhost:3000';
//variavel do cardscontainer que é a div que ficam os cards
const cardsContainer = document.getElementById('cards-container');
//cria a lista de dicionarios contendo info de nome da unidade e pontuação geral pro ranking
const list_dict_ranking = []
//cria o dicionario com os dados das unidades para substituir o nome do bd pelo nome certo de ser exibido
const converte_nome = {
    "panda": "Panda",
    "aguia_real": "Aguia Real",
    "raposa": "Raposa",
    "pantera": "Pantera",
    "falcao": "Falcão",
    "tigre": "Tigre",
    "urso": "Urso",
    "lobo": "Lobo"
}
//funcao para carregar os cards dinamicamente
function load_itens() {
    //dicionario contendo pontuação total sendo chave=coluna/unidade e valor=celula/pontuacao
    const pontuacao_total_dict = {};
    //dicionario contendo caminho da foto da unidade sendo chave=coluna/unidade e valor=celula/caminho da foto
    const caminho_fotos_dict = {};
    //atualiza os pontos
    fetch(`${urlServ}/api/atualizapontos`)
    //realiza a pesquisa das unidades e cria os cards
    fetch(`${urlServ}/api/unidades`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na rede: ' + response.statusText);
        }
        return response.json();
    })
    //itera sobre as atividades criando um card para cada
    .then(data => {
        data.forEach(linha_tabela => {
            if (linha_tabela.nome_atividade == 'Pontuação total') 
                {
                    for (var chave in linha_tabela) 
                    {
                        if (chave == 'caminho_foto_atividade' || chave == 'id_sys' || chave == 'nome_atividade' ) {continue;}
                        pontuacao_total_dict[chave] = linha_tabela[chave]
                    }
            }
            if (linha_tabela.nome_atividade == 'caminho_foto_unidade') 
            {
                for (var chave in linha_tabela) 
                {
                    if (chave == 'caminho_foto_atividade' || chave == 'id_sys' || chave == 'nome_atividade' ) {continue;}
                    caminho_fotos_dict[chave] = linha_tabela[chave]
                }
                //Aqui itera sobre o dicionario de pontuação criando um card para cada unidade usando tanto dados do dicionario de pontos quanto do dicionario de caminho de foto
                cardsContainer.innerHTML = ''
                for (let chave in pontuacao_total_dict)
                {
                    //cria uma div que será o card
                    const unidade_div = document.createElement('div');
                    //atribui a classe á div
                    unidade_div.className = 'column ';
                    //edita a div colocando uma div dentro contendo  <p> que é o nome da unidade, <p> com faixa de idade da unidade, <img> logo da unidade,<p>pontuação da unidade,<input> mostra a pontuação da unidade
                    unidade_div.innerHTML = `
                        <div class="card clicavel" onclick="passa_pagina('${chave}','${caminho_fotos_dict[chave]}')">
                            <div class="card-content has-text-centered">
                                <p class="title">${converte_nome[chave]}</p>
                                <img src="${caminho_fotos_dict[chave]}" alt="${chave}">
                                <p class="subtitle">PONTUAÇÃO:</p>
                                <input type="number" class="quantity" value="${pontuacao_total_dict[chave]}" id="pontos_${chave}" readonly>
                            </div>
                        </div>
                    `;
                    //adiciona essa div criada na div de cards
                    cardsContainer.appendChild(unidade_div);
                    //cria um dicionario com as infos da unidade e adiciona na lista de dicionarios de infos
                    dicionario_novo = {
                        'nome_unidade' : converte_nome[chave],
                        'pontuacao_total' : pontuacao_total_dict[chave]
                    }
                    list_dict_ranking.push(dicionario_novo)
                }
            }
        });
        //o load ranking é chamado aqui pois os metodos são assincronos então ele precisa ser chamado apenas após preencher a lista para ela não ser identificada como vazia
        load_ranking()
    })
    .catch(error => console.error('Erro ao buscar os dados:', error));
}
//funcao para carregar o ranking
function load_ranking() {
    //armazena a div de ranking em uma variavel
    div_ranking = document.getElementById('ranking_id')
    //limpa a div
    div_ranking.innerHTML = ''
    //itera sobre a lista de dicionarios sendo cada item um dicionarios
    list_dict_ranking.forEach(dict => {
        console.log(`nome da unidade ${dict['nome_unidade']}`)
        console.log(`pontuação ${dict['pontuacao_total']}`)
    })
}
//passa a pagina para verificar o score daquela unidade em especifico
function passa_pagina(unidade_nome,unidade_logo) {
    //armazena a variavel com o nome e a logo da unidade
    localStorage.setItem('unidade_nome', unidade_nome);
    localStorage.setItem('unidade_nome_formatado', converte_nome[unidade_nome])
    localStorage.setItem('unidade_logo', unidade_logo);
    //joga para a pagina de pontuação
    window.location.href = 'pontuacao.html';
}
//chama as funções para carregar os cards e o ranking
load_itens()