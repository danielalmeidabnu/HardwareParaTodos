var NomeProduto = "";
var IdProduto = 0;
var PrecoProduto = 0;

//Clicar no botão Buscar
$(document).ready(function () {
    $("#buscar").click(function () {
        var IdProduto = $("#IdProduto").val();
        obterProdutoId(IdProduto);
    });
});

function obterProdutoId(Id) {
    $.ajax({
        Headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, POST, DELETE, OPTIONS',
            'Access-Control-Max-Age': '86400'
        },
        "crossDomain": true,
        "url": `http://localhost:5000/produtos/${Id}`,
        "method": "GET",
        success: function (dados) {
            mostrarDado(dados);
        }
    })
}

function mostrarDado(dados) {
    const tbody = $('#produtos');
    const ttbody = $('#produtosId');
    NomeProduto = dados.nome;
    IdProduto = dados.id;
    PrecoProduto = dados.preco;

    tbody.remove()
    ttbody.empty()
    ttbody.append(`
                        <div class="col-sm-4">
                        <div class="card card border-dark mb-4">
                            <img class="card-img-top"
                                src="${dados.imagem}"
                                alt="Card image cap">
                            <div class="card-body">
                                <h5 class="card-title">${dados.nome}</h5>
                                <p id="NomeProduto" class="card-text">${dados.descricao}.</p>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item text-laranja">Marca ${dados.marca}</li>
                                    <li class="list-group-item text-laranja" id="preco"><b>Preço</> R$${dados.preco}</li>
                                </ul>
                                <br>
                                <form>
                                    <div class="form-row">
                                    <div class="col-md-5">
                                        <a id="comprar" onClick="CadastrarPedido()" class="btn btn-block btn-dark">Comprar</a>
                                    </div>
                                    <div class="col-md-3">
                                        <input id="qtd" type="text" class="form-control float-right" placeholder="Qtd.">
                                    </div>
                                    </div>
                                </form>
                            </div>
                            <div class="card text-center">
                                <div id="idProduto" class="card-footer text-muted">
                                    Id ${dados.id}
                                </div>
                            </div>
                        </div>
                    </div>                          
        `)
}

function obterProdutos() {
    $.ajax({
        Headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, POST, DELETE, OPTIONS',
            'Access-Control-Max-Age': '86400'
        },
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:5000/produtos",
        "method": "GET",
        success: function (dados) {
            mostrarProduto(dados);
        }
    })

    function mostrarProduto(dados) {
        const tbody = $('#produtos');
        $.each(dados, function (i, el) {
            tbody.append(`
                        <div class="col-sm-4">
                        <div class="card card border-dark mb-4">
                            <img class="card-img-top"
                                src="${el.imagem}"
                                alt="Card image cap">
                            <div class="card-body">
                                <h5 class="card-title">${el.nome}</h5>
                                <p class="card-text">${el.descricao}.</p>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item text-laranja">Marca ${el.marca}</li>
                                    <li class="list-group-item text-laranja">Preço R$ ${el.preco}</li>
                                </ul>
                                <br>
                                <form>
                                    <div class="form-row">
                                    <div class="col-md-5">
                                        <a id="comprar" onClick="CadastrarPedido()" class="btn btn-block btn-dark">Comprar</a>
                                    </div>
                                    <div class="col-md-3">
                                        <input id="qtd" type="text" class="form-control float-right" placeholder="Qtd.">
                                    </div>
                                    </div>
                                </form>
                            </div>
                            <div class="card text-center">
                                <div class="card-footer text-muted">
                                    Id ${el.id}
                                </div>
                            </div>
                        </div>
                    </div>                            
        `)
        })
    }
}

function CadastrarPedido() {
    var Prosseguir = true
    //Campo da tela
    const QtdProduto = $('#qtd').val()

    if (QtdProduto == "") {
        Prosseguir = false
        alert('Para gravar um pedido é necessário inserir uma quantidade no produto!')
    }
    if (Prosseguir) {
        var pedido = {
            "clienteId": 1,
            "itens": [
                {
                    "produtoId": IdProduto,
                    "produto": NomeProduto,
                    "quantidade": QtdProduto,
                    "valor": PrecoProduto
                }
            ],
            "valorTotal": PrecoProduto * QtdProduto
        }

        $.ajax({
            Headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, POST, DELETE, OPTIONS',
                'Access-Control-Max-Age': '86400'
            },
            'type': 'POST',
            'url': 'http://localhost:5000/pedidos',
            'data': JSON.stringify(pedido),
            'contentType': 'application/json',
            'dataType': 'json'
        });
    }
}

obterProdutos();
