import { useState } from 'react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { useToast } from '../ui/Toast';

const PLACEHOLDER = `거래 내용을 자유롭게 입력하세요
예시: 홍길동(700101-1234567)이 김철수에게
서울 강남구 역삼동 123번지 대지 200㎡를
5억원에 매매. 계약일 2025년 3월 15일.`;

export default function AIInputPanel({ onResult, usageRemaining, usageLoading }) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const { addToast } = useToast();

  async function handleAnalyze() {
    const text = input.trim();
    if (!text) {
      addToast('내용을 입력해 주세요.', 'error');
      return;
    }
    setLoading(true);
    setDone(false);
    try {
      const userId = window.__DOCUAI_USER_ID__ || null;
      const apiBase = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${apiBase}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInput: text, userId }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (res.status === 402) {
          addToast('이번 달 무료 사용 횟수를 모두 사용했습니다. Pro 요금제를 이용해 주세요.', 'error');
          return;
        }
        addToast(data.error || '분석에 실패했습니다.', 'error');
        return;
      }
      onResult(data);
      setDone(true);
      addToast('자동완성 완료!', 'success');
    } catch (err) {
      addToast('네트워크 오류가 발생했습니다.', 'error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="rounded-2xl p-6 sm:p-8 text-white"
      style={{
        background: 'linear-gradient(135deg, var(--primary-900) 0%, #1e3a5f 100%)',
      }}
    >
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <h2 className="text-xl font-semibold">🤖 AI 자동완성</h2>
        {!usageLoading && (
          <Badge variant="dark">이번 달 {usageRemaining}회 남음</Badge>
        )}
      </div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={PLACEHOLDER}
        rows={4}
        className="w-full rounded-xl px-4 py-3 text-white placeholder-gray-400 resize-none border border-white/20 focus:ring-2 focus:ring-white/30 focus:border-white/30 outline-none transition"
        style={{ background: 'rgba(255,255,255,0.08)' }}
        disabled={loading}
      />
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Button
          variant="accent"
          onClick={handleAnalyze}
          loading={loading}
          disabled={loading || usageRemaining === 0}
        >
          {done ? '✅ 자동완성 완료!' : 'AI로 자동 채우기'}
        </Button>
        {done && (
          <span className="text-sm text-emerald-300">필드를 확인하고 필요 시 수정해 주세요.</span>
        )}
      </div>
    </div>
  );
}
