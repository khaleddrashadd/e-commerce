import Container from '@/components/ui/Container';
import { Link, useLoaderData } from 'react-router-dom';
import MainNav from './MainNav';
import { NavbarCart } from './';

const Navbar = () => {
  const categories = useLoaderData();
  return (
    <Container>
      <div className="flex items-center justify-between font-urbanist">
        <div className="relative px-2 lg:px-6 flex h-12 items-center">
          <Link
            to="/"
            className="h-full">
            <div className="h-full">
              <img
                src="/mercato.png"
                alt="logo"
                className='h-full'
              />
            </div>
          </Link>
          <MainNav categories={categories} />
        </div>
        <NavbarCart />
      </div>
    </Container>
  );
};
export default Navbar;
