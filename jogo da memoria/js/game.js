  const grid = document.querySelector(".grid");
  const spanPlayer = document.querySelector('.player');
  const timer = document.querySelector('.timer');
  const rankingList = document.querySelector('.ranking-list');

  const characters = [
  "donovan-bailey",
  "alphonso-davies",
  "hayley-wickenheiser",
  "hoquei-no-gelo",
  "lacrosse",
  "maggie-macneil",
  "montreal-76",
  "rogers-centre",
  "stade-olympique",
  "tessa-e-scott",
  ];

  const createElement = (tag, classname) => {
    const element = document.createElement(tag);
    element.className = classname;
    return element;
  }

  let primeiracarta = "";
  let segundacarta = "";
  let loop;
  let startTime;


  // Função para verificar se o jogo terminou
  const checkEndGame = () => {
    const disabledcards = document.querySelectorAll(".disabled-card");

    if (disabledcards.length === 20) {
      clearInterval(this.loop); // Para o temporizador
      const timeTaken = parseInt(timer.innerHTML, 10); // Obtém o tempo final
      saveRanking(timeTaken); // Chama a função que salva o ranking

      setTimeout(() => {
        alert(`Parabéns, você completou o jogo em ${timeTaken} segundos!`);
      }, 300);
    }
  }

  // Função para salvar o ranking no localStorage
  const saveRanking = (time) => {
    const playerName = localStorage.getItem('player');
    let ranking = JSON.parse(localStorage.getItem('ranking')) || [];

    // Adiciona o novo tempo ao ranking
    ranking.push({ name: playerName, time: time });

    // Ordena o ranking pelo menor tempo
    ranking.sort((a, b) => a.time - b.time);

    // Armazena no localStorage
    localStorage.setItem('ranking', JSON.stringify(ranking));

    // Atualiza a exibição do ranking
    renderRanking();
  };

  // Função para exibir o ranking
  const renderRanking = () => {
    let ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    rankingList.innerHTML = ''; // Limpa o conteúdo anterior

    ranking.forEach((player) => {
      const row = document.createElement('tr'); // Cria uma linha da tabela

      const nameCell = document.createElement('td'); // Coluna do nome
      nameCell.textContent = player.name;

      const timeCell = document.createElement('td'); // Coluna do tempo
      timeCell.textContent = player.time;

      // Adiciona as células à linha
      row.appendChild(nameCell);
      row.appendChild(timeCell);

      // Adiciona a linha ao corpo da tabela
      rankingList.appendChild(row);
    });
  };

  const checkcard = () => {
    const primeiracharacter = primeiracarta.getAttribute("data-character");
    const segundacharacter = segundacarta.getAttribute("data-character");

    if (primeiracharacter === segundacharacter) {
      primeiracarta.firstChild.classList.add("disabled-card");
      segundacarta.firstChild.classList.add("disabled-card");

      primeiracarta = "";
      segundacarta = "";

      checkEndGame();
    } else {
      setTimeout(() => {
        primeiracarta.classList.remove("reveal-card");
        segundacarta.classList.remove("reveal-card");

        primeiracarta = "";
        segundacarta = "";
      }, 500);
    }
  }

  const revealCard = ({ target }) => {
    // Impede que mais de duas cartas sejam viradas ao mesmo tempo
    if (primeiracarta !== "" && segundacarta !== "") return;

    if (target.parentNode.className.includes("reveal-card")) {
      return;
    }

    if (primeiracarta === "") {
      target.parentNode.classList.add("reveal-card");
      primeiracarta = target.parentNode;
    } else if (segundacarta === "") {
      target.parentNode.classList.add("reveal-card");
      segundacarta = target.parentNode;

      checkcard();
    }
  }
  const createCard = (character) => {
    const card = createElement("div", "card");
    const front = createElement("div", "face front");
    const back = createElement("div", "face back");

    front.style.backgroundImage = `url('../imagens/${character}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener("click", revealCard);

    card.setAttribute("data-character", character);
    return card;
  }

  const loadGame = () => {
    const duplicateCharacters = [...characters, ...characters];

    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

    shuffledArray.forEach((character) => {
      const card = createCard(character);
      grid.appendChild(card);
    });
  }

  // Função que inicia o temporizador
  const startTimer = () => {
    startTime = Date.now();
    this.loop = setInterval(() => {
      const currentTime = Math.floor((Date.now() - startTime) / 1000);
      timer.innerHTML = currentTime;
    }, 1000);
  }

  const clearRanking = () => {
    localStorage.removeItem('ranking'); // Remove o item 'ranking' do localStorage
    renderRanking(); // Re-renderiza o ranking para atualizar a exibição
  };
  
// Lógica do pop-up
const rankingPopup = document.getElementById("ranking-popup");
const closeBtn = rankingPopup.querySelector(".close");

// Função para mostrar o pop-up do ranking
const showRankingPopup = () => {
    rankingPopup.style.display = "block"; // Mostra o pop-up
}

// Função para fechar o pop-up
const closeRankingPopup = () => {
    rankingPopup.style.display = "none"; // Fecha o pop-up
}

// Eventos para o pop-up
document.getElementById("view-rank").onclick = showRankingPopup; // Clique no texto para abrir o pop-up
closeBtn.onclick = closeRankingPopup; // Clique no botão de fechar para fechar o pop-up

 // Script para a funcionalidade da aba recolhível
 const accordion = document.querySelector('.accordion');
 const panel = document.querySelector('.accordion-panel');

 accordion.addEventListener('click', () => {
   // Alterna a classe 'active' para expandir ou recolher o painel
   panel.classList.toggle('active');

   // Altera o texto do botão, se necessário
   if (panel.classList.contains('active')) {
     accordion.textContent = "Fechar Ranking de Jogadores";
   } else {
     accordion.textContent = "Ver Ranking de Jogadores";
   }
 });
  // Carrega as informações na página
  window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');
    startTimer();
    loadGame();
    renderRanking(); // Renderiza o ranking ao carregar a página
  };
