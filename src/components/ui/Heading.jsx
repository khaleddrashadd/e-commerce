const Heading = ({ title, description, center, icon }) => {
  return (
    <div
      className={`flex flex-col max-md:items-center ${
        center && 'items-center'
      }`}>
      <h2 className="font-bold text-3xl tracking-tight  dark:text-white flex items-center gap-2">
        {icon && <span>{icon}</span>}
        <span>{title}</span>
      </h2>
      <p className="text-sm text-muted-foreground dark:text-gray-400">
        {description}
      </p>
    </div>
  );
};
export default Heading;
