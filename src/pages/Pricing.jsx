import { Link } from 'react-router-dom'

export default function Pricing() {
  const plans = [
    {
      name: 'Free',
      price: 0,
      period: '월',
      description: '개인·소규모 사용에 적합합니다.',
      features: ['월 5건 문서 생성', '기본 템플릿', 'PDF 다운로드', '이메일 지원'],
      cta: '무료로 시작',
      ctaLink: '/auth',
      highlight: false,
    },
    {
      name: 'Pro',
      price: 29000,
      period: '월',
      description: '무제한 문서와 고급 기능을 사용하세요.',
      features: ['무제한 문서 생성', '전체 템플릿 + 맞춤 서식', 'PDF 다운로드', '우선 지원', 'API 접근'],
      cta: 'Pro 시작하기',
      ctaLink: '/auth',
      highlight: true,
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-14">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0f172a]">요금제</h1>
        <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
          필요에 맞는 플랜을 선택하세요. 언제든 업그레이드·다운그레이드할 수 있습니다.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-2xl border-2 p-8 ${
              plan.highlight
                ? 'border-[#1a56db] bg-[#0f172a] text-white'
                : 'border-slate-200 bg-white'
            }`}
          >
            {plan.highlight && (
              <span className="inline-block px-3 py-1 rounded-full bg-[#10b981] text-xs font-semibold text-white mb-4">
                인기
              </span>
            )}
            <h2 className={`text-xl font-bold ${plan.highlight ? 'text-white' : 'text-[#0f172a]'}`}>
              {plan.name}
            </h2>
            <p className={`mt-2 text-sm ${plan.highlight ? 'text-slate-300' : 'text-slate-600'}`}>
              {plan.description}
            </p>
            <p className="mt-4">
              <span className="text-3xl font-bold">{plan.price === 0 ? '₩0' : `₩${plan.price.toLocaleString()}`}</span>
              <span className={plan.highlight ? 'text-slate-400' : 'text-slate-500'}>/{plan.period}</span>
            </p>
            <ul className="mt-6 space-y-3">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="text-[#10b981]">✓</span>
                  <span className={plan.highlight ? 'text-slate-300' : 'text-slate-600'}>{f}</span>
                </li>
              ))}
            </ul>
            <Link
              to={plan.ctaLink}
              className={`mt-8 block w-full text-center py-3 rounded-xl font-semibold transition ${
                plan.highlight
                  ? 'bg-[#1a56db] text-white hover:bg-[#1545b8]'
                  : 'border-2 border-[#1a56db] text-[#1a56db] hover:bg-[#1a56db] hover:text-white'
              }`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>

      <p className="mt-10 text-center text-slate-500 text-sm">
        <Link to="/" className="text-[#1a56db] hover:underline">홈으로 돌아가기</Link>
      </p>
    </div>
  )
}
