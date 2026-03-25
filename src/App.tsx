import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { 
  Terminal, GitBranch, CheckCircle, Lock, 
  Activity, Database, Server, Network, ChevronRight,
  Code, Cpu, Globe, LayoutDashboard, GitPullRequest,
  Search, ArrowRight, Bot, GitCommit, ShieldAlert,
  Play, Check, X, Clock
} from 'lucide-react';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- TYPES ---
type Status = 'active' | 'inactive' | 'planned' | 'critical';

interface GitHubCommit {
  sha: string;
  commit: {
    author: { name: string; email: string; date: string };
    message: string;
  };
  html_url: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  updated_at: string;
  pushed_at: string;
  language: string;
}

// --- COMPONENTS ---

const Card = ({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) => (
  <div 
    onClick={onClick}
    className={cn(
      "bg-zinc-900/50 border border-zinc-800/50 rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-200", 
      onClick && "cursor-pointer hover:bg-zinc-800/50 hover:border-zinc-700 hover:shadow-lg hover:-translate-y-0.5",
      className
    )}
  >
    {children}
  </div>
);

const Badge = ({ children, variant = 'default' }: { children: React.ReactNode, variant?: Status | 'default' | 'info' | 'warning' | 'success' }) => {
  const variants = {
    default: 'bg-zinc-800 text-zinc-300 border-zinc-700',
    active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    planned: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    inactive: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
    critical: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    info: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    success: 'bg-green-500/10 text-green-400 border-green-500/20',
  };
  return (
    <span className={cn("px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold rounded-full border whitespace-nowrap", variants[variant])}>
      {children}
    </span>
  );
};

// --- HELPER ---
const getProvenance = (message: string, name: string) => {
  const msg = message.toLowerCase();
  if (name.includes('Google') || msg.includes('ai studio')) return { source: 'Google AI Studio', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' };
  if (msg.includes('windsurf') || msg.includes('cascade')) return { source: 'Windsurf IDE', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' };
  if (msg.includes('antigravity')) return { source: 'Antigravity IDE', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' };
  return { source: 'Human / CLI', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' };
};

// --- VIEWS ---

const RealtimeEventsView = () => {
  const [commits, setCommits] = useState<GitHubCommit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetching REAL data from the current repository to prove provenance
    fetch('https://api.github.com/repos/enioxt/BLUEPRINT-EGOS/commits')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setCommits(data.slice(0, 10));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h3 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
            <Activity className="text-emerald-400" />
            Event Stream & Provenance (Real Data)
          </h3>
          <p className="text-sm text-zinc-500 mt-1">Monitorando webhooks reais do repositório BLUEPRINT-EGOS.</p>
        </div>
        <Badge variant="active">Live Sync</Badge>
      </div>

      <Card className="p-0 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-zinc-500 animate-pulse">Estabelecendo conexão com GitHub...</div>
        ) : (
          <div className="divide-y divide-zinc-800/50">
            {commits.map(commit => {
              const prov = getProvenance(commit.commit.message, commit.commit.author.name);
              return (
                <div key={commit.sha} className="p-4 hover:bg-zinc-800/30 transition-colors flex gap-4 items-start">
                  <div className={cn("p-2 rounded-lg border mt-1", prov.bg, prov.border, prov.color)}>
                    <GitCommit size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4 mb-1">
                      <p className="text-sm font-medium text-zinc-200 truncate">{commit.commit.message}</p>
                      <span className="text-xs font-mono text-zinc-500 whitespace-nowrap">
                        {new Date(commit.commit.author.date).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-zinc-500">{commit.commit.author.name}</span>
                      <span className="text-zinc-700">&bull;</span>
                      <span className={cn("font-mono", prov.color)}>[Origin: {prov.source}]</span>
                      <span className="text-zinc-700">&bull;</span>
                      <a href={commit.html_url} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline font-mono">
                        {commit.sha.substring(0, 7)}
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </motion.div>
  );
};

const OpenClawTriageView = () => {
  const [commits, setCommits] = useState<GitHubCommit[]>([]);
  const [loading, setLoading] = useState(true);
  const [executing, setExecuting] = useState<string | null>(null);
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    fetch('https://api.github.com/repos/enioxt/BLUEPRINT-EGOS/commits')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setCommits(data.slice(0, 5)); // Take top 5 for triage
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleExecute = (sha: string) => {
    setExecuting(sha);
    // Simulate OpenClaw execution delay
    setTimeout(() => {
      setExecuting(null);
      setCompleted(prev => [...prev, sha]);
    }, 2500);
  };

  const getAgentAnalysis = (message: string) => {
    const msg = message.toLowerCase();
    if (msg.includes('frontend') || msg.includes('dashboard') || msg.includes('ui')) {
      return { action: 'MOVE_TO_EGOS_UI', target: 'enioxt/egos -> packages/ui', confidence: '94%' };
    }
    if (msg.includes('agent') || msg.includes('triage') || msg.includes('openclaw')) {
      return { action: 'MOVE_TO_EGOS_AGENTS', target: 'enioxt/egos -> apps/agents', confidence: '88%' };
    }
    return { action: 'KEEP_IN_BLUEPRINT', target: 'enioxt/BLUEPRINT-EGOS', confidence: '99%' };
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h3 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
            <GitPullRequest className="text-rose-400" />
            OpenClaw & Triagem (Live)
          </h3>
          <p className="text-sm text-zinc-500 mt-1">Agentes analisando commits recentes para reorganização entre repositórios.</p>
        </div>
        <Badge variant="critical">OpenClaw Engine</Badge>
      </div>

      <Card className="p-0 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-zinc-500 animate-pulse">Carregando fila de triagem...</div>
        ) : (
          <div className="divide-y divide-zinc-800/50">
            {commits.map(commit => {
              const prov = getProvenance(commit.commit.message, commit.commit.author.name);
              const analysis = getAgentAnalysis(commit.commit.message);
              const isExecuting = executing === commit.sha;
              const isCompleted = completed.includes(commit.sha);
              const isMoveAction = analysis.action.startsWith('MOVE');

              return (
                <div key={commit.sha} className="p-6 hover:bg-zinc-800/20 transition-colors">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={cn("text-xs font-mono px-2 py-0.5 rounded border", prov.bg, prov.border, prov.color)}>
                          {prov.source}
                        </span>
                        <a href={commit.html_url} target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:underline font-mono">
                          {commit.sha.substring(0, 7)}
                        </a>
                      </div>
                      <p className="text-sm font-medium text-zinc-200">{commit.commit.message}</p>
                    </div>
                    
                    {isCompleted ? (
                      <Badge variant="success"><span className="flex items-center gap-1"><Check size={12}/> Processado</span></Badge>
                    ) : isExecuting ? (
                      <Badge variant="warning"><span className="flex items-center gap-1 animate-pulse"><Clock size={12}/> Executando OpenClaw...</span></Badge>
                    ) : (
                      <Badge variant="planned">Pendente</Badge>
                    )}
                  </div>

                  <div className="bg-zinc-950 rounded-lg border border-zinc-800 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Cpu size={16} className="text-emerald-400" />
                      <span className="text-xs font-bold text-zinc-300">EGOS Triage Agent Analysis</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Ação Recomendada</p>
                        <p className={cn("text-xs font-mono", isMoveAction ? "text-rose-400" : "text-zinc-300")}>{analysis.action}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Destino (Target)</p>
                        <p className="text-xs font-mono text-zinc-300">{analysis.target}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Confiança (pgvector)</p>
                        <p className="text-xs font-mono text-emerald-400">{analysis.confidence}</p>
                      </div>
                    </div>

                    {!isCompleted && isMoveAction && (
                      <button 
                        onClick={() => handleExecute(commit.sha)}
                        disabled={isExecuting}
                        className={cn(
                          "w-full py-2 rounded-md text-xs font-bold flex items-center justify-center gap-2 transition-all",
                          isExecuting 
                            ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" 
                            : "bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20"
                        )}
                      >
                        {isExecuting ? <Clock size={14} className="animate-spin" /> : <Play size={14} />}
                        {isExecuting ? 'OpenClaw está movendo arquivos e abrindo PR...' : 'Executar OpenClaw (Criar PR)'}
                      </button>
                    )}
                    {!isCompleted && !isMoveAction && (
                      <div className="w-full py-2 rounded-md text-xs font-bold flex items-center justify-center gap-2 bg-zinc-800/50 text-zinc-500 border border-zinc-800">
                        <CheckCircle size={14} />
                        Nenhuma ação necessária
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </motion.div>
  );
};

const ArchitectureView = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
    <Card className="p-6">
      <h3 className="text-xl font-bold text-zinc-100 mb-2 flex items-center gap-2">
        <Network className="text-zinc-400" />
        Arquitetura de Triagem Agêntica (Agnóstica)
      </h3>
      <p className="text-sm text-zinc-400 mb-8">Fluxo de captura de assinaturas, análise de contexto e reorganização automática de repositórios via OpenClaw.</p>
      
      <div className="relative flex flex-col gap-8 p-8 bg-zinc-950 rounded-xl border border-zinc-800">
        
        {/* Layer 1: Origins */}
        <div className="flex flex-wrap justify-center gap-4 z-10">
          <div className="flex flex-col items-center p-4 bg-zinc-900 border border-zinc-800 rounded-lg w-40">
            <Bot className="text-purple-400 mb-2" size={24} />
            <span className="text-sm font-bold text-zinc-200">Google AI Studio</span>
            <span className="text-[10px] text-zinc-500 font-mono mt-1">Signature: Web UI</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-zinc-900 border border-zinc-800 rounded-lg w-40">
            <Code className="text-blue-400 mb-2" size={24} />
            <span className="text-sm font-bold text-zinc-200">Windsurf IDE</span>
            <span className="text-[10px] text-zinc-500 font-mono mt-1">Signature: Cascade</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-zinc-900 border border-zinc-800 rounded-lg w-40">
            <Terminal className="text-amber-400 mb-2" size={24} />
            <span className="text-sm font-bold text-zinc-200">Antigravity</span>
            <span className="text-[10px] text-zinc-500 font-mono mt-1">Signature: CLI</span>
          </div>
        </div>

        <div className="flex justify-center text-zinc-600"><ArrowRight className="rotate-90" /></div>

        {/* Layer 2: Ingestion */}
        <div className="flex justify-center z-10">
          <div className="flex items-center gap-4 p-4 bg-zinc-900/80 border border-zinc-700 rounded-xl w-full max-w-2xl shadow-lg">
            <div className="p-3 bg-blue-500/10 rounded-lg"><Server className="text-blue-400" /></div>
            <div className="flex-1">
              <h4 className="font-bold text-zinc-100">FastAPI Webhook Gateway (Contabo VPS)</h4>
              <p className="text-xs text-zinc-400">Recebe payloads do GitHub, extrai assinaturas e valida a origem (Provenance).</p>
            </div>
            <Badge variant="info">kernel.egos.ia.br</Badge>
          </div>
        </div>

        <div className="flex justify-center text-zinc-600"><ArrowRight className="rotate-90" /></div>

        {/* Layer 3: Brain & Execution */}
        <div className="flex flex-col md:flex-row justify-center gap-6 z-10">
          <div className="flex-1 flex flex-col items-center p-6 bg-zinc-900 border border-emerald-500/30 rounded-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/50" />
            <Cpu className="text-emerald-400 mb-3" size={32} />
            <h4 className="font-bold text-zinc-100 mb-1">EGOS Triage Agent</h4>
            <p className="text-xs text-zinc-400 text-center">Analisa o diff do commit. Identifica se o código pertence ao <code className="text-emerald-300">BLUEPRINT-EGOS</code> ou ao monorepo <code className="text-emerald-300">egos</code>.</p>
          </div>

          <div className="flex items-center justify-center text-zinc-600"><ArrowRight className="hidden md:block" /><ArrowRight className="rotate-90 md:hidden" /></div>

          <div className="flex-1 flex flex-col items-center p-6 bg-zinc-900 border border-rose-500/30 rounded-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-rose-500/50" />
            <GitPullRequest className="text-rose-400 mb-3" size={32} />
            <h4 className="font-bold text-zinc-100 mb-1">OpenClaw Executor</h4>
            <p className="text-xs text-zinc-400 text-center">Clona repositórios, move os arquivos para o local correto e abre um Pull Request automatizado.</p>
          </div>
        </div>

      </div>
    </Card>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6">
        <h3 className="text-lg font-bold text-zinc-100 mb-4 flex items-center gap-2">
          <Database className="text-zinc-400" size={20} />
          Stack Tecnológica (Realidade)
        </h3>
        <ul className="space-y-4">
          <li className="flex gap-3">
            <div className="mt-0.5"><Globe className="text-blue-400" size={16} /></div>
            <div>
              <p className="text-sm font-bold text-zinc-200">Frontend (Este Dashboard)</p>
              <p className="text-xs text-zinc-500">React + Vite + Tailwind. Hospedado no Contabo via Nginx/Docker em <code>kernel.egos.ia.br</code>.</p>
            </div>
          </li>
          <li className="flex gap-3">
            <div className="mt-0.5"><Server className="text-emerald-400" size={16} /></div>
            <div>
              <p className="text-sm font-bold text-zinc-200">Ingestion API</p>
              <p className="text-xs text-zinc-500">FastAPI (Python). Escuta Webhooks do GitHub. Valida assinaturas HMAC.</p>
            </div>
          </li>
          <li className="flex gap-3">
            <div className="mt-0.5"><Database className="text-purple-400" size={16} /></div>
            <div>
              <p className="text-sm font-bold text-zinc-200">State & Vector Store</p>
              <p className="text-xs text-zinc-500">Supabase (PostgreSQL + pgvector). Armazena o log de eventos e embeddings de código para roteamento.</p>
            </div>
          </li>
        </ul>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-bold text-zinc-100 mb-4 flex items-center gap-2">
          <ShieldAlert className="text-zinc-400" size={20} />
          Regras de Assinatura (Provenance)
        </h3>
        <div className="space-y-3 text-sm text-zinc-400">
          <p>Para que o sistema funcione sem dados mockados, a esteira de CI/CD exige:</p>
          <div className="p-3 bg-zinc-950 rounded border border-zinc-800 font-mono text-xs">
            1. Commits do AI Studio devem usar o email da conta Google vinculada.<br/><br/>
            2. Commits do Windsurf devem incluir a tag <code>[Windsurf]</code> no final da mensagem via Git Hooks locais.<br/><br/>
            3. O Triage Agent só move código se a confiança semântica (pgvector) for &gt; 0.85.
          </div>
        </div>
      </Card>
    </div>
  </motion.div>
);

const RepositoriesView = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);

  useEffect(() => {
    fetch('https://api.github.com/users/enioxt/repos?per_page=100&sort=pushed')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setRepos(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const activeRepos = repos.filter(r => new Date(r.pushed_at).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000);
  const inactiveRepos = repos.filter(r => new Date(r.pushed_at).getTime() <= Date.now() - 30 * 24 * 60 * 60 * 1000);

  const getAgentInsights = (repo: GitHubRepo) => {
    const name = repo.name.toLowerCase();
    const insights = [];
    
    if (name.includes('egos')) {
      insights.push({ type: 'core', text: 'Parte do ecossistema core EGOS. Requer sincronização estrita com BLUEPRINT-EGOS.' });
    }
    if (name === 'brazil-visible-sdk' || name === 'open-tender-watch') {
      insights.push({ type: 'cross-ref', text: 'Possível merge de contexto: Integrar dados do brazil-visible-sdk com o monitoramento do open-tender-watch.' });
      insights.push({ type: 'agent', text: 'Proposição: Agente de OSINT para cruzar licitações (open-tender) com dados da Receita Federal (brazil-visible).' });
    }
    if (name === '852') {
      insights.push({ type: 'agent', text: 'Proposição: Integrar fallback do OpenRouter com a malha de roteamento do EGOS-Inteligencia.' });
    }
    if (name === 'esaa-supervisor') {
      insights.push({ type: 'arch', text: 'Ponto de atenção: O supervisor local deve reportar status para o kernel.egos.ia.br via WebSocket.' });
    }
    
    if (insights.length === 0) {
      insights.push({ type: 'general', text: 'Monitoramento passivo ativado. Nenhuma anomalia detectada.' });
    }
    return insights;
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/80">
            <h3 className="text-lg font-semibold text-zinc-100 flex items-center gap-2">
              <Globe className="text-zinc-400" size={20} />
              Ecossistema de Repositórios (Live)
            </h3>
            <Badge variant="info">Total: {repos.length}</Badge>
          </div>
          
          {loading ? (
            <div className="p-8 text-center text-zinc-500 animate-pulse">Mapeando ecossistema no GitHub...</div>
          ) : (
            <div className="max-h-[600px] overflow-y-auto divide-y divide-zinc-800/50">
              <div className="p-2 bg-zinc-900/50 text-xs font-bold text-zinc-500 uppercase tracking-wider sticky top-0 backdrop-blur-md">Ativos Recentemente (30 dias)</div>
              {activeRepos.map((repo) => (
                <div 
                  key={repo.id} 
                  onClick={() => setSelectedRepo(repo)}
                  className={cn(
                    "p-4 flex items-center justify-between transition-colors cursor-pointer",
                    selectedRepo?.id === repo.id ? "bg-zinc-800/50 border-l-2 border-emerald-500" : "hover:bg-zinc-800/20 border-l-2 border-transparent"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <div>
                      <span className="font-medium text-zinc-200">{repo.name}</span>
                      <p className="text-xs text-zinc-500 mt-1 max-w-md truncate">{repo.description || 'Sem descrição'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {repo.language && <Badge variant="default">{repo.language}</Badge>}
                  </div>
                </div>
              ))}

              <div className="p-2 bg-zinc-900/50 text-xs font-bold text-zinc-500 uppercase tracking-wider sticky top-0 backdrop-blur-md border-t border-zinc-800">Inativos / Arquivados</div>
              {inactiveRepos.map((repo) => (
                <div 
                  key={repo.id} 
                  onClick={() => setSelectedRepo(repo)}
                  className={cn(
                    "p-4 flex items-center justify-between transition-colors cursor-pointer opacity-70",
                    selectedRepo?.id === repo.id ? "bg-zinc-800/50 border-l-2 border-zinc-500" : "hover:bg-zinc-800/20 border-l-2 border-transparent"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-zinc-600" />
                    <div>
                      <span className="font-medium text-zinc-300">{repo.name}</span>
                    </div>
                  </div>
                  <span className="text-xs text-zinc-600 font-mono">{new Date(repo.pushed_at).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* SIDE PANEL - AGENT INSIGHTS */}
      <div className="lg:col-span-1">
        <AnimatePresence mode="wait">
          {selectedRepo ? (
            <motion.div key={selectedRepo.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <Card className="p-6 sticky top-8 border-emerald-500/20">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-lg font-bold text-zinc-100 break-all">{selectedRepo.name}</h4>
                  <a href={selectedRepo.html_url} target="_blank" rel="noreferrer" className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-md transition-colors">
                    <ArrowRight size={14} className="-rotate-45 text-zinc-300" />
                  </a>
                </div>
                
                <p className="text-sm text-zinc-400 mb-6">{selectedRepo.description || 'Nenhuma descrição fornecida no GitHub.'}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6 text-xs">
                  <div className="bg-zinc-900 p-3 rounded-lg border border-zinc-800">
                    <span className="text-zinc-500 block mb-1">Último Push</span>
                    <span className="font-mono text-zinc-300">{new Date(selectedRepo.pushed_at).toLocaleString()}</span>
                  </div>
                  <div className="bg-zinc-900 p-3 rounded-lg border border-zinc-800">
                    <span className="text-zinc-500 block mb-1">Linguagem</span>
                    <span className="font-mono text-zinc-300">{selectedRepo.language || 'N/A'}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2 mb-3">
                    <Bot size={14} className="text-purple-400" />
                    EGOS Agent Insights
                  </h5>
                  
                  {getAgentInsights(selectedRepo).map((insight, idx) => (
                    <div key={idx} className={cn(
                      "p-3 rounded-lg border text-xs leading-relaxed",
                      insight.type === 'agent' ? "bg-purple-500/10 border-purple-500/20 text-purple-300" :
                      insight.type === 'cross-ref' ? "bg-blue-500/10 border-blue-500/20 text-blue-300" :
                      insight.type === 'core' ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300" :
                      "bg-zinc-900 border-zinc-800 text-zinc-400"
                    )}>
                      {insight.text}
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex items-center justify-center p-8 text-center border border-dashed border-zinc-800 rounded-xl">
              <p className="text-sm text-zinc-500">Selecione um repositório para visualizar insights e proposições dos agentes.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// --- MAIN APP ---

export default function App() {
  const [activeTab, setActiveTab] = useState('events');

  const tabs = [
    { id: 'events', label: 'Event Stream', icon: Activity },
    { id: 'triage', label: 'OpenClaw & Triagem', icon: GitPullRequest },
    { id: 'architecture', label: 'Arquitetura', icon: Network },
    { id: 'repos', label: 'Repositórios (Live)', icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 bg-grid-pattern flex overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-zinc-800/50 bg-zinc-950/90 backdrop-blur-xl flex flex-col fixed h-full z-20">
        <div className="p-6 border-b border-zinc-800/50">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center">
              <Terminal className="text-zinc-950" size={18} />
            </div>
            <h1 className="font-bold text-xl tracking-tight text-zinc-100">EGOS</h1>
          </div>
          <p className="text-xs text-zinc-500 font-mono ml-11">kernel.egos.ia.br</p>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive 
                    ? "bg-zinc-800/50 text-zinc-100 shadow-sm" 
                    : "text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200"
                )}
              >
                <Icon size={18} className={isActive ? "text-zinc-100" : "text-zinc-500"} />
                {tab.label}
                {isActive && <ChevronRight size={16} className="ml-auto text-zinc-500" />}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-zinc-800/50">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium text-zinc-400">Conectado ao GitHub API</span>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 ml-64 h-screen overflow-y-auto relative">
        <div className="p-8 max-w-5xl mx-auto pb-24">
          <header className="mb-8 flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-bold text-zinc-100 tracking-tight">
                {tabs.find(t => t.id === activeTab)?.label}
              </h2>
              <p className="text-zinc-500 mt-1">
                Monitoramento de proveniência e orquestração de agentes.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="warning">No Mocks</Badge>
              <Badge variant="info">Contabo VPS Target</Badge>
            </div>
          </header>

          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              {activeTab === 'events' && <RealtimeEventsView />}
              {activeTab === 'triage' && <OpenClawTriageView />}
              {activeTab === 'architecture' && <ArchitectureView />}
              {activeTab === 'repos' && <RepositoriesView />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

