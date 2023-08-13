import StoreModal from '../components/Modals/StoreModal';
import { useEffect } from 'react';
import { supabase } from '../lib/supabase/Config';
import { useAuth } from '@clerk/clerk-react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { storeModalActions } from '../redux/slices/store-modal-slice';

const HomePage = () => {
  const { userId } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const hasParams = Object.keys(params).length > 0;

  const onClose = () => {
    if (!hasParams) return;
    dispatch(storeModalActions.closeModal());
  };
  const { isOpen } = useSelector(state => state.storeModal);

  useEffect(() => {
    const fetchStore = async () => {
      const { data: storeData, error } = await supabase
        .from('store')
        .select()
        .eq('userId', userId);

      const storeIds = storeData.map(store => store.id);
      const idExist = storeIds.includes(params.storeId);

      if (error) return toast.error(error.message || 'Something went wrong');
      if (storeData.length === 0) dispatch(storeModalActions.openModal());
      if (!idExist) navigate(`/admin/${storeData[0]?.id}`);
    };
    fetchStore();
  }, [userId, dispatch, navigate, params.storeId]);

  return (
    <>
      <StoreModal
        isOpen={isOpen}
        onClose={onClose}
      />
      <Outlet />
    </>
  );
};

export default HomePage;
