========================================================================
🥖 PROJETO: PADARIA DO BAIRRO (v1.7.0)
========================================================================

1. 📝 DESCRIÇÃO E EVOLUÇÃO
------------------------------------------------------------------------
Website Institucional e de Serviços da "Padaria do Bairro". 
A versão 1.7.0 marca a consolidação do MVP (Minimum Viable Product). 
O foco desta etapa foi a implementação da camada de inteligência, 
garantindo um sistema de carrinho persistente, checkout dinâmico 
integrado ao WhatsApp e filtros de busca com alta performance.

🚧 STATUS DO PROJETO: MVP FUNCIONAL CONCLUÍDO
- HTML5 (Estrutura): ✅ Concluído
- CSS3 (Estilo & Responsividade): ✅ Concluído
- JavaScript (Lógica de Negócio): ✅ Concluído

2. 🛠️ TECNOLOGIAS E TÉCNICAS APLICADAS
------------------------------------------------------------------------
🔸 HTML5 Semântico: Estrutura otimizada para SEO e acessibilidade.
🔸 CSS3 Moderno: Uso de variáveis (:root), Flexbox e efeitos de Glassmorphism.
🔸 JS Vanilla: Manipulação de DOM para gestão de estado do carrinho.
🔸 Web Storage API: Uso de LocalStorage para persistência de dados.
🔸 API WhatsApp: Geração de strings dinâmicas para fechamento de pedidos.

3. 📂 ORGANIZAÇÃO DE PASTAS E ARQUIVOS
------------------------------------------------------------------------
PADARIA-DO-BAIRRO/ (Raiz do Projeto)
│
├── css/
│   └── style.css       # Estilização unificada e Responsividade
│
├── images/             # Ativos visuais organizados por categoria
│   ├── ambiente/       # Fotos do local e fachada
│   ├── depoimentos/    # Avatares de clientes (Prova Social)
│   ├── logo/           # Identidade visual da marca
│   ├── produtos/       # Imagens gerais da vitrine
│   └── promocoes/      # Imagens com fundo transparente (Cards)
│
├── js/
│   └── script.js       # Lógica do Carrinho, Checkout e Filtros
│
├── videos/             # Mídia institucional (Banner Home)
│
├── cadastro.html       # Página de Newsletter e Leads
├── contato.html        # SAC e Localização
├── feedback.html       # Pesquisa de Satisfação
├── index.html          # Página Principal (Vitrine e Busca)
├── pedidos.html        # Encomendas Personalizadas
└── README.txt          # Documentação Técnica (Esta versão)

4. 🏗️ REFINAMENTOS DE QA & UX
------------------------------------------------------------------------
Refinamentos críticos aplicados para garantir a estabilidade do sistema:
- EFEITO OVERLAY: Fundo dinâmico para foco total no carrinho e menus.
- BUSCA EM TEMPO REAL: Filtro instantâneo de produtos no catálogo.
- CHECKOUT INTELIGENTE: Exibição condicional de campos (Entrega vs Retirada).
- SEGURANÇA NO PEDIDO: Validações de QA para evitar envios vazios.
- LIMPEZA DE AMBIENTE: Remoção de arquivos de configuração local (.vscode).

5. 📜 CHANGELOG (HISTÓRICO)
------------------------------------------------------------------------
- v1.7.0 (2026-02-28): Carrinho persistente, Checkout e Documentação final.
- v1.0.0 (2026-01-20): Lançamento da estrutura base e design responsivo.

6. 🚀 COMO EXECUTAR O PROJETO
------------------------------------------------------------------------
1. Navegue até a pasta do projeto.
2. Abra o arquivo 'index.html' no seu navegador.
3. Utilize o Console (F12) para validar a persistência no LocalStorage.

========================================================================
👤 AUTOR: Bruno Artacho | Software Developer & QA Analyst
========================================================================