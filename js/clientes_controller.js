var Prosseguir = true;

// Clicar no botão Gravar
$(document).ready(function() {
  $("#gravarCliente").click(function(){
    gravarCliente()
  }); 
});

// Clicar em Cadastro
$(document).ready(function() {
  $("#cadastro").click(function(){
    CadastroCliente()
  }); 
});

// Clicar em Login
$(document).ready(function() {
  $("#login").click(function(){
    EfetuarLogin()
  }); 
});

function EfetuarLogin(){
  $.ajax({
    "async": true,
    "crossDomain": true,
    "url": "http://localhost:5000/clientes",
    "method": "GET",
    success: function (dados) {
        acharcliente(dados);
  }
  })
}

function acharcliente(dados){
  const Login = $("#usuariologin").val()
  const Senha = $("#senhalogin").val()
  $.each(dados, function (i, el) {
    if (Login == el.login && Senha == el.senha ) {
        var C_CIdCliente = el.id;
        alert(`Usuário ${el.nome} logado!`)
  }
  })
}

function CadastroCliente(){
  const bodyDestaques = $('#destaques')
  const bodyLogin = $('#login')
  bodyLogin.remove()
  bodyDestaques.append(`      
  <div class="container-fluid" id="destaques">
  <form>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="inputEmail4">Email</label>
        <input type="email" class="form-control" id="email" placeholder="Email">
        <small id="emailHelp" class="form-text text-muted">Não vamos te mandar spam ;)</small>            
        </div>
      <div class="form-group col-md-6">
        <label for="inputPassword4">Senha</label>
        <input type="password" class="form-control" id="senha" placeholder="Senha">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="inputPassword4">Login</label>
        <input class="form-control" id="login" placeholder="Usado para logar">                  
      </div>
      <div class="form-group col-md-6">
        <label for="inputPassword4">Nome</label>
        <input class="form-control" id="nome">                  
      </div>
    </div>
    <div class="form-group">
      <label for="inputAddress">Endereço</label>
      <input type="text" class="form-control" id="endereco" placeholder="Rua princiap, 1234">
    </div>
    <div class="form-group">
      <label for="inputAddress2">Complemento</label>
      <input type="text" class="form-control" id="complemento" placeholder="Apartamento, estúdio...">
    </div>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="inputCity">Cidade</label>
        <input type="text" class="form-control" id="cidade" placeholder="São Paulo, Minas Gerais...">
      </div>
      <div class="form-group col-md-4">
        <label for="uf">Estado</label>
        <select id="uf" class="form-control">
          <option selected>Escolha...</option>
          <option>SC</option>
          <option>SP</option>
          <option>RS</option>
          <option>MG</option>
          <option>AC</option>
          <option>AL</option>
          <option>GO</option>
          <option>AC</option>
          <option>MA</option>
          <option>MT</option>
          <option>MS</option>
          <option>BA</option>
          <option>CE</option>
          <option>AP</option>
          <option>AM</option>
          <option>DF</option>
          <option>SE</option>
          <option>PA</option>
        </select>
      </div>
      <div class="form-group col-md-2">
        <label for="inputZip">CEP</label>
        <input type="text" class="form-control" id="cep">
      </div>
    </div>
    <a id="gravarCliente" onClick="gravarCliente()" class="btn btn-dark btn-block">Cadastrar</a>
  </form>
  
</div>
  `)
}

function gravarCliente(){
  //Pegando valores do formulário
  const nome =$("#nome").val()
  const cep =$("#cep").val()
  const logradouro =$("#endereco").val()
  // const numero =$("#numero").val()
  const complemento =$("#complemento").val()
  const cidade =$("#cidade").val()
  const uf =$("#uf").val()
  const login =$("#login").val()
  const senha =$("#senha").val()
  const email =$("#email").val()
  
  if (login == "" || senha == "") {
     Prosseguir = false 
     alert('É Necessário no minimo informa um login e senha, verifique!')
  }
  if (Prosseguir) {
      var cliente =  {
        nome: nome,
        endereco: {
          id: "0",
          cep: cep,
          logradouro: logradouro,
          numero: "0",
          complemento: complemento,
          bairro: "teste",
          cidade: cidade,
          uf: uf
        },
        login: login,
        senha: senha,
        email: email
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
}
