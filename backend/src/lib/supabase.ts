import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://yasmajlglpgipuzrsqna.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlhc21hamxnbHBnaXB1enJzcW5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5MDI2NjksImV4cCI6MjA3MzQ3ODY2OX0.9bhUFpKg95XcVhFzNJR4zkX7qAZv_Ul0lf1KkqfeJvg';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
