// Captura os elementos da página.
const formCep = document.querySelector('#formCep');
const inputCep = document.querySelector('#cep');
const botaoBuscar = document.querySelector('#botaoBuscar');
const mensagem = document.querySelector('#mensagem');
const resultado = document.querySelector('#resultado');

const logradouro = document.querySelector('#logradouro');
const bairro = document.querySelector('#bairro');
const cidade = document.querySelector('#cidade');
const estado = document.querySelector('#estado');
const ddd = document.querySelector('#ddd');



// Coloca o hífen automaticamente enquanto o usuário digita.
inputCep.addEventListener('input', () => {

  let cep = inputCep.value.replace(/\D/g, '');

  if (cep.length > 5) {
    cep = `${cep.slice(0, 5)}-${cep.slice(5, 8)}`;
  }

  inputCep.value = cep;
});



// O evento submit acontece quando o formulário é enviado.
formCep.addEventListener('submit', async (evento) => {
  // Evita que a página seja recarregada.
  evento.preventDefault();

  // Remove tudo que não for número.
  const cep = inputCep.value.replace(/\D/g, '');

  mensagem.innerText = '';
  resultado.classList.add('oculto');


  // Um CEP brasileiro precisa ter 8 números.
  if (cep.length !== 8) {
    mensagem.innerText = 'Digite um CEP válido com 8 números.';
    inputCep.focus();
    return;
  }

  try {

    botaoBuscar.disabled = true;
    botaoBuscar.innerText = 'Buscando...';
    mensagem.innerText = 'Consultando a API ViaCEP...';


    // O fetch envia uma requisição para uma API disponível na internet.
    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

    // Verifica se houve um problema na resposta HTTP.
    if (!resposta.ok) {

      throw new Error('Não foi possível consultar o serviço.');

    }

    // Converte a resposta recebida para um objeto JavaScript.
    const endereco = await resposta.json();

    // O ViaCEP devolve a propriedade erro quando o CEP não existe.
    if (endereco.erro) {

      mensagem.innerText = 'CEP não encontrado.';

      return;

    }



    // Exibe os dados recebidos na tela.
    logradouro.innerText = endereco.logradouro || 'Não informado';
    bairro.innerText = endereco.bairro || 'Não informado';
    cidade.innerText = endereco.localidade || 'Não informado';
    estado.innerText = endereco.uf || 'Não informado';
    ddd.innerText = endereco.ddd || 'Não informado';

    mensagem.innerText = 'Consulta realizada com sucesso!';
    resultado.classList.remove('oculto');

  } catch (erro) {

      console.error(erro);
      mensagem.innerText = 'Erro ao consultar o CEP. Verifique a internet e tente novamente.';
  
    } finally {

      botaoBuscar.disabled = false;
      botaoBuscar.innerText = 'Buscar';
    }
    
});
