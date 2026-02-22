import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY
);

async function checkUsage(userId) {
  if (!userId) return true;
  const ym = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`;
  const { data: profile } = await supabase.from('profiles').select('plan').eq('id', userId).single();
  if (profile?.plan === 'pro') return true;
  const { data: log } = await supabase
    .from('usage_logs')
    .select('count')
    .eq('user_id', userId)
    .eq('year_month', ym)
    .single();
  const count = log?.count ?? 0;
  return count < 3;
}

async function recordUsage(userId) {
  if (!userId) return;
  const ym = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`;
  const { data: row } = await supabase.from('usage_logs').select('id, count').eq('user_id', userId).eq('year_month', ym).single();
  if (row) {
    await supabase.from('usage_logs').update({ count: (row.count || 0) + 1 }).eq('id', row.id);
  } else {
    await supabase.from('usage_logs').insert({ user_id: userId, year_month: ym, count: 1 });
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userInput, userId } = req.body || {};

    const usageOk = await checkUsage(userId);
    if (!usageOk) {
      return res.status(402).json({ error: 'LIMIT_EXCEEDED' });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: `당신은 한국 부동산 등기 문서 전문가입니다.
사용자 입력에서 필요한 정보를 추출해 아래 JSON만 반환하세요. 다른 설명 없이 JSON만 출력합니다.
키: address, reportNo, price, causeYear, causeMonth, causeDay,
shareTransfer, obligorName, obligorJumin, obligorAddr, obligorShare,
rightName, rightJumin, rightAddr, rightShare,
acqTax, eduTax, ruralTax, taxTotal, regFee,
appYear, appMonth, appDay, court
값이 없으면 null 또는 빈 문자열. 숫자는 문자열로.`,
        messages: [{ role: 'user', content: userInput || '' }],
      }),
    });

    const aiData = await response.json();
    if (aiData.error) {
      return res.status(502).json({ error: aiData.error.message || 'AI error' });
    }

    const text = aiData.content?.[0]?.text || '{}';
    let parsed = {};
    try {
      const cleaned = text.replace(/```json?\s*/g, '').replace(/```\s*/g, '').trim();
      parsed = JSON.parse(cleaned);
    } catch {
      parsed = {};
    }

    await recordUsage(userId);

    return res.status(200).json(parsed);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
