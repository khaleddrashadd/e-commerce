import { useLoaderData } from 'react-router-dom';
import MainNav from './MainNav';
import { UserButton } from '@clerk/clerk-react';
import { ModeToggle } from '@/components/ui/mode-toggle';

const Navbar = () => {
  const store = useLoaderData();
  return (
    <header className="border-b">
      <div className="flex h-16 items-center">
        <div className="w-full flex items-center justify-between lg:justify-start">
          <div>{store.name}</div>
          <MainNav />
        </div>
        <div className='flex flex-1 items-center gap-6'>
        <ModeToggle />
          <UserButton afterSignOutUrl="/admin" />
        </div>
      </div>
    </header>
  );
};
export default Navbar;
