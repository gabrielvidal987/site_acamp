//url do servidor
const urlServ = 'http://localhost:3000';
// const urlServ = 'http://192.168.1.7:3000';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

//funcao para carregar os cards dinamicamente
async function load_data() {
    //aqui atribui o nome da unidade ao h1
    document.getElementById('pontuacao_h1').innerHTML = localStorage.getItem('unidade_nome_formatado')
    //aqui atribui a imagem da unidade
    document.getElementById('img_logo_unidade').src = localStorage.getItem('unidade_logo')
    let pontos_totais = 1000;
    let min = 900;
    let max = 1000;
    
    // Começa o loop, que vai diminuir a pontuação de 1000 até 0
    while (pontos_totais > 0) {
        pontos_totais -= 10;  // Decrementa os pontos

        let numeroAleatorioInteiro = Math.floor(Math.random() * (max - min + 1)) + min;
        min -= 10
        max -= 10
        if (min < 1 || max < 1) {min = 1; max = 50}

        // Atualiza a pontuação na tela
        document.getElementById('score_total_unidade').innerHTML = `${numeroAleatorioInteiro}</br> PONTOS`;
        
        // Faz a página esperar por 1 segundo antes de continuar (simula o "sleep")
        await sleep(50);  // Espera por 1 segundo
    }
    //atribui a pontuação total
    document.getElementById('score_total_unidade').innerHTML = `0</br> PONTOS`;
    await sleep(100);  // Espera por 1 segundo
    alert('NENHUMA PONTUAÇÃO FOI ENCONTRADA!')
}

console.log(`UNIDADE APRESENTADA: ${localStorage.getItem('unidade_nome')}`)
// chama a função para criar os cards
load_data()