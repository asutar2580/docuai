import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../components/ui/Toast';

export default function Auth() {
  const [tab, setTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signInWithPassword, signUp, signInWithKakao } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    if (!email || !password) {
      addToast('이메일과 비밀번호를 입력해 주세요.', 'error');
      return;
    }
    setLoading(true);
    try {
      await signInWithPassword(email, password);
      addToast('로그인되었습니다.', 'success');
      navigate('/dashboard');
    } catch (err) {
      addToast(err.message || '로그인에 실패했습니다.', 'error');
    } finally {
      setLoading(false);
    }
  }

  async function handleSignUp(e) {
    e.preventDefault();
    if (!name || !email || !password || !passwordConfirm) {
      addToast('모든 항목을 입력해 주세요.', 'error');
      return;
    }
    if (password !== passwordConfirm) {
      addToast('비밀번호가 일치하지 않습니다.', 'error');
      return;
    }
    if (!agreeTerms) {
      addToast('이용약관에 동의해 주세요.', 'error');
      return;
    }
    setLoading(true);
    try {
      await signUp({ email, password, name });
      addToast('회원가입이 완료되었습니다. 이메일을 확인해 주세요.', 'success');
      setTab('login');
    } catch (err) {
      addToast(err.message || '회원가입에 실패했습니다.', 'error');
    } finally {
      setLoading(false);
    }
  }

  async function handleKakao() {
    setLoading(true);
    try {
      await signInWithKakao();
      addToast('카카오 로그인을 진행합니다.', 'success');
    } catch (err) {
      addToast(err.message || '카카오 로그인에 실패했습니다.', 'error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--gray-100)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-2xl shadow-sm border border-gray-100 bg-white p-8">
          <div className="text-center mb-8">
            <Link to="/" className="text-[var(--primary-600)] font-bold text-2xl font-[family-name:var(--font-display)]">
              DocuAI
            </Link>
            <p className="text-gray-600 mt-2 text-sm">
              {tab === 'login' ? '로그인하여 문서 작성을 시작하세요' : '회원가입'}
            </p>
          </div>

          <div className="flex rounded-xl bg-gray-100 p-1 mb-6">
            <button
              type="button"
              onClick={() => setTab('login')}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                tab === 'login' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              로그인
            </button>
            <button
              type="button"
              onClick={() => setTab('signup')}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                tab === 'signup' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              회원가입
            </button>
          </div>

          {tab === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </div>
              <Button type="submit" variant="primary" className="w-full" loading={loading}>
                로그인
              </Button>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">또는</span>
                </div>
              </div>
              <Button
                type="button"
                variant="kakao"
                className="w-full"
                onClick={handleKakao}
                disabled={loading}
              >
                카카오로 계속하기
              </Button>
            </form>
          ) : (
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="홍길동"
                  autoComplete="name"
                />
              </div>
              <div>
                <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                <input
                  id="signup-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>
              <div>
                <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
                <input
                  id="signup-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
              </div>
              <div>
                <label htmlFor="password-confirm" className="block text-sm font-medium text-gray-700 mb-1">비밀번호 확인</label>
                <input
                  id="password-confirm"
                  type="password"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
              </div>
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600">이용약관 및 개인정보처리방침에 동의합니다.</span>
              </label>
              <Button type="submit" variant="primary" className="w-full" loading={loading}>
                회원가입
              </Button>
            </form>
          )}
        </div>
        <p className="text-center text-sm text-gray-500 mt-6">
          <Link to="/" className="text-[var(--primary-600)] hover:underline">홈으로 돌아가기</Link>
        </p>
      </div>
    </div>
  );
}
