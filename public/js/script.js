var proximoId = 0;


//Cadastrar Empresas
function cadastrarEmpresa(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("demo").innerText = this.responseText;
      }
    }

  //Cria variaveis que receberão cada valor digitados nos elementos do DOM
  var id = proximoId++;
  var razaoSocial = document.getElementById("razaoSocial").value;
  var fantasia = document.getElementById("fantasia").value;
  var cidade = document.getElementById("cidade").value;
  var endereco = document.getElementById("endereco").value;
  var bairro = document.getElementById("bairro").value;
  var cnpj = document.getElementById("cnpj").value;
  var responsavel = document.getElementById("responsavel").value;
  var telefone = document.getElementById("telefone").value;

  //Atribui os valores da variavel acima em um objeto JavaScript
  var empresa = {
    id : id,
    razaoSocial : razaoSocial,
    fantasia : fantasia,
    cidade : cidade,
    endereco : endereco,
    bairro : bairro,
    cnpj : cnpj,
    responsavel : responsavel,
    telefone : telefone,
  }

  //O objeto empresa eh tranformado em JSON
  var cadEmpresa = JSON.stringify(empresa);
  
  //Eh aberta uma comunicacao com a pagina que recebera o JSON
  xhttp.open("POST", "http://02.suportelab.com.br:15006/empresa", true);
  //Definido qual o tipo do conteudo enviado(no caso JSON)
  xhttp.setRequestHeader("Content-Type", "application/json");
  //O JSON cadEmpresa eh enviado
  xhttp.send(cadEmpresa);
}


//Listar Empresas
function listarEmpresa() {
	//requisição para buscar objetos dentro da URL "bdempresas"
	fetch('/bdempresas')
	.then(response => response.json())
	.then(empresas => {
		const tabela = document.getElementById("tabela-empresas");
    
  	empresas.forEach(empresa => {
    const linha = document.createElement("tr");

    const colunaId = document.createElement("td");
    colunaId.innerHTML = empresa.id;
    linha.appendChild(colunaId);

    const colunaRazaoSocial = document.createElement("td");
    colunaRazaoSocial.innerHTML = empresa.razaoSocial;
    linha.appendChild(colunaRazaoSocial);
    
    const colunaFantasia = document.createElement("td");
    colunaFantasia.innerHTML = empresa.fantasia;
    linha.appendChild(colunaFantasia);
    
    const colunaCidade = document.createElement("td");
    colunaCidade.innerHTML = empresa.cidade;
    linha.appendChild(colunaCidade);
    
    const colunaEndereco = document.createElement("td");
    colunaEndereco.innerHTML = empresa.endereco;
    linha.appendChild(colunaEndereco);
    
    const colunaBairro = document.createElement("td");
    colunaBairro.innerHTML = empresa.bairro;
    linha.appendChild(colunaBairro);
    
    const colunaCnpj = document.createElement("td");
    colunaCnpj.innerHTML = empresa.cnpj;
    linha.appendChild(colunaCnpj);
    
    const colunaResponsavel = document.createElement("td");
    colunaResponsavel.innerHTML = empresa.responsavel;
    linha.appendChild(colunaResponsavel);
    
    const colunaTelefone = document.createElement("td");
    colunaTelefone.innerHTML = empresa.telefone;
    linha.appendChild(colunaTelefone);

    const colunaEditar = document.createElement("td");
	const botaoEditar = document.createElement("a");
	botaoEditar.innerHTML = "Editar";
    botaoEditar.setAttribute("class", "btn btn-light");
    botaoEditar.setAttribute("href", "http://02.suportelab.com.br:15006/buscaEmpresa/?id="+ empresa.id);
	colunaEditar.appendChild(botaoEditar);
	linha.appendChild(colunaEditar);

	const colunaExcluir = document.createElement("td");
	const botaoExcluir = document.createElement("button");
	botaoExcluir.innerHTML = "Excluir";
	botaoExcluir.setAttribute("onclick", "excluirEmpresa(" + empresa.id + ")");
    botaoExcluir.setAttribute("class", "btn btn-danger");
	colunaExcluir.appendChild(botaoExcluir);
    linha.appendChild(colunaExcluir);
	

    tabela.appendChild(linha);
  });
})
	.catch(error => console.log(error))
}


//Editar Empresa
function buscaEmpresa(id){
  	fetch("/empresa/"+id)
    .then(response => response.json())
    .then(empresas => {
    console.log(empresas.id)
    	document.querySelector('#id').value = empresas.id;
    	document.querySelector('#razaoSocial').value = empresas.razaoSocial;
		document.querySelector('#fantasia').value = empresas.fantasia;
		document.querySelector('#cidade').value = empresas.cidade;
    	document.querySelector('#endereco').value = empresas.endereco;
    	document.querySelector('#bairro').value = empresas.bairro;
    	document.querySelector('#cnpj').value = empresas.cnpj;
    	document.querySelector('#telefone').value = empresas.telefone;
})
}

function salvarEmpresa (){
	var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("demo").innerText = this.responseText;
      }
    }

  var id = document.getElementById("id").value;;
  var razaoSocial = document.getElementById("razaoSocial").value;
  var fantasia = document.getElementById("fantasia").value;
  var cidade = document.getElementById("cidade").value;
  var endereco = document.getElementById("endereco").value;
  var bairro = document.getElementById("bairro").value;
  var cnpj = document.getElementById("cnpj").value;
  var responsavel = document.getElementById("responsavel").value;
  var telefone = document.getElementById("telefone").value;

var empresa = {
    id : id,
    razaoSocial : razaoSocial,
    fantasia : fantasia,
    cidade : cidade,
    endereco : endereco,
    bairro : bairro,
    cnpj : cnpj,
    responsavel : responsavel,
    telefone : telefone,
  }

  //O objeto empresa eh tranformado em JSON
  var CadEmpresa = JSON.stringify(empresa);
  
  //Eh aberta uma comunicacao com a pagina que recebera o JSON
  xhttp.open("PUT", "http://02.suportelab.com.br:15006/salvaEmpresa/"+id, true);
  //Definido qual o tipo do conteudo enviado(no caso JSON)
  xhttp.setRequestHeader("Content-Type", "application/json");
  //O JSON cadEmpresa eh enviado
  xhttp.send(CadEmpresa);

}

//Excluir Empresas
function excluirEmpresa(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        //Exibe uma mensagem de sucesso ou erro
        alert(this.responseText);
      }
    }
  
    //Abre uma comunicação com a página que excluirá a empresa
    xhttp.open("DELETE", "http://02.suportelab.com.br:15006/empresa/" + id, true);
    xhttp.send();
  }