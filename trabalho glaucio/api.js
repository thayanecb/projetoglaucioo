console.log("js carregado")

function obterMensagens() {

    var retorno = [];

    var consulta = $.ajax({
        url: 'https://app-uniesp-p2-43622fe4ead4.herokuapp.com/mensagens',
        method: 'GET',
        dataType: 'json',
        async: false
    }).fail(function(){
        return retorno;
    });

    consulta.done(function(data) {
        retorno = data;
    });

    return retorno;

}
console.log(obterMensagens())


function exibirRetornoListaObjetos() {

    const resultadoListaObjetos = obterMensagens();

    const elementoResultadoListaObjetos = document.getElementById('resultadoListaObjetos');

    elementoResultadoListaObjetos.innerHTML = '';

    const tabela = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const cabecalho = thead.insertRow();
    for (const chave in resultadoListaObjetos[0]) {
        const colunaCabecalho = document.createElement('th');
        colunaCabecalho.textContent = chave;
        cabecalho.appendChild(colunaCabecalho);
    }

    tabela.appendChild(thead);

    resultadoListaObjetos.forEach((objeto) => {
        const linha = tbody.insertRow();

        for (const chave in objeto) {
            const coluna = linha.insertCell();
            coluna.textContent = objeto[chave];
        }
    });

    tabela.appendChild(tbody);
    elementoResultadoListaObjetos.appendChild(tabela);
}

document.addEventListener("DOMContentLoaded", exibirRetornoListaObjetos);

function inserirMensagem(obj) {

    var obj = {
            nome: document.getElementById('nome').value, 
            email: document.getElementById('email').value, 
            mensagem: document.getElementById('mensagem').value} 

    console.log(obj)
    var inserir = $.ajax({

        url: 'https://app-uniesp-p2-43622fe4ead4.herokuapp.com/mensagens',
        method: 'POST',
        data: JSON.stringify(obj),
        dataType: 'json',
        async: false,
        contentType: 'application/json',
    });
}

function validarUsuario(objLoginSenha) {

    //email: admin@admin.com
    //senha: '1234'


    var objLoginSenha = {
            email: document.getElementById('login').value, 
            senha: document.getElementById('senha').value} 


    var retorno = false;

    console.log(objLoginSenha);

    var validacao = $.ajax({
        url: 'https://app-uniesp-p2-43622fe4ead4.herokuapp.com/usuarios/validar',
        method: 'POST',
        dataType: 'json',
        async: false,
        headers: {
            'Access-Control-Allow-Origin': '*'
                },
        contentType: 'application/json',
        data: JSON.stringify(objLoginSenha)
    }).fail(function(){
        return retorno;
    });

    validacao.done(function(data) {
        retorno = data;
        if(retorno == true){
            location.href = "mensagens.html"
        }
    });

    return retorno;
}