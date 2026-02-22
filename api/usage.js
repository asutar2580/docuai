import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY
);

const FREE_MONTHLY_LIMIT = 3;

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const userId = req.query?.userId || req.headers?.authorization?.replace('Bearer ', '');
  if (!userId) {
    return res.status(200).json({ count: 0, limit: FREE_MONTHLY_LIMIT, plan: 'free' });
  }

  try {
    const ym = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`;
    const { data: profile } = await supabase.from('profiles').select('plan').eq('id', userId).single();
    const plan = profile?.plan || 'free';
    const limit = plan === 'pro' ? 999999 : FREE_MONTHLY_LIMIT;

    const { data: log } = await supabase
      .from('usage_logs')
      .select('count')
      .eq('user_id', userId)
      .eq('year_month', ym)
      .single();

    const count = log?.count ?? 0;
    return res.status(200).json({ count, limit, plan });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ count: 0, limit: FREE_MONTHLY_LIMIT, plan: 'free' });
  }
}
