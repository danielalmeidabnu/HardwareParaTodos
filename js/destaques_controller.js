
//usando AJAX
function obterDestaques(){
    $.ajax({
               "async": true,
               "crossDomain": true,
               "url": "http://localhost:5000/produtos",
               "method": "GET",
        beforeSend: function(){
            $('#destaques').after('<p class="loading">Carregando</p>');
        },
        error: function(){
            $('#destaques').after('<p class="loading">Carregou com Sucesso</p>');
        },
        success: function(dados){
             mostrarDados(dados);
        },
        complete: function(){
            $('.loading').remove();               
        }
    })      
    
    function mostrarDados(dados){
     const tbody = $('#destaques');
        $.each(dados, function(i, el){
            tbody.append(`<div class="carousel-item">
                            <img src="${el.imagem}" class="d-block w-100" alt="...">
                            <div class="carousel-caption d-none d-md-block">
                                <h5>${el.nome} - ${el.marca}</h5>
                                <p>${el.preco}.</p>
                            </div>
                        </div>                            
           `)
        })
    }
 }
 
//debugger;
obterDestaques();
