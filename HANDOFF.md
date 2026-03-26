# 🏛️ [DOCUMENTO HISTÓRICO] EGOS Kernel - Mission Control Handoff

> **⚠️ NOTA HISTÓRICA:** Este documento reflete uma fase anterior do projeto (26 de Março de 2026) onde o foco era transformar o painel em um "Mission Control". Desde então, a estratégia evoluiu para a **Tríade Pragmática** (`carteira-livre`, `forja`, `egos`). Mantido aqui apenas para registro arquitetural.

**Data:** 26 de Março de 2026
**Contexto:** Transição de ambiente e redefinição arquitetural profunda.
**Objetivo:** Transformar o `kernel.egos.ia.br` de um "dashboard genérico" para uma verdadeira **Central de Comando (Mission Control)** que orquestra todo o ecossistema EGOS (Forja, 852, Gem Hunter, ATRiAN, Cortex, IPED).

---

## 1. Análise Crítica e Mudança de Rota

Após uma revisão profunda dos repositórios avançados (`EGOS-Inteligencia`, `brazil-visible-sdk`, `open-tender-watch`, `egos-cortex`, `IPED`), concluímos que o visual e a estrutura atual do Kernel (baseada em um `App.tsx` monolítico de >800 linhas) não reflete a complexidade e a ambição do projeto.

O Kernel atual parece um "SaaS de monitoramento de commits". Ele precisa ser um **Nervo Central Cibernético**.

### O Novo Paradigma:
1. **Topologia Visual:** O usuário precisa ver os agentes (Nós) conversando em tempo real (React Flow).
2. **Terminais Imersivos:** Logs crus e diretos dos servidores MCP e do FastAPI.
3. **Substituição do OpenClaw:** Transição oficial para `playwright-mcp` (mais leve, seguro e aderente ao Zero Trust do ATRiAN).
4. **Integração de Dados Públicos:** O Gem Hunter deve absorver nativamente as capacidades do `brazil-visible-sdk` e `open-tender-watch`.

---

## 2. A Nova Arquitetura de Agentes

O Kernel agora é o maestro de quatro pilares principais:
- **Forja:** Fábrica de agentes e código.
- **852:** Chatbot seguro (DashScope/OpenRouter).
- **Gem Hunter:** OSINT e Stealth Scraping (Bypass Cloudflare).
- **ATRiAN:** Firewall Ético e Validador de Realidade.

*Nota: O Intelink foi temporariamente removido do escopo principal para focar nestes quatro pilares.*

---

## 3. Próximos Passos Imediatos (Para o próximo agente/IDE)

Ao carregar este contexto no Windsurf ou Cursor, execute as seguintes tarefas na ordem:

1. **Desmembramento do Monolito (`src/App.tsx`):**
   - Crie a pasta `src/components/kernel/` e mova a lógica de UI para lá.
   - Implemente um design "Technical Dashboard" (fundo escuro, fontes monospace, alta densidade).

2. **Implementação do React Flow:**
   - Crie a visualização topológica mostrando o Kernel no centro e os 4 agentes ao redor.

3. **Setup do Backend (FastAPI):**
   - O arquivo `.env` já possui `VITE_FASTAPI_URL` e `VITE_FASTAPI_KEY`.
   - Inicie a construção do roteador Python que receberá os comandos do frontend e acionará os agentes via MCP.

4. **Stealth Scraper & Playwright MCP:**
   - Configure os servidores MCP locais para dar "mãos" (Playwright) e "olhos" (Bypass Cloudflare) aos agentes.

---

*Fim do documento de Handoff. O sistema EGOS aguarda a reconstrução visual e arquitetural no próximo nó.*
