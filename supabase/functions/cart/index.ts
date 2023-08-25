// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// import { supabase } from '/lib/supabase/Config';

const URL = Deno.env.get('_SUPABASE_URL') as string;
const KEY = Deno.env.get('_SUPABASE_SERVICE_KEY') as string;

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.0';
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const supabase = createClient(URL, KEY);

serve(async (req) => {
  const { data } = await supabase.from('cart').select();
  const expiredCarts = data.filter(
    (item) => Date.parse(item.expiresAt) < Date.now()
  );

  const { error } = await supabase
    .from('cart')
    .delete()
    .in(
      'id',
      expiredCarts.map((item) => item.id)
    );

  return new Response(JSON.stringify(data, error), {
    headers: { 'Content-Type': 'application/json' },
  });
});

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
