import Heading from './Heading';
import { Button } from './button';

const EmptyState = ({ title, subtitle, label, showReset, onClick, center }) => {
  return (
    <div className={`flex flex-col gap-6 ${center && 'mx-auto'}`}>
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
