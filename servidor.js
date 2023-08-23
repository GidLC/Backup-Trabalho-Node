const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const port = 15006

app.listen(port);
console.log('conectado na porta '+port);

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static('public'));

//Objeto Empresa
var empresas = {
    empresa: [{
    }
    ]
}

//Exibindo a página inicial
app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, '/index.html'));
})

//exibindo o cadastro de empresas
app.get('/empresas', (req,res)=>{ 
	res.sendFile(path.join(__dirname, '/empresas.html'));
})

//exibir a página de editar uma empresa
app.get('/buscaEmpresa', (req,res)=>{ 
	res.sendFile(path.join(__dirname, 'public/html/editaEmpresa.html'));
})

//"Banco de dados" / "arquivo de ponta"
app.get('/bdempresas', (req,res)=>{ 
	res.json(empresas.empresa);
})

//exibindo uma empresa específica
app.get('/empresa/:id', (req, res) =>{
	if(isNaN(req.params.id)){
    	res.sendStatus(404);
    }else{
    	var id = parseInt(req.params.id);
    	var oneMember = empresas.empresa.find(m => m.id == id);
    	res.sendStatus = 200;
    	res.json(oneMember);
}
})

//cadastrando empresa
app.post('/empresa', (req,res) => {
    var {id, razaoSocial, fantasia, cidade, endereco, bairro, cnpj, responsavel, telefone} = req.body;
    empresas.empresa.push({
        id,
        razaoSocial,
        fantasia,
        cidade,
        endereco,
        bairro,
        cnpj,
    	responsavel,
        telefone
    });
    res.sendStatus(200);

});

//Deletando uma empresa
app.delete('/empresa/:id', (req, res) => {
		if(isNaN(req.params.id)){
    	res.sendStatus(400);
    }else{
    	var id = parseInt(req.params.id);
    	var index = empresas.empresa.findIndex(m => m.id === id);
    	empresas.empresa.splice(index, 1);
    	res.sendStatus(200);	
    }
});

app.put('/salvaEmpresa/:id', (req, res) => {
	var id = parseInt(req.params.id);
	var empresa = empresas.empresa.find(m => m.id === id);

	var {razaoSocial, fantasia, cidade, endereco, bairro, cnpj, responsavel, telefone} = req.body;

	empresa.razaoSocial = razaoSocial;
	empresa.fantasia = fantasia;	
	empresa.cidade = cidade;
	empresa.endereco = endereco;
	empresa.bairro = bairro;
	empresa.cnpj = cnpj;
	empresa.responsavel = responsavel;
	empresa.telefone = telefone;

	res.sendStatus(200);
});
