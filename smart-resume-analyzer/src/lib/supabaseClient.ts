// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

// ⚠️ IMPROVEMENT: Replace hardcoded URLs and keys with environment variables
// These should typically be in a .env.local file in your frontend root
// For example:
// VITE_SUPABASE_URL=https://your-project-id.supabase.co
// VITE_SUPABASE_ANON_KEY=your-anon-key-here

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xehfpznqdxoeltrwozsb.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlaGZwem5xZHhvZWx0cndvenNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzMTkwNjcsImV4cCI6MjA2Nzg5NTA2N30.dh5xS9VqTUYUXz_gltT4jF2_c1QVOcVQrsCTIym_V6I'; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);