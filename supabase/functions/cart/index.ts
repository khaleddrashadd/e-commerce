// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// import { supabase } from '/lib/supabase/Config';

const KEY = Deno.env.get('VITE_SUPABASE_KEY') as string;
const URL = Deno.env.get('VITE_SUPABASE_URL') as string;

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.0';

const supabase = createClient(URL, KEY);

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

serve(async (req) => {
  console.log('Hello from Functions!');
  const { data:cart } = await supabase
    .from('cart')
    .select()
    .eq('id', '67b68991-b95e-4824-8080-7c7982dbb5fc');
  // const { data, error } = await supabase
  //   .from('cart')
  //   .delete()
  //   .eq('id', '67b68991-b95e-4824-8080-7c7982dbb5fc');

  return new Response(JSON.stringify(cart, error), {
    headers: { 'Content-Type': 'application/json' },
  });
});

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
