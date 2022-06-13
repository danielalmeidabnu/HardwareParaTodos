$(document).ready(function() {
    $("#buscar").click(function(){
        const IdProduto = $("#IdProduto").val();
        obterProdutoId(IdProduto);
    }); 
});

function obterProdutoId(Id){
    $.ajax({   "crossDomain": true,
               "url": `http://localhost:5000/produtos/${Id}`,
               "method": "GET",
        success: function(dados){
             mostrarDados(dados);
        },
    })      
}

function mostrarDados(dados){
    const tbody = $('#produtos');
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
                                <a id="comprar" href="#" class="btn btn-block btn-dark">Comprar</a>
                            </div>
                            <div class="col-md-3">
                                <input type="text" class="form-control float-right" placeholder="Qtd.">
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
   };
