import productsLoaderHelper from '../loaders-helper/products-loader-helper';

const productsLoaderUser = async () => {
  const storeId = import.meta.env.VITE_SUPABASE_STORE_ID;
  return await productsLoaderHelper(storeId, { isFeatured: true });
};
export default productsLoaderUser;
