import { NavLink, useParams } from 'react-router-dom';
import { getRoutes } from '@/data/Dashboard/routes';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { Menu } from 'lucide-react';

const MainNav = () => {
  const { storeId } = useParams();
  const routes = getRoutes(storeId);

  return (
    <nav className="flex items-center gap-x-2 lg:gap-x-6 mx-4">
      {routes.map((route) => (
        <NavLink
          key={route.to}
          to={route.to}
          end
          className={({ isActive }) =>
            isActive
              ? 'lg:block hidden text-sm font-medium transition hover:text-primary text-white'
              : 'lg:block hidden text-sm font-medium transition hover:text-primary text-muted-foreground'
          }>
          {route.label}
        </NavLink>
      ))}
      <Menubar className="flex p-0 justify-center lg:hidden rounded-full overflow-hidden w-10 h-10">
        <MenubarMenu>
          <MenubarTrigger className="p">
            <Menu />
          </MenubarTrigger>
          <MenubarContent align="end">
            {routes.map((route) => (
              <MenubarItem key={route.to}>
                <NavLink
                  to={route.to}
                  end
                  className={({ isActive }) =>
                    isActive
                      ? 'text-sm font-medium transition hover:text-primary text-white'
                      : 'text-sm font-medium transition hover:text-primary text-muted-foreground'
                  }>
                  {route.label}
                </NavLink>
              </MenubarItem>
            ))}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </nav>
  );
};
export default MainNav;
