========================================================================
🥖 PROJETO: PADARIA DO BAIRRO (v6.0)
========================================================================

1. 📝 DESCRIÇÃO E EVOLUÇÃO
------------------------------------------------------------------------
Website Institucional e de Serviços da "Padaria do Bairro". 
A versão 6.0 marca a transição da etapa puramente estética para a 
funcional. O foco atual é a implementação da camada de inteligência e a 
blindagem da interface contra erros de renderização e usabilidade (UX).

🚧 STATUS DO PROJETO: LÓGICA EM EXECUÇÃO
- HTML5 (Estrutura): ✅ Concluído
- CSS3 (Estilo & Responsividade): ✅ Concluído
- JavaScript (Lógica de Negócio): ⏳ EM DESENVOLVIMENTO (Fase Ativa)

2. 🛠️ TECNOLOGIAS E TÉCNICAS APLICADAS
------------------------------------------------------------------------
🔸 HTML5 Semântico: Estrutura otimizada para SEO e acessibilidade.
🔸 CSS3 Moderno: Variáveis CSS (:root), Flexbox e Media Queries.
🔸 Capsule Design: Botões de compra e quantidade unificados sem frestas.
🔸 JS Vanilla: Manipulação de DOM para gestão do carrinho de compras.
🔸 API WhatsApp: Geração de strings dinâmicas para fechamento de pedido.

3. 📂 ORGANIZAÇÃO DE PASTAS E ARQUIVOS
------------------------------------------------------------------------
/ (Raiz do Projeto)
│
├── index.html          # Página Inicial (Vitrine e Hooks do JS)
├── contato.html        # SAC e Localização
├── pedidos.html        # Encomendas Online
├── feedback.html       # Pesquisa de Satisfação
├── cadastro.html       # Cadastro de Clientes
├── README.txt          # Documentação Técnica (Esta versão)
│
├── css/
│   └── style.css       # Estilização unificada e Responsividade
│
├── js/
│   └── script.js       # Lógica do Carrinho (EM EXECUÇÃO)
│
├── images/             # Diretório de ativos visuais otimizados
└── videos/             # Mídia institucional (Banner Home)

4. 🏗️ REFINAMENTOS DE QA & UX (LOGIC & LAYOUT)
------------------------------------------------------------------------
Refinamentos críticos implementados nesta versão para garantir a melhor 
experiência ao usuário:

- POSICIONAMENTO: Botão WhatsApp elevado no Mobile (bottom: 100px) para
  evitar conflitos com botões de ação e facilitar a rolagem.
- GAVETA LATERAL: Carrinho configurado com 90% da largura no mobile,
  expondo o contexto do site ao fundo e melhorando a percepção de profundidade.
- PIXEL PERFECT: Eliminação de "gaps" visuais nos controles de quantidade
  através de propriedades flex e overflow.
- HIERARQUIA: Reposicionamento da tag "Mais Vendido" e centralização do 
  título de Promoções para evitar poluição visual.

5. 🔮 PRÓXIMOS PASSOS (ROADMAP v7.0)
------------------------------------------------------------------------
1. Conclusão da lógica de remoção de itens individuais do carrinho.
2. Implementação de validação: impedir envio de pedidos com carrinho vazio.
3. Persistência de dados via LocalStorage (Mantendo itens após o F5).
4. Máscaras de input dinâmicas para Telefone e CPF no cadastro.

6. 🚀 COMO EXECUTAR O PROJETO
------------------------------------------------------------------------
1. Navegue até a pasta do projeto.
2. Abra o arquivo 'index.html' no seu navegador preferido.
3. Utilize o Console do Desenvolvedor (F12) para monitorar a execução 
   das funções JavaScript e logs de sistema.

========================================================================
👤 AUTOR: Bruno Artacho
📅 DATA: 19/02/2026
========================================================================