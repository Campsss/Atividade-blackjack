let baralho, jogador, banca, fimDeJogo;

function criarBaralho() {
  const naipes = ['P', 'C', 'E', 'O']; 
  const valores = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
  let cartas = [];
  for (let naipe of naipes) {
    for (let valor of valores) {
      cartas.push({valor, naipe});
    }
  }
  return cartas.sort(() => Math.random() - 0.5);
}

function valorDaMao(mao) {
  let total = 0, ases = 0;
  for (let carta of mao) {
    if (['J','Q','K'].includes(carta.valor)) total += 10;
    else if (carta.valor === 'A') { total += 11; ases++; }
    else total += parseInt(carta.valor);
  }
  while (total > 21 && ases > 0) { total -= 10; ases--; }
  return total;
}

function mostrarCartas(mostrarTudo = false) {
  const textoJogador = jogador.map(c => c.valor + c.naipe).join(', ');
  const totalJogador = valorDaMao(jogador);
  document.getElementById('player').textContent = 'Jogador: ' + textoJogador + ' (' + totalJogador + ')';

  let textoBanca = '', totalBanca = 0;
  if (fimDeJogo || mostrarTudo) {
    textoBanca = banca.map(c => c.valor + c.naipe).join(', ');
    totalBanca = valorDaMao(banca);
  } else {
    textoBanca = banca[0].valor + banca[0].naipe + ', ??';
    totalBanca = '?';
  }
  document.getElementById('dealer').textContent = 'Banca: ' + textoBanca + ' (' + totalBanca + ')';
}

function iniciarJogo() {
  baralho = criarBaralho();
  jogador = [baralho.pop(), baralho.pop()];
  banca = [baralho.pop(), baralho.pop()];
  fimDeJogo = false;
  document.getElementById('resultado').textContent = '';
  mostrarCartas();
}

function pedirCarta() {
  if (fimDeJogo) return;
  jogador.push(baralho.pop());
  mostrarCartas();
  if (valorDaMao(jogador) > 21) {
    fimDeJogo = true;
    mostrarCartas(true);
    document.getElementById('resultado').textContent = 'Você perdeu!';
  }
}

function parar() {
  if (fimDeJogo) return;
  while (valorDaMao(banca) < 17) {
    banca.push(baralho.pop());
  }
  fimDeJogo = true;
  mostrarCartas(true);
  const totalJogador = valorDaMao(jogador);
  const totalBanca = valorDaMao(banca);
  let res = '';
  if (totalBanca > 21 || totalJogador > totalBanca) res = 'Você venceu!';
  else if (totalJogador < totalBanca) res = 'Banca venceu!';
  else res = 'Empate!';
  document.getElementById('resultado').textContent = res;
}

iniciarJogo();
