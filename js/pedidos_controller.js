function obterPedidos() {
  $.ajax({
    Headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, POST, DELETE, OPTIONS',
      'Access-Control-Max-Age': '86400'
    },
    "async": true,
    "crossDomain": true,
    "url": "http://localhost:5000/pedidos",
    "method": "GET",
    success: function (dados) {
      mostrarPedido(dados);
    }
  })
}

function mostrarPedido(dados) {
  const tbody = $('#pedidos');
  $.each(dados, function (i, el) {
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
  })

}

obterPedidos()