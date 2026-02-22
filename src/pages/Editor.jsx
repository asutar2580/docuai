import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Editor() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col bg-white">
      <div className="border-b border-slate-200 bg-white px-4 py-3 flex items-center justify-between gap-4">
        <Link to="/dashboard" className="text-slate-600 hover:text-[#1a56db] text-sm font-medium">
          ← 대시보드
        </Link>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition"
          >
            미리보기
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded-lg bg-[#10b981] text-white font-medium hover:bg-[#0d9668] transition"
          >
            PDF 저장
          </button>
        </div>
      </div>

      <div className="flex-1 max-w-4xl w-full mx-auto px-4 py-8">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="문서 제목"
          className="w-full text-2xl font-bold text-[#0f172a] border-0 border-b border-slate-200 pb-2 focus:ring-0 focus:border-[#1a56db] outline-none"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력하세요. AI 초안 생성은 곧 지원됩니다."
          className="mt-6 w-full min-h-[400px] text-slate-700 border-0 focus:ring-0 outline-none resize-none"
          rows={20}
        />
      </div>
    </div>
  )
}
