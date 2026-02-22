import { Link } from 'react-router-dom'

export default function Dashboard() {
  const recentDocs = [
    { id: 1, title: '업무 협조 요청서', updated: '2025-02-22' },
    { id: 2, title: '휴가 신청서', updated: '2025-02-21' },
    { id: 3, title: '제안서 초안', updated: '2025-02-20' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-[#0f172a]">대시보드</h1>
        <Link
          to="/editor"
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-[#1a56db] text-white font-semibold hover:bg-[#1545b8] transition"
        >
          새 문서 작성
        </Link>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 rounded-2xl bg-white border border-slate-200">
          <p className="text-sm text-slate-500">이번 달 생성 문서</p>
          <p className="mt-1 text-3xl font-bold text-[#1a56db]">3</p>
          <p className="text-sm text-slate-600">Free 플랜: 월 5건</p>
        </div>
        <div className="p-6 rounded-2xl bg-white border border-slate-200">
          <p className="text-sm text-slate-500">저장된 템플릿</p>
          <p className="mt-1 text-3xl font-bold text-[#10b981]">0</p>
          <p className="text-sm text-slate-600">Pro에서 무제한</p>
        </div>
        <div className="p-6 rounded-2xl bg-white border border-slate-200">
          <p className="text-sm text-slate-500">플랜</p>
          <p className="mt-1 text-xl font-bold text-[#0f172a]">Free</p>
          <Link to="/pricing" className="text-sm text-[#1a56db] hover:underline">업그레이드</Link>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold text-[#0f172a]">최근 문서</h2>
        <ul className="mt-4 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white overflow-hidden">
          {recentDocs.map((doc) => (
            <li key={doc.id}>
              <Link
                to={`/editor?id=${doc.id}`}
                className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition"
              >
                <span className="font-medium text-[#0f172a]">{doc.title}</span>
                <span className="text-sm text-slate-500">{doc.updated}</span>
              </Link>
            </li>
          ))}
        </ul>
        {recentDocs.length === 0 && (
          <p className="mt-4 text-slate-500 text-center py-8">아직 문서가 없습니다. 새 문서를 작성해 보세요.</p>
        )}
      </div>
    </div>
  )
}
