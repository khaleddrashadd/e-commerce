import MainNav from './MainNav';
import { ComboboxDemo } from './StoreSwitcher';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/Config';
import { toast } from 'react-hot-toast';
import { UserButton } from '@clerk/clerk-react';

const Navbar = ({ userId }) => {
  const [stores, setStores] = useState([]);
  useEffect(() => {
    const getStore = async () => {
      const { data: storesData, error } = await supabase
        .from('store')
        .select()
        .eq('userId', userId);
      if (error) return toast.error(error.message || 'Something went wrong');
      setStores(storesData);
    };
    getStore();
  }, []);

  return (
    <header className="border-b">
      <div className="flex h-16 items-center">
        <div className="w-full flex items-center justify-between lg:justify-start">
          <ComboboxDemo items={stores} />
          <MainNav />
        </div>
        <UserButton afterSignOutUrl="/admin" />
      </div>
    </header>
  );
};
export default Navbar;
