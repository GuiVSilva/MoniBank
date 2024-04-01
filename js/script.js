// Importa a função para validar CPF e a função para validar maioridade
import ehUmCPF from './valida-cpf.js'
import ehMaiorDeIdade from './valida-idade.js'
// Seleciona todos os campos do formulário que são obrigatórios
const camposDoFormulario = document.querySelectorAll('[required]')
// Seleciona o formulário pelo atributo data-formulario
const formulario = document.querySelector('[data-formulario]')

// Evento de submissão do formulário
formulario.addEventListener('submit', e => {
  e.preventDefault() // Impede o envio do formulário
  // Cria um objeto com as informações do formulário
  const listaRespostas = {
    nome: e.target.elements['nome'].value,
    email: e.target.elements['email'].value,
    rg: e.target.elements['rg'].value,
    cpf: e.target.elements['cpf'].value,
    aniversario: e.target.elements['aniversario'].value
  }

  // Armazena as respostas do formulário no localStorage
  localStorage.setItem('cadastro', JSON.stringify(listaRespostas))

  // Redireciona para a próxima página do formulário
  window.location.href = './abrir-conta-form-2.html'
})

// Adiciona eventos de validação aos campos do formulário
camposDoFormulario.forEach(campo => {
  campo.addEventListener('blur', () => verificaCampo(campo)) // Verifica o campo quando ele perde o foco
  campo.addEventListener('invalid', evento => evento.preventDefault()) // Impede a exibição da mensagem de erro padrão do navegador
})
// Tipos de erro possíveis nos campos do formulário e suas mensagens correspondentes
const tiposDeErro = [
  'valueMissing',
  'typeMismatch',
  'patternMismatch',
  'tooShort',
  'customError'
]
// Mensagens de erro personalizadas para cada campo do formulário
const mensagens = {
  nome: {
    valueMissing: 'O campo de nome não pode estar vazio.',
    patternMismatch: 'Por favor, preencha um nome válido.',
    tooShort: 'Por favor, preencha um nome válido.'
  },
  email: {
    valueMissing: 'O campo de e-mail não pode estar vazio.',
    typeMismatch: 'Por favor, preencha um email válido.',
    tooShort: 'Por favor, preencha um e-mail válido.'
  },
  rg: {
    valueMissing: 'O campo de RG não pode estar vazio.',
    patternMismatch: 'Por favor, preencha um RG válido.',
    tooShort: 'O campo de RG não tem caractéres suficientes.'
  },
  cpf: {
    valueMissing: 'O campo de CPF não pode estar vazio.',
    patternMismatch: 'Por favor, preencha um CPF válido.',
    customError: 'O CPF digitado não existe.',
    tooShort: 'O campo de CPF não tem caractéres suficientes.'
  },
  aniversario: {
    valueMissing: 'O campo de data de nascimento não pode estar vazio.',
    customError: 'Você deve ser maior que 18 anos para se cadastrar.'
  },
  termos: {
    valueMissing: 'Você deve aceitar nossos termos antes de continuar.'
  }
}
// Função para verificar o campo quando ele perde o foco
function verificaCampo(campo) {
  let mensagem = '' // Inicializa a mensagem de erro como vazia
  campo.setCustomValidity('') // Limpa qualquer mensagem de erro personalizada anterior
  // Verifica se o campo é o CPF e se possui pelo menos 11 caracteres
  if (campo.name == 'cpf' && campo.value.length >= 11) {
    ehUmCPF(campo) // Chama a função para validar o CPF
  }
  // Verifica se o campo é a data de nascimento e se não está vazio
  if (campo.name == 'aniversario' && campo.value != '') {
    ehMaiorDeIdade(campo) // Chama a função para validar a maioridade
  }
  // Itera sobre os tipos de erro possíveis
  tiposDeErro.forEach(erro => {
    // Verifica se o campo possui o erro atual
    if (campo.validity[erro]) {
      mensagem = mensagens[campo.name][erro] // Obtém a mensagem de erro correspondente ao tipo de erro
    }
  })
  const mensagemErro = campo.parentNode.querySelector('.mensagem-erro') // Seleciona o elemento de mensagem de erro
  const validadorDeInput = campo.checkValidity() // Verifica se o campo é válido

  // Exibe a mensagem de erro no elemento correspondente
  if (!validadorDeInput) {
    // Exibe a mensagem de erro no elemento
    mensagemErro.textContent = mensagem
  } else {
    // Limpa a mensagem de erro se o campo for válido
    mensagemErro.textContent = ''
  }
}
