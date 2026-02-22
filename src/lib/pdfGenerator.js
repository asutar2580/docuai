import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

/**
 * 소유권이전등기신청서 형식에 맞춰 formData로 PDF 생성
 * @param {Object} formData - AI/폼에서 채운 필드 객체
 * @returns {Promise<Uint8Array>}
 */
export async function generateOwnershipTransferPdf(formData) {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const page = doc.addPage([595, 842]); // A4
  const { width, height } = page.getSize();
  const margin = 50;
  const lineHeight = 18;
  let y = height - margin;

  const drawText = (text, x, size = 10) => {
    if (!text) return;
    page.drawText(String(text).slice(0, 80), { x, y, size, font, color: rgb(0, 0, 0) });
  };

  page.drawText('소유권이전등기신청서', { x: margin, y, size: 14, font, color: rgb(0, 0, 0) });
  y -= lineHeight * 1.5;

  const rows = [
    ['부동산 소재지', formData.address],
    ['접수번호', formData.reportNo],
    ['매매대금', formData.price ? `${formData.price}원` : ''],
    ['원인일자', [formData.causeYear, formData.causeMonth, formData.causeDay].filter(Boolean).join('.')],
    ['의무자(매도인)', formData.obligorName],
    ['주민등록번호', formData.obligorJumin],
    ['주소', formData.obligorAddr],
    ['지분', formData.obligorShare],
    ['권리자(매수인)', formData.rightName],
    ['주민등록번호', formData.rightJumin],
    ['주소', formData.rightAddr],
    ['지분', formData.rightShare],
    ['취득세', formData.acqTax],
    ['교육세', formData.eduTax],
    ['농어촌특별세', formData.ruralTax],
    ['등기신청수수료', formData.regFee],
    ['신청일', [formData.appYear, formData.appMonth, formData.appDay].filter(Boolean).join('.')],
    ['관할법원', formData.court],
  ];

  for (const [label, value] of rows) {
    page.drawText(label, { x: margin, y, size: 9, font, color: rgb(0.3, 0.3, 0.3) });
    drawText(value, margin + 120, 10);
    y -= lineHeight;
  }

  return doc.save();
}
