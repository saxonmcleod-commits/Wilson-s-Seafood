import { createClient } from '@supabase/supabase-js';

// IMPORTANT: Replace with your Supabase project's URL and Anon Key
const supabaseUrl = 'https://kerbbjvphldbdalwmwoa.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlcmJianZwaGxkYmRhbHdtd29hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwMzA2MzUsImV4cCI6MjA3ODYwNjYzNX0.i7yN-asSiGFvHcDkk6qKyysAL8Hxu6CRfwEttuLXTh8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);