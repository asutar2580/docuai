import { Link } from 'react-router-dom'

export default function Landing() {
  const features = [
    {
      title: 'AI 기반 초안 생성',
      description: '문서 유형과 요구사항만 입력하면 법률·행정 용어에 맞는 초안을 자동 생성합니다.',
      icon: '✨',
    },
    {
      title: '표준 서식 지원',
      description: '공문서, 제안서, 계약서 등 자주 쓰는 서식을 템플릿으로 제공해 수정만 하면 됩니다.',
      icon: '📄',
    },
    {
      title: 'PDF 내보내기',
      description: '작성한 문서를 한 번에 PDF로 내보내 공유·제출에 바로 사용할 수 있습니다.',
      icon: '📤',
    },
  ]

  const steps = [
    { step: 1, title: '템플릿 선택', desc: '원하는 문서 유형을 선택하세요.' },
    { step: 2, title: '내용 입력', desc: 'AI가 질문하는 항목에 답하세요.' },
    { step: 3, title: '초안 확인', desc: '생성된 초안을 검토하고 수정하세요.' },
    { step: 4, title: '다운로드', desc: 'PDF로 저장해 바로 사용하세요.' },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#0f172a] text-white py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight max-w-4xl mx-auto leading-tight">
            공문서 작성, AI에게 맡기세요
          </h1>
          <p className="mt-6 text-xl text-slate-300 max-w-2xl mx-auto">
            복잡한 서식과 법률 용어는 DocuAI가 처리합니다. 몇 분 만에 완성된 공문서를 받아보세요.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/auth"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#1a56db] text-white font-semibold hover:bg-[#1545b8] transition"
            >
              무료로 시작하기
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl border border-slate-500 text-white font-semibold hover:bg-white/10 transition"
            >
              요금제 보기
            </Link>
          </div>
        </div>
      </section>

      {/* 기능 소개 3카드 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#0f172a] text-center mb-4">왜 DocuAI인가요?</h2>
          <p className="text-slate-600 text-center max-w-2xl mx-auto mb-14">
            서류 작성 시간을 줄이고, 실수를 줄이는 AI 문서 도구입니다.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:border-[#1a56db]/30 hover:shadow-lg transition"
              >
                <span className="text-3xl">{f.icon}</span>
                <h3 className="mt-4 text-xl font-semibold text-[#0f172a]">{f.title}</h3>
                <p className="mt-2 text-slate-600">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 사용 방법 4단계 */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#0f172a] text-center mb-4">사용 방법</h2>
          <p className="text-slate-600 text-center max-w-2xl mx-auto mb-14">
            네 단계만 거치면 완성된 문서를 받을 수 있습니다.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s) => (
              <div key={s.step} className="relative text-center">
                <div className="w-12 h-12 rounded-full bg-[#1a56db] text-white font-bold flex items-center justify-center mx-auto text-lg">
                  {s.step}
                </div>
                <h3 className="mt-4 font-semibold text-[#0f172a]">{s.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{s.desc}</p>
                {s.step < 4 && (
                  <div className="hidden lg:block absolute top-6 left-[calc(50%+28px)] w-[calc(100%-56px)] h-0.5 bg-slate-200" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 요금제 미리보기 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#0f172a] text-center mb-4">요금제</h2>
          <p className="text-slate-600 text-center max-w-2xl mx-auto mb-14">
            무료로 시작하고, 필요할 때 Pro로 업그레이드하세요.
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-8 rounded-2xl border-2 border-slate-200 bg-white">
              <h3 className="text-xl font-bold text-[#0f172a]">Free</h3>
              <p className="mt-2 text-3xl font-bold text-slate-700">₩0<span className="text-lg font-normal text-slate-500">/월</span></p>
              <ul className="mt-6 space-y-3 text-slate-600">
                <li>월 5건 문서 생성</li>
                <li>기본 템플릿 사용</li>
                <li>PDF 다운로드</li>
              </ul>
              <Link
                to="/auth"
                className="mt-6 inline-block w-full text-center px-4 py-3 rounded-xl border-2 border-[#1a56db] text-[#1a56db] font-semibold hover:bg-[#1a56db] hover:text-white transition"
              >
                시작하기
              </Link>
            </div>
            <div className="p-8 rounded-2xl border-2 border-[#1a56db] bg-[#0f172a] text-white relative">
              <span className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-[#10b981] text-xs font-semibold">인기</span>
              <h3 className="text-xl font-bold">Pro</h3>
              <p className="mt-2 text-3xl font-bold">₩29,000<span className="text-lg font-normal text-slate-400">/월</span></p>
              <ul className="mt-6 space-y-3 text-slate-300">
                <li>무제한 문서 생성</li>
                <li>전체 템플릿 + 맞춤 서식</li>
                <li>우선 지원 및 API</li>
              </ul>
              <Link
                to="/pricing"
                className="mt-6 inline-block w-full text-center px-4 py-3 rounded-xl bg-[#1a56db] text-white font-semibold hover:bg-[#1545b8] transition"
              >
                Pro 알아보기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#0f172a] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold">지금 바로 문서 작성을 시작하세요</h2>
          <p className="mt-4 text-slate-300">
            회원가입 후 무료 플랜으로 바로 이용할 수 있습니다.
          </p>
          <Link
            to="/auth"
            className="mt-8 inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#10b981] text-white font-semibold hover:bg-[#0d9668] transition"
          >
            무료로 시작하기
          </Link>
        </div>
      </section>
    </div>
  )
}
