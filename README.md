# EGOS Kernel — A Central de Comando

**Aberto, modular e vivo, no estado real em que existe agora.**

O **EGOS Kernel** é o orquestrador central e a interface visual de todo o ecossistema EGOS. Ele não é apenas um dashboard, mas o "Cérebro" que conecta, gerencia e roteia tarefas para agentes especializados, ferramentas de OSINT e bancos de memória.

## 🧠 A Arquitetura do Ecossistema

O Kernel atua como o maestro para os seguintes agentes e módulos:

- **Forja:** A fábrica de agentes e geradora de código.
- **852:** O chatbot seguro e anônimo (DashScope/OpenRouter).
- **Gem Hunter:** O agente de OSINT, scraping e descoberta (integrado com `brazil-visible-sdk` e `open-tender-watch`).
- **ATRiAN:** O firewall ético e filtro de realidade (Zero Trust).
- **Cortex:** A memória de longo prazo (Vector DB / pgvector).
- **IPED (Integração Futura):** Análise forense profunda de dados coletados.

## 🛠️ O Que o Kernel Faz?

1. **Orquestração de Agentes:** Recebe inputs complexos e divide em sub-tarefas para os agentes corretos.
2. **Automação Web Segura:** Substitui o antigo OpenClaw por uma solução baseada em `playwright-mcp`, rodando em ambientes isolados.
3. **Stealth Scraping:** Utiliza bypass de Cloudflare via MCP para permitir que o Gem Hunter acesse dados protegidos.
4. **Visualização em Tempo Real:** (Em desenvolvimento) Topologia de rede dos agentes, terminais de log imersivos e controle de memória.

## 🚀 Estado Atual e Roadmap

O Kernel está passando por uma **reestruturação visual e arquitetural profunda** para deixar de ser um "SaaS genérico" e se tornar um verdadeiro *Technical Dashboard / Mission Control*.

Consulte o arquivo `TASKS.md` para ver o roadmap completo de expansão.
Consulte `docs/AGENT_ORCHESTRATION_PLAN.md` para detalhes técnicos de orquestração.

## Use partes. Use tudo. Derive o seu.
Cada parte pode ser lida, adaptada, removida, expandida ou recombinada.
Você não precisa aceitar o sistema inteiro para aproveitar o que ele já entrega.

## Contribuição voluntária
Se isso gerar valor para você, contribua com o que fizer sentido.
Nossa referência é **5% do valor percebido**, sem bloqueio, sem coerção e sem dependência.
