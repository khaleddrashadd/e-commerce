import { Button } from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';

const AlertModal = ({ onConfirm, onClose, isOpen, isLoading }) => {
  return (
    <Modal
      title="Are you sure?"
      description="This action cannot be undone."
      isOpen={isOpen}
      onClose={onClose}>
      <div className="flex items-center justify-between w-full pt-6 gap-2">
        <Button
          disabled={isLoading}
          variant="outline"
          onClick={onClose}>
          Cancel
        </Button>
        <Button
          disabled={isLoading}
          variant="destructive"
          onClick={onConfirm}>
          Confirm
        </Button>
      </div>
    </Modal>
  );
};
export default AlertModal;
