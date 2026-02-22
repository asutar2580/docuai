import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import AIInputPanel from '../components/document/AIInputPanel';
import FormPanel from '../components/document/FormPanel';
import PreviewPanel from '../components/document/PreviewPanel';
import { useAuth } from '../hooks/useAuth';
import { useUsage } from '../hooks/useUsage';

const INITIAL_FORM = {
  address: '',
  reportNo: '',
  price: '',
  causeYear: '',
  causeMonth: '',
  causeDay: '',
  shareTransfer: '',
  obligorName: '',
  obligorJumin: '',
  obligorAddr: '',
  obligorShare: '',
  rightName: '',
  rightJumin: '',
  rightAddr: '',
  rightShare: '',
  acqTax: '',
  eduTax: '',
  ruralTax: '',
  taxTotal: '',
  regFee: '',
  appYear: '',
  appMonth: '',
  appDay: '',
  court: '',
};

export default function Editor() {
  const { user, loading: authLoading } = useAuth();
  const { remaining, loading: usageLoading, refetch: refetchUsage } = useUsage(user?.id);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [aiFilledKeys, setAiFilledKeys] = useState(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth', { replace: true });
      return;
    }
    if (user) {
      window.__DOCUAI_USER_ID__ = user.id;
    }
    return () => {
      delete window.__DOCUAI_USER_ID__;
    };
  }, [user, authLoading, navigate]);

  const handleAIResult = (data) => {
    const next = { ...INITIAL_FORM };
    const filled = new Set();
    Object.entries(data).forEach(([key, value]) => {
      if (value != null && value !== '') {
        next[key] = value;
        filled.add(key);
      }
    });
    setFormData(next);
    setAiFilledKeys(filled);
    refetchUsage();
  };

  const handlePreview = () => {
    const preview = window.open('', '_blank');
    if (!preview) return;
    import('../lib/pdfGenerator').then(({ generateOwnershipTransferPdf }) => {
      generateOwnershipTransferPdf(formData).then((bytes) => {
        const blob = new Blob([bytes], { type: 'application/pdf' });
        preview.location.href = URL.createObjectURL(blob);
      });
    });
  };

  const handleDownload = () => {
    import('../lib/pdfGenerator').then(({ generateOwnershipTransferPdf }) => {
      generateOwnershipTransferPdf(formData).then((bytes) => {
        const blob = new Blob([bytes], { type: 'application/pdf' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `소유권이전등기신청서_${new Date().toISOString().slice(0, 10)}.pdf`;
        a.click();
        URL.revokeObjectURL(a.href);
      });
    });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--primary-600)] border-t-transparent" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-[var(--gray-100)]">
      <Navbar user={user} />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        <div className="mb-6">
          <AIInputPanel
            onResult={handleAIResult}
            usageRemaining={remaining}
            usageLoading={usageLoading}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[500px]">
          <FormPanel
            formData={formData}
            onChange={setFormData}
            aiFilledKeys={aiFilledKeys}
            onPreview={handlePreview}
            onDownload={handleDownload}
          />
          <PreviewPanel formData={formData} />
        </div>
      </main>
    </div>
  );
}
