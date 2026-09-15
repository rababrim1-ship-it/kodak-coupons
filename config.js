// ضعي بيانات مشروع Supabase هنا بعد إنشائه.
// لا تضعي Service Role Key هنا أبداً. استخدمي anon/publishable key فقط.
const SUPABASE_URL = "https://mqmprgcjognnqaglqelj.supabase.co";
const SUPABASE_KEY = "sb_publishable_NXqiS5vfYjbYJENM9xpmCA_N89OmYzs";
const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
