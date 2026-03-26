# TASKS (SSOT) - EGOS Kernel Master Plan

> Registro de tarefas e estado atual do desenvolvimento do EGOS Kernel.
> **Visão:** Tornar o Kernel a central de comando definitiva, integrando todo o ecossistema EGOS (Cortex, IPED, Brazil Visible SDK, Open Tender Watch) e orquestrando Forja, 852, Gem Hunter e ATRiAN.
> **Diretriz SOTA:** Não reinventar a roda. Adaptar, Usar, Testar e Validar (LangGraph, React Flow, MCP, GraphRAG).

## 🚨 Análise Crítica do Visual Atual
O visual atual (baseado em `src/App.tsx`) está muito voltado para um "Dashboard SaaS Genérico". Para um verdadeiro **Kernel de IA**, precisamos de uma interface estilo *Mission Control / Technical Dashboard*:
- **Falta de Topologia:** Não há visualização em tempo real de como o Kernel roteia tarefas para os agentes.
- **Falta de Imersão:** Precisamos de terminais de log reais, visualização de memória (Cortex) e painéis de dados densos (monospaced).
- **Monolito:** O arquivo `App.tsx` está gigante (>800 linhas) e precisa ser componentizado.

---

## 📋 Backlog Priorizado (Roadmap de Expansão)

### 1. UI/UX Overhaul (A "Cara" do Kernel)
- [ ] **Refatoração do App.tsx:** Quebrar o monolito em componentes (`/components/kernel`, `/components/agents`, `/components/terminal`).
- [ ] **Topologia em Tempo Real (React Flow):** Implementar `React Flow` para visualizar o EGOS Kernel no centro, roteando tarefas para Forja, 852, Gem Hunter e ATRiAN (inspirado em n8n/Langflow).
- [ ] **Terminal Imersivo:** Criar um componente de terminal (ex: `xterm.js` ou customizado) para exibir logs de execução dos servidores MCP e do FastAPI via WebSocket.
- [ ] **Redesign Visual:** Adotar o padrão "Technical Dashboard" (alta densidade, fontes `JetBrains Mono`, bordas visíveis, feedback interativo forte).

### 2. Integração do Ecossistema EGOS (O "Corpo")
- [ ] **EGOS Cortex (Memória e GraphRAG):** Evoluir o Supabase/pgvector para suportar Grafos de Conhecimento (Knowledge Graphs) usando `Apache AGE` ou `Neo4j` + `Microsoft GraphRAG`.
- [ ] **Gem Hunter + Dados Públicos (MCP):** Envelopar os repositórios `brazil-visible-sdk` e `open-tender-watch` no padrão **Anthropic MCP (Model Context Protocol)** para uso nativo pelos agentes.
- [ ] **Integração IPED (MCP):** Criar um MCP Server baseado no repositório `IPED` para análise forense de arquivos baixados pelo Gem Hunter.
- [ ] **ATRiAN Firewall:** Criar um painel visual (Ethics & Security) mostrando em tempo real os bloqueios e validações feitas pelo ATRiAN nas ações dos outros agentes.

### 3. Orquestração e Backend (O "Motor")
- [ ] **FastAPI Router + LangGraph:** Implementar a lógica de roteamento no backend (Python) usando `LangGraph` para orquestrar fluxos complexos (DAGs) entre Forja, 852 e Gem Hunter.
- [ ] **WebSockets:** Substituir chamadas REST estáticas por WebSockets para atualizar a UI do Kernel em tempo real enquanto os agentes trabalham.
- [ ] **Playwright MCP (Substituto do OpenClaw):** Finalizar a configuração do `playwright-mcp` para automação web leve e segura (Zero Trust).
- [ ] **Stealth Scraper MCP:** Implementar o bypass de Cloudflare para o Gem Hunter.
- [ ] **Estudo de Descentralização (Constellation):** Avaliar a arquitetura de Hipergrafos (Hypergraphs) do projeto Constellation Network para futura validação descentralizada de dados de OSINT.

## ⏳ Em Andamento
- [x] Pesquisa do Estado da Arte (SOTA) concluída (`docs/STATE_OF_THE_ART_MAPPING.md`).
- [x] Definição da arquitetura focada em Kernel, Forja, 852, Gem Hunter e ATRiAN.
- [x] Atualização do `AGENT_ORCHESTRATION_PLAN.md`.
- [x] Configuração inicial das variáveis de ambiente (`VITE_FASTAPI_URL`, `VITE_FASTAPI_KEY`).
- [ ] Análise crítica e planejamento de expansão (Atualização das TASKS).

## ✅ Concluídas
- Setup inicial do EGOS Kernel (Frontend React/Vite).
- Remoção do foco no Intelink para priorizar os agentes core.
