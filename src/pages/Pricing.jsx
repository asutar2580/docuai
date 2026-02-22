import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { useAuth } from '../hooks/useAuth';

const FAQ_ITEMS = [
  {
    q: '무료 체험 후에는 어떻게 되나요?',
    a: '무료 플랜은 월 3회까지 AI 자동완성을 사용할 수 있습니다. 더 많이 사용하시려면 Pro(월 9,900원)로 전환하시면 됩니다.',
  },
  {
    q: 'Pro 요금제는 언제 결제되나요?',
    a: 'Pro 요금제는 매월 구독 시작일 기준으로 결제됩니다. 원하시면 언제든 해지할 수 있으며, 해지 시 해당 기간 종료 후 무료 플랜으로 전환됩니다.',
  },
  {
    q: '다른 공문서도 지원할 예정인가요?',
    a: '네. 소유권이전등기신청서를 시작으로 전세계약서, 임대차계약서 등 다양한 공문서를 단계적으로 추가할 예정입니다.',
  },
  {
    q: '작성한 문서는 어디에 저장되나요?',
    a: 'Pro 사용자는 작성한 문서가 계정에 저장되어 내 문서함에서 다시 불러올 수 있습니다. 무료 사용자는 브라우저에서 PDF로 다운로드한 파일을 직접 보관해 주세요.',
  },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} />
      <main className="flex-1 px-4 sm:px-6 lg:px-16 py-12 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-4">
            명확하고 합리적인 요금제
          </h1>
          <p className="text-gray-600 text-center mb-8">
            무료로 시작하고, 필요할 때 Pro로 업그레이드하세요.
          </p>

          <div className="flex justify-center items-center gap-3 mb-12">
            <span className={`text-sm font-medium ${!yearly ? 'text-gray-900' : 'text-gray-500'}`}>월간</span>
            <button
              type="button"
              role="switch"
              aria-checked={yearly}
              onClick={() => setYearly((v) => !v)}
              className="relative w-12 h-6 rounded-full bg-gray-200 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span
                className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                  yearly ? 'left-7' : 'left-1'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${yearly ? 'text-gray-900' : 'text-gray-500'}`}>연간</span>
            {yearly && (
              <Badge variant="accent" className="ml-1">2개월 무료</Badge>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="rounded-2xl shadow-sm border border-gray-100 p-8 bg-white">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Free</h2>
              <p className="text-3xl font-bold text-gray-900 mb-6">
                무료
              </p>
              <ul className="space-y-3 text-gray-600 mb-8">
                <li>월 3회 AI 자동완성</li>
                <li>소유권이전등기신청서</li>
                <li>PDF 다운로드</li>
              </ul>
              <Link to="/auth">
                <Button variant="secondary" className="w-full">무료로 시작</Button>
              </Link>
            </div>

            <div className="rounded-2xl shadow-sm border-2 border-[var(--accent-500)] p-8 bg-white relative">
              <Badge variant="accent" className="absolute -top-3 right-6">추천</Badge>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Pro</h2>
              <p className="text-3xl font-bold text-gray-900 mb-1">
                월 9,900원
              </p>
              {yearly && (
                <p className="text-sm text-gray-500 mb-5">연 99,000원 (월 8,250원)</p>
              )}
              {!yearly && <div className="mb-5" />}
              <ul className="space-y-3 text-gray-600 mb-8">
                <li>무제한 AI 자동완성</li>
                <li>모든 공문서 지원 (확장 예정)</li>
                <li>이메일 저장 기록</li>
              </ul>
              <Link to="/auth?plan=pro">
                <Button variant="accent" className="w-full">Pro 시작하기</Button>
              </Link>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">자주 묻는 질문</h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, i) => (
              <FAQItem key={i} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50/50 transition-colors"
      >
        <span className="font-medium text-gray-900 pr-4">{question}</span>
        <span className="text-gray-400 flex-shrink-0">
          <svg
            className={`w-5 h-5 transition-transform ${open ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      {open && (
        <div className="px-6 pb-4 text-gray-600 text-sm border-t border-gray-100 pt-2">
          {answer}
        </div>
      )}
    </div>
  );
}
