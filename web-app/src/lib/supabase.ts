import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://igeiqlsjcwwggtmdpnxh.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlnZWlxbHNqY3d3Z2d0bWRwbnhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1OTgwNzksImV4cCI6MjA4NjE3NDA3OX0.OTv8EJFBgBB2rP5i2TO6g7PIbyhjsr_wALzcECB25Z8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
