function obterPedidos(){
    $.ajax({
               "async": true,
               "crossDomain": true,
               "url": "http://localhost:5000/pedidos",
               "method": "GET",
        success: function(dados){
            mostrarPedido(dados);
        }
    })      
}

function mostrarPedido(dados){
  const tbody = $('#pedidos');
  var num = 0
     $.each(dados, function(i, el){     
      tbody.append(`
                     <div class="card border-dark mb-3">
                         <h5 class="card-header">Pedido Nª ${el.id}</h5>
                       <div id="cardcorpo" class="card-body">
                         <h5 class="card-title">Produto ${el.itens[0].produtoId} - ${el.itens[0].produto}</h5>
                         <p class="card-text">Quantidade ${el.itens[0].quantidade}</p>
                         <p class="card-text">Preço total do Pedido R$${el.valorTotal}.</p>
                       </div>
                     </div>
      `)
      num = num + 1
     })
     
 }

 obterPedidos()