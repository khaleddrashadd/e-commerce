import { toast } from 'react-hot-toast';
import { redirect } from 'react-router-dom';
import { supabase } from '@/lib/supabase/Config';

// import from 'str'

// export const stripe = new stripe(process.env.STRIPE_API_KEY!, {
//   apiVersion: "2022-11-15",
//   typescript: true,
// });


export const cartAction = async ({ request }) => {
  const storeId = import.meta.env.VITE_SUPABASE_STORE_ID;

  const data = await request.formData();
  const productIds = data.get('productIds').split(',');
  const items = JSON.parse(data.get('items'));

  const { data: products, error } = await supabase
    .from('product')
    .select()
    .in('id', productIds);

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

  const { data: order, error: orderInsertError } = await supabase
    .from('order')
    .insert({
      ispaid: false,
    }).eq('storeId', storeId);

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true,
      },
      success_url: '/cart?success=1',
      cancel_url: '/cart?canceled=1',
      metadata: {
        orderId: order.id,
      },
    });

  //   const { error } = await supabase
  //     .from('order')
  //     .insert({
  //       name,
  //       storeId,
  //       description,
  //     })
  //     .select()
  //     .single();
  //   if (error) return toast.error(error.message || 'something went wrong');
  //   toast.success('Category created successfully');

  //   return redirect(`/admin/categories`);
  // }
  // if (method === 'PATCH') {
  //   const { error } = await supabase
  //     .from('category')
  //     .update({
  //       name,
  //       description,
  //     })
  //     .eq('id', categoryId)
  //     .select()
  //     .single();
  //   if (error) return toast.error(error.message || 'something went wrong');
  //   toast.success('Category updated successfully');
  //   return redirect(`/admin/categories`);
  // }

  // if (method === 'DELETE') {
  //   const { error } = await supabase
  //     .from('category')
  //     .delete()
  //     .eq('id', categoryId);
  //   if (error) return toast.error(error.message || 'something went wrong');
  //   toast.success('Category deleted successfully');
  //   return redirect(`/admin/categories`);
  // }

  return null;
};
