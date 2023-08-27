import { ProductsList, BillboardCover } from '@/components/Store';
import { useLoaderData } from 'react-router-dom';

const HomePage = () => {
  const products = useLoaderData();
  return (
    <div className="space-y-10 pb-10 font-urbanist">
      <BillboardCover title="Explore the special collection">
        <img
          className="w-full object-cover"
          src="../../assets/billboard-photo.jpg"
          alt="billboard photo"
        />
      </BillboardCover>
      <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
        <ProductsList
          title="Featured Products"
          items={products}
        />
      </div>
    </div>
  );
};
export default HomePage;
