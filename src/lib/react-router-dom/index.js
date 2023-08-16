import { storeLoader } from './loaders/store-loader';
import storeAction from './actions/store-action';
import { insertStoreAction } from './actions/insert-store';
import { billboardLoader } from './loaders/billboard-loader';
import { billboardAction } from './actions/billboard-action';
import { billboardsLoader } from './loaders/billboards-loader';
import { categoriesLoader } from './loaders/categories-loader';
import { categoryAction } from './actions/category-action';
import { categoryLoader } from './loaders/category-loader';
import { sizeAction } from './actions/size-action';
import { sizesLoader } from './loaders/sizes-loader';
import { sizeLoader } from './loaders/size-loader';

export {
  storeLoader,
  billboardLoader,
  billboardsLoader,
  categoriesLoader,
  categoryLoader,
  sizesLoader,
  sizeLoader,
  storeAction,
  insertStoreAction,
  billboardAction,
  categoryAction,
  sizeAction,
};
