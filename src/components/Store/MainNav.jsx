import { NavLink } from 'react-router-dom';

const MainNav = ({categories}) => {
  const routes = categories.map((category) => ({
    to: `/category/${category.id}`,
    label: category.name,
  }));

  return (
    <nav className="mx-6 flex items-center gap-4 lg:gap-6">
      {routes.map((route) => (
        <NavLink
          key={route.to}
          className={({ isActive }) =>
            isActive
              ? 'text-black text-sm font-medium font-urbanist'
              : 'text-sm font-medium font-urbanist transition text-neutral-500 hover:text-black'
          }
          to={route.to}
          end>
          {route.label}
        </NavLink>
      ))}
    </nav>
  );
};
export default MainNav;
