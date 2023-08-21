import Heading from './Heading';
import { Button } from './button';

const EmptyState = ({ title, subtitle, label, showReset, onClick }) => {
  return (
    <div className="flex flex-col gap-6">
      <Heading
        center
        title={title}
        description={subtitle}
      />
      {showReset && (
        <Button
          className="rounded-md"
          variant="outline"
          onClick={onClick}>
          {label}
        </Button>
      )}
    </div>
  );
};
export default EmptyState;
