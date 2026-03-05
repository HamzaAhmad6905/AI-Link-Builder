import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kxaimstrfbyfpzzjqzhk.supabase.co";
const supabaseAnonKey = "sb_publishable_h3bQ4pcZZ_kBGlVnui8R-w_6qy43jAo";
export const supabase = createClient(supabaseUrl, supabaseAnonKey);