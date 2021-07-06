window.addEventListener('load', start)

let GlobalNames = [
  'Novo Pedido',
  'Novo Pedido',
  'Novo Pedido',
  'Novo Pedido',
  'Novo Pedido'
]
let nomes = document.querySelector('#nomes')
let ul = document.createElement('ul') //Criando Lista
let Input = document.getElementById('Input') //Buscando valor Digitado
let form = document.getElementById('Formulario') //Buscando valor
let IsEditing = false
let Posicao

function start() {
  PrevenirComportamentoDefault(form)
  AplicarFoco(Input)
  CapturarValoresDigitados(Input)
  ExibirVetor()
}

function PrevenirComportamentoDefault(Objeto) {
  Objeto.addEventListener('submit', function (event) {
    event.preventDefault()
  })
}

function AplicarFoco(Objeto) {
  Objeto.focus()
}

function CapturarValoresDigitados(Objeto) {
  Objeto.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
      let ValorDigitado = event.target.value
      alert('Valor Armazenado com Sucesso')

      if (ValorDigitado) {
        if (IsEditing) {
          GlobalNames.splice(Posicao, 1, ValorDigitado)
          IsEditing = false
        } else {
          GlobalNames.push(ValorDigitado)
        }
      }

      ExibirVetor()
    }
  })
}

function ExibirVetor() {
  ul.innerHTML = ''
  Input.value = ''

  GlobalNames.forEach(PercorrerVetor)
  nomes.appendChild(ul)
}

function PercorrerVetor(item) {
  let li = document.createElement('li')

  li.appendChild(CriarBotao())
  li.appendChild(CriarSpan(item))
  ul.appendChild(li)
}

function CriarBotao() {
  let botao = document.createElement('button')

  botao.classList.add('DeleteButton')
  botao.textContent = 'x'

  return botao
}

function CriarSpan(valor) {
  let span = document.createElement('span')
  span.textContent = valor
  span.classList.add('clicavel')
  span.addEventListener('click', EditarItem)
  return span
}

function EditarItem(event) {
  let valor = event.target.innerHTML
  let index = GlobalNames.indexOf(valor)
  Input.value = GlobalNames[index]
  AplicarFoco(Input)
  IsEditing = true
  Posicao = index
}

ul.addEventListener('click', function (event) {
  if (event.target.localName === 'button') {
    var valor = event.srcElement.nextElementSibling.innerHTML
    let index = GlobalNames.indexOf(valor)
    GlobalNames.splice(index, 1)

    let ancestral = event.target.parentElement
    ancestral.remove()
    alert('Item deletado!')
  }
})
