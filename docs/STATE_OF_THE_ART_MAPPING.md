# Mapeamento do Estado da Arte (SOTA)
**Diretriz: Não Reinventar a Roda. Adaptar, Usar, Testar e Validar.**

Este documento mapeia os projetos open-source, frameworks privados e conceitos matemáticos que já existem no mercado. O objetivo do **EGOS Kernel** não é recriar essas tecnologias do zero, mas atuar como o **tecido conectivo (cola)** que une as melhores ferramentas do mundo em um ecossistema focado em OSINT, segurança e autonomia.

---

## 1. DAGs e Orquestração de Agentes (O Motor do Kernel)
Para o roteamento de tarefas entre Forja, 852, Gem Hunter e ATRiAN, usaremos frameworks consolidados baseados em Grafos Acíclicos Direcionados (DAGs) e Máquinas de Estado.

*   **LangGraph (Open Source):** 
    *   *O que é:* O padrão ouro atual para criar fluxos de agentes cíclicos e DAGs. Ele gerencia o estado (memória) entre os nós (agentes).
    *   *Como vamos usar:* O backend FastAPI do Kernel usará LangGraph para definir o fluxo. Ex: `Usuário -> Kernel -> (Gem Hunter + ATRiAN) -> 852 -> Resposta`.
*   **OpenAI Swarm (Open Source / Experimental):**
    *   *O que é:* Framework ultra-leve focado puramente em *handoff* (passagem de bastão) entre agentes.
    *   *Como vamos usar:* Inspirar a arquitetura de roteamento rápido do Kernel. Se o 852 não souber codar, ele faz *handoff* direto para a Forja.
*   **Temporal.io (Open Source / Enterprise):**
    *   *O que é:* Motor de execução durável (Durable Execution).
    *   *Como vamos usar:* Se o Gem Hunter precisar fazer scraping de 10.000 licitações (o que pode levar dias), o Temporal garante que o processo não morra se o servidor reiniciar.

## 2. O Projeto Constellation e Hipergrafos (A Rede Descentralizada)
O usuário mencionou "Constellation". Isso nos leva a duas frentes cruciais para o Cenário 3 (Longo Prazo).

*   **Constellation Network / Hypergraph (Open Source / Web3):**
    *   *O que é:* Um protocolo baseado em DAG (Directed Acyclic Graph) que resolve o problema de escalabilidade das blockchains tradicionais. Ele usa "Hipergrafos" para validar dados de forma descentralizada, rápida e sem taxas (feeless).
    *   *Como vamos usar:* No longo prazo, se o EGOS for descentralizado (rodando em múltiplos nós/computadores), podemos usar a arquitetura do Constellation (ou a própria rede) para validar a integridade dos dados de OSINT coletados pelo Gem Hunter, garantindo que ninguém adulterou as provas (imutabilidade forense).
*   **Microsoft GraphRAG (Open Source):**
    *   *O que é:* Uma evolução do RAG tradicional. Em vez de buscar apenas similaridade de texto, ele constrói um Grafo de Conhecimento (Knowledge Graph) a partir dos documentos.
    *   *Como vamos usar:* O Cortex usará GraphRAG. Quando o Gem Hunter baixar PDFs de licitações, o GraphRAG mapeará as conexões: `[Empresa A] -> (pertence a) -> [Pessoa B] -> (doou para) -> [Político C]`.

## 3. Topologia Visual e Mission Control (A Interface)
Para a interface do Kernel, não vamos criar um motor de renderização de nós do zero.

*   **React Flow / XYFlow (Open Source):**
    *   *O que é:* A biblioteca definitiva para construir interfaces baseadas em nós e arestas (Node-based UI).
    *   *Como vamos usar:* Será o coração visual do `App.tsx`. Mostrará o Kernel no centro e os agentes conectados.
*   **n8n / Flowise / Langflow (Open Source):**
    *   *O que é:* Plataformas de automação visual.
    *   *Como vamos usar:* Referência de UI/UX. Vamos adaptar a forma como eles mostram logs de execução em tempo real nos nós para o nosso Mission Control.

## 4. Integração de Ferramentas e Sentidos (O Padrão MCP)
Como os agentes vão interagir com o mundo real (IPED, Playwright, APIs)?

*   **Anthropic MCP - Model Context Protocol (Open Source):**
    *   *O que é:* Um padrão aberto (como o USB-C, mas para IAs) que permite conectar modelos de linguagem a fontes de dados e ferramentas de forma padronizada.
    *   *Como vamos usar:* **TUDO** no EGOS será um servidor MCP. O `brazil-visible-sdk` será envelopado em um MCP. O `open-tender-watch` será um MCP. O `IPED` será um MCP. Isso significa que Forja, 852 e Gem Hunter poderão usar essas ferramentas nativamente, sem precisarmos escrever código de integração customizado para cada LLM.
*   **Browser-use / Playwright-MCP (Open Source):**
    *   *O que é:* Ferramentas que permitem que agentes naveguem na web de forma autônoma.
    *   *Como vamos usar:* Substituirá o OpenClaw. O Gem Hunter usará isso para interagir com portais governamentais complexos.

## 5. Resumo da Estratégia de Adoção (O "Caminho Preguiçoso e Inteligente")

1.  **Não escreva um orquestrador:** Use `LangGraph` no backend (FastAPI).
2.  **Não escreva um renderizador de grafos:** Use `React Flow` no frontend (Vite).
3.  **Não escreva integrações customizadas de API:** Envolva tudo no padrão `MCP` (Model Context Protocol).
4.  **Não escreva um banco de grafos do zero:** Use a extensão `Apache AGE` no PostgreSQL (Supabase) ou `Neo4j` integrado com `GraphRAG`.
5.  **Não escreva um validador de consenso do zero:** Estude a arquitetura do `Constellation Network` (Hypergraph) para a futura descentralização do EGOS.

---
*Documento vivo. Atualizado em 26 de Março de 2026. Base para a implementação arquitetural do EGOS Kernel.*
