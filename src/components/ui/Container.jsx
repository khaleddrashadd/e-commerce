const Container = ({children,full}) => {
  return (
    <div className={`max-w-7xl dark:bg-gray-900 mx-auto ${full?'':'p-4'}`}>
      {children}
    </div>
  );
}
export default Container