document.addEventListener('DOMContentLoaded', function() { // Este evento é acionado quando o DOM (Document Object Model) do HTML é completamente carregado
    document.getElementById('form-sorteador').addEventListener('submit', function() { // Seleciona o formulário com o id "form-sorteador" e adiciona um ouvinte de evento para o evento de envio (submit)
        let numeromaximo = document.getElementById('numero-maximo').value; // Seleciona o elemento HTML com o id "numero-maximo" e obtém o valor inserido nele
        numeromaximo = parseInt(numeromaximo); // Converte o valor obtido para um número inteiro usando parseInt

        let numeroaleatorio = Math.random() * numeromaximo ; // Gera um número aleatório entre 0 e numeromaximo
        alert(numeroaleatorio); // Exibe um alerta com o número aleatório gerado
    });
});
