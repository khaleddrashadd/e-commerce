import productsLoaderHelper from '../loaders-helper/products-loader-helper';

const productsLoaderUser = async () => {
  return await productsLoaderHelper( { isFeatured: true,archived: false });
};
export default productsLoaderUser;
