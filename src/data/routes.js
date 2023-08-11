export const getRoutes = storeId => {
  return [
    {
      to: `/admin/${storeId}`,
      label: 'Overview',
    },
    {
      to: `/admin/${storeId}/billboards`,
      label: 'Billboards',
    },
    {
      to: `/admin/${storeId}/categories`,
      label: 'Categories',
    },
    {
      to: `/admin/${storeId}/sizes`,
      label: 'Sizes',
    },
    {
      to: `/admin/${storeId}/colors`,
      label: 'Colors',
    },
    {
      to: `/admin/${storeId}/products`,
      label: 'Products',
    },
    {
      to: `/admin/${storeId}/orders`,
      label: 'Orders',
    },
    {
      to: `/admin/${storeId}/settings`,
      label: 'Settings',
    },
  ];
};
