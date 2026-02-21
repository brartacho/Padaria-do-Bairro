// Informações da padaria
// escreva 3 variaveis contendo nome, endereco e telefone

let nomePadaria = "Padaria do Bairro";
let enderecoPadaria = "Rua do Chaves, 123 - Uberlândia MG";
let telefonePadaria = "(34)99999-9999";

// escreva 3 variaveis com preços de produtos
let precoPao = 1.50;
let precoPastel = 10.00;
let precoBoloChocolate = 12.00;

// escreva 3 variaveis do controle do estoque
let qtdPao = 100;
let qtdPastel = 40;
let qtdBoloChocolate = 15;

// array de produtos
// const produtos = ["produto1", "produto2", "produto3"];

const produtos = ["Pão Francês", "Pastel de Queijo", "Bolo de Chocolate"];

// array de categorias
const categorias = ["Pães", "Salgados", "Doces", "Bebidas"];

// objeto produto completo
// const produto = {
//     nome: "Café";
//     categoria: "bebida";
//     ingredientes: ["Pó de café", "água", "açucar",];
// }

const produto = {
    nome: "Pão Frances",
    categoria: "Assados",
    preco: 1.50,
    estoque: 100,
}


// Exemplo de var (não recomendada)


// Constante que não pode ser alterada
const cnpjPadaria = "25.812.118/0001-45";


// Let que pode ser reatribuida
let qtdBrownie = 100;



// Crie um array de objetos
const listagemProdutos = [
    {
        nome: "Pão Frances",
        categoria: "Assados",
        preco: 1.50,
        estoque: 100,
    },

    {
        nome: "Pastel",
        categoria: "Fritos",
        preco: 10.00,
        estoque: 50,
    },

    {
        nome: "Bolo de Chocolate",
    categoria: "Doces",
        preco: "R$ 12.00",
        estoque: 15,
    },
]


//  crie uma função que sauda o cliente de acordo com o horário que ele entra no site:

// função com if/else
// Bom dia!
// Boa tarde!
// Boa noite!

const horaAtual = new Date().getHours();  //capta a hora atual do computador

function saudacao(horario) {
    if (horario < 12) {
        alert("Bom dia!")
    } else if (horario <= 18) {
        alert("Boa Tarde!")
    } else {
        alert("Boa Noite!")
    }
}


// invocando a função
// saudacao(14);  //aqui é possivel testar incluindo diferentes horas
saudacao(horaAtual);   //aqui capta de forma automática o horário do computador

 

