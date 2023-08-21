const BillboardCover = ({children,title}) => {
  return (
    <>
      <div className="font-urbanist flex items-center justify-center p-4 sm:p-6 relative lg:p-8 rounded-xl overflow-hidden">
        <div className="rounded-xl sm:h-[20rem] overflow-hidden bg-cover">
          {children}
        </div>
        <div className="absolute font-bold text-3xl sm:text-5xl lg:text-6xl max-w-xs sm:max-w-xl">
          <h1 className="flex items-center justify-center text-center text-neutral-800">
            {title}
          </h1>
        </div>
      </div>
    </>
  );
};
export default BillboardCover;
