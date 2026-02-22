import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[var(--primary-900)] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="text-white font-bold text-xl font-[family-name:var(--font-display)]">
              DocuAI
            </Link>
            <p className="mt-2 text-sm text-gray-400 max-w-md">
              AI가 채워주는 공문서, 3초면 완성. 공인중개사·법무사·일반 시민을 위한 공문서 자동작성 플랫폼입니다.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">서비스</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/#features" className="hover:text-white transition-colors">기능 소개</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">요금제</Link></li>
              <li><Link to="/editor" className="hover:text-white transition-colors">문서 작성</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">법적 고지</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">이용약관</a></li>
              <li><a href="#" className="hover:text-white transition-colors">개인정보처리방침</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 text-sm text-gray-500">
          © {new Date().getFullYear()} DocuAI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
