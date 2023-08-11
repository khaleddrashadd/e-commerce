import { NavLink, useParams } from 'react-router-dom';
import { getRoutes } from '../data/routes';

const MainNav = () => {
  const { storeId } = useParams();
  const routes = getRoutes(storeId);

  return (
    <nav className="flex items-center gap-x-4 lg:gap-x-6 mx-4">
      {routes.map(route => (
        <NavLink
          key={route.to}
          to={route.to}
          className="text-sm font-medium transition hover:text-primary text-muted-foreground">
          {route.label}
        </NavLink>
      ))}
    </nav>
  );
};
export default MainNav;
