import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Search, 
  ExternalLink, 
  Sparkles,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import type { ChangeType, Severity } from '../../types';

export const HistoricalComparisonPage: React.FC = () => {
  const { 
    application, 
    comparisons, 
    openEvidenceForComparison, 
    selectedComparisonKey, 
    resetDemo,
    setActiveTab
  } = useApp();

  const [onlyDifferences, setOnlyDifferences] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Counts
  const totalCount = comparisons.length;
  const matchCount = comparisons.filter(c => c.changeType === 'MATCH').length;
  const changedCount = comparisons.filter(c => c.changeType === 'CHANGED').length;
  const missingCount = comparisons.filter(c => c.changeType === 'MISSING').length;
  const reviewCount = comparisons.filter(c => c.changeType === 'REQUIRES_REVIEW').length;

  // Filtered comparisons
  const filteredComparisons = comparisons.filter(item => {
    if (onlyDifferences && item.changeType === 'MATCH') return false;
    if (selectedCategory !== 'ALL' && item.category !== selectedCategory) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const inLabel = item.label.toLowerCase().includes(q);
      const inPrev = String(item.previousValue).toLowerCase().includes(q);
      const inCurr = String(item.currentValue).toLowerCase().includes(q);
      const inAction = item.recommendedAction.toLowerCase().includes(q);
      if (!inLabel && !inPrev && !inCurr && !inAction) return false;
    }
    return true;
  });

  const getChangeBadge = (type: ChangeType) => {
    switch (type) {
      case 'MATCH':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Match
        </span>;
      case 'CHANGED':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-100 text-amber-800 border border-amber-300">
          <AlertTriangle className="w-3 h-3 text-amber-600" /> Change Detected
        </span>;
      case 'MISSING':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-red-100 text-red-800 border border-red-300">
          <XCircle className="w-3 h-3 text-red-600" /> Missing Field
        </span>;
      case 'NEWLY_ADDED':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-100 text-blue-800 border border-blue-200">
          Newly Added
        </span>;
      case 'REQUIRES_REVIEW':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-100 text-purple-800 border border-purple-200">
          Requires Review
        </span>;
    }
  };

  const getSeverityBadge = (sev: Severity) => {
    switch (sev) {
      case 'CRITICAL':
        return <span className="text-[10px] font-bold text-red-700 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded">CRITICAL</span>;
      case 'WARNING':
        return <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">WARNING</span>;
      case 'INFO':
        return <span className="text-[10px] font-medium text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded">INFO</span>;
      default:
        return <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">NORMAL</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Prominent Architectural Value Proposition (Required by Section 7) */}
      <div className="bg-gradient-to-r from-pramaan-900 via-pramaan-950 to-slate-900 border-l-4 border-teal-400 p-4 rounded-xl text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-mono tracking-wider uppercase text-teal-400 font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Core PRAMAAN Differentiation
          </span>
          <blockquote className="text-sm md:text-base font-semibold text-slate-100 italic leading-snug">
            "PRAMAAN does not only read the current application. It identifies how the current record differs from the previous original record and makes those changes reviewable."
          </blockquote>
          <p className="text-[11px] text-slate-400">
            A changed value is not assumed to be fraudulent; it is structured as an explainable discrepancy requiring verified regulatory justification.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('rules')}
          className="px-3.5 py-2 bg-teal-500 hover:bg-teal-400 text-pramaan-950 text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition-colors flex-shrink-0"
        >
          <span>View Connected Rules</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Summary KPI Badges & Differences Counter */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-slate-500 text-[11px]">Total Fields Compared</span>
          <div className="text-lg font-bold text-slate-900 mt-0.5">{totalCount}</div>
        </div>
        <div className="bg-white p-3 rounded-xl border border-emerald-200 bg-emerald-50/20 shadow-sm">
          <span className="text-emerald-700 text-[11px] font-medium">Exact Matches</span>
          <div className="text-lg font-bold text-emerald-800 mt-0.5">{matchCount}</div>
        </div>
        <div className="bg-white p-3 rounded-xl border border-amber-200 bg-amber-50/30 shadow-sm">
          <span className="text-amber-700 text-[11px] font-medium">Changes Detected</span>
          <div className="text-lg font-bold text-amber-800 mt-0.5">{changedCount}</div>
        </div>
        <div className="bg-white p-3 rounded-xl border border-red-200 bg-red-50/30 shadow-sm">
          <span className="text-red-700 text-[11px] font-medium">Missing Checklist Items</span>
          <div className="text-lg font-bold text-red-800 mt-0.5">{missingCount}</div>
        </div>
        <div className="bg-white p-3 rounded-xl border border-purple-200 bg-purple-50/30 shadow-sm col-span-2 sm:col-span-1">
          <span className="text-purple-700 text-[11px] font-medium">Requires Review</span>
          <div className="text-lg font-bold text-purple-800 mt-0.5">{reviewCount}</div>
        </div>
      </div>

      {/* Parallel High-Level Institution Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Previous Original Record Panel */}
        <div className="bg-white rounded-xl border border-slate-300 shadow-sm overflow-hidden">
          <div className="bg-slate-100/90 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-500"></span>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Previous Sanctioned Baseline Record
              </h3>
            </div>
            <span className="font-mono text-xs font-semibold text-slate-600">
              {application.previousRecord.applicationRef}
            </span>
          </div>
          <div className="p-4 space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Registered Institution:</span>
              <span className="font-semibold text-slate-800">{application.previousRecord.institutionName}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Sanctioned Intake Capacity:</span>
              <span className="font-mono font-bold text-slate-800">{application.previousRecord.approvedIntake} seats</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Permanent Campus Address:</span>
              <span className="text-slate-700 text-right">{application.previousRecord.address}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Approved Principal / Director:</span>
              <span className="font-medium text-slate-800">{application.previousRecord.principalName}</span>
            </div>
          </div>
        </div>

        {/* Current Application Panel */}
        <div className="bg-white rounded-xl border border-pramaan-300 shadow-sm overflow-hidden">
          <div className="bg-pramaan-50 px-4 py-2.5 border-b border-pramaan-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span>
              <h3 className="text-xs font-bold uppercase tracking-wider text-pramaan-900">
                Current Applied Submission
              </h3>
            </div>
            <span className="font-mono text-xs font-bold text-teal-700">
              {application.currentRecord.applicationRef} (AY {application.academicYear})
            </span>
          </div>
          <div className="p-4 space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Declared Institution:</span>
              <span className="font-semibold text-slate-800">{application.currentRecord.institutionName}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Applied Intake Capacity:</span>
              <span className={`font-mono font-bold ${application.currentRecord.approvedIntake !== application.previousRecord.approvedIntake ? 'text-red-700 bg-red-50 px-1 rounded' : 'text-slate-800'}`}>
                {application.currentRecord.approvedIntake} seats {application.currentRecord.approvedIntake !== application.previousRecord.approvedIntake ? `(+${application.currentRecord.approvedIntake - application.previousRecord.approvedIntake} seats)` : ''}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Permanent Campus Address:</span>
              <span className="text-slate-700 text-right">{application.currentRecord.address}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Declared Principal:</span>
              <span className="font-medium text-slate-800">{application.currentRecord.principalName}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Structured Comparison Workspace */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden space-y-0">
        
        {/* Table Toolbar & Filters */}
        <div className="p-4 border-b border-slate-200 bg-slate-50/70 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search comparison fields..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 w-56"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="py-1.5 px-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none"
            >
              <option value="ALL">All Categories</option>
              <option value="Academic & Intake">Academic & Intake</option>
              <option value="Identity & Legal">Identity & Legal</option>
              <option value="Infrastructure & Facilities">Infrastructure & Facilities</option>
              <option value="Faculty & Cadre">Faculty & Cadre</option>
              <option value="Regulatory Documentation">Regulatory Documentation</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            {/* Show only differences toggle */}
            <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyDifferences}
                onChange={(e) => setOnlyDifferences(e.target.checked)}
                className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
              />
              <span>Show Only Differences</span>
            </label>

            <span className="text-slate-300">|</span>

            <button
              onClick={resetDemo}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
              title="Reset comparison filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Structured Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-100 text-slate-600 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Field Attribute</th>
                <th className="py-3 px-3">Baseline Record</th>
                <th className="py-3 px-3">Current Applied</th>
                <th className="py-3 px-3">Difference / Delta</th>
                <th className="py-3 px-3">Change Type</th>
                <th className="py-3 px-3">Review Priority</th>
                <th className="py-3 px-4">Reason for Review</th>
                <th className="py-3 px-3">Evidence Ref</th>
                <th className="py-3 px-4">Recommended Officer Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredComparisons.map((row) => {
                const isSelected = selectedComparisonKey === row.key;
                const isDiscrepancy = row.changeType !== 'MATCH';

                return (
                  <tr 
                    key={row.key}
                    onClick={() => openEvidenceForComparison(row.key)}
                    className={`hover:bg-slate-50 cursor-pointer transition-colors ${
                      isSelected ? 'bg-pramaan-50/80 font-medium' : ''
                    } ${isDiscrepancy && row.severity === 'CRITICAL' ? 'bg-red-50/20' : ''}`}
                  >
                    {/* Field */}
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      <div className="flex items-center gap-1.5">
                        <span>{row.label}</span>
                        {isDiscrepancy && (
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 block font-normal">{row.category}</span>
                    </td>

                    {/* Previous record value */}
                    <td className="py-3 px-3 font-mono text-slate-600">
                      {String(row.previousValue)}
                    </td>

                    {/* Current application value with highlight */}
                    <td className="py-3 px-3 font-mono">
                      {row.changeType === 'CHANGED' ? (
                        <span className="bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-bold">
                          {String(row.currentValue)}
                        </span>
                      ) : row.changeType === 'MISSING' ? (
                        <span className="bg-red-100 text-red-900 px-1.5 py-0.5 rounded font-bold">
                          {String(row.currentValue)}
                        </span>
                      ) : (
                        <span className="text-slate-800">
                          {String(row.currentValue)}
                        </span>
                      )}
                    </td>

                    {/* Difference / Delta */}
                    <td className="py-3 px-3 font-mono text-[11px]">
                      {row.differenceCalc ? (
                        <span className={`px-1.5 py-0.5 rounded font-semibold ${
                          row.differenceCalc.includes('+50.0%') ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                          row.differenceCalc.includes('+6.7%') ? 'bg-blue-50 text-blue-800' :
                          row.differenceCalc.includes('Omission') ? 'bg-red-100 text-red-800' :
                          'text-slate-600'
                        }`}>
                          {row.differenceCalc}
                        </span>
                      ) : '—'}
                    </td>

                    {/* Change type */}
                    <td className="py-3 px-3">
                      {getChangeBadge(row.changeType)}
                    </td>

                    {/* Severity or review priority */}
                    <td className="py-3 px-3">
                      {getSeverityBadge(row.severity)}
                    </td>

                    {/* Reason for Review */}
                    <td className="py-3 px-4 text-slate-600 max-w-xs text-[11px] leading-snug">
                      {row.reasonForReview}
                    </td>

                    {/* Evidence reference */}
                    <td className="py-3 px-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openEvidenceForComparison(row.key);
                        }}
                        className="text-pramaan-700 hover:text-teal-700 font-mono text-[11px] underline flex items-center gap-1 text-left"
                      >
                        <span className="truncate max-w-[110px]">{row.evidenceRef}</span>
                        <ExternalLink className="w-3 h-3 flex-shrink-0" />
                      </button>
                    </td>

                    {/* Recommended action */}
                    <td className="py-3 px-4 text-slate-600 max-w-xs text-[11px] leading-snug">
                      {row.recommendedAction}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2">
          <span>Showing {filteredComparisons.length} of {comparisons.length} evaluated attributes. Click any row to inspect supporting evidence.</span>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Next Recommended Step:</span>
            <button
              onClick={() => setActiveTab('rules')}
              className="text-teal-700 font-bold hover:underline flex items-center gap-1"
            >
              <span>Validate Against Regulatory Rules</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
