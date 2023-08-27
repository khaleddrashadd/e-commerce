import Stripe from 'https://esm.sh/stripe@10.13.0?target=deno&deno-std=0.132.0&no-check';
const URL = Deno.env.get('_SUPABASE_URL') as string;
const KEY = Deno.env.get('_SUPABASE_SERVICE_KEY') as string;
const STORE_ID = Deno.env.get('_STORE_ID') as string;

const stripe = Stripe(Deno.env.get('_STRIPE_SECRET_KEY') ?? '', {
  httpClient: Stripe.createFetchHttpClient(),
  apiVersion: '2022-08-01',
});
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.0';
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const supabase = createClient(URL, KEY);

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
    const jsonData = await req.json();
    const { productIds, items, browserId } = jsonData;
    
    const { data: order, error: orderInsertError } = await supabase
      .from('order')
      .insert({
        isPaid: false,
        storeId: STORE_ID,
      })
      .select()
      .single();
    const line_items = [];
    
    items.forEach((product) => {
      line_items.push({
        quantity: product.total,
        price_data: {
          currency: 'USD',
          product_data: {
            name: product.name,
          },
          unit_amount: Number(product.price) * 100,
        },
      });
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true,
      },
      success_url: 'http://localhost:3000/cart?success=1',
      cancel_url: 'http://localhost:3000/cart?canceled=1',
      metadata: {
        orderId: order.id,
        productIds: productIds.join(','),
        items: JSON.stringify(items),
        browserId
      },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Expose-Headers': 'Content-Length, X-JSON',
        'Access-Control-Allow-Headers':
          'apikey,X-Client-Info, Content-Type, Authorization, Accept, Accept-Language, X-Authorization',
      },
    });
  }
});

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
