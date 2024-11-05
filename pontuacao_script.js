//url do servidor
const urlServ = 'http://localhost:3000';
//variavel do cardscontainer que é a div que ficam os cards
const cardsContainer = document.getElementById('cards-container');
//funcao para carregar os cards dinamicamente
function load_data() {
    //aqui atribui o nome da unidade ao h1
    document.getElementById('pontuacao_h1').innerHTML = localStorage.getItem('unidade_nome')
    //aqui atribui a imagem da unidade
    document.getElementById('img_logo_unidade').src = localStorage.getItem('unidade_logo')
    //aqui cria um dicionario contendo as infos de cada atividade (posteriormente será mudado para usar o bd)
    const atividades = [
        { nome: "Quebra Cabeças", arte: "logo_atividades/atividade_exemplo.png"},
        { nome: "Conhece O Uniforme?", arte: "logo_atividades/atividade_exemplo.png"},
        { nome: "Saindo Da Casa De Jó", arte: "logo_atividades/atividade_exemplo.png"},
        { nome: "Campo Minado", arte: "logo_atividades/atividade_exemplo.png"},
        { nome: "Só De Cabeça", arte: "logo_atividades/atividade_exemplo.png"},
        { nome: "Descubra O Nó", arte: "logo_atividades/atividade_exemplo.png"},
        { nome: "Fogos E Fogões", arte: "logo_atividades/atividade_exemplo.png"},
        { nome: "Escapando Pelas Mãos", arte: "logo_atividades/atividade_exemplo.png"},
        { nome: "Cordeiro", arte: "logo_atividades/atividade_exemplo.png"},
    ]
    //itera sobre as atividades criando um card para cada
    atividades.forEach(atividade => {
        //cria uma div que será o card
        const produto_div = document.createElement('div');
        //atribui a classe á div
        produto_div.className = 'column ';
        //edita a div colocando uma div dentro contendo  <p> que é o nome da atividade, <img> foto da atividade, <p> pontuação, um <input> para mostrar a pontuação daquela atividade especifica
        produto_div.innerHTML = `
            <div>
                <div class="card-content has-text-centered">
                    <p class="title">${atividade.nome}</p>
                    <img src="${atividade.arte}" alt="${atividade.nome}">
                    <p class="subtitle">PONTUAÇÃO:</p>
                    <button class="btnoper increment" onclick="alterar_valor('${atividade.nome}','subtrair',100)">-100 pontos</button>
                    <input type="number" class="quantity" value="0" id="pontos${atividade.nome}" readonly>
                    <button class="btnoper increment" onclick="alterar_valor('${atividade.nome}','somar',50)">+50 pontos</button>
                    <button class="btnoper increment" onclick="alterar_valor('${atividade.nome}','somar',100)">+100 pontos</button>
                </div>
            </div>
        `;
        //adiciona essa div criada na div de cards
        cardsContainer.appendChild(produto_div);
        //no caso da atividade do cordeiro inicia com 800 pontos (isso será mudado para puxar a pontuação do bd)
        if (atividade.nome == "Cordeiro") 
        {
            document.getElementById('pontosCordeiro').value = 800
        }
        //falta colocar apenas aparecer o botão caso a pessoa tenha acesso
        /*if acesso == nome atividade {
            //cria uma div que será o card
            const produto_div = document.createElement('div');
            //atribui a classe á div
            produto_div.className = 'column ';
            //edita a div colocando uma div dentro contendo  <p> que é o nome da atividade, <img> foto da atividade, <p> pontuação, <button> para dar decrescimo ou acrescimo e um <input> para mostrar a pontuação daquela atividade especifica
            produto_div.innerHTML = `
                <div>
                    <div class="card-content has-text-centered">
                        <p class="title">${atividade.nome}</p>
                        <img src="${atividade.arte}" alt="${atividade.nome}">
                        <p class="subtitle">PONTUAÇÃO:</p>
                        <button class="btnoper increment" onclick="alterar_valor('${atividade.nome}','subtrair',100)">-100 pontos</button>
                        <input type="number" class="quantity" value="0" id="pontos${atividade.nome}" readonly>
                        <button class="btnoper increment" onclick="alterar_valor('${atividade.nome}','somar',10)">+10 pontos</button>
                        <button class="btnoper increment" onclick="alterar_valor('${atividade.nome}','somar',50)">+50 pontos</button>
                        <button class="btnoper increment" onclick="alterar_valor('${atividade.nome}','somar',100)">+100 pontos</button>
                    </div>
                </div>
            `;
        }*/
    });
}
// função para alterar a quantidade
function alterar_valor(atividade_nome,operacao,qtd_pontos) {
    // pega o input que contem os pontos
    var pontos = document.getElementById(`pontos${atividade_nome}`)
    // Obtém o valor atual como número
    var valorAtual = parseInt(pontos.value) || 0; // Usa 0 se o valor não for um número
    // verifica o tipo de operacao
    if (operacao == "subtrair") {
        if (valorAtual > 0) { // Verifica se pode subtrair
            res = valorAtual - qtd_pontos;
            if (res < 0) {
                pontos.value = 0; // coloca 0 caso o resultado seja um numero negativo
            }
            else {
                pontos.value = valorAtual - qtd_pontos; // Decrementa
            }
        }
    } else if (operacao == "somar") {
        pontos.value = valorAtual + qtd_pontos; // Incrementa
    }
};
//volta para a tela de score geral
function voltar_home() {
    window.location.href = 'score_geral.html';
}

console.log(`UNIDADE APRESENTADA: ${localStorage.getItem('unidade_nome')}`)
// chama a função para criar os cards
load_data()