import React from 'react';
import { motion } from 'motion/react';
import { Archive, ArrowRight, BookOpen, GitBranch, Terminal, ShieldAlert } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6 font-sans text-zinc-300">
      <div className="max-w-3xl w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="bg-amber-500/10 border-b border-amber-500/20 p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-amber-500/50" />
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/20 text-amber-500 mb-4">
              <Archive size={32} />
            </div>
            <h1 className="text-3xl font-bold text-zinc-100 mb-2 tracking-tight">BLUEPRINT-EGOS</h1>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest">
              <ShieldAlert size={14} />
              Repositório Arquivado
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-8">
            <div className="text-center space-y-4">
              <p className="text-lg text-zinc-400">
                Este repositório serviu como nosso quadro branco histórico e manifesto fundacional. 
                A arquitetura evoluiu e o código de produção não vive mais aqui.
              </p>
              <p className="text-zinc-500">
                Nós evoluímos de um "Sistema Nervoso Central Místico" para uma <strong>Tríade Pragmática de Desenvolvimento</strong>.
              </p>
            </div>

            <div className="grid gap-4">
              <a 
                href="https://github.com/enioxt/carteira-livre"
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-4 p-4 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group"
              >
                <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                  <BookOpen size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors flex items-center gap-2">
                    Carteira Livre <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">Padrão Ouro</span>
                  </h3>
                  <p className="text-sm text-zinc-500 mt-1">O projeto que define nosso padrão de excelência. Altamente modularizado, componentizado e limpo.</p>
                </div>
                <ArrowRight className="text-zinc-600 group-hover:text-emerald-400 self-center transition-colors" />
              </a>

              <a 
                href="https://github.com/enioxt/forja"
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-4 p-4 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group"
              >
                <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400 shrink-0">
                  <GitBranch size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-zinc-100 group-hover:text-blue-400 transition-colors flex items-center gap-2">
                    Forja <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400">Alvo Imediato</span>
                  </h3>
                  <p className="text-sm text-zinc-500 mt-1">Nosso projeto mais avançado depois do Carteira Livre. Em processo de refatoração para o novo padrão.</p>
                </div>
                <ArrowRight className="text-zinc-600 group-hover:text-blue-400 self-center transition-colors" />
              </a>

              <a 
                href="https://github.com/enioxt/egos"
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-4 p-4 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all group"
              >
                <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400 shrink-0">
                  <Terminal size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-zinc-100 group-hover:text-purple-400 transition-colors flex items-center gap-2">
                    EGOS Kernel <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400">Laboratório</span>
                  </h3>
                  <p className="text-sm text-zinc-500 mt-1">O monorepo oficial. Laboratório central onde construímos, testamos e validamos os agentes de IA.</p>
                </div>
                <ArrowRight className="text-zinc-600 group-hover:text-purple-400 self-center transition-colors" />
              </a>
            </div>

            <div className="pt-6 border-t border-zinc-800 text-center">
              <p className="text-xs text-zinc-600 font-mono">
                "A filosofia vai para o manifesto. O código vai para a produção."
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
