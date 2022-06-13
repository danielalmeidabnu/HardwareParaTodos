// Clicar no botão Gravar
$(document).ready(function() {
  $("#gravar").click(function(){
    gravarCliente()
  }); 
});

function gravarCliente(){
   var cliente =  {
    id: "0",
    nome: "daniel o retorno 2",
    endereco: {
      id: "0",
      cep: "89042300",
      logradouro: "rua Johan Ohf",
      numero: "1445",
      complemento: "Bloco12",
      bairro: "Água Verde",
      cidade: "SC",
      uf: "SC"
    },
    login: "Dani",
    senha: "12345",
    email: "almeidafdaniel01@gmail.com"
  }
  
  $.ajax({
    Headers :{
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, POST, DELETE, OPTIONS',
      'Access-Control-Max-Age': '86400'
    },
      'type' : 'POST',
      'url'  : 'http://localhost:5000/clientes',
      'data' : JSON.stringify(cliente),
      'contentType':'application/json',
      'dataType': 'json'
  });

}
//debugger;
// gravarCliente()
