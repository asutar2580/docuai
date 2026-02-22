import { useState } from 'react';
import Button from '../ui/Button';

const TABS = [
  { id: 'estate', label: '부동산 정보' },
  { id: 'parties', label: '당사자 정보' },
  { id: 'tax', label: '세금·수수료' },
  { id: 'app', label: '신청 정보' },
];

const FIELDS = {
  estate: [
    { key: 'address', label: '소재지' },
    { key: 'reportNo', label: '접수번호' },
  ],
  parties: [
    { key: 'obligorName', label: '의무자(매도인)' },
    { key: 'obligorJumin', label: '주민등록번호' },
    { key: 'obligorAddr', label: '주소' },
    { key: 'obligorShare', label: '지분' },
    { key: 'rightName', label: '권리자(매수인)' },
    { key: 'rightJumin', label: '주민등록번호' },
    { key: 'rightAddr', label: '주소' },
    { key: 'rightShare', label: '지분' },
  ],
  tax: [
    { key: 'price', label: '매매대금' },
    { key: 'acqTax', label: '취득세' },
    { key: 'eduTax', label: '교육세' },
    { key: 'ruralTax', label: '농어촌특별세' },
    { key: 'taxTotal', label: '세금 합계' },
    { key: 'regFee', label: '등기신청수수료' },
  ],
  app: [
    { key: 'causeYear', label: '원인 연도' },
    { key: 'causeMonth', label: '원인 월' },
    { key: 'causeDay', label: '원인 일' },
    { key: 'appYear', label: '신청 연도' },
    { key: 'appMonth', label: '신청 월' },
    { key: 'appDay', label: '신청 일' },
    { key: 'court', label: '관할법원' },
  ],
};

export default function FormPanel({ formData, onChange, aiFilledKeys, onPreview, onDownload }) {
  const [activeTab, setActiveTab] = useState('estate');

  const handleChange = (key, value) => {
    onChange({ ...formData, [key]: value });
  };

  const fields = FIELDS[activeTab] || [];

  return (
    <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden flex flex-col h-full">
      <div className="flex border-b border-gray-100 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex-shrink-0 px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
              activeTab === tab.id
                ? 'border-[var(--primary-600)] text-[var(--primary-600)]'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="space-y-4">
          {fields.map(({ key, label }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <input
                type="text"
                value={formData[key] ?? ''}
                onChange={(e) => handleChange(key, e.target.value)}
                className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                  aiFilledKeys.has(key) ? 'bg-emerald-50 border-emerald-200' : 'border-gray-200'
                }`}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 border-t border-gray-100 flex flex-wrap gap-2">
        <Button variant="secondary" size="sm" onClick={onPreview}>PDF 미리보기</Button>
        <Button variant="accent" size="sm" onClick={onDownload}>PDF 다운로드 ⬇️</Button>
      </div>
    </div>
  );
}
