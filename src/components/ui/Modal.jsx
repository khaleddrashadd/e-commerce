import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './dialog';

const Modal = ({ title, description, isOpen, onClose, children }) => {
  const onChange = open => {
    if (!open) onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onChange}>
      <DialogContent className="bg-red-500">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};
export default Modal;
