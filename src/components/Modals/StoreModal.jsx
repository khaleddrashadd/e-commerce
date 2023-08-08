import { storeModalActions } from '../../redux/slices/store-modal-slice';
import Modal from '../ui/Modal';
import { useSelector,useDispatch } from 'react-redux';

const StoreModal = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector(state => state.storeModal);
  const onClose = () => {
    dispatch(storeModalActions.closeModal());
  }
  return (
    <Modal
      title="Create a store"
      description="Add a new store to manage products and category."
      onClose={onClose}
      isOpen={isOpen}>
      Future Create Store Form
    </Modal>
  );
};
export default StoreModal;
