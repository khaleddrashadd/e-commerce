import Modal from '@/components/ui/Modal';
import Gallery from '../Gallery';
import Info from '../Info';
import { useDispatch, useSelector } from 'react-redux';
import { openPreviewModal } from '@/redux/slices/preview-modal-slice';

const PreviewModal = () => {
  const {previewData,isOpen} = useSelector((state) => state.previewModal);
  const dispatch = useDispatch();
  const onClose = () => {
    dispatch(openPreviewModal.closePreviewModal());}
  return (
    <Modal
      description={previewData?.category?.name}
      isOpen={isOpen}
      onClose={onClose}
      className=""
      title={previewData?.name}>
      <div className="flex gap-6 items-start justify-around">
        <div className="w-1/2 h-full">
          <Gallery images={previewData?.imagesUrl} />
        </div>
        <Info data={previewData} />
      </div>
    </Modal>
  );
};
export default PreviewModal;
