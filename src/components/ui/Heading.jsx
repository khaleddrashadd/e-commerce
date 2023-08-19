const Heading = ({ title, description }) => {
  return (
    <div className="flex flex-col max-md:items-center">
      <h2 className="font-bold text-3xl tracking-tight">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};
export default Heading;
