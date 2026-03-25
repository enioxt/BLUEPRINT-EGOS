# 🗺️ Plano Mestre: Orquestração, Scraping e Automação Web (EGOS Kernel)

Este documento define a arquitetura definitiva para organizar os agentes do **EGOS Kernel**, orquestrá-los de forma eficiente, realizar scraping avançado (bypass de Cloudflare) e substituir/otimizar o OpenClaw por uma solução mais leve e segura. 

**Foco Atual:** EGOS Kernel, Forja, 852, Gem Hunter e ATRiAN.

## 1. Estrutura e Organização dos Agentes (O "Cérebro")

Para organizar o ecossistema, adotaremos uma arquitetura modular inspirada no `SynkraAI/aios-core` e `camel-ai/camel`, centralizada no EGOS Kernel.

**A Nova Estrutura de Pastas:**
```text
/egos-core
  ├── /kernel (AgentCore - O Orquestrador Central)
  ├── /agents
  │    ├── /forja (Fábrica de Agentes e Geração de Código)
  │    ├── /852 (Chatbot Seguro/Anônimo - DashScope/OpenRouter)
  │    ├── /gem_hunter (Scraper, OSINT, Descoberta de Projetos)
  │    └── /ethics (ATRiAN - Filtro de Realidade e Ética)
  ├── /mcp-servers (A ponte para o mundo real)
  │    ├── /filesystem
  │    ├── /database (Supabase/Firebase)
  │    └── /web-automation (Playwright/Bypass)
  └── /memory (Vector DB, RAG, Mycelium Context)
```

**Como funciona:**
Nenhum agente "faz tudo". Se o **852** precisa buscar uma informação externa sigilosa, o **EGOS Kernel** recebe o prompt, divide em sub-tarefas e aciona o **Gem Hunter**. O Gem Hunter não tem código de scraping pesado nele; ele simplesmente chama a ferramenta do **MCP de Web Automation**. Antes de devolver a resposta, o **ATRiAN** valida a ética e a segurança da informação.

## 2. Orquestração (O "Maestro")

Para orquestrar, usaremos o padrão **Router/Supervisor**.
*   **Ferramenta Base:** Adaptação de conceitos do `microsoft/agent-lightning` para manter a leveza.
*   **Fluxo de Exemplo (Gem Hunter):**
    1. Usuário envia input na *Espiral de Escuta* pedindo análise de um novo token/repositório.
    2. O **EGOS Kernel** avalia a intenção.
    3. O Kernel delega a busca para o **Gem Hunter**.
    4. O **ATRiAN** valida os dados coletados (evitando alucinações ou scams).
    5. A **Forja** pode ser acionada para gerar um relatório ou código baseado na descoberta.
    6. O Kernel compila as respostas e devolve ao usuário.

## 3. Web Scraper com Bypass de Cloudflare (Os "Olhos" do Gem Hunter)

Para o **Gem Hunter** vasculhar o X.com, GitHub, HuggingFace e Dexscreener, precisamos extrair dados sem sermos bloqueados.

**A Solução:**
Integrar o repositório `sarperavci/CloudflareBypassForScraping` encapsulado em um servidor MCP.

**Stack Técnica do Scraper EGOS:**
*   **Playwright Stealth:** Uma versão modificada do Playwright que mascara a assinatura do navegador.
*   **FlareSolverr / CloudflareBypass:** Proxy local que resolve os desafios JS do Cloudflare e devolve o HTML limpo ou cookies de sessão.
*   **Implementação:** Criaremos um MCP Server chamado `mcp-stealth-scraper`. Quando o Gem Hunter precisar ler um site protegido, ele envia a URL para este MCP, que faz o bypass, extrai o texto (usando `Markdownify` para economizar tokens) e devolve ao agente.

## 4. A Alternativa Leve ao OpenClaw (As "Mãos" da Forja e do 852)

O OpenClaw/Clawdbot é poderoso, mas provou ser pesado e com brechas de segurança. Para o EGOS Kernel, vamos construir uma alternativa **Customizada, Leve e Segura**.

**A Solução EGOS Web-Agent:**
Usaremos o **`microsoft/playwright-mcp`** combinado com a lógica do **`agnt-gg/slop`** ou **`browser-use`**.

**Como configuraremos nossa automação web:**
1. **Segurança First (Zero Trust via ATRiAN):** O navegador autônomo rodará em um container Docker isolado ou com `bind: loopback` estrito. Nenhuma porta externa será exposta.
2. **MCP Nativo:** O agente de IA (ex: Alibaba DashScope no 852 ou Gemini no Kernel) se conecta ao `playwright-mcp`. O agente recebe o DOM da página traduzido para uma árvore de acessibilidade.
3. **Ações:** O agente pode emitir comandos via MCP como: `click(element_id)`, `type(element_id, "texto")`, `scroll()`.
4. **Vantagem:** Consome **90% menos recursos** que o OpenClaw. O navegador só é instanciado no momento da task e destruído logo após. 100% controlável pelas regras éticas do ATRiAN.

---

## 🚀 Plano de Ação Imediato

### Fase 1: Limpeza e Estruturação do Kernel (Hoje)
1. **Consolidar Agentes:** Mover os scripts do Forja, 852, Gem Hunter e ATRiAN para a nova estrutura `/egos-core/agents`.
2. **Padronizar Prompts:** Garantir que todos os agentes tenham um `system_prompt` que os obrigue a usar o EGOS Kernel como via de comunicação.

### Fase 2: Implementação do Gem Hunter Stealth (Amanhã)
1. Clonar a lógica do `CloudflareBypassForScraping`.
2. Envolver esse script em um servidor MCP simples em Node.js ou Python.
3. Testar no Windsurf: Pedir para o Gem Hunter acessar um site protegido pelo Cloudflare através do novo MCP e retornar o resumo em Markdown.

### Fase 3: Automação Web Leve para o 852 e Forja
1. Instalar o `@modelcontextprotocol/server-playwright`.
2. Configurar o arquivo de configuração do MCP no Windsurf para incluir o Playwright.
3. Criar um script de teste onde a Forja entra em um site público, clica em botões de forma autônoma e baixa um documento, validando a substituição do OpenClaw sob a supervisão do ATRiAN.
