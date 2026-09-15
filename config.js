// ضعي بيانات مشروع Supabase هنا بعد إنشائه.
// لا تضعي Service Role Key هنا أبداً. استخدمي anon/publishable key فقط.
const SUPABASE_URL = "ضع_رابط_مشروعك_هنا";
const SUPABASE_KEY = "ضع_مفتاح_anon_او_publishable_هنا";
const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);