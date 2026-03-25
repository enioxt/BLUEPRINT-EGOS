# EGOS System Map

> Mapa de Arquitetura do EGOS (Adaptive Atomic Retrieval)

## Topologia do Monorepo
```mermaid
graph TD
    API[apps/api - Fastify] --> Core[packages/core]
    API --> Atomizer[packages/atomizer]
    API --> Search[packages/search-engine]
    API --> Registry[packages/registry]
    
    Atomizer --> Types[packages/types]
    Search --> Types
    Registry --> Core
```

## Fluxo de Ingestão
1. Recebe payload via `/ingest`.
2. Valida com Zod.
3. `Atomizer` quebra o conteúdo em `Atoms`.
4. `SearchEngine` indexa os `Atoms`.
