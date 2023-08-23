import productsLoaderHelper from '../loaders-helper/products-loader-helper';

const productsLoaderUser = async () => {
  return await productsLoaderHelper( { isFeatured: true });
};
export default productsLoaderUser;
