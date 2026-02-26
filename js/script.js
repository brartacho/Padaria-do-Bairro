// ==========================================
// INFORMAÇÕES DA PADARIA
// ==========================================
let nomePadaria = "Padaria do Bairro";
let enderecoPadaria = "Rua do Chaves, 123 - Uberlândia MG";
let telefonePadaria = "(34)99999-9999";

let precoPao = 1.50;
let precoPastel = 10.00;
let precoBoloChocolate = 12.00;

let qtdPao = 100;
let qtdPastel = 40;
let qtdBoloChocolate = 15;

const categorias = ["Pães", "Salgados", "Doces", "Bebidas", "Lanches"];
const cnpjPadaria = "25.812.118/0001-45";

// ==========================================
// BANCO DE DADOS DE PRODUTOS
// ==========================================
const listagemProdutos = [
    { nome: "Pão Francês", categoria: "Pães", preco: 1.50, estoque: 100 },
    { nome: "Pão Integral", categoria: "Pães", preco: 2.00, estoque: 50 },
    { nome: "Pão de Açúcar", categoria: "Pães", preco: 2.50, estoque: 40 },
    { nome: "Croissant", categoria: "Salgados", preco: 9.00, estoque: 30 },
    { nome: "Coxinha", categoria: "Salgados", preco: 6.00, estoque: 50 },
    { nome: "Pastel de Queijo", categoria: "Salgados", preco: 10.00, estoque: 40 },
    { nome: "Esfirra", categoria: "Salgados", preco: 5.00, estoque: 60 },
    { nome: "Bolo de Chocolate", categoria: "Doces", preco: 12.00, estoque: 15 },
    { nome: "Torta de Morango", categoria: "Doces", preco: 15.00, estoque: 10 },
    { nome: "Brownie com Nutella", categoria: "Doces", preco: 15.00, estoque: 20 },
    { nome: "Café Coado", categoria: "Bebidas", preco: 5.00, estoque: 100 },
    { nome: "Cappuccino", categoria: "Bebidas", preco: 6.50, estoque: 50 },
    { nome: "Coca-Cola", categoria: "Bebidas", preco: 6.00, estoque: 80 },
    { nome: "Coca-Cola 350ml", categoria: "Bebidas", preco: 5.00, estoque: 80 },
    { nome: "Hambúrguer Caseiro", categoria: "Lanches", preco: 25.00, estoque: 30 },
    { nome: "Batata Frita", categoria: "Lanches", preco: 15.00, estoque: 40 }
];

// ==========================================
// SISTEMA DE BUSCA / FILTRO DE PRODUTOS
// ==========================================
const padronizarTexto = (texto) => {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/\s+/g, " ");
};

document.getElementById("campo-filtro")?.addEventListener("input", (e) => {
    const valorBusca = padronizarTexto(e.target.value);
    const resultado = document.getElementById("resultado");
    if (!resultado) return;

    resultado.innerHTML = "";

    if (valorBusca === "") return;

    const produtosFiltrados = listagemProdutos.filter((produto) => {
        const nomeLimpo = padronizarTexto(produto.nome);
        const categoriaLimpa = padronizarTexto(produto.categoria);
        return nomeLimpo.includes(valorBusca) || categoriaLimpa.includes(valorBusca);
    });

    if (produtosFiltrados.length === 0) {
        const li = document.createElement("li");
        li.innerHTML = `<span style="color: #888; font-style: italic; width: 100%; text-align: center;">Poxa, não encontramos essa gostosura... 😢</span>`;
        li.style.display = "block";
        li.style.padding = "15px";
        resultado.appendChild(li);
        return;
    }

    produtosFiltrados.forEach((produto) => {
        const li = document.createElement("li");
        const precoFormatado = produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        li.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: flex-start; text-align: left;">
                <strong style="color: #333; font-size: 1.05em;">${produto.nome}</strong>
                <span style="font-size: 0.8em; color: #888;">Categoria: ${produto.categoria}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 15px;">
                <span class="preco-resultado" style="font-weight: 800; color: #28a745;">${precoFormatado}</span>
                <button onclick="adicionarPeloFiltro('${produto.nome}', ${produto.preco})" 
                        style="background-color: #d32f2f; color: white; border: none; padding: 6px 12px; border-radius: 15px; cursor: pointer; font-weight: bold; font-size: 0.9em; transition: background-color 0.2s;"
                        onmouseover="this.style.backgroundColor='#b71c1c'" 
                        onmouseout="this.style.backgroundColor='#d32f2f'">
                    + Add
                </button>
            </div>
        `;
        li.style.background = "transparent";
        resultado.appendChild(li);
    });
});

// ==========================================
// CARRINHO DE COMPRAS (SALVA NA MEMÓRIA)
// ==========================================

// Tenta carregar o carrinho salvo no navegador. Se não existir, inicia vazio.
let carrinho = JSON.parse(localStorage.getItem('carrinhoPadaria')) || [];

// Função mágica que salva os dados no navegador
function salvarCarrinho() {
    localStorage.setItem('carrinhoPadaria', JSON.stringify(carrinho));
}

function adicionarAoCarrinho(nomeProduto, precoProduto, idInputQtd) {
    const inputQtd = document.getElementById(idInputQtd);
    if (!inputQtd) return;

    const quantidade = parseInt(inputQtd.value);
    const limiteMaximo = parseInt(inputQtd.max) || 20;

    if (isNaN(quantidade) || quantidade <= 0) {
        alert("Por favor, insira uma quantidade válida.");
        return;
    }

    const itemExistente = carrinho.find(item => item.nome === nomeProduto);
    let quantidadeFutura = quantidade;

    if (itemExistente) quantidadeFutura += itemExistente.quantidade;

    if (quantidadeFutura > limiteMaximo) {
        alert(`Atenção: O limite máximo por encomenda é de ${limiteMaximo} unidades de ${nomeProduto}.`);
        inputQtd.value = 1;
        return;
    }

    if (itemExistente) {
        itemExistente.quantidade += quantidade;
    } else {
        carrinho.push({ nome: nomeProduto, preco: precoProduto, quantidade: quantidade });
    }

    salvarCarrinho();
    inputQtd.value = 1;
    renderizarCarrinho();
    abrirCarrinho();
}

function alterarQuantidade(index, mudanca) {
    carrinho[index].quantidade += mudanca;
    if (carrinho[index].quantidade <= 0) {
        carrinho.splice(index, 1);
    }
    salvarCarrinho();
    renderizarCarrinho();
}

function limparCarrinho() {
    if (confirm("Tem certeza que deseja esvaziar seu carrinho?")) {
        carrinho = [];
        salvarCarrinho();
        renderizarCarrinho();
    }
}

function adicionarPeloFiltro(nomeProduto, precoProduto) {
    const itemExistente = carrinho.find(item => item.nome === nomeProduto);
    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({ nome: nomeProduto, preco: precoProduto, quantidade: 1 });
    }
    salvarCarrinho();
    renderizarCarrinho();
    abrirCarrinho();
    const campoFiltro = document.getElementById("campo-filtro");
    const resultado = document.getElementById("resultado");
    if (campoFiltro) campoFiltro.value = "";
    if (resultado) resultado.innerHTML = "";
}

function renderizarCarrinho() {
    const containerItens = document.getElementById('itens-carrinho');
    const displayTotal = document.getElementById('valor-total');
    const badge = document.getElementById('carrinho-badge');

    let total = 0;
    let totalItens = 0;

    if (containerItens) containerItens.innerHTML = '';

    if (carrinho.length === 0) {
        if (containerItens) containerItens.innerHTML = '<p class="carrinho-vazio">Seu carrinho está vazio.</p>';
        if (displayTotal) displayTotal.innerText = 'R$ 0,00';
        if (badge) badge.style.display = 'none';
        return;
    }

    carrinho.forEach((item, index) => {
        const subtotal = item.preco * item.quantidade;
        total += subtotal;
        totalItens += item.quantidade;

        if (containerItens) {
            containerItens.innerHTML += `
                <div class="item-carrinho" style="display:flex; flex-direction:column; gap:10px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; width:100%;">
                        <strong style="color:var(--cor-secundaria); font-size:1.1rem;">${item.nome}</strong>
                        <span style="font-weight:800; color:var(--cor-primaria);">R$ ${subtotal.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <div style="display:flex; justify-content:flex-start; align-items:center;">
                        <div style="display:flex; align-items:center; background-color:var(--cor-fundo-campos-formularios); border:2px solid var(--cor-bordas-campos-formulario); border-radius:30px; padding:2px 5px;">
                            <button onclick="alterarQuantidade(${index}, -1)" style="background:none; border:none; color:var(--cor-secundaria); font-size:1.3rem; font-weight:bold; cursor:pointer; width:30px; height:30px; display:flex; align-items:center; justify-content:center;">-</button>
                            <span style="font-weight:800; color:var(--cor-secundaria); width:25px; text-align:center;">${item.quantidade}</span>
                            <button onclick="alterarQuantidade(${index}, 1)" style="background:none; border:none; color:var(--cor-secundaria); font-size:1.2rem; font-weight:bold; cursor:pointer; width:30px; height:30px; display:flex; align-items:center; justify-content:center;">+</button>
                        </div>
                    </div>
                </div>
            `;
        }
    });

    if (containerItens) {
        containerItens.innerHTML += `
            <div style="text-align: right; margin-top: 20px;">
                <button onclick="limparCarrinho()" style="background: none; border: none; color: var(--cor-erro); font-size: 0.9rem; font-weight: 700; cursor: pointer; text-decoration: underline;">Limpar Carrinho 🗑️</button>
            </div>
        `;
    }

    if (displayTotal) displayTotal.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;

    if (badge) {
        badge.innerText = totalItens;
        badge.style.display = 'flex';
    }
}

// ==========================================
// CONTROLE DE VISIBILIDADE (CARRINHO, MENU E WHATSAPP E OVERLAY)
// ==========================================

// Controla o fundo embaçado
function controlarOverlay(mostrar) {
    const overlay = document.getElementById('overlay-fundo');
    if (overlay) {
        if (mostrar) {
            overlay.classList.add('ativo');
        } else {
            overlay.classList.remove('ativo');
        }
    }
}

// Controla o botão do WhatsApp
function controlarWhatsApp() {
    const btnWhatsapp = document.querySelector('.btn-whatsapp');
    const menuContainer = document.querySelector('.menus-navegacao');
    const carrinhoContainer = document.getElementById('carrinho-lateral');

    let menuAberto = menuContainer ? menuContainer.classList.contains('menu-aberto') : false;
    let carrinhoAberto = carrinhoContainer ? !carrinhoContainer.classList.contains('carrinho-oculto') : false;

    if (btnWhatsapp) {
        if (menuAberto || carrinhoAberto) {
            btnWhatsapp.classList.add('esconder-elemento');
        } else {
            btnWhatsapp.classList.remove('esconder-elemento');
        }
    }
}

// Função mestra que fecha tudo (acionada ao clicar no fundo embaçado ou botões X)
function fecharTudo() {
    // Fecha o carrinho
    const carrinho = document.getElementById('carrinho-lateral');
    if (carrinho) carrinho.classList.add('carrinho-oculto');

    // Fecha o menu hamburguer
    const menu = document.querySelector('.menus-navegacao');
    const btnMobile = document.querySelector('.btn-mobile');
    if (menu) menu.classList.remove('menu-aberto');
    if (btnMobile) btnMobile.innerHTML = '☰';

    // Tira o fundo embaçado e volta o WhatsApp
    controlarOverlay(false);
    controlarWhatsApp();
}

function abrirCarrinho() {
    // Oculta o menu hamburguer se estiver aberto para não encavalar
    const menu = document.querySelector('.menus-navegacao');
    const btnMobile = document.querySelector('.btn-mobile');
    if (menu && menu.classList.contains('menu-aberto')) {
        menu.classList.remove('menu-aberto');
        if (btnMobile) btnMobile.innerHTML = '☰';
    }

    const carrinhoContainer = document.getElementById('carrinho-lateral');
    if (carrinhoContainer) carrinhoContainer.classList.remove('carrinho-oculto');

    controlarOverlay(true); // Liga o fundo embaçado
    controlarWhatsApp();
}

function fecharCarrinho() {
    fecharTudo();
}

function toggleMenu() {
    // Oculta o carrinho se estiver aberto para não encavalar
    const carrinho = document.getElementById('carrinho-lateral');
    if (carrinho && !carrinho.classList.contains('carrinho-oculto')) {
        carrinho.classList.add('carrinho-oculto');
    }

    const menusContainer = document.querySelector('.menus-navegacao');
    const btnMobile = document.querySelector('.btn-mobile');

    if (menusContainer && btnMobile) {
        menusContainer.classList.toggle('menu-aberto');

        if (menusContainer.classList.contains('menu-aberto')) {
            btnMobile.innerHTML = '✕';
            controlarOverlay(true); // Liga o fundo embaçado
        } else {
            btnMobile.innerHTML = '☰';
            controlarOverlay(false); // Desliga o fundo embaçado
        }
    }

    controlarWhatsApp();
}

// Fecha o menu mobile automaticamente ao clicar em um link interno
document.querySelectorAll('.menu-interno a').forEach(link => {
    link.addEventListener('click', () => {
        fecharTudo();
    });
});

// ==========================================
// FUNÇÕES DO CHECKOUT INTELIGENTE
// ==========================================
function verificarTroco() {
    const selectPagamento = document.getElementById('pagamento-cliente');
    const inputTroco = document.getElementById('troco-cliente');

    if (selectPagamento && inputTroco) {
        if (selectPagamento.value === "Dinheiro") {
            inputTroco.classList.remove('oculto');
        } else {
            inputTroco.classList.add('oculto');
            inputTroco.value = "";
        }
    }
}

function alternarModoEntrega() {
    const radioSelecionado = document.querySelector('input[name="modo-entrega"]:checked');
    const divDelivery = document.getElementById('dados-delivery');

    if (radioSelecionado && divDelivery) {
        if (radioSelecionado.value === "Retirada") {
            divDelivery.classList.add('oculto');
        } else {
            divDelivery.classList.remove('oculto');
        }
    }
}

function finalizarPedidoWhatsApp() {
    if (carrinho.length === 0) {
        alert("Adicione itens ao carrinho antes de finalizar!");
        return;
    }

    const nomeInput = document.getElementById('nome-cliente');
    if (!nomeInput) return;
    const nome = nomeInput.value.trim();

    const radioEntrega = document.querySelector('input[name="modo-entrega"]:checked');
    if (!radioEntrega) return;
    const modoEntrega = radioEntrega.value;

    if (!nome) {
        alert("Por favor, preencha o seu nome.");
        nomeInput.focus();
        return;
    }

    let endereco = "";
    let complemento = "";
    let pagamento = "";
    let troco = "";
    let totalCobranca = 0;

    carrinho.forEach(item => {
        totalCobranca += (item.preco * item.quantidade);
    });

    if (modoEntrega === "Delivery") {
        endereco = document.getElementById('endereco-cliente').value.trim();
        complemento = document.getElementById('complemento-cliente').value.trim();
        pagamento = document.getElementById('pagamento-cliente').value;
        troco = document.getElementById('troco-cliente').value;

        if (!endereco) {
            alert("Por favor, preencha o endereço de entrega.");
            document.getElementById('endereco-cliente').focus();
            return;
        }

        if (!/\d|s\/?n/i.test(endereco)) {
            alert("Atenção: Parece que você esqueceu o número do endereço!\nSe o local não tiver número, acrescente 'S/N'.");
            document.getElementById('endereco-cliente').focus();
            return;
        }

        if (!pagamento) {
            alert("Por favor, selecione uma forma de pagamento.");
            document.getElementById('pagamento-cliente').focus();
            return;
        }

        if (pagamento === "Dinheiro" && troco && parseFloat(troco) < totalCobranca) {
            alert(`O valor para troco não pode ser menor que o total do pedido (R$ ${totalCobranca.toFixed(2).replace('.', ',')}).`);
            document.getElementById('troco-cliente').focus();
            return;
        }
    }

    let textoPedido = `\uD83C\uDF5E *NOVO PEDIDO - Padaria do Bairro* \uD83C\uDF5E\n\n`;

    const momentoAtual = new Date();
    textoPedido += `\u23F0 *Horário:* ${momentoAtual.toLocaleDateString('pt-BR')} às ${momentoAtual.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}\n`;
    textoPedido += `\uD83D\uDC64 *Cliente:* ${nome}\n`;
    textoPedido += `\uD83D\uDCE6 *Tipo:* ${modoEntrega}\n`;

    if (modoEntrega === "Delivery") {
        textoPedido += `\uD83D\uDCCD *Endereço:* ${endereco}\n`;
        if (complemento) textoPedido += `\uD83C\uDFE0 *Complemento:* ${complemento}\n`;
        textoPedido += `\uD83D\uDCB3 *Pagamento:* ${pagamento}\n`;

        if (pagamento === "Dinheiro") {
            if (troco) {
                textoPedido += `\uD83D\uDCB5 *Troco para:* R$ ${parseFloat(troco).toFixed(2).replace('.', ',')} (Levar R$ ${(parseFloat(troco) - totalCobranca).toFixed(2).replace('.', ',')})\n`;
            } else {
                textoPedido += `\uD83D\uDCB5 *Troco:* Não precisa (Valor Exato)\n`;
            }
        }
    } else {
        textoPedido += `\uD83D\uDCB3 *Pagamento:* Será feito no balcão\n`;
    }

    textoPedido += `\n*--- RESUMO DO PEDIDO ---*\n\n`;
    carrinho.forEach(item => {
        textoPedido += `\u25AA\uFE0F ${item.quantidade}x ${item.nome} - R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}\n`;
    });
    textoPedido += `\n\uD83D\uDCB0 *TOTAL A PAGAR: R$ ${totalCobranca.toFixed(2).replace('.', ',')}*\n\n`;

    window.open(`https://api.whatsapp.com/send?phone=5544984366533&text=${encodeURIComponent(textoPedido)}`, '_blank');

    carrinho = [];
    salvarCarrinho(); // Zera o carrinho na memória do navegador também

    if (document.getElementById('nome-cliente')) document.getElementById('nome-cliente').value = "";
    if (document.getElementById('endereco-cliente')) document.getElementById('endereco-cliente').value = "";
    if (document.getElementById('complemento-cliente')) document.getElementById('complemento-cliente').value = "";
    if (document.getElementById('pagamento-cliente')) document.getElementById('pagamento-cliente').value = "";
    if (document.getElementById('troco-cliente')) {
        document.getElementById('troco-cliente').value = "";
        document.getElementById('troco-cliente').classList.add('oculto');
    }
    const radioDelivery = document.querySelector('input[name="modo-entrega"][value="Delivery"]');
    if (radioDelivery) radioDelivery.checked = true;
    alternarModoEntrega();
    renderizarCarrinho();
    fecharCarrinho();
}

// ==========================================
// INICIALIZAÇÃO QUANDO A PÁGINA CARREGA
// ==========================================
// Garante que o ícone do carrinho atualize a bolinha vermelha assim que qualquer página abrir
document.addEventListener('DOMContentLoaded', () => {
    renderizarCarrinho();
});