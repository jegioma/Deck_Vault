// import { createClient } from "@supabase/supabase-js";

// const supabase = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL, 
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    
// );

// export default supabase;
import { createClient } from "@supabase/supabase-js";

let supabase; // Declare supabase outside the component.

if (typeof window !== "undefined") {
  // This code will only run on the client side.
  supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL, 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      localStorage: window.localStorage,
    }
  );
}

export default supabase;

