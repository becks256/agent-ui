import React from 'react';
import { Bot, ArrowRight, CheckCircle2, Loader2, AlertCircle, Users } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface SwarmAgent {
  id: string;
  name: string;
  role: string;
  status: 'idle' | 'working' | 'completed' | 'failed';
  avatar?: string;
  currentTask?: string;
  progress?: number;
}

export interface AgentSwarmViewProps {
  agents: SwarmAgent[];
  activeAgentId?: string;
  onSelectAgent?: (agentId: string) => void;
  className?: string;
}

export const AgentSwarmView: React.FC<AgentSwarmViewProps> = ({
  agents,
  activeAgentId,
  onSelectAgent,
  className,
}) => {
  return (
    <div
      className={cn(
        'my-3 p-3.5 rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm shadow-sm',
        className
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Users className="h-3 w-3" />
          </div>
          <span className="text-xs font-semibold text-foreground">
            Multi-Agent Swarm ({agents.length})
          </span>
        </div>
        <span className="text-[10px] text-muted-foreground font-mono">
          {agents.filter((a) => a.status === 'working').length} active
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {agents.map((agent) => {
          const isActive = agent.id === activeAgentId;
          return (
            <div
              key={agent.id}
              onClick={() => onSelectAgent && onSelectAgent(agent.id)}
              className={cn(
                'p-2.5 rounded-lg border border-border/40 bg-secondary/30 transition-all text-xs',
                onSelectAgent ? 'cursor-pointer hover:border-primary/40 hover:bg-secondary/60' : '',
                isActive && 'border-primary/60 bg-primary/10 shadow-sm shadow-primary/10',
                agent.status === 'working' && 'border-primary/30'
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="relative">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary border border-border/60 text-foreground font-semibold text-xs">
                      {agent.avatar ? (
                        <img
                          src={agent.avatar}
                          alt={agent.name}
                          className="h-full w-full rounded-full object-cover"
                        />
                      ) : (
                        <Bot className="h-3.5 w-3.5 text-primary" />
                      )}
                    </div>
                    {agent.status === 'working' && (
                      <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
                      </span>
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="font-semibold text-foreground text-xs truncate">
                      {agent.name}
                    </p>
                    <p className="text-[10px] text-muted-foreground truncate">
                      {agent.role}
                    </p>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="flex-shrink-0">
                  {agent.status === 'working' && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-primary text-primary-foreground font-bold font-mono text-[10px] shadow-2xs">
                      <Loader2 className="h-2.5 w-2.5 animate-spin" />
                      Working
                    </span>
                  )}
                  {agent.status === 'completed' && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-800 dark:text-emerald-300 font-mono font-medium">
                      <CheckCircle2 className="h-2.5 w-2.5" />
                      Done
                    </span>
                  )}
                  {agent.status === 'failed' && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-rose-800 dark:text-rose-300 font-mono font-medium">
                      <AlertCircle className="h-2.5 w-2.5" />
                      Error
                    </span>
                  )}
                  {agent.status === 'idle' && (
                    <span className="text-[10px] text-muted-foreground font-mono">
                      Idle
                    </span>
                  )}
                </div>
              </div>

              {agent.currentTask && (
                <div className="mt-2 pt-2 border-t border-border/40 text-[11px] text-foreground/80 flex items-center gap-1.5 truncate">
                  <ArrowRight className="h-2.5 w-2.5 text-muted-foreground/80 flex-shrink-0" />
                  <span className="truncate">{agent.currentTask}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
