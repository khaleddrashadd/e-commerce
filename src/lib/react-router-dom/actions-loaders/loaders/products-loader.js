import productsLoaderHelper from '../loaders-helper/products-loader-helper';

export const productsLoader = async ({ params: { storeId } }) => {
  return await productsLoaderHelper(storeId);
};
