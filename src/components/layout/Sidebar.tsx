import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  FileUp, 
  GitCompare, 
  Scale, 
  FileCheck2, 
  SearchCode, 
  UserCheck, 
  History, 
  CheckCircle2,
  Presentation,
  ShieldCheck
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string | number;
  badgeColor?: string;
  highlight?: boolean;
}

export const Sidebar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    comparisons, 
    findings, 
    rules, 
    application
  } = useApp();

  const discrepanciesCount = comparisons.filter(c => c.changeType === 'CHANGED' && c.severity === 'CRITICAL').length;
  const criticalFindingsCount = findings.filter(f => f.severity === 'CRITICAL').length;
  const reviewPending = !application.officerDecision;

  const presentationNav: NavItem = {
    id: 'presentation-slides',
    label: 'SIH Presentation Slides',
    icon: Presentation,
    badge: '6 Slides',
    badgeColor: 'bg-amber-400 text-slate-950 font-bold shadow-sm'
  };

  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard Overview',
      icon: LayoutDashboard
    },
    {
      id: 'intake',
      label: 'Application Intake',
      icon: FileUp,
      badge: 'Active',
      badgeColor: 'bg-slate-700 text-slate-300'
    },
    {
      id: 'comparison',
      label: 'Historical Comparison',
      icon: GitCompare,
      badge: discrepanciesCount > 0 ? `${discrepanciesCount} Discrepancy` : '0 Diff',
      badgeColor: discrepanciesCount > 0 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold' : 'bg-emerald-500/20 text-emerald-300',
      highlight: true
    },
    {
      id: 'rules',
      label: 'Regulatory Rule Engine',
      icon: Scale,
      badge: '5 Rules',
      badgeColor: 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
    },
    {
      id: 'documents',
      label: 'Document Verification',
      icon: FileCheck2,
      badge: `${application.documents.filter(d => d.isPresent).length}/${application.documents.length}`,
      badgeColor: 'bg-slate-700 text-slate-300'
    },
    {
      id: 'findings',
      label: 'Evidence-Linked Findings',
      icon: SearchCode,
      badge: criticalFindingsCount > 0 ? `${criticalFindingsCount} Issues` : 'Verified',
      badgeColor: criticalFindingsCount > 0 ? 'bg-red-500/20 text-red-300 border border-red-500/40 font-bold' : 'bg-emerald-500/20 text-emerald-300',
      highlight: true
    },
    {
      id: 'officer-review',
      label: 'Officer Review & Decision',
      icon: UserCheck,
      badge: reviewPending ? 'Pending' : 'Decided',
      badgeColor: reviewPending ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
    },
    {
      id: 'audit-report',
      label: 'Audit Trail & Report',
      icon: History
    }
  ];

  return (
    <aside className="w-72 bg-slate-900 text-slate-300 flex flex-col flex-shrink-0 border-r border-slate-800 select-none min-h-[calc(100vh-80px)]">
      {/* SIH Presentation Slides Spotlight */}
      <div className="p-3 border-b border-slate-800/80">
        <p className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          SIH 2026 Pitch Deck
        </p>
        <button
          onClick={() => setActiveTab(presentationNav.id)}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
            activeTab === presentationNav.id
              ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
              : 'bg-slate-800/70 hover:bg-slate-800 text-amber-300 border border-amber-500/30'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Presentation className={`w-4 h-4 flex-shrink-0 ${activeTab === presentationNav.id ? 'text-slate-950' : 'text-amber-400'}`} />
            <span className="font-semibold">{presentationNav.label}</span>
          </div>
          <span className={`px-2 py-0.5 text-[10px] rounded leading-none flex-shrink-0 ${
            activeTab === presentationNav.id ? 'bg-slate-950 text-amber-300' : 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
          }`}>
            {presentationNav.badge}
          </span>
        </button>
      </div>

      {/* Workflow Navigation section */}
      <div className="p-3">
        <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Scrutiny Workflow Pipeline
        </p>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all text-left ${
                  isActive
                    ? 'bg-pramaan-700 text-white font-semibold shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                } ${item.highlight && !isActive ? 'border-l-2 border-amber-400 pl-2.5' : ''}`}
                title={item.label}
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-1">
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-teal-300' : 'text-slate-400'}`} />
                  <span className="whitespace-normal leading-tight">{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`px-1.5 py-0.5 text-[10px] rounded leading-none flex-shrink-0 whitespace-nowrap ml-1 ${item.badgeColor || 'bg-slate-700 text-slate-300'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Connected Explainability Summary card in sidebar */}
      <div className="mt-auto p-3 m-3 bg-slate-800/80 rounded-lg border border-slate-700/60 text-xs">
        <div className="flex items-center gap-1.5 text-teal-400 font-semibold mb-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
          <span>Connected Pipeline</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          Intake data updates historical comparison, evaluated rules, and evidence findings dynamically.
        </p>
        <div className="mt-2 pt-2 border-t border-slate-700 flex items-center justify-between text-[11px]">
          <span className="text-slate-400">Rules Evaluated:</span>
          <span className="font-mono text-teal-300 font-bold">{rules.length} Configured</span>
        </div>
      </div>

      {/* Authorized Officer Profile Footer */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/60">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-[11px] font-bold text-white border border-slate-600">
            AV
          </div>
          <div className="truncate">
            <div className="text-xs font-medium text-white truncate">Shri A. K. Verma</div>
            <div className="text-[10px] text-slate-400 truncate">Scrutiny Officer, AICTE RO</div>
          </div>
        </div>
      </div>
    </aside>
  );
};
