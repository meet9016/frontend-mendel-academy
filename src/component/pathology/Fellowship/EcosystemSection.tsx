"use client";

import React, { useState } from 'react';

const FONT = "font-['-apple-system',BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text','Helvetica_Neue','Segoe_UI',Roboto,sans-serif]";
const MONO = "font-['SF_Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace]";

interface Asset {
  id: string;
  name: string;
  annual: number;
  quarterly: number;
}

const assets: Asset[] = [
  { id: '1', name: 'Mendel Case Bank Access', annual: 25000, quarterly: 6250 },
  { id: '2', name: 'Reflex Bridge Library', annual: 15000, quarterly: 3750 },
  { id: '3', name: 'LegalSafe Reporting Toolkit', annual: 12000, quarterly: 3000 },
  { id: '4', name: 'QC Rescue Atlas', annual: 10000, quarterly: 2500 },
  { id: '5', name: 'Multiplex Mini-Atlas', annual: 8500, quarterly: 2125 },
  { id: '6', name: 'Tumor Board Script Cards', annual: 7000, quarterly: 1750 },
];

const BUNDLE_ANNUAL = 65875;
const BUNDLE_QUARTERLY = 17438;
const FULL_TOTAL_ANNUAL = 77500;
const FULL_TOTAL_QUARTERLY = 19375;

interface EcosystemSectionProps {
  onOpenApply?: () => void;
}

const EcosystemSection = ({ onOpenApply }: EcosystemSectionProps) => {
  const [period, setPeriod] = useState<'annual' | 'quarterly'>('annual');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const isAnnual = period === 'annual';
  const isAllSelected = selectedIds.length === assets.length;

  const toggleAsset = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const toggleFullBundle = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(assets.map(a => a.id));
    }
  };

  const clearAll = () => setSelectedIds([]);

  const calculateTotal = () => {
    if (isAllSelected) {
      return isAnnual ? BUNDLE_ANNUAL : BUNDLE_QUARTERLY;
    }
    return selectedIds.reduce((sum, id) => {
      const asset = assets.find(a => a.id === id);
      return sum + (asset ? (isAnnual ? asset.annual : asset.quarterly) : 0);
    }, 0);
  };

  const total = calculateTotal();
  const formatPrice = (val: number) => `₹${val.toLocaleString('en-IN')}`;

  return (
    <section id="mp-ecosystem" className={`${FONT} bg-[#FAF7F2] text-[#241E3D] pt-[40px] pb-[60px] md:pb-[72px] px-6 relative border-t border-[#E6E0D8]`}>
      <div className="max-w-[1180px] mx-auto">
        {/* Header */}
        <div className="max-w-[820px] mb-[30px]">
          <span className={`${FONT} inline-flex items-center gap-3 text-[0.95rem] tracking-[0.18em] uppercase text-[#5C5575] mb-5 before:content-[''] before:w-[34px] before:h-[2px] before:bg-[#FFC900]`}>
            THE ECOSYSTEM
          </span>
          <h2 className={`${FONT} text-3xl md:text-5xl font-extrabold text-[#241E3D] leading-[1.08] tracking-[-0.025em]`}>
            What&apos;s inside the ₹77,500+ bonus.
          </h2>
        </div>

        {/* Top Comparison Banner */}
        <div className="bg-white border border-[#E6E0D8] rounded-[16px] overflow-hidden grid grid-cols-1 md:grid-cols-2 mb-8 shadow-sm">
          <div className="p-4 md:p-5 flex items-center gap-3 border-b md:border-b-0 md:border-r border-[#E6E0D8]">
            <span className={`${MONO} text-[0.62rem] font-bold tracking-[0.11em] uppercase bg-[#E0568F] text-white rounded-full px-3 py-1`}>
              FULL FELLOWSHIP
            </span>
            <span className="text-[#241E3D] text-[0.95rem]">
              All six included <strong className="text-[#E0568F] font-bold">free</strong>
            </span>
          </div>
          <div className="p-4 md:p-5 flex items-center gap-3">
            <span className={`${MONO} text-[0.62rem] font-bold tracking-[0.11em] uppercase bg-[#FFC900] text-[#1A1502] rounded-full px-3 py-1`}>
              À LA CARTE
            </span>
            <span className="text-[#241E3D] text-[0.95rem]">
              Add any asset on its own
            </span>
          </div>
        </div>

        {/* Period Toggle */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-[#F2EDE4] rounded-full p-1 inline-flex items-center gap-1">
            <button
              onClick={() => setPeriod('annual')}
              className={`px-4 py-1.5 rounded-full text-[0.88rem] font-semibold transition-all duration-180 flex items-center gap-2 ${
                isAnnual ? 'bg-white text-[#241E3D] shadow-sm' : 'text-[#5C5575] hover:text-[#241E3D]'
              }`}
            >
              Annual
              <span className={`${MONO} text-[0.62rem] font-bold uppercase bg-[#FFC900] text-[#1A1502] rounded px-1.5 py-0.5`}>
                15% OFF
              </span>
            </button>
            <button
              onClick={() => setPeriod('quarterly')}
              className={`px-4 py-1.5 rounded-full text-[0.88rem] font-semibold transition-all duration-180 flex items-center gap-2 ${
                !isAnnual ? 'bg-white text-[#241E3D] shadow-sm' : 'text-[#5C5575] hover:text-[#241E3D]'
              }`}
            >
              Quarterly
              <span className={`${MONO} text-[0.62rem] font-bold uppercase text-[#918AA6]`}>
                10% OFF
              </span>
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 items-start">
          {/* Left Column: Asset Selection Table */}
          <div className="bg-white border border-[#E6E0D8] rounded-[16px] overflow-hidden shadow-sm">
            <div className={`${MONO} flex items-center justify-between p-[14px_22px] text-[0.7rem] tracking-[0.12em] uppercase text-[#5C5575] border-b border-[#E6E0D8] bg-[#FAF7F2]`}>
              <span>ASSET</span>
              <span>{isAnnual ? 'PER YEAR' : 'PER QUARTER'}</span>
            </div>

            <div className="divide-y divide-[#E6E0D8]">
              {assets.map((asset) => {
                const isSelected = selectedIds.includes(asset.id);
                return (
                  <button
                    key={asset.id}
                    onClick={() => toggleAsset(asset.id)}
                    className={`w-full text-left p-[17px_22px] flex items-center justify-between transition-colors duration-150 ${
                      isSelected ? 'bg-[#FDF4F8]' : 'hover:bg-[#FCFAF6]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`w-[18px] h-[18px] rounded border flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-[#E0568F] border-[#E0568F] text-white' : 'border-[#CFC7BA] bg-white'
                      }`}>
                        {isSelected && <span className="text-xs font-bold">✓</span>}
                      </div>
                      <span className={`font-semibold text-[1rem] ${isSelected ? 'text-[#B03A6C]' : 'text-[#241E3D]'}`}>
                        {asset.name}
                      </span>
                    </div>
                    <span className={`font-semibold text-[1rem] tabular-nums ${isSelected ? 'text-[#B03A6C]' : 'text-[#241E3D]'}`}>
                      {formatPrice(isAnnual ? asset.annual : asset.quarterly)}
                    </span>
                  </button>
                );
              })}

              {/* Full Bundle Row */}
              <button
                onClick={toggleFullBundle}
                className={`w-full text-left p-[17px_22px] flex items-center justify-between transition-colors duration-150 border-t-2 border-[#FFC900] ${
                  isAllSelected ? 'bg-[#FFFDF5]' : 'bg-white hover:bg-[#FFFDF9]'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-[18px] h-[18px] rounded border flex items-center justify-center transition-colors ${
                    isAllSelected ? 'bg-[#FFC900] border-[#FFC900] text-black' : 'border-[#CFC7BA] bg-white'
                  }`}>
                    {isAllSelected && <span className="text-xs font-bold">✓</span>}
                  </div>
                  <div>
                    <span className="font-extrabold text-[1.05rem] text-[#241E3D] block">
                      Full Ecosystem
                    </span>
                    <span className={`${MONO} text-[0.66rem] text-[#5C5575] block`}>
                      All six assets · best value
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`${MONO} text-[0.62rem] font-bold uppercase bg-[#FFC900] text-[#1A1502] rounded px-2 py-0.5`}>
                    {isAnnual ? '15% OFF' : '10% OFF'}
                  </span>
                  <span className="line-through text-[#918AA6] text-[0.88rem] tabular-nums">
                    {formatPrice(isAnnual ? FULL_TOTAL_ANNUAL : FULL_TOTAL_QUARTERLY)}
                  </span>
                  <span className="font-extrabold text-[1.1rem] text-[#B03A6C] tabular-nums">
                    {formatPrice(isAnnual ? BUNDLE_ANNUAL : BUNDLE_QUARTERLY)}
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Right Column: Receipt & Fellowship Card */}
          <div className="flex flex-col gap-5">
            {/* Receipt Box */}
            <div className="bg-white border border-[#E6E0D8] rounded-[16px] p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E6E0D8]">
                <span className={`${MONO} text-[0.7rem] tracking-[0.12em] uppercase font-bold text-[#5C5575]`}>
                  YOUR SELECTION
                </span>
                {selectedIds.length > 0 && (
                  <button
                    onClick={clearAll}
                    className={`${MONO} text-[0.7rem] tracking-[0.08em] uppercase text-[#918AA6] hover:text-[#E0568F] font-bold transition-colors`}
                  >
                    CLEAR
                  </button>
                )}
              </div>

              {/* Selected List */}
              {selectedIds.length === 0 ? (
                <p className="text-[#918AA6] text-[0.88rem] my-4">
                  Tap any asset to build your bundle.
                </p>
              ) : isAllSelected ? (
                <div className="py-2 flex items-center justify-between text-[#C79A00] font-bold text-[0.92rem]">
                  <span>Full Ecosystem · all six</span>
                  <span>{formatPrice(isAnnual ? BUNDLE_ANNUAL : BUNDLE_QUARTERLY)}</span>
                </div>
              ) : (
                <ul className="space-y-2 my-3">
                  {selectedIds.map(id => {
                    const asset = assets.find(a => a.id === id);
                    if (!asset) return null;
                    return (
                      <li key={id} className="flex items-center justify-between text-[0.92rem] text-[#241E3D]">
                        <span className="truncate pr-2">{asset.name}</span>
                        <span className="font-semibold tabular-nums flex-none">
                          {formatPrice(isAnnual ? asset.annual : asset.quarterly)}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}

              {/* Total Row */}
              <div className="flex items-baseline justify-between pt-4 mt-2 border-t border-[#E6E0D8]">
                <span className="font-bold text-[1rem] text-[#241E3D]">
                  Total <em className="not-italic font-normal text-[0.82rem] text-[#918AA6]">/{isAnnual ? 'year' : 'quarter'}</em>
                </span>
                <span className="font-extrabold text-[1.5rem] tracking-[-0.01em] text-[#B03A6C] tabular-nums">
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            {/* Fellowship Upsell Card */}
            <div className="relative overflow-hidden bg-[radial-gradient(520px_300px_at_15%_0%,#1E1540,#150E28)] text-white border border-[#FFC900]/40 rounded-[16px] p-6 shadow-md
              after:content-[''] after:absolute after:-right-[70px] after:-bottom-[110px] after:w-[250px] after:h-[250px] after:rounded-full after:bg-[radial-gradient(circle,rgba(255,201,0,0.16),transparent_68%)] after:pointer-events-none"
            >
              <p className={`${MONO} text-[0.66rem] font-bold tracking-[0.15em] uppercase text-[#FFC900] mb-2`}>
                OR JOIN THE FELLOWSHIP
              </p>
              <h3 className="text-[1.32rem] font-extrabold tracking-[-0.015em] leading-snug mb-2 text-white">
                All six included <span className="text-[#FFC900]">free</span>
              </h3>
              <p className="text-white/72 text-[0.86rem] leading-relaxed mb-5 relative z-10">
                A ₹77,500/year value — plus 12 months of training, live vMTBs and mentorship.
              </p>
              <button
                onClick={onOpenApply}
                className={`${FONT} inline-block font-bold text-[0.92rem] px-6 py-2.5 rounded-full bg-[#FFC900] text-[#1A1502] transition-all duration-180 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(255,201,0,0.35)] relative z-10`}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;
