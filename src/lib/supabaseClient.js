import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'YOUR_SUPABASE_URL';  // Replace with your Supabase URL
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';  // Replace with your public anon key

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;