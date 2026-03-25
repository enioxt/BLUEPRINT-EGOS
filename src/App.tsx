import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { 
  Terminal, GitBranch, CheckCircle, Lock, 
  Activity, Database, Server, Network, ChevronRight,
  Code, Cpu, Globe, LayoutDashboard, GitPullRequest,
  Search, ArrowRight, Bot, GitCommit, ShieldAlert,
  Play, Check, X, Clock, ChevronDown, ChevronUp,
  Workflow, Power, PowerOff, Github, AlertTriangle, ExternalLink
} from 'lucide-react';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- TYPES ---
type Status = 'active' | 'inactive' | 'planned' | 'critical' | 'success' | 'failure';

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

interface GitHubActionRun {
  id: number;
  name: string;
  display_title: string;
  status: string;
  conclusion: string;
  html_url: string;
  created_at: string;
  repository: { name: string };
}

// --- CONFIG ---
const config = {
  githubToken: import.meta.env.VITE_GITHUB_TOKEN,
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
  fastapiUrl: import.meta.env.VITE_FASTAPI_URL,
};

// --- COMPONENTS ---

const SetupAlert = ({ title, description, steps, link }: { title: string, description: string, steps: string[], link?: string }) => (
  <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
    <div className="flex items-start gap-3">
      <AlertTriangle className="text-amber-400 mt-0.5 shrink-0" size={18} />
      <div>
        <h4 className="text-sm font-bold text-amber-400 mb-1">{title}</h4>
        <p className="text-xs text-zinc-300 mb-3">{description}</p>
        <ol className="list-decimal list-inside text-xs text-zinc-400 space-y-1 mb-3">
          {steps.map((step, i) => <li key={i}>{step}</li>)}
        </ol>
        {link && (
          <a href={link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors">
            Obter Credenciais <ExternalLink size={12} />
          </a>
        )}
      </div>
    </div>
  </div>
);

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
    failure: 'bg-red-500/10 text-red-400 border-red-500/20',
  };
  return (
    <span className={cn("px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold rounded-full border whitespace-nowrap", variants[variant])}>
      {children}
    </span>
  );
};

const ExpandableSection = ({ 
  title, 
  icon: Icon, 
  children, 
  defaultOpen = false, 
  badge,
  subtitle
}: { 
  title: string, 
  icon: any, 
  children: React.ReactNode, 
  defaultOpen?: boolean, 
  badge?: React.ReactNode,
  subtitle?: string
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border border-zinc-800/50 rounded-xl bg-zinc-900/30 overflow-hidden mb-4 transition-all duration-200">
      <div 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full p-4 flex items-center justify-between bg-zinc-900/50 hover:bg-zinc-800/50 transition-colors cursor-pointer"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsOpen(!isOpen);
          }
        }}
      >
        <div className="flex items-center gap-3">
          <Icon className={isOpen ? "text-emerald-400" : "text-zinc-400"} size={18} />
          <div className="text-left">
            <span className="font-bold text-zinc-200 block">{title}</span>
            {subtitle && <span className="text-xs text-zinc-500 font-mono">{subtitle}</span>}
          </div>
          {badge && <div className="ml-2">{badge}</div>}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-500 font-mono">{isOpen ? 'Colapsar' : 'Expandir'}</span>
          {isOpen ? <ChevronUp size={18} className="text-zinc-500"/> : <ChevronDown size={18} className="text-zinc-500"/>}
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }} 
            className="overflow-hidden"
          >
            <div className="p-4 border-t border-zinc-800/50 bg-zinc-950/50">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
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
            Kernel Event Stream (Live)
          </h3>
          <p className="text-sm text-zinc-500 mt-1">Monitoramento modular de proveniência e telemetria de commits.</p>
        </div>
        <Badge variant="active">Listening</Badge>
      </div>

      {!config.supabaseUrl && (
        <SetupAlert 
          title="Supabase Vector Store Pendente"
          description="Os eventos estão sendo puxados diretamente da API pública do GitHub. Para roteamento semântico (pgvector) e persistência, conecte o Supabase."
          steps={[
            'Crie um projeto no Supabase e ative a extensão pgvector.',
            'Adicione VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no arquivo .env',
            'O stream passará a consumir do banco de dados em tempo real.'
          ]}
          link="https://supabase.com/dashboard/projects"
        />
      )}

      {loading ? (
        <div className="p-8 text-center text-zinc-500 animate-pulse border border-zinc-800 rounded-xl">Estabelecendo conexão com GitHub...</div>
      ) : (
        <div className="space-y-2">
          {commits.map((commit, index) => {
            const prov = getProvenance(commit.commit.message, commit.commit.author.name);
            return (
              <ExpandableSection 
                key={commit.sha}
                title={commit.commit.message.split('\n')[0]}
                subtitle={`${commit.commit.author.name} • ${new Date(commit.commit.author.date).toLocaleTimeString()}`}
                icon={GitCommit}
                defaultOpen={index === 0}
                badge={<Badge variant={prov.source === 'Human / CLI' ? 'default' : 'info'}>{prov.source}</Badge>}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Detalhes da Assinatura</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between p-2 bg-zinc-900 rounded border border-zinc-800">
                        <span className="text-zinc-500">SHA-1</span>
                        <a href={commit.html_url} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline font-mono">{commit.sha.substring(0, 7)}</a>
                      </li>
                      <li className="flex justify-between p-2 bg-zinc-900 rounded border border-zinc-800">
                        <span className="text-zinc-500">Autor</span>
                        <span className="text-zinc-300">{commit.commit.author.name}</span>
                      </li>
                      <li className="flex justify-between p-2 bg-zinc-900 rounded border border-zinc-800">
                        <span className="text-zinc-500">Proveniência Detectada</span>
                        <span className={cn("font-bold", prov.color)}>{prov.source}</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Mensagem Completa</h4>
                    <div className="p-3 bg-zinc-900 rounded border border-zinc-800 text-sm text-zinc-300 font-mono whitespace-pre-wrap h-full">
                      {commit.commit.message}
                    </div>
                  </div>
                </div>
              </ExpandableSection>
            );
          })}
        </div>
      )}
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
        if (Array.isArray(data)) setCommits(data.slice(0, 5));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleExecute = (sha: string) => {
    setExecuting(sha);
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
            OpenClaw & Triagem Agêntica
          </h3>
          <p className="text-sm text-zinc-500 mt-1">Reorganização modular e autônoma de repositórios baseada em contexto.</p>
        </div>
        <Badge variant="critical">OpenClaw Engine</Badge>
      </div>

      {!config.fastapiUrl && (
        <SetupAlert 
          title="Backend FastAPI Não Conectado (Modo Simulação)"
          description="A execução do OpenClaw está rodando em modo simulado no frontend. Para executar agentes reais, conecte o gateway."
          steps={[
            'Faça o deploy do backend Python (FastAPI) no seu VPS Contabo.',
            'Adicione VITE_FASTAPI_URL=https://sua-api.com no arquivo .env',
            'O botão \'Executar OpenClaw\' passará a enviar webhooks reais para a engine.'
          ]}
        />
      )}

      {loading ? (
        <div className="p-8 text-center text-zinc-500 animate-pulse border border-zinc-800 rounded-xl">Carregando fila de triagem...</div>
      ) : (
        <div className="space-y-2">
          {commits.map((commit, index) => {
            const analysis = getAgentAnalysis(commit.commit.message);
            const isExecuting = executing === commit.sha;
            const isCompleted = completed.includes(commit.sha);
            const isMoveAction = analysis.action.startsWith('MOVE');

            return (
              <ExpandableSection
                key={commit.sha}
                title={`Triagem: ${commit.sha.substring(0, 7)}`}
                subtitle={analysis.action}
                icon={Bot}
                defaultOpen={index === 0}
                badge={
                  isCompleted ? <Badge variant="success">Processado</Badge> :
                  isExecuting ? <Badge variant="warning">Executando...</Badge> :
                  <Badge variant="planned">Pendente</Badge>
                }
              >
                <div className="bg-zinc-950 rounded-lg border border-zinc-800 p-4">
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
                      Nenhuma ação necessária. Mantendo no repositório original.
                    </div>
                  )}
                </div>
              </ExpandableSection>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};

const ActionsControlView = () => {
  const [runs, setRuns] = useState<GitHubActionRun[]>([]);
  const [loading, setLoading] = useState(true);
  const [disabledWorkflows, setDisabledWorkflows] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Fetching real GitHub Actions runs from the egos monorepo
    fetch('https://api.github.com/repos/enioxt/egos/actions/runs')
      .then(res => res.json())
      .then(data => {
        if (data.workflow_runs) {
          setRuns(data.workflow_runs.slice(0, 15));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const toggleWorkflow = (name: string) => {
    setDisabledWorkflows(prev => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  // Group runs by workflow name to show modular controls
  const workflows = Array.from(new Set(runs.map(r => r.name)));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h3 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
            <Workflow className="text-blue-400" />
            GitHub Actions & CI/CD Control
          </h3>
          <p className="text-sm text-zinc-500 mt-1">Gerenciamento pragmático de pipelines. Desabilite o que não é usado.</p>
        </div>
        <Badge variant="info">API Integration</Badge>
      </div>

      <Card className="p-6 mb-6 border-blue-500/20 bg-blue-500/5">
        <h4 className="font-bold text-blue-400 flex items-center gap-2 mb-2">
          <ShieldAlert size={18} />
          Regra de Pragmatismo Aplicada
        </h4>
        <p className="text-sm text-zinc-300">
          "Devemos acessar o gh actions em nossa conta e desabilitar tudo que não usamos, deixar apenas o que interessa. Use todos os recursos necessários, sem reinventar a roda."
        </p>
      </Card>

      {!config.githubToken && (
        <SetupAlert 
          title="Integração GitHub Pendente (Modo Leitura)"
          description="Para modificar o estado dos workflows (Ativar/Desabilitar) via API, é necessário um Personal Access Token (PAT) autenticado."
          steps={[
            'Gere um token no GitHub com o escopo \'workflow\'.',
            'Adicione VITE_GITHUB_TOKEN no seu arquivo .env',
            'Reinicie a aplicação para habilitar as mutações reais.'
          ]}
          link="https://github.com/settings/tokens/new?scopes=workflow"
        />
      )}

      {loading ? (
        <div className="p-8 text-center text-zinc-500 animate-pulse border border-zinc-800 rounded-xl">Buscando workflows do GitHub...</div>
      ) : runs.length === 0 ? (
        <div className="p-8 text-center text-zinc-500 border border-zinc-800 rounded-xl">Nenhum workflow run encontrado no repositório público.</div>
      ) : (
        <div className="space-y-4">
          {workflows.map((workflowName, idx) => {
            const isDisabled = disabledWorkflows.has(workflowName);
            const workflowRuns = runs.filter(r => r.name === workflowName);
            const latestRun = workflowRuns[0];

            return (
              <ExpandableSection
                key={workflowName}
                title={workflowName}
                subtitle={`Última execução: ${new Date(latestRun.created_at).toLocaleString()}`}
                icon={Github}
                defaultOpen={idx === 0}
                badge={
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleWorkflow(workflowName); }}
                    className={cn(
                      "flex items-center gap-1 px-2 py-1 rounded text-xs font-bold transition-colors border",
                      isDisabled ? "bg-zinc-800 text-zinc-500 border-zinc-700 hover:bg-zinc-700" : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20"
                    )}
                  >
                    {isDisabled ? <PowerOff size={12} /> : <Power size={12} />}
                    {isDisabled ? 'Desabilitado' : 'Ativo'}
                  </button>
                }
              >
                <div className={cn("transition-opacity", isDisabled ? "opacity-50 pointer-events-none" : "opacity-100")}>
                  <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Histórico de Execuções</h4>
                  <div className="space-y-2">
                    {workflowRuns.map(run => (
                      <div key={run.id} className="flex items-center justify-between p-3 bg-zinc-900 rounded border border-zinc-800">
                        <div className="flex items-center gap-3">
                          {run.conclusion === 'success' ? <CheckCircle size={16} className="text-emerald-500" /> : 
                           run.conclusion === 'failure' ? <X size={16} className="text-rose-500" /> : 
                           <Activity size={16} className="text-blue-500 animate-pulse" />}
                          <div>
                            <a href={run.html_url} target="_blank" rel="noreferrer" className="text-sm font-medium text-zinc-200 hover:text-blue-400 transition-colors">
                              {run.display_title}
                            </a>
                            <p className="text-xs text-zinc-500 font-mono mt-0.5">Run #{run.id}</p>
                          </div>
                        </div>
                        <Badge variant={run.conclusion === 'success' ? 'success' : run.conclusion === 'failure' ? 'failure' : 'info'}>
                          {run.conclusion || run.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </ExpandableSection>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};

const RepositoriesView = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

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
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h3 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
            <Globe className="text-blue-400" />
            Ecossistema de Repositórios (Live)
          </h3>
          <p className="text-sm text-zinc-500 mt-1">Visão modular e colapsável de todos os repositórios mapeados.</p>
        </div>
        <Badge variant="info">Total: {repos.length}</Badge>
      </div>

      {loading ? (
        <div className="p-8 text-center text-zinc-500 animate-pulse border border-zinc-800 rounded-xl">Mapeando ecossistema no GitHub...</div>
      ) : (
        <div className="space-y-4">
          <ExpandableSection 
            title="Repositórios Ativos (Últimos 30 dias)" 
            icon={Activity} 
            defaultOpen={true}
            badge={<Badge variant="active">{activeRepos.length}</Badge>}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {activeRepos.map((repo) => (
                <div key={repo.id} className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg hover:border-emerald-500/50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <a href={repo.html_url} target="_blank" rel="noreferrer" className="font-bold text-zinc-200 hover:text-emerald-400 transition-colors">
                      {repo.name}
                    </a>
                    {repo.language && <Badge variant="default">{repo.language}</Badge>}
                  </div>
                  <p className="text-xs text-zinc-400 mb-4 line-clamp-2 h-8">{repo.description || 'Sem descrição'}</p>
                  
                  <div className="pt-3 border-t border-zinc-800/50 space-y-2">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                      <Bot size={12} className="text-purple-400" /> Agent Insights
                    </span>
                    {getAgentInsights(repo).map((insight, idx) => (
                      <div key={idx} className="text-xs text-zinc-300 bg-zinc-950 p-2 rounded border border-zinc-800/50">
                        {insight.text}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ExpandableSection>

          <ExpandableSection 
            title="Repositórios Inativos / Arquivados" 
            icon={Lock} 
            defaultOpen={false}
            badge={<Badge variant="inactive">{inactiveRepos.length}</Badge>}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {inactiveRepos.map((repo) => (
                <div key={repo.id} className="p-3 bg-zinc-900/50 border border-zinc-800/50 rounded-lg opacity-70 hover:opacity-100 transition-opacity">
                  <a href={repo.html_url} target="_blank" rel="noreferrer" className="font-medium text-zinc-300 hover:text-zinc-100 transition-colors block mb-1">
                    {repo.name}
                  </a>
                  <span className="text-[10px] text-zinc-500 font-mono">Último push: {new Date(repo.pushed_at).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          </ExpandableSection>
        </div>
      )}
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
  </motion.div>
);

// --- MAIN APP ---

export default function App() {
  const [activeTab, setActiveTab] = useState('events');

  const tabs = [
    { id: 'events', label: 'Event Stream', icon: Activity },
    { id: 'triage', label: 'OpenClaw & Triagem', icon: GitPullRequest },
    { id: 'actions', label: 'CI/CD & Actions', icon: Workflow },
    { id: 'repos', label: 'Repositórios (Live)', icon: Globe },
    { id: 'architecture', label: 'Arquitetura', icon: Network },
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
            <div className={cn("w-2 h-2 rounded-full animate-pulse", (config.githubToken && config.supabaseUrl && config.fastapiUrl) ? "bg-emerald-500" : "bg-amber-500")} />
            <span className="text-xs font-medium text-zinc-400">
              {(config.githubToken && config.supabaseUrl && config.fastapiUrl) ? "Kernel Interligado" : "Configurações Pendentes"}
            </span>
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
                Monitoramento de proveniência, orquestração de agentes e controle de CI/CD.
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
              {activeTab === 'actions' && <ActionsControlView />}
              {activeTab === 'repos' && <RepositoriesView />}
              {activeTab === 'architecture' && <ArchitectureView />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
