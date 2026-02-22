import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

export default function Navbar({ user }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 text-[var(--primary-600)] font-bold text-xl">
          <span className="font-[family-name:var(--font-display)]">DocuAI</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/#features" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
            기능
          </Link>
          <Link to="/#how-it-works" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
            사용 방법
          </Link>
          <Link to="/pricing" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
            요금제
          </Link>
          {user ? (
            <>
              <Link to="/dashboard" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
                대시보드
              </Link>
              <Link to="/editor">
                <Button variant="accent" size="sm">문서 작성</Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/auth">
                <Button variant="ghost" size="sm" className="!text-gray-700 !border-gray-200 !hover:bg-gray-100">
                  로그인
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="accent" size="sm">무료로 시작</Button>
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="메뉴 열기"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 flex flex-col gap-2">
          <Link to="/#features" className="py-2 text-gray-600" onClick={() => setMobileOpen(false)}>기능</Link>
          <Link to="/#how-it-works" className="py-2 text-gray-600" onClick={() => setMobileOpen(false)}>사용 방법</Link>
          <Link to="/pricing" className="py-2 text-gray-600" onClick={() => setMobileOpen(false)}>요금제</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="py-2 text-gray-600" onClick={() => setMobileOpen(false)}>대시보드</Link>
              <Link to="/editor" onClick={() => setMobileOpen(false)}>
                <Button variant="accent" size="sm" className="w-full">문서 작성</Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/auth" onClick={() => setMobileOpen(false)}>
                <Button variant="secondary" size="sm" className="w-full">로그인</Button>
              </Link>
              <Link to="/auth" onClick={() => setMobileOpen(false)}>
                <Button variant="accent" size="sm" className="w-full">무료로 시작</Button>
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
