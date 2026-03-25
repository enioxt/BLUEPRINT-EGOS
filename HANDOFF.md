# EGOS - Mission Control & Agentic CI/CD Handoff

**Data:** 25 de Março de 2026
**Contexto:** Transição de ambiente (Google AI Studio -> Windsurf / Antigravity / Outros)
**Objetivo:** Construção do `kernel.egos.ia.br` como módulo central de orquestração, proveniência e triagem agêntica dentro do ecossistema `egos.ia.br`.

---

## 1. Visão Geral da Arquitetura (O que construímos)

Transformamos o dashboard estático em um **Mission Control Real-Time** que consome dados vivos do GitHub (`enioxt`). O objetivo é que este painel seja hospedado no VPS da Contabo (`kernel.egos.ia.br`) e atue como o cérebro visual da esteira de CI/CD agêntica.

### Componentes Principais:
1. **Sistema de Setup Autoexplicativo (Novo):**
   - A interface detecta automaticamente a ausência de variáveis de ambiente (`VITE_GITHUB_TOKEN`, `VITE_SUPABASE_URL`, `VITE_FASTAPI_URL`).
   - Exibe alertas modulares com passo a passo de como obter as credenciais. Os alertas somem magicamente assim que a integração é feita.
2. **Event Stream & Provenance:**
   - Monitora commits reais do repositório `BLUEPRINT-EGOS`.
   - Extrai a "assinatura" (Provenance) para identificar a origem do código (Google AI Studio, Windsurf IDE, Antigravity CLI, Humano).
3. **OpenClaw & Triagem (Agentic Layer):**
   - Simula a fila de processamento onde o **EGOS Triage Agent** analisa o diff dos commits.
   - O **OpenClaw Executor** é acionado para clonar, mover arquivos e abrir Pull Requests automaticamente (depende do FastAPI configurado).
4. **CI/CD & GitHub Actions Control:**
   - Integração direta com a API do GitHub para listar e gerenciar *workflow runs*.
   - Interface modular para habilitar/desabilitar pipelines de forma pragmática.
5. **Ecossistema de Repositórios (Live):**
   - Mapeia repositórios da conta `enioxt`.
   - **Nota sobre Repositórios Privados:** Projetos como `live school` e `commons` exigem que o `VITE_GITHUB_TOKEN` tenha escopo `repo` para serem listados.

---

## 2. Stack Tecnológica Definida

- **Frontend (Este Dashboard):** React 18 + Vite + Tailwind CSS + Framer Motion + Lucide Icons. Totalmente modularizado com seções expansíveis (Accordions).
- **Ingestion Gateway (A ser implementado no backend):** FastAPI (Python) rodando no VPS Contabo. Fornecerá a `VITE_FASTAPI_URL`.
- **State & Vector Store:** Supabase (PostgreSQL + pgvector) para armazenar logs de eventos e embeddings de código.
- **Execução:** OpenClaw (Engine de automação de repositórios).

---

## 3. Próximos Passos (Para o próximo ambiente/agente)

Ao carregar este contexto no Windsurf, Antigravity ou outro IDE, siga esta ordem de execução:

1. **Configuração de Ambiente (.env):**
   - Copie o `.env.example` para `.env`.
   - Gere um GitHub PAT (escopos: `repo`, `workflow`) para liberar o controle de Actions e a leitura de repositórios privados (`live school`, `commons`).
2. **Desenvolvimento do Gateway FastAPI (Backend):**
   - Criar o serviço em Python que receberá os webhooks do GitHub e executará o OpenClaw.
   - Ao rodar localmente, defina `VITE_FASTAPI_URL=http://localhost:8000`. No deploy da Contabo, atualize para o IP/Domínio de produção.
3. **Integração Supabase:**
   - Configurar as tabelas para armazenar os eventos de proveniência e habilitar a extensão `pgvector`. Preencher `VITE_SUPABASE_URL` e a chave anônima.
4. **Deploy do Frontend:**
   - Fazer o build deste painel React (`npm run build`) e configurar o Nginx no VPS Contabo para servir em `kernel.egos.ia.br`.

---

*Fim do documento de Handoff. O sistema EGOS aguarda inicialização no próximo nó.*
