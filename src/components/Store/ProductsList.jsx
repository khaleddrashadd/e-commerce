import EmptyState from '@/components/ui/EmptyState';
import {ProductCard} from '@/components/Store';

const ProductsList = ({ title, items }) => {
  console.log(items);
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-3xl">{title}</h3>
      {items.length === 0 && <EmptyState title="No Results Found ." />}
      <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <ProductCard
            key={item.id}
            item={item}
          />
        ))}
      </section>
    </div>
  );
};
export default ProductsList;
