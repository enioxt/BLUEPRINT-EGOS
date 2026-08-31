> 🌐 **Parte do ecossistema / Part of the [EGOS](https://egos.ia.br) · [CINCO](https://cinco.ia.br) ecosystem.**
> Mapa geral e por onde começar / general map & where to start: **[github.com/enioxt](https://github.com/enioxt)** · Kit aberto (MIT): [cinco.ia.br/kit](https://cinco.ia.br/kit/)

# 🏛️ BLUEPRINT-EGOS (Whitepaper & Manifesto)

> **⚠️ AVISO IMPORTANTE: ESTE REPOSITÓRIO ESTÁ ARQUIVADO / SOMENTE LEITURA.**
> 
> Este é o repositório de **Design, Arquitetura e Filosofia** do ecossistema EGOS. Ele serve como nosso quadro branco histórico e manifesto fundacional. 
> **O código de produção, laboratórios e refatorações NÃO vivem mais aqui.**

<!-- EGOS-PILARES-BEGIN v=860274433adf — fonte: templates/pilares/BLOCO_README.md · gerado por scripts/pilares-sync.ts · NÃO EDITAR À MÃO -->
## 🏛️ Construído sobre o EGOS Framework

Este sistema nasce do **EGOS** — um conjunto de regras de governança para IA em que **regra vira
gate executável**, não fica em documento. O que está escrito abaixo vale para este repositório,
para quem o construiu e para a própria IA que escreve o código.

> **A regra roda, a prova abre, você decide.**

**Nossa ética, em uma linha:** IA confiável não é a que parece mais inteligente — é a que
**mostra a fonte, respeita a decisão humana e não deixa o dado vazar**. Isso não é recurso
adicionado depois; é a arquitetura desde a primeira linha.

### Os 5 pilares

| # | Pilar | Em uma frase | O gate que o executa |
|---|---|---|---|
| **P1** | **Verdade Provada** | Afirmação sem prova é inválida; toda afirmação carrega proveniência e classificação (CONFIRMADO · INFERIDO · HIPÓTESE · AÇÃO). | `provenance` + `phantom-done` no pre-commit |
| **P2** | **Humano Soberano** | Publicar, assinar, gastar e decidir são atos humanos. A IA rascunha; a pessoa corta. | `hitl-registro` — hash, data e critério de aceite escrito |
| **P3** | **Regra Vira Gate** | Regra sem enforcement é manifesto. Mudar um gate é mudança constitucional. | `const-guard` — bloqueia inclusive quem construiu o sistema |
| **P4** | **Dado Soberano** | O motor viaja no git; o dado real nunca sai de casa. | `gitleaks` + `pii-hardblock` (PII brasileira) |
| **P5** | **Entender > Produzir** | Diagnóstico antes de demonstração; capacidade nova exige prova comportamental. | descubra-antes-de-criar + golden cases |

Cada pilar nasceu de um **incidente real**, não de teoria — e cada um vale também para quem
construiu o sistema. Detalhe com código citável: [`egos-pillars`](https://github.com/enioxt/egos-pillars).
Voz completa das cinco: `docs/strategy/EGOS_VOICE_GUIDE.md §9` no kernel.

**Este bloco é gerado.** Ele é idêntico em todo repositório derivado do EGOS e se atualiza a
partir do kernel — editar à mão aqui é perder a edição na próxima sincronia. Para mudar o texto,
mude a fonte: `templates/pilares/BLOCO_README.md`. Regra que o obriga: **L0-15 EGOS-SE-EXPLICA**.
<!-- EGOS-PILARES-END -->

Se você é um novo desenvolvedor ou uma IA tentando entender *"Por que o EGOS funciona assim?"*, você está no lugar certo. Leia os documentos aqui para entender a fundação teórica.

Para escrever código, vá para os repositórios ativos abaixo.

---

## 🚀 Onde a Ação Acontece (Repositórios Ativos)

Nós evoluímos de um "Sistema Nervoso Central Místico" para uma **Tríade Pragmática de Desenvolvimento**:

### 1. [carteira-livre](https://github.com/enioxt/carteira-livre) (A Fonte / Padrão Ouro)
O projeto que define o nosso padrão de excelência. É altamente modularizado, componentizado e limpo. Toda nova arquitetura deve fazer engenharia reversa e copiar os padrões estabelecidos aqui.

### 2. [forja](https://github.com/enioxt/forja) (O Alvo Imediato)
Nosso projeto mais avançado depois do Carteira Livre. O objetivo atual de engenharia é refatorar toda a base de código da Forja para que ela replique perfeitamente a estrutura e os padrões do Carteira Livre.

### 3. [egos](https://github.com/enioxt/egos) (O Monorepo / Laboratório de Agentes)
O antigo `egos-lab` foi arquivado. O repositório `egos` assume oficialmente o papel de **Laboratório Central de Agentes e Motores de IA**. É aqui que construímos, testamos e validamos os agentes antes de enviá-los para produção. Também é o lar do pacote `@enioxt/ai-rules` (nossas regras pragmáticas de IA).

---

## 📚 Documentos Históricos e Fundacionais

Neste repositório, você encontrará os registros das nossas decisões arquiteturais:
- `HANDOFF_CRITICA_NEGOCIOS.md`: O momento em que pivotamos da filosofia pura para o pragmatismo de mercado.
- `HANDOFF.md`: A transição do painel genérico para a visão de Mission Control.
- `AGENTS.md` & `frozen-zones.md`: Nossos primeiros rascunhos de governança de IA (agora centralizados no pacote `@enioxt/ai-rules`).

---
*Fim da transmissão. Nos vemos no campo de batalha (nos repositórios ativos).*
