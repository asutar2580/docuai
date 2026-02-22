import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { useAuth } from '../hooks/useAuth';

export default function Landing() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} />
      {/* Hero — 딥 네이비 + 서브틀 그리드 */}
      <section
        className="relative overflow-hidden bg-[var(--primary-900)] text-white px-4 sm:px-6 lg:px-16 py-16 lg:py-24"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">
          <div className="lg:w-[60%]">
            <Badge variant="accent" className="mb-6 !bg-emerald-500/20 !text-emerald-300">
              🚀 AI 기반 공문서 자동화
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-[72px] font-bold leading-tight font-[family-name:var(--font-display)] tracking-tight">
              공문서 작성, AI에게 맡기세요
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-xl">
              복잡한 양식을 자연어로 설명하면 AI가 3초 만에 완성합니다.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/auth">
                <Button variant="accent" size="lg">무료로 시작하기</Button>
              </Link>
              <a href="#demo">
                <Button variant="ghost" size="lg">데모 보기</Button>
              </a>
            </div>
            <p className="mt-8 text-sm text-gray-400">
              이미 2,400명이 사용 중 · 카카오 로그인 지원
            </p>
          </div>
          <div className="lg:w-[40%] flex justify-center lg:justify-end">
            <HeroDemoCard />
          </div>
        </div>
      </section>

      {/* 기능 소개 — 흰 배경, 3카드 */}
      <section id="features" className="bg-white px-4 sm:px-6 lg:px-16 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">간단한 3단계로 완성</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            내용만 입력하면 AI가 분석해 공문서 양식을 자동으로 채워드립니다.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl shadow-sm border border-gray-100 p-8 bg-white hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI 자동 분석</h3>
              <p className="text-gray-600">
                거래 내용을 자연어로 입력하면 AI가 당사자, 부동산, 금액, 세금 등을 자동 추출합니다.
              </p>
            </div>
            <div className="rounded-2xl shadow-sm border border-gray-100 p-8 bg-white hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">📋</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">정확한 양식 완성</h3>
              <p className="text-gray-600">
                소유권이전등기신청서 등 법정 양식에 맞춰 필드를 채우고, 필요 시 수정할 수 있습니다.
              </p>
            </div>
            <div className="rounded-2xl shadow-sm border border-gray-100 p-8 bg-white hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">⬇️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">즉시 PDF 다운로드</h3>
              <p className="text-gray-600">
                미리보기로 확인한 뒤 한 번의 클릭으로 PDF를 다운로드해 제출할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 사용 방법 — gray-50, 4단계 */}
      <section id="how-it-works" className="bg-[var(--gray-100)] px-4 sm:px-6 lg:px-16 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">사용 방법</h2>
          <p className="text-gray-600 text-center mb-12">4단계면 끝납니다.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: 1, title: '회원가입 (30초)', desc: '이메일 또는 카카오로 간편 가입' },
              { step: 2, title: '내용 입력', desc: '거래 내용을 자유롭게 텍스트로 입력' },
              { step: 3, title: 'AI 자동완성', desc: 'AI가 양식에 맞춰 필드 자동 채우기' },
              { step: 4, title: 'PDF 다운로드', desc: '미리보기 후 PDF 저장·제출' },
            ].map((item) => (
              <div key={item.step} className="rounded-2xl bg-white shadow-sm border border-gray-100 p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-[var(--primary-600)] text-white font-bold flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 요금제 미리보기 — 2카드 */}
      <section className="bg-white px-4 sm:px-6 lg:px-16 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">명확한 요금제</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="rounded-2xl shadow-sm border border-gray-100 p-8 bg-white">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Free</h3>
              <p className="text-3xl font-bold text-gray-900 mb-6">무료</p>
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
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Pro</h3>
              <p className="text-3xl font-bold text-gray-900 mb-6">월 9,900원</p>
              <ul className="space-y-3 text-gray-600 mb-8">
                <li>무제한 AI 자동완성</li>
                <li>모든 공문서 지원 (확장 예정)</li>
                <li>이메일 저장 기록</li>
              </ul>
              <Link to="/pricing">
                <Button variant="accent" className="w-full">Pro 시작하기</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--primary-900)] text-white px-4 sm:px-6 lg:px-16 py-16 lg:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">지금 바로 시작하세요</h2>
          <p className="text-gray-300 mb-8">회원가입 없이 데모만 보거나, 무료로 3회 체험해 보세요.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/auth">
              <Button variant="accent" size="lg">무료로 시작하기</Button>
            </Link>
            <Link to="/pricing">
              <Button variant="ghost" size="lg">요금제 자세히 보기</Button>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

function HeroDemoCard() {
  return (
    <div className="w-full max-w-md rounded-2xl bg-white/10 backdrop-blur border border-white/20 p-6 shadow-2xl">
      <div className="text-sm font-medium text-gray-300 mb-3">AI 입력</div>
      <div
        className="rounded-xl bg-white/10 border border-white/20 p-4 min-h-[100px] text-white/90 text-sm mb-4"
        style={{ background: 'rgba(255,255,255,0.08)' }}
      >
        <span className="typing-demo">
          홍길동(700101-1234567)이 김철수에게 서울 강남구 역삼동 123번지 대지 200㎡를 5억원에 매매. 계약일 2025년 3월 15일.
        </span>
      </div>
      <div className="flex items-center gap-2 text-emerald-400 text-sm mb-4">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        분석 중...
      </div>
      <div className="rounded-xl bg-white/5 border border-white/10 p-3 space-y-2 text-xs text-gray-300">
        <div className="flex justify-between"><span>소유자</span><span>홍길동</span></div>
        <div className="flex justify-between"><span>매수인</span><span>김철수</span></div>
        <div className="flex justify-between"><span>대지</span><span>서울 강남구 역삼동 123번지</span></div>
        <div className="flex justify-between"><span>매매대금</span><span>5억원</span></div>
      </div>
    </div>
  );
}
