import Modal from '@/components/ui/Modal';
import { Gallery, Info } from '@/components/Store';
import { useDispatch, useSelector } from 'react-redux';
import { openPreviewModal } from '@/redux/slices/preview-modal-slice';

const PreviewModal = ({isLoading}) => {
  const {previewData,isOpen} = useSelector((state) => state.previewModal);
  const dispatch = useDispatch();
  const onClose = () => {
    dispatch(openPreviewModal.closePreviewModal());}
  return (
    <Modal
      description={previewData?.category?.name}
      isOpen={isOpen}
      onClose={onClose}
      className="h-full"
      title={previewData?.name}>
      <div className="flex gap-6 items-start">
        <div className="w-[36%]">
          <Gallery images={previewData?.imagesUrl} />
        </div>
        <Info data={previewData} isLoading={isLoading} />
      </div>
    </Modal>
  );
};
export default PreviewModal;
