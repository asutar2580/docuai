import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

const FREE_MONTHLY_LIMIT = 3;

export function useUsage(userId) {
  const [usage, setUsage] = useState({ count: 0, limit: FREE_MONTHLY_LIMIT, plan: 'free' });
  const [loading, setLoading] = useState(true);

  const yearMonth = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`;

  const fetchUsage = useCallback(async () => {
    if (!userId) {
      setUsage({ count: 0, limit: FREE_MONTHLY_LIMIT, plan: 'free' });
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const { data: profile } = await supabase.from('profiles').select('plan').eq('id', userId).single();
      const plan = profile?.plan || 'free';
      const limit = plan === 'pro' ? 999999 : FREE_MONTHLY_LIMIT;

      const { data: log } = await supabase
        .from('usage_logs')
        .select('count')
        .eq('user_id', userId)
        .eq('year_month', yearMonth)
        .single();

      setUsage({ count: log?.count ?? 0, limit, plan });
    } catch {
      setUsage({ count: 0, limit: FREE_MONTHLY_LIMIT, plan: 'free' });
    } finally {
      setLoading(false);
    }
  }, [userId, yearMonth]);

  useEffect(() => {
    fetchUsage();
  }, [fetchUsage]);

  const canUse = usage.plan === 'pro' || usage.count < usage.limit;
  const remaining = Math.max(0, usage.limit - usage.count);

  return { usage, loading, canUse, remaining, refetch: fetchUsage };
}
