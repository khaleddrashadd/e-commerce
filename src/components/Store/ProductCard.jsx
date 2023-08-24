import { Button } from '@/components/ui/Button';
import { Expand } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openPreviewModal } from '@/redux/slices/preview-modal-slice';
import Info from './Info';

const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onPreview = (e) => {
    e.stopPropagation();
    dispatch(openPreviewModal.openPreviewModal(item));
  };
  return (
    <div
      key={item.id}
      className="flex flex-col gap-y-4 group border p-3 overflow-hidden rounded-xl">
      <div
        className="aspect-square cursor-pointer rounded-xl bg-gray-100 relative"
        onClick={() => navigate(`/product/${item?.id}`)}>
        <img
          className="aspect-square object-cover w-full h-full rounded-md"
          src={item.imagesUrl[0]}
          alt={item.name}
        />
        <div className="lg:opacity-0 group-hover:opacity-100 absolute transition bottom-5 w-full">
          <div className="flex gap-x-6 justify-center">
            <Button
              onClick={onPreview}
              variant="outline"
              className="rounded-full hover:scale-110 transition px-2">
              <Expand
                size={20}
                className="text-gray-600"
              />
            </Button>
          </div>
        </div>
      </div>
      <Info
        data={item}
        variant="card"
      />
    </div>
  );
};
export default ProductCard;
