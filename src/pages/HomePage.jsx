import StoreModal from '../components/Modals/StoreModal';
import { useDispatch } from 'react-redux';
import { storeModalActions } from '../redux/slices/store-modal-slice';
import { useEffect } from 'react';
import { supabase } from '../lib/supabase/Config';
import { useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const HomePage = () => {
  const { userId } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(storeModalActions.closeModal());
  };
  useEffect(() => {
    const fetchStore = async () => {
      const { data: store, error } = await supabase
        .from('store')
        .select()
        .eq('userId', userId)
        .limit(1);

      if (error) toast.error(error.message || 'Something went wrong');

      if (store[0]?.id) navigate(`/admin/${store[0].id}`, { replace: true });
    };
    fetchStore();
  }, [userId, navigate]);

  return (
    <StoreModal
      isOpen
      onClose={onClose}
    />
  );
};

export default HomePage;
