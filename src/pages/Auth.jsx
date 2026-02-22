import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-slate-50 py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          <h1 className="text-2xl font-bold text-[#0f172a] text-center">
            {isLogin ? '로그인' : '회원가입'}
          </h1>
          <p className="mt-2 text-slate-600 text-center text-sm">
            {isLogin ? 'DocuAI 계정으로 로그인하세요.' : '무료로 시작하고 문서 작성을 경험해 보세요.'}
          </p>
          <form className="mt-8 space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">이메일</label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#1a56db] focus:border-[#1a56db] outline-none transition"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">비밀번호</label>
              <input
                type="password"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#1a56db] focus:border-[#1a56db] outline-none transition"
                placeholder="••••••••"
              />
            </div>
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">비밀번호 확인</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#1a56db] focus:border-[#1a56db] outline-none transition"
                  placeholder="••••••••"
                />
              </div>
            )}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#1a56db] text-white font-semibold hover:bg-[#1545b8] transition"
            >
              {isLogin ? '로그인' : '가입하기'}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-600">
            {isLogin ? '계정이 없으신가요? ' : '이미 계정이 있으신가요? '}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#1a56db] font-medium hover:underline"
            >
              {isLogin ? '회원가입' : '로그인'}
            </button>
          </p>
        </div>
        <p className="mt-6 text-center">
          <Link to="/" className="text-slate-500 hover:text-[#1a56db] text-sm">← 홈으로</Link>
        </p>
      </div>
    </div>
  )
}
