//url do servidor
// const urlServ = 'http://localhost:3000';
// const urlServ = 'http://192.168.1.7:3000';
const urlServ = 'http://217.77.9.21:3000';
//variavel do cardscontainer que é a div que ficam os cards
const cardsContainer = document.getElementById('cards-container');
const div_staff = document.getElementById('atividade_staff')
//funcao para carregar os cards dinamicamente
async function load_data() {
    //atualiza os pontos
    const respostaPontos = await fetch(`${urlServ}/api/atualizapontos`);
    // Espera o fetch terminar para seguir ao proximo fetch
    if (!respostaPontos.ok) {
        throw new Error('Falha ao atualizar pontos');
    }
    //limpa o html
    cardsContainer.innerHTML = '';
    div_staff.innerHTML = '';
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
                const score_unidade = atividade[localStorage.getItem('unidade_nome')]
                if (score_unidade == 0 || score_unidade == '0') {window.location.href = 'score_zero.html';}
                document.getElementById('score_total_unidade').innerHTML = `${score_unidade} PONTOS`;
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
            if (localStorage.getItem('acesso_prova') == atividade.nome_atividade || localStorage.getItem('acesso_prova') == 'acesso_total')
            {
                const atividade_staff_div = document.createElement('div');
                atividade_staff_div.innerHTML = `
                    <div class="card-content has-text-centered">
                        <p class="title staff_title">${atividade.nome_atividade}</p>
                        <img src="${atividade.caminho_foto_atividade}" alt="${atividade.nome_atividade}">
                        <p class="subtitle">PONTUAÇÃO:</p>
                        <input type="number" class="quantity" value="${atividade[localStorage.getItem('unidade_nome')]}" id="pontos${atividade.nome_atividade}" onchange="alterar_valor('${atividade.nome_atividade}')">
                        </br>
                    </div>
                    `;
                //adiciona essa div criada na div de staffs
                div_staff.appendChild(atividade_staff_div);
                div_staff.style.display = 'block';
                return
            }
            //edita a div colocando uma div dentro contendo  <p> que é o nome da atividade, <img> foto da atividade, <p> pontuação, um <input> para mostrar a pontuação daquela atividade especifica
            atividade_div.innerHTML = `
                <div class="card-content has-text-centered">
                    <p class="title">${atividade.nome_atividade}</p>
                    <img src="${atividade.caminho_foto_atividade}" alt="${atividade.nome_atividade}">
                    <p class="subtitle">PONTUAÇÃO:</p>
                    <input type="number" class="quantity" value="${atividade[localStorage.getItem('unidade_nome')]}" id="pontos${atividade.nome_atividade}" readonly>
                </div>
            `;
            //adiciona essa div criada na div de cards
            cardsContainer.appendChild(atividade_div);
        })
    })
    .catch(error => console.error('Erro ao buscar os dados:', error));
    //aqui atribui o nome da unidade ao h1
    document.getElementById('pontuacao_h1').innerHTML = localStorage.getItem('unidade_nome_formatado')
    //aqui atribui a imagem da unidade
    document.getElementById('img_logo_unidade').src = localStorage.getItem('unidade_logo')
}

// função para alterar a pontuação de tal atividade
function alterar_valor(atividade_nome) {
    // pega o input que contem os pontos
    var pontos = document.getElementById(`pontos${atividade_nome}`)
    // Obtém o valor atual como número
    var novo_valor = parseInt(pontos.value);
    console.log(`Atualizando pontuação da atividade ${atividade_nome} para ${novo_valor} pontos`)
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
        console.log('Pontuação da atividade atualizada com sucesso!')
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

if (localStorage.getItem('controle_unidade') == 'staff') {
    document.getElementById('btn_voltar').style.display = '';}
console.log(`UNIDADE APRESENTADA: ${localStorage.getItem('unidade_nome')}`)
// chama a função para criar os cards
load_data()