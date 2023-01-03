import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// import { createClient } from "@supabase/supabase-js";
// export const supabase = createClient(
//     "https://egcyednprtadyrjmlnti.supabase.co",
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVnY3llZG5wcnRhZHlyam1sbnRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjA4MTYzNzQsImV4cCI6MTk3NjM5MjM3NH0.Z7Zqs9Qrz79Huab4TmG-Wv-mCv_Y-sMFgE7Ya9b1bGEprocess.env.REACT_APP_SUPABASE_ANON_KEY"
// )