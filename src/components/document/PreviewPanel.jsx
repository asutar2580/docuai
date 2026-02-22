import { useState, useEffect, useRef } from 'react';
import { generateOwnershipTransferPdf } from '../../lib/pdfGenerator';

const DEBOUNCE_MS = 500;

export default function PreviewPanel({ formData }) {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scale, setScale] = useState(100);
  const [pageNum, setPageNum] = useState(1);
  const timerRef = useRef(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const bytes = await generateOwnershipTransferPdf(formData || {});
        const blob = new Blob([bytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setPdfUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return url;
        });
      } catch {
        setPdfUrl(null);
      } finally {
        setLoading(false);
      }
    }, DEBOUNCE_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [formData]);

  useEffect(() => {
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [pdfUrl]);

  return (
    <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 bg-gray-50/50 gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">페이지</span>
          <span className="text-sm font-medium text-gray-900">{pageNum}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setScale((s) => Math.max(50, s - 10))}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 text-sm font-medium"
          >
            −
          </button>
          <span className="text-sm text-gray-600 min-w-[3rem] text-center">{scale}%</span>
          <button
            type="button"
            onClick={() => setScale((s) => Math.min(150, s + 10))}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 text-sm font-medium"
          >
            +
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto bg-gray-100 flex items-start justify-center p-4 min-h-[400px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-2 border-[var(--primary-600)] border-t-transparent mb-4" />
            <p className="text-sm text-gray-500">미리보기 생성 중...</p>
          </div>
        ) : pdfUrl ? (
          <iframe
            title="PDF 미리보기"
            src={`${pdfUrl}#page=1`}
            className="border-0 bg-white shadow-lg"
            style={{
              width: `${scale}%`,
              minHeight: '800px',
              height: '100%',
            }}
          />
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p className="text-5xl mb-4">📄</p>
            <p>폼을 채우면 PDF 미리보기가 여기에 표시됩니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
