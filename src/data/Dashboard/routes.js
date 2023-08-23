export const getRoutes = () => {
  return [
    {
      to: '/admin',
      label: 'Overview',
    },
    {
      to: '/admin/categories',
      label: 'Categories',
    },
    {
      to: '/admin/sizes',
      label: 'Sizes',
    },
    {
      to: '/admin/colors',
      label: 'Colors',
    },
    {
      to: '/admin/products',
      label: 'Products',
    },
    {
      to: '/admin/orders',
      label: 'Orders',
    },
  ];
};
