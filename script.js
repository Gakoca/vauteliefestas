// =========================================================
// BANCO DE DADOS DE PRODUTOS — VAUTELIÊ
// =========================================================
const produtosVautelie = [
    // Decorações
    {
        id: 'dec-1',
        nome: 'Estilo Circo Vaudeville',
        categoria: 'decoracao',
        tipoVenda: 'Pacote Evento Completo',
        preco: 2850.00,
        imagem: 'imagens/decoracao1.jpg',
        descricao: 'Cenografia completa inspirada nos antigos circos itinerantes: cortinas de veludo carmesim, picadeiro vintage, iluminação dramática e adereços retrô.'
    },
    {
        id: 'dec-2',
        nome: 'Romance Gótico',
        categoria: 'decoracao',
        tipoVenda: 'Pacote Evento Completo',
        preco: 3200.00,
        imagem: 'imagens/decoracao2.jpg',
        descricao: 'Atmosfera melancólica e elegante com candelabros envelhecidos, rosas negras, rendas vitorianas e mobiliário clássico sombrio.'
    },
    {
        id: 'dec-3',
        nome: 'Noite de Fantasia',
        categoria: 'decoracao',
        tipoVenda: 'Pacote Evento Completo',
        preco: 2600.00,
        imagem: 'imagens/decoracao3.jpg',
        descricao: 'Cenário lúdico com máscaras teatrais gigantes, jogo de luz e sombra e painéis pintados à mão pelo nosso ateliê.'
    },
    {
        id: 'dec-4',
        nome: 'Salão dos Espelhos',
        categoria: 'decoracao',
        tipoVenda: 'Pacote Evento Completo',
        preco: 3450.00,
        imagem: 'imagens/decoracao4.jpg',
        descricao: 'Molduras barrocas douradas e prateadas, espelhos antigos assimétricos e efeitos ópticos para fotos inesquecíveis.'
    },
    {
        id: 'dec-5',
        nome: 'Palco das Maravilhas',
        categoria: 'decoracao',
        tipoVenda: 'Pacote Evento Completo',
        preco: 3900.00,
        imagem: 'imagens/decoracao5.jpg',
        descricao: 'Estrutura teatral completa com palco elevado, cortinas motorizadas e ambientação excêntrica digna de cinema.'
    },
    {
        id: 'dec-6',
        nome: 'Castelo Sombrio',
        categoria: 'decoracao',
        tipoVenda: 'Pacote Evento Completo',
        preco: 4100.00,
        imagem: 'imagens/decoracao6.jpg',
        descricao: 'Arcos góticos, gárgulas esculpidas em espuma artística, névoa baixa e iluminação cênica em tons de violeta e âmbar.'
    },

    // Fantasias
    {
        id: 'fan-1',
        nome: 'Artista de Circo',
        categoria: 'fantasia',
        tipoVenda: 'Aluguel / Sob Medida',
        preco: 380.00,
        imagem: 'imagens/fantasia1.jpg',
        descricao: 'Traje listrado artesanal com ombreiras estruturadas, cartola exclusiva e acabamento envelhecido à mão.'
    },
    {
        id: 'fan-2',
        nome: 'Senhora do Castelo',
        categoria: 'fantasia',
        tipoVenda: 'Aluguel / Sob Medida',
        preco: 450.00,
        imagem: 'imagens/fantasia2.jpg',
        descricao: 'Vestido longo em tafetá e renda francesa com espartilho ajustável e gola alta vitoriana.'
    },
    {
        id: 'fan-3',
        nome: 'Viajante do Tempo',
        categoria: 'fantasia',
        tipoVenda: 'Aluguel / Sob Medida',
        preco: 420.00,
        imagem: 'imagens/fantasia3.jpg',
        descricao: 'Sobretudo steampunk com engrenagens em latão, colete de brocado e óculos de aviador customizados.'
    },
    {
        id: 'fan-4',
        nome: 'Coruja Misteriosa',
        categoria: 'fantasia',
        tipoVenda: 'Aluguel / Sob Medida',
        preco: 390.00,
        imagem: 'imagens/fantasia4.jpg',
        descricao: 'Capa emplumada artesanal e máscara esculpida em papel machê com detalhes metálicos.'
    },
    {
        id: 'fan-5',
        nome: 'Bailarina de Sombra',
        categoria: 'fantasia',
        tipoVenda: 'Aluguel / Sob Medida',
        preco: 410.00,
        imagem: 'imagens/fantasia5.jpg',
        descricao: 'Tutu assimétrico em tule preto e cinza-fumaça com corpete bordado e adereço de cabeça sombrio.'
    },
    {
        id: 'fan-6',
        nome: 'Mestre das Chaves',
        categoria: 'fantasia',
        tipoVenda: 'Aluguel / Sob Medida',
        preco: 440.00,
        imagem: 'imagens/fantasia6.jpg',
        descricao: 'Fraque assimétrico em veludo cotelê escuro acompanhado de cinturão com chaves antigas forjadas.'
    }
];

// =========================================================
// ESTADO DA APLICAÇÃO
// =========================================================
let carrinho = JSON.parse(localStorage.getItem('vautelie_carrinho')) || [];
let filtroAtual = 'todos';
let termoBusca = '';

// Elementos do DOM
const gradeProdutos = document.getElementById('grade-produtos');
const botoesFiltro = document.querySelectorAll('.btn-filtro');
const campoBusca = document.getElementById('campo-busca');
const contadorCarrinho = document.getElementById('contador-carrinho');
const gavetaCarrinho = document.getElementById('gaveta-carrinho');
const overlayCarrinho = document.getElementById('overlay-carrinho');
const listaItensCarrinho = document.getElementById('lista-itens-carrinho');
const valorTotalCarrinho = document.getElementById('valor-total-carrinho');
const modalGeral = document.getElementById('modal-geral');
const corpoModal = document.getElementById('corpo-modal');
const toastContainer = document.getElementById('toast-container');

// =========================================================
// FUNÇÕES AUXILIARES E NOTIFICAÇÕES
// =========================================================
function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function salvarCarrinho() {
    localStorage.setItem('vautelie_carrinho', JSON.stringify(carrinho));
}

function mostrarNotificacao(mensagem) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = mensagem;
    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(40px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// =========================================================
// RENDERIZAÇÃO DO CATÁLOGO (COM FILTRO E BUSCA)
// =========================================================
function renderizarCatalogo() {
    gradeProdutos.innerHTML = '';

    const produtosFiltrados = produtosVautelie.filter(item => {
        const bateCategoria = filtroAtual === 'todos' || item.categoria === filtroAtual;
        const bateBusca = item.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
                          item.descricao.toLowerCase().includes(termoBusca.toLowerCase());
        return bateCategoria && bateBusca;
    });

    if (produtosFiltrados.length === 0) {
        gradeProdutos.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--texto-suave);">
                Nenhuma decoração ou fantasia encontrada para "${termoBusca}".
            </div>
        `;
        return;
    }

    produtosFiltrados.forEach(produto => {
        const cartao = document.createElement('div');
        cartao.className = 'produto-card';

        cartao.innerHTML = `
            <div class="produto-img-wrapper" onclick="abrirDetalhesProduto('${produto.id}')">
                <img src="${produto.imagem}" alt="${produto.nome}" onerror="this.src='https://placehold.co/400x300/20192e/d4af37?text=${encodeURIComponent(produto.nome)}'">
                <span class="etiqueta-categoria">${produto.categoria === 'decoracao' ? '🎪 Decoração' : '🎭 Fantasia'}</span>
            </div>
            <div class="produto-info">
                <div>
                    <h4 onclick="abrirDetalhesProduto('${produto.id}')">${produto.nome}</h4>
                    <p class="produto-tipo">${produto.tipoVenda}</p>
                </div>
                <div>
                    <p class="produto-preco">${formatarMoeda(produto.preco)}</p>
                    <div class="produto-acoes">
                        <button class="btn-detalhes" onclick="abrirDetalhesProduto('${produto.id}')">Detalhes</button>
                        <button class="btn-comprar" onclick="adicionarAoCarrinho('${produto.id}')">+ Adicionar</button>
                    </div>
                </div>
            </div>
        `;

        gradeProdutos.appendChild(cartao);
    });
}

// Eventos de Filtro e Busca
botoesFiltro.forEach(botao => {
    botao.addEventListener('click', () => {
        botoesFiltro.forEach(b => b.classList.remove('ativo'));
        botao.classList.add('ativo');
        filtroAtual = botao.getAttribute('data-filtro');
        renderizarCatalogo();
    });
});

campoBusca.addEventListener('input', (e) => {
    termoBusca = e.target.value;
    renderizarCatalogo();
});

// =========================================================
// LÓGICA DO CARRINHO DE COMPRAS / ORÇAMENTO
// =========================================================
function adicionarAoCarrinho(idProduto) {
    const produto = produtosVautelie.find(p => p.id === idProduto);
    if (!produto) return;

    const itemExistente = carrinho.find(item => item.id === idProduto);
    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({ ...produto, quantidade: 1 });
    }

    salvarCarrinho();
    atualizarInterfaceCarrinho();
    mostrarNotificacao(`✨ <strong>${produto.nome}</strong> adicionado ao pedido!`);
}

function alterarQuantidade(idProduto, delta) {
    const item = carrinho.find(i => i.id === idProduto);
    if (!item) return;

    item.quantidade += delta;
    if (item.quantidade <= 0) {
        carrinho = carrinho.filter(i => i.id !== idProduto);
    }

    salvarCarrinho();
    atualizarInterfaceCarrinho();
}

function removerDoCarrinho(idProduto) {
    carrinho = carrinho.filter(i => i.id !== idProduto);
    salvarCarrinho();
    atualizarInterfaceCarrinho();
}

function atualizarInterfaceCarrinho() {
    const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    contadorCarrinho.textContent = totalItens;

    listaItensCarrinho.innerHTML = '';

    if (carrinho.length === 0) {
        listaItensCarrinho.innerHTML = '<p class="carrinho-vazio">Seu carrinho está vazio. Explore nossas decorações e fantasias!</p>';
        valorTotalCarrinho.textContent = formatarMoeda(0);
        return;
    }

    let valorTotal = 0;

    carrinho.forEach(item => {
        valorTotal += item.preco * item.quantidade;

        const divItem = document.createElement('div');
        divItem.className = 'item-carrinho';
        divItem.innerHTML = `
            <div class="item-carrinho-info">
                <strong>${item.nome}</strong>
                <span>${formatarMoeda(item.preco)} cada</span>
            </div>
            <div class="item-carrinho-controles">
                <button onclick="alterarQuantidade('${item.id}', -1)">-</button>
                <span>${item.quantidade}</span>
                <button onclick="alterarQuantidade('${item.id}', 1)">+</button>
                <button onclick="removerDoCarrinho('${item.id}')" title="Remover">🗑️</button>
            </div>
        `;
        listaItensCarrinho.appendChild(divItem);
    });

    valorTotalCarrinho.textContent = formatarMoeda(valorTotal);
}

function abrirCarrinho() {
    gavetaCarrinho.classList.add('aberta');
    overlayCarrinho.classList.remove('oculto');
}

function fecharCarrinho() {
    gavetaCarrinho.classList.remove('aberta');
    overlayCarrinho.classList.add('oculto');
}

document.getElementById('btn-abrir-carrinho').addEventListener('click', abrirCarrinho);
document.getElementById('btn-fechar-carrinho').addEventListener('click', fecharCarrinho);
overlayCarrinho.addEventListener('click', fecharCarrinho);

// =========================================================
// MODAIS (DETALHES DO PRODUTO E FINALIZAÇÃO DE PEDIDO)
// =========================================================
function abrirDetalhesProduto(idProduto) {
    const produto = produtosVautelie.find(p => p.id === idProduto);
    if (!produto) return;

    corpoModal.innerHTML = `
        <div class="modal-produto-grid">
            <img src="${produto.imagem}" alt="${produto.nome}" onerror="this.src='https://placehold.co/400x300/20192e/d4af37?text=${encodeURIComponent(produto.nome)}'">
            <div>
                <span style="color: var(--dourado); font-size: 0.85rem; text-transform: uppercase;">${produto.tipoVenda}</span>
                <h3>${produto.nome}</h3>
                <p class="modal-preco">${formatarMoeda(produto.preco)}</p>
                <p class="modal-descricao">${produto.descricao}</p>
                <button class="btn-primario" style="width: 100%;" onclick="adicionarAoCarrinho('${produto.id}'); fecharModal(); abrirCarrinho();">
                    Adicionar ao Meu Pedido
                </button>
            </div>
        </div>
    `;
    modalGeral.classList.remove('oculto');
}

document.getElementById('btn-finalizar-pedido').addEventListener('click', () => {
    if (carrinho.length === 0) {
        mostrarNotificacao('⚠️ Adicione pelo menos um item ao carrinho antes de finalizar.');
        return;
    }

    fecharCarrinho();
    const total = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);

    corpoModal.innerHTML = `
        <h3 style="font-family: var(--fonte-titulo); color: var(--dourado); margin-bottom: 8px;">Finalizar Reserva / Orçamento</h3>
        <p style="color: var(--texto-suave); font-size: 0.92rem;">Preencha seus dados para que nossa equipe (Rebeca, Gabriela e Nikolas) agende uma reunião criativa.</p>
        <form id="form-checkout" class="form-checkout">
            <label>Seu Nome Completo:
                <input type="text" id="cliente-nome" required placeholder="Ex: Helena Martins">
            </label>
            <label>E-mail ou WhatsApp:
                <input type="text" id="cliente-contato" required placeholder="(11) 99999-9999">
            </label>
            <label>Data Prevista do Evento:
                <input type="date" id="cliente-data" required>
            </label>
            <p style="margin-top: 5px;">Total Estimado: <strong style="color: var(--dourado); font-size: 1.2rem;">${formatarMoeda(total)}</strong></p>
            <button type="submit" class="btn-primario" style="padding: 12px;">Confirmar Solicitação</button>
        </form>
    `;

    modalGeral.classList.remove('oculto');

    document.getElementById('form-checkout').addEventListener('submit', (e) => {
        e.preventDefault();
        const nomeCliente = document.getElementById('cliente-nome').value;

        corpoModal.innerHTML = `
            <div class="sucesso-checkout">
                <h3>🎭 Solicitação Recebida, ${nomeCliente}!</h3>
                <p>O ateliê da <strong>Vauteliê</strong> já recebeu sua seleção de itens. Em breve entraremos em contato para tornar seu evento extraordinário.</p>
                <button class="btn-primario" onclick="fecharModal()">Voltar ao Site</button>
            </div>
        `;

        carrinho = [];
        salvarCarrinho();
        atualizarInterfaceCarrinho();
    });
});

function fecharModal() {
    modalGeral.classList.add('oculto');
}

document.getElementById('btn-fechar-modal').addEventListener('click', fecharModal);
modalGeral.addEventListener('click', (e) => {
    if (e.target === modalGeral) fecharModal();
});

// =========================================================
// ANIMAÇÃO SUAVE AO ROLAR A PÁGINA
// =========================================================
const observadorSecoes = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add('visivel');
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.secao-animada').forEach(secao => {
    observadorSecoes.observe(secao);
});

// =========================================================
// INICIALIZAÇÃO
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
    renderizarCatalogo();
    atualizarInterfaceCarrinho();
});

// =========================================================
// VISUALIZADOR DO MIV (MANUAL DE IDENTIDADE VISUAL)
// =========================================================
function abrirImagemMiv(caminhoImagem, titulo) {
    corpoModal.innerHTML = `
        <div style="text-align: center;">
            <span style="color: var(--dourado); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px;">Manual de Identidade Visual</span>
            <h3 style="font-family: var(--fonte-titulo); color: var(--texto-claro); margin: 8px 0 16px;">${titulo}</h3>
            <img src="${caminhoImagem}" alt="${titulo}" 
                 style="width: 100%; max-height: 70vh; object-fit: contain; border-radius: 10px; border: 1px solid var(--borda-sutil);"
                 onerror="this.src='https://placehold.co/800x500/20192e/d4af37?text=${encodeURIComponent(titulo)}'">
        </div>
    `;
    modalGeral.classList.remove('oculto');
}