//Definição das constantes: texto da tarefa, botão de inserir tarefa, botão de limpar a lista, lista
const texto = document.querySelector('input')
const botaoInserir = document.querySelector('.inserirTarefa button')
const botaoLimpar = document.querySelector('.cabecalho button')
const ul = document.querySelector('ul')

//Variável que armazena os itens da lista em um array
var itens = []

//Função para limpar toda a lista 
botaoLimpar.onclick = () => {
  itens = []
  atualizar()
}

//Verificação de tarefa nula. Caso seja nuça, não será possível adicionar a tarefa. Caso não seja, a tarefa será adicionada ao apertar a tecla enter
texto.addEventListener('keypress', e => {
  if (e.key == 'Enter' && texto.value != '') {
    definirItem()
  }
})

//Função que insere uma tarefa na lista a partir do botão de inserir
botaoInserir.onclick = () => {
  if (texto.value != '') {
    definirItem()
  }
}

//Verificação de máximo de itens da lista. Caso ultrapasse o limite, não será possível adicionar novos itens
function definirItem() {
  if (itens.length >= 15) {
    alert('Limite máximo de 15 itens atingido!')
    return
  }

  //O método push é responsável por adionar itens no array
  itens.push({ 'item': texto.value, 'status': '' })
  atualizar()
}

//Função para atualizar os itens da lista 
function atualizar() {
  localStorage.setItem('lista-tarefas', JSON.stringify(itens)) //Converte os valores JS para strings em JSON
  carregarItens()
}

//Função que limpa a ul para que os itens não sejam duplicados  
function carregarItens() {
  ul.innerHTML = "";
  itens = JSON.parse(localStorage.getItem('lista-tarefas')) ?? [] //Analisa a string JSON e constrói um valor em JS de acordo com ela
  itens.forEach((item, i) => { //Chama uma função para cada item presente no array
    inserirItem(item.item, item.status, i)
  })
}


//Função que insere os itens. text é o conteúdo da tarefa, status presenta se a tarefa está marcada ou não e i representa o índice da tarefa
function inserirItem(text, status, i) {
  const li = document.createElement('li')
  
  li.innerHTML = `
    <div class="itemLista">
      <input type="checkbox" ${status} data-i=${i} onchange="concluida(this, ${i});" />
      <span data-si=${i}>${text}</span>
      <button onclick="apagarItem(${i})" data-i=${i}><i class='bx bx-trash'></i></button>
    </div>
    `
  ul.appendChild(li) //Adiciona um item no final da lista

  if (status) {
    document.querySelector(`[data-si="${i}"]`).classList.add('line-through') //Quando o botão de concluído é clicado, aparece uma linha riscando o conteúdo do item
  } else {
    document.querySelector(`[data-si="${i}"]`).classList.remove('line-through') //Assim que o click do botão é retirado a linha também é
  }

  texto.value = ''
}

//Função que verifrica se a tarefa foi concluida
function concluida(chk, i) {

  if (chk.checked) {
    itens[i].status = 'checked' 
  } else {
    itens[i].status = '' 
  }

  atualizar()
}

//Função para apagar o item a partir do botão de exclu
function apagarItem(i) {
  itens.splice(i, 1) //Atualiza o conteúdo da lista apagando o item quando o botão de lixeira é clicado
  atualizar()
}

carregarItens()