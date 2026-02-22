import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-[#0f172a]">
            <span className="text-[#1a56db]">Docu</span>AI
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-slate-600 hover:text-[#1a56db] transition">홈</Link>
            <Link to="/pricing" className="text-slate-600 hover:text-[#1a56db] transition">요금제</Link>
            <Link to="/auth" className="text-slate-600 hover:text-[#1a56db] transition">로그인</Link>
            <Link to="/auth" className="px-4 py-2 rounded-lg bg-[#1a56db] text-white font-medium hover:bg-[#1545b8] transition">
              시작하기
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
