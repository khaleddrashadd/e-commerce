import Stripe from 'https://esm.sh/stripe@11.0.0?target=deno&deno-std=0.1.0/no-check';
const URL = Deno.env.get('_SUPABASE_URL') as string;
const KEY = Deno.env.get('_SUPABASE_SERVICE_KEY') as string;

const stripe = Stripe(Deno.env.get('_STRIPE_SECRET_KEY') ?? '', {
  httpClient: Stripe.createFetchHttpClient(),
  apiVersion: '2022-08-01',
});
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.0';
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const supabase = createClient(URL, KEY);
const WEBHOOK_SECRET = Deno.env.get('_WEBHOOK_SECRET') as string;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Expose-Headers': 'Content-Length, X-JSON',
        'Access-Control-Allow-Headers':
          'apikey,X-Client-Info, Content-Type, Authorization, Accept, Accept-Language, X-Authorization',
      },
    });
  } else {
    const body = await req.text();
    const headers = await req.headers;
    const signature = headers.get('Stripe-Signature');

    let event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, WEBHOOK_SECRET);
    } catch (error: any) {
      return new Response(`Webhook Error: ${error.message}`, {
        status: 400,
      });
    }
    const session = event.data.object as Stripe.Checkout.Session;
    const address = session?.customer_details?.address;

    const addressComponents = [
      address?.line1,
      address?.line2,
      address?.city,
      address?.state,
      address?.postal_code,
      address?.country,
    ];

    const addressString = addressComponents
      .filter((c) => c !== null)
      .join(', ');

    if (event.type === 'checkout.session.completed') {

      const { data: order } = await supabase
        .from('order')
        .update({
          isPaid: true,
          address: addressString,
          phone: session?.customer_details?.phone || '',
        })
        .eq('id', session?.metadata?.orderId)
        .select();

      const productIds = session?.metadata?.productIds.split(',');
      const items = JSON.parse(session?.metadata?.items);

      items.forEach(async (item: any) => {
        await supabase.rpc('decrement', {
          x: item.quantity,
          row_id: item.id,
        });
      });

      const browserId = session?.metadata?.browserId;

      await supabase.from('cart').delete().eq('browserId', browserId);
    }

    return new Response(null, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Expose-Headers': 'Content-Length, X-JSON',
        'Access-Control-Allow-Headers':
          'apikey,X-Client-Info, Content-Type, Authorization, Accept, Accept-Language, X-Authorization',
      },
      status: 200,
    });
  }
});

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
