import { UserButton } from '@clerk/clerk-react';
import MainNav from './MainNav';
import { ComboboxDemo } from './StoreSwitcher';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/Dashboard/supabase/Config';
import { toast } from 'react-hot-toast';

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
      <div className="flex h-16 items-center px-4 justify-between">
        <div className="flex items-center">
          <ComboboxDemo items={stores} />
          <MainNav />
        </div>
        <div>
          <UserButton afterSignOutUrl="/admin" />
        </div>
      </div>
    </header>
  );
};
export default Navbar;
