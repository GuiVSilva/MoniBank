// Função exportada que verifica se uma pessoa é maior de idade com base na data de nascimento fornecida
export default function ehMaiorDeIdade(campo) {
  const dataNascimento = new Date(campo.value) // Converte o valor do campo para um objeto Date
  // Verifica se a idade é menor que 18 anos
  if (!validaIdade(dataNascimento)) {
    campo.setCustomValidity('O usuário não é maior de idade') // Define uma mensagem de erro personalizada no campo
  }
}

// Função interna que valida se uma data corresponde a uma pessoa maior de 18 anos
function validaIdade(data) {
  const dataAtual = new Date() // Obtém a data atual
  const dataMais18 = new Date(
    data.getUTCFullYear() + 18, // Adiciona 18 anos à data de nascimento
    data.getUTCMonth(),
    data.getUTCDate()
  )

  return dataAtual >= dataMais18 // Retorna true se a data atual for maior ou igual à data de 18 anos, senão retorna false
}
