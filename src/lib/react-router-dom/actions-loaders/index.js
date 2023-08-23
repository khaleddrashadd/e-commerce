import { storeLoader } from './loaders/store-loader';
import { categoriesLoader } from './loaders/categories-loader';
import { categoryAction } from './actions/category-action';
import { categoryLoader } from './loaders/category-loader';
import { sizeAction } from './actions/size-action';
import { sizesLoader } from './loaders/sizes-loader';
import { sizeLoader } from './loaders/size-loader';
import { colorsLoader } from './loaders/colors-loader';
import { colorAction } from './actions/color-action';
import { colorLoader } from './loaders/color-loader';
import { productsLoader } from './loaders/products-loader';
import { productAction } from './actions/product-action';
import { productLoader } from './loaders/product-loader';
import { ordersLoader } from './loaders/orders-loader';
import productsLoaderUser from './loaders/products-loader-user';

export {
  storeLoader,
  categoriesLoader,
  categoryLoader,
  sizesLoader,
  sizeLoader,
  colorsLoader,
  colorLoader,
  productsLoader,
  productLoader,
  ordersLoader,
  productsLoaderUser,
  categoryAction,
  sizeAction,
  colorAction,
  productAction,
};
