const Container = ({children,full}) => {
  return (
    <div className={`max-w-7xl mx-auto ${full?'':'p-4'}`}>
      {children}
    </div>
  );
}
export default Container