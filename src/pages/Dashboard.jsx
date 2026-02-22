import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import { useUsage } from '../hooks/useUsage';
import { supabase } from '../lib/supabase';

export default function Dashboard() {
  const { user, profile, loading: authLoading, signOut } = useAuth();
  const { usage, loading: usageLoading } = useUsage(user?.id);
  const [documents, setDocuments] = useState([]);
  const [loadingDocs, setLoadingDocs] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth', { replace: true });
      return;
    }
    (async () => {
      const { data } = await supabase
        .from('documents')
        .select('id, title, doc_type, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20);
      setDocuments(data || []);
    })().finally(() => setLoadingDocs(false));
  }, [user, navigate]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--primary-600)] border-t-transparent" />
      </div>
    );
  }

  if (!user) return null;

  const displayName = profile?.name || user.email?.split('@')[0] || '회원';
  const today = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen flex flex-col bg-[var(--gray-100)]">
      <Navbar user={user} />
      <div className="flex flex-1">
        <aside className="hidden lg:flex w-60 flex-col border-r border-gray-200 bg-white p-6">
          <Link to="/" className="text-[var(--primary-600)] font-bold text-lg font-[family-name:var(--font-display)]">
            DocuAI
          </Link>
          <nav className="mt-8 space-y-1">
            <Link to="/dashboard" className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-3 text-gray-900 font-medium">
              대시보드
            </Link>
            <Link to="/editor" className="flex items-center gap-2 rounded-lg px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900">
              문서 작성
            </Link>
            <Link to="/dashboard/documents" className="flex items-center gap-2 rounded-lg px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900">
              내 문서함
            </Link>
            <Link to="/pricing" className="flex items-center gap-2 rounded-lg px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900">
              요금제
            </Link>
            <Link to="/dashboard/settings" className="flex items-center gap-2 rounded-lg px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900">
              설정
            </Link>
          </nav>
          <div className="mt-auto pt-6 border-t border-gray-100">
            {!usageLoading && (
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>이번 달 사용</span>
                  <span>{usage.count} / {usage.plan === 'pro' ? '무제한' : usage.limit}회</span>
                </div>
                <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[var(--accent-500)] transition-all"
                    style={{ width: usage.plan === 'pro' ? '100%' : `${(usage.count / usage.limit) * 100}%` }}
                  />
                </div>
              </div>
            )}
            <Button variant="secondary" size="sm" className="w-full" onClick={() => signOut()}>
              로그아웃
            </Button>
          </div>
        </aside>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">안녕하세요, {displayName}님 👋</h1>
            <p className="text-gray-500 mt-1">{today}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="rounded-2xl shadow-sm border border-gray-100 bg-white p-6">
              <p className="text-sm text-gray-500 mb-1">이번 달 사용 횟수</p>
              <p className="text-2xl font-bold text-gray-900">{usage.count}회</p>
            </div>
            <div className="rounded-2xl shadow-sm border border-gray-100 bg-white p-6">
              <p className="text-sm text-gray-500 mb-1">총 작성 문서</p>
              <p className="text-2xl font-bold text-gray-900">{documents.length}건</p>
            </div>
            <div className="rounded-2xl shadow-sm border border-gray-100 bg-white p-6">
              <p className="text-sm text-gray-500 mb-1">절약한 시간</p>
              <p className="text-2xl font-bold text-gray-900">약 {documents.length * 15}분</p>
            </div>
          </div>

          <div className="mb-8">
            <Link to="/editor">
              <Button variant="accent" size="lg" className="w-full sm:w-auto">새 문서 작성</Button>
            </Link>
          </div>

          <div className="rounded-2xl shadow-sm border border-gray-100 bg-white overflow-hidden">
            <h2 className="px-6 py-4 border-b border-gray-100 text-lg font-semibold text-gray-900">최근 문서</h2>
            {loadingDocs ? (
              <div className="p-8 flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-[var(--primary-600)] border-t-transparent" />
              </div>
            ) : documents.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <p className="text-5xl mb-4">📄</p>
                <p className="font-medium text-gray-700">아직 작성한 문서가 없습니다</p>
                <p className="text-sm mt-1">새 문서 작성으로 첫 공문서를 만들어 보세요.</p>
                <Link to="/editor" className="inline-block mt-4">
                  <Button variant="accent" size="sm">문서 작성하기</Button>
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                      <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">문서명</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">작성일</th>
                      <th className="px-6 py-4 text-sm font-medium text-gray-600 w-24">다운로드</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.map((doc) => (
                      <tr key={doc.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                        <td className="px-6 py-4 text-gray-900">{doc.title || '소유권이전등기신청서'}</td>
                        <td className="px-6 py-4 text-gray-600 text-sm">
                          {new Date(doc.created_at).toLocaleDateString('ko-KR')}
                        </td>
                        <td className="px-6 py-4">
                          <Link to={`/editor?doc=${doc.id}`} className="text-[var(--primary-600)] hover:underline text-sm">
                            열기
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
