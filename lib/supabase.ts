import { createClient } from '@supabase/supabase-js';

// Supabase 配置
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// 创建 Supabase 客户端
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 导出服务端客户端（用于 API 路由）
export const createSupabaseClient = () => {
  const serviceKey = process.env.SUPABASE_SERVICE_KEY;
  if (!serviceKey) {
    console.warn('SUPABASE_SERVICE_KEY 未配置');
  }
  return createClient(supabaseUrl, serviceKey || supabaseAnonKey);
};

// 检查配置是否完整
export const isSupabaseConfigured = () => {
  return !!supabaseUrl && !!supabaseAnonKey;
};