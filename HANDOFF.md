# EGOS - Mission Control & Agentic CI/CD Handoff

**Data:** 25 de Março de 2026
**Contexto:** Transição de ambiente (Google AI Studio -> Windsurf / Antigravity / Outros)
**Objetivo:** Construção do `kernel.egos.ia.br` como módulo central de orquestração, proveniência e triagem agêntica dentro do ecossistema `egos.ia.br`.

---

## 1. Visão Geral da Arquitetura (O que construímos)

Transformamos o dashboard estático em um **Mission Control Real-Time** que consome dados vivos do GitHub (`enioxt`). O objetivo é que este painel seja hospedado no VPS da Contabo (`kernel.egos.ia.br`) e atue como o cérebro visual da esteira de CI/CD agêntica.

### Componentes Principais:
1. **Event Stream & Provenance:**
   - Monitora commits reais do repositório `BLUEPRINT-EGOS`.
   - Extrai a "assinatura" (Provenance) para identificar se o código veio do Google AI Studio, Windsurf IDE, Antigravity CLI ou de um humano.
2. **OpenClaw & Triagem (Agentic Layer):**
   - Simula a fila de processamento onde o **EGOS Triage Agent** analisa o diff dos commits.
   - O agente propõe ações (ex: `MOVE_TO_EGOS_UI`, `KEEP_IN_BLUEPRINT`) baseado em similaridade semântica (pgvector).
   - O **OpenClaw Executor** é acionado para clonar, mover arquivos e abrir Pull Requests automaticamente.
3. **Ecossistema de Repositórios (Live):**
   - Mapeia todos os repositórios públicos da conta `enioxt`.
   - Categoriza entre "Ativos Recentemente" e "Inativos".
   - **Agent Insights:** Injeta proposições de IA ao clicar nos repositórios (ex: sugerindo cruzar dados do `brazil-visible-sdk` com o `open-tender-watch`).

---

## 2. Stack Tecnológica Definida

- **Frontend (Este Dashboard):** React 18 + Vite + Tailwind CSS + Framer Motion + Lucide Icons.
- **Ingestion Gateway (A ser implementado no backend):** FastAPI (Python) rodando no VPS Contabo. Receberá webhooks do GitHub e validará assinaturas HMAC.
- **State & Vector Store:** Supabase (PostgreSQL + pgvector) para armazenar logs de eventos e embeddings de código.
- **Execução:** OpenClaw (Engine de automação de repositórios).

---

## 3. Regras de Proveniência (Assinaturas)

Para que o sistema funcione sem dados mockados, a esteira exige as seguintes regras de governança:
1. **Google AI Studio:** Commits devem usar o email da conta Google vinculada.
2. **Windsurf IDE:** Commits devem incluir a tag `[Windsurf]` ou `[Cascade]` na mensagem (idealmente via Git Hooks locais).
3. **Antigravity:** Commits devem incluir a assinatura do CLI.
4. **Triagem:** O agente só move código automaticamente se a confiança semântica (pgvector) for > 0.85.

---

## 4. Insights e Cross-References Identificados (Agentes)

Durante a varredura dos repositórios, os agentes identificaram as seguintes oportunidades de integração no ecossistema:

- **`brazil-visible-sdk` + `open-tender-watch`:**
  - *Proposição:* Criar um Agente de OSINT que cruze licitações públicas (open-tender) com dados da Receita Federal/CGU (brazil-visible) para detecção de anomalias e risco de corrupção.
- **`852` (Chatbot Sindicatos):**
  - *Proposição:* Integrar a lógica de fallback do OpenRouter deste projeto com a malha de roteamento principal do `EGOS-Inteligencia`.
- **`ESAA-supervisor`:**
  - *Proposição arquitetural:* O supervisor local deve estabelecer uma conexão WebSocket bidirecional com o `kernel.egos.ia.br` para reportar o estado canônico do filesystem local em tempo real.

---

## 5. Próximos Passos (Para o próximo ambiente/agente)

Ao carregar este contexto no Windsurf, Antigravity ou outro IDE, siga esta ordem de execução:

1. **Deploy do Frontend:** Fazer o build deste painel React (`npm run build`) e configurar o Nginx no VPS Contabo para servir em `kernel.egos.ia.br`.
2. **Desenvolvimento do Gateway FastAPI:** Criar o serviço em Python que receberá os webhooks do GitHub (repositórios `BLUEPRINT-EGOS` e `egos`).
3. **Integração Supabase:** Configurar as tabelas para armazenar os eventos de proveniência e habilitar a extensão `pgvector`.
4. **Implementação do OpenClaw:** Codificar os scripts de automação Git (clonar, mover, commitar, abrir PR) que serão acionados pelo FastAPI.

---

*Fim do documento de Handoff. O sistema EGOS aguarda inicialização no próximo nó.*
