let carrinho = [];

function adicionarAoCarrinho(nomeProduto, precoProduto, idInputQtd) {
    const inputQtd = document.getElementById(idInputQtd);
    const quantidade = parseInt(inputQtd.value);
    
    // Define o limite máximo (vai procurar o 'max' do HTML ou assume 20 por defeito)
    const limiteMaximo = parseInt(inputQtd.max) || 20;

    // Validação 1: Impede números negativos, zeros ou texto
    if (isNaN(quantidade) || quantidade <= 0) {
        alert("Por favor, insira uma quantidade válida.");
        return; 
    }

    const itemExistente = carrinho.find(item => item.nome === nomeProduto);

    // Validação 2 (O seu Bugfix): Calcula quanto vai ficar no total ANTES de adicionar
    let quantidadeFutura = quantidade;
    if (itemExistente) {
        quantidadeFutura += itemExistente.quantidade;
    }

    // Se a soma ultrapassar o limite, bloqueia a ação e avisa o utilizador
    if (quantidadeFutura > limiteMaximo) {
        alert(`Atenção: O limite máximo por encomenda é de ${limiteMaximo} unidades de ${nomeProduto}.`);
        inputQtd.value = 1; // Reseta o campo para evitar spam
        return; // Interrompe a função aqui, não adiciona ao carrinho
    }

    // Se passou em todas as validações de QA, adiciona efetivamente
    if (itemExistente) {
        itemExistente.quantidade += quantidade; 
    } else {
        carrinho.push({ nome: nomeProduto, preco: precoProduto, quantidade: quantidade });
    }

    inputQtd.value = 1; // Reseta o campo no ecrã para 1
    renderizarCarrinho(); // Faz a soma matemática e atualiza o visual
    abrirCarrinho(); // Puxa a gaveta lateral para o ecrã
}

function renderizarCarrinho() {
    const containerItens = document.getElementById('itens-carrinho');
    const displayTotal = document.getElementById('valor-total');
    let total = 0;

    containerItens.innerHTML = ''; 

    if (carrinho.length === 0) {
        containerItens.innerHTML = '<p class="carrinho-vazio">Seu carrinho está vazio.</p>';
        displayTotal.innerText = 'R$ 0,00';
        return;
    }

    carrinho.forEach((item, index) => {
        const subtotal = item.preco * item.quantidade;
        total += subtotal;

        containerItens.innerHTML += `
            <div class="item-carrinho">
                <div><strong>${item.quantidade}x</strong> ${item.nome}</div>
                <div>
                    <span>R$ ${subtotal.toFixed(2).replace('.', ',')}</span>
                    <button onclick="removerItem(${index})" class="btn-remover">🗑️</button>
                </div>
            </div>
        `;
    });

    // Atualiza aquele span do total no HTML
    displayTotal.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

function removerItem(index) {
    carrinho.splice(index, 1);
    renderizarCarrinho();
}

function abrirCarrinho() {
    // Remove a classe que esconde o carrinho, fazendo ele aparecer
    document.getElementById('carrinho-lateral').classList.remove('carrinho-oculto');
}

function fecharCarrinho() {
    // Adiciona a classe de volta para esconder
    document.getElementById('carrinho-lateral').classList.add('carrinho-oculto');
}

function finalizarPedidoWhatsApp() {
    if (carrinho.length === 0) {
        alert("Adicione itens ao carrinho antes de finalizar!");
        return;
    }

    // %F0%9F%8D%9E = Emoji de Pão
    // %0A = Quebra de linha (Enter)
    let textoPedido = "%F0%9F%8D%9E *NOVO PEDIDO - Padaria do Bairro* %F0%9F%8D%9E%0A%0A";
    let totalCobranca = 0;

    carrinho.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        totalCobranca += subtotal;
        
        // %E2%96%AA%EF%B8%8F = Emoji do Quadradinho
        // Usamos encodeURIComponent(item.nome) aqui APENAS para proteger espaços e acentos no nome do produto (ex: Hambúrguer)
        textoPedido += `%E2%96%AA%EF%B8%8F ${item.quantidade}x ${encodeURIComponent(item.nome)} - R$ ${subtotal.toFixed(2).replace('.', ',')}%0A`;
    });

    // %F0%9F%92%B0 = Emoji de Saco de Dinheiro
    textoPedido += `%0A%F0%9F%92%B0 *TOTAL: R$ ${totalCobranca.toFixed(2).replace('.', ',')}*%0A%0A`;
    
    const numeroWhatsApp = "5544984366533"; 
    
    // A MÁGICA: Não passamos pelo encodeURIComponent no final, a string já vai 100% pronta e à prova de bugs.
    const urlFormatada = `https://wa.me/${numeroWhatsApp}?text=${textoPedido}`;
    
    window.open(urlFormatada, '_blank');
}