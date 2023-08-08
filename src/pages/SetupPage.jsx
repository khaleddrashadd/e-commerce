import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { storeModalActions } from '../redux/slices/store-modal-slice';

const SetupPage = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector(state => state.storeModal);
  
  useEffect(() => {
    if (!isOpen) {
      dispatch(storeModalActions.openModal());
    }
  }, [isOpen,dispatch]);
  return null;
};
export default SetupPage;
