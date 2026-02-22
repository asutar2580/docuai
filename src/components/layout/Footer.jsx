import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 font-bold text-xl text-white mb-4">
              <span className="text-[#1a56db]">Docu</span>AI
            </Link>
            <p className="text-slate-400 text-sm max-w-md">
              AI 기반 공문서 작성 플랫폼. 복잡한 서식을 걱정 없이, 몇 분 만에 완성하세요.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">서비스</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/pricing" className="hover:text-[#10b981] transition">요금제</Link></li>
              <li><Link to="/dashboard" className="hover:text-[#10b981] transition">대시보드</Link></li>
              <li><Link to="/editor" className="hover:text-[#10b981] transition">문서 편집</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">계정</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/auth" className="hover:text-[#10b981] transition">로그인</Link></li>
              <li><Link to="/auth" className="hover:text-[#10b981] transition">회원가입</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-slate-700 text-sm text-slate-500">
          © {new Date().getFullYear()} DocuAI. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
