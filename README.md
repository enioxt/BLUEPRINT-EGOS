# EGOS — sobre o que é

**Aberto, modular e vivo, no estado real em que existe agora.**

Arquitetura aberta para módulos, integrações, regras e inteligência aplicada.
Livre para usar, estudar, adaptar e expandir.

## Não sobre promessa. Não sobre nostalgia. Sobre o que é.
O EGOS não se apresenta como produto final nem como ideia distante.
Ele se apresenta no estado real em que existe agora: aberto, modular, versionável e reutilizável.

## Use partes. Use tudo. Derive o seu.
Cada parte pode ser lida, adaptada, removida, expandida ou recombinada.
Você não precisa aceitar o sistema inteiro para aproveitar o que ele já entrega.

## Contribuição voluntária
Se isso gerar valor para você, contribua com o que fizer sentido.
Nossa referência é **5% do valor percebido**, sem bloqueio, sem coerção e sem dependência.

## Estado atual
- **O que já existe:** Estrutura base de monorepo, motor de Adaptive Atomic Retrieval (AAR), contratos de módulos e integrações.
- **O que está em construção:** Persistência com PostgreSQL + pgvector, integrações com canais (Slack, Discord, WhatsApp).
- **O que está em pesquisa:** Reranking semântico avançado, grafos de conhecimento.

---

### Estrutura do Monorepo

- `packages/types`: Tipos base (ex: `Atom`)
- `packages/core`: Contratos e interfaces principais
- `packages/registry`: Registro de módulos e integrações
- `packages/atomizer`: Motor de atomização de conhecimento
- `packages/search-engine`: Motor de busca (AAR)
- `packages/audit`: Registros versionados e auditoria
- `apps/api`: API Fastify para ingestão e busca
