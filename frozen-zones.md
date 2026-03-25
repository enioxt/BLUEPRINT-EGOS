# EGOS Frozen Zones

> Áreas do repositório que exigem consenso ou auditoria estrita antes de qualquer modificação.

## Zonas Congeladas (Nível 1 - Crítico)
- `/.guarani/` e todos os meta-prompts.
- `pnpm-workspace.yaml` e `turbo.json` (Arquitetura base).
- `packages/types/src/atom.ts` (Contrato central de dados).

## Regras de Modificação
Qualquer alteração nestes arquivos deve ser precedida de uma justificativa baseada em evidências e deve garantir 100% de reversibilidade.
