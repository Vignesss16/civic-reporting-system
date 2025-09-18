import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vxgdnkzyoahnykoxcpgx.supabase.co';  // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4Z2Rua3p5b2Fobnlrb3hjcGd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MzY3NjAsImV4cCI6MjA3MzAxMjc2MH0.TiiChIhwvrW1LgBXixmQzwYbre2cBCylC5i3zaT8WG0';  // Replace with your public anon key

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;