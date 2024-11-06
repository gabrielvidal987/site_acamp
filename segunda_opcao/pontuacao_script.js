//url do servidor
const urlServ = 'http://localhost:3000';
//variavel do cardscontainer que é a div que ficam os cards
const cardsContainer = document.getElementById('cards-container');
//aqui cria um dicionario contendo as infos de cada atividade (posteriormente será mudado para usar o bd)
const coluna_unidade_atividades = {
    quebra_cabecas_score: "Quebra Cabeças",
    conhece_o_uniforme_score: "Conhece O Uniforme?",
    saindo_da_casa_de_jo_score: "Saindo Da Casa De Jó",
    campo_minado_score: "Campo Minado",
    so_de_cabeca_score: "Só De Cabeça",
    descubra_o_no_score: "Descubra O Nó",
    fogos_e_fogoes_score: "Fogos E Fogões",
    escapando_pelas_maos_score: "Escapando Pelas Mãos",
    cordeiro_score: "Cordeiro"
}

//funcao para carregar os cards dinamicamente
function load_data() {
    fetch(`${urlServ}/api/atualizapontos`)
    cardsContainer.innerHTML = '';
    //aqui atribui o nome da unidade ao h1
    document.getElementById('pontuacao_h1').innerHTML = localStorage.getItem('unidade_nome')
    //aqui atribui a imagem da unidade
    document.getElementById('img_logo_unidade').src = localStorage.getItem('unidade_logo')
    //dá o fetch para requisitar as atividades
    fetch(`${urlServ}/api/unidades`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na rede: ' + response.statusText);
        }
        return response.json();
    })
    //itera sobre as atividades criando um card para cada
    .then(data => {
        data.forEach(atividade => {
            //atribui a pontuação total
            if (atividade.nome_atividade == 'Pontuação total') 
            {
                document.getElementById('score_total_unidade').innerHTML = `${atividade[localStorage.getItem('unidade_nome')]} PONTOS`;
                return;
            }
            //pula a parte do caminho da foto da unidade
            if (atividade.nome_atividade == 'caminho_foto_unidade') 
                {
                    return;
                }

            //cria uma div que será o card
            const atividade_div = document.createElement('div');
            //atribui a classe á div
            atividade_div.className = 'column ';
            //caso o acesso_prova seja igual ao nome da atividade a pessoa terá os botões de editar aquela atividade
            //no caso da atividade do cordeiro terá o botão de decrementar, nas demais é apenas botão de incrementar
            if (localStorage.getItem('acesso_prova') == atividade.nome_atividade) 
            {
                const div_staff = document.getElementById('atividade_staff')
                const atividade_staff_div = document.createElement('div');
                div_staff.innerHTML = '';
                if (atividade.nome_atividade == 'Cordeiro') 
                {
                    atividade_staff_div.innerHTML = `
                        <p class="title">${atividade.nome_atividade}</p>
                        <img src="${atividade.caminho_foto_atividade}" alt="${atividade.nome_atividade}">
                        <p class="subtitle">PONTUAÇÃO:</p>
                        <input type="number" class="quantity" value="${atividade.panda}" id="pontos${atividade.nome_atividade}" readonly>
                        </br>
                        <button class="btnoper increment" onclick="alterar_valor('${atividade.nome_atividade}','subtrair',100)">-100 pontos</button>
                        `;
                }
                else
                {
                    atividade_staff_div.innerHTML = `
                        <p class="title">${atividade.nome_atividade}</p>
                        <img src="${atividade.caminho_foto_atividade}" alt="${atividade.nome_atividade}">
                        <p class="subtitle">PONTUAÇÃO:</p>
                        <input type="number" class="quantity" value="${atividade.panda}" id="pontos${atividade.nome_atividade}" readonly>
                        </br>
                        <button class="btnoper increment" onclick="alterar_valor('${atividade.nome_atividade}','somar',10)">+10 pontos</button>
                        <button class="btnoper increment" onclick="alterar_valor('${atividade.nome_atividade}','somar',50)">+50 pontos</button>
                        <button class="btnoper increment" onclick="alterar_valor('${atividade.nome_atividade}','somar',100)">+100 pontos</button>
                        `;
                }
                //adiciona essa div criada na div de staffs
                div_staff.appendChild(atividade_staff_div);
                div_staff.style.display = 'block';
                return
            }
            //edita a div colocando uma div dentro contendo  <p> que é o nome da atividade, <img> foto da atividade, <p> pontuação, um <input> para mostrar a pontuação daquela atividade especifica
            atividade_div.innerHTML = `
                <div>
                    <div class="card-content has-text-centered">
                        <p class="title">${atividade.nome_atividade}</p>
                        <img src="${atividade.caminho_foto_atividade}" alt="${atividade.nome_atividade}">
                        <p class="subtitle">PONTUAÇÃO:</p>
                        <input type="number" class="quantity" value="${atividade.panda}" id="pontos${atividade.nome_atividade}" readonly>
                    </div>
                </div>
            `;
            //adiciona essa div criada na div de cards
            cardsContainer.appendChild(atividade_div);
        })
    })
    .catch(error => console.error('Erro ao buscar os dados:', error));
}

// função para alterar a pontuação de tal atividade
function alterar_valor(atividade_nome,operacao,qtd_pontos) {
    // pega o input que contem os pontos
    var pontos = document.getElementById(`pontos${atividade_nome}`)
    // Obtém o valor atual como número
    var valorAtual = parseInt(pontos.value); // Usa 0 se o valor não for um número
    var novo_valor = 0
    // verifica o tipo de operacao
    if (operacao == "subtrair") {
        if (valorAtual > 0) { // Verifica se pode subtrair
            if (valorAtual - qtd_pontos < 0) {
                novo_valor = 0; // coloca 0 caso o resultado seja um numero negativo
            }
            else {
                novo_valor = valorAtual - qtd_pontos; // Decrementa
            }
        }
    } 
    else if (operacao == "somar") {
        novo_valor = valorAtual + qtd_pontos; // Incrementa
    }
    //cria o dicionario com os dados do nome da atividade, nome da unidade e novo valor de pontuação
    const data = {
        nome_atividade : atividade_nome,
        nome_unidade : localStorage.getItem('unidade_nome'),
        novo_valor : novo_valor
    };
    //faz a requisição enviando esses dados como argumento
    fetch(`${urlServ}/api/alterascore`, {
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
        console.log('valor atualizado')
        load_data()
    })
    //caso dê erro em algo ele irá notificar no inspecionar
    .catch((error) => {
        console.error('Error:', error);
    });
};
//volta para a tela de score geral
function voltar_home() {
    window.location.href = 'score_geral.html';
}

console.log(`UNIDADE APRESENTADA: ${localStorage.getItem('unidade_nome')}`)
// chama a função para criar os cards
load_data()