import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Filter = ({ data, name, valueKey }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedValue = searchParams.get(valueKey);

  const onClick = (id) => {
    const current = Object.fromEntries(searchParams.entries());

    const query = {
      ...current,
      [valueKey]: id,
    };

    if (current[valueKey] === id) {
      delete query[valueKey];
    }
    setSearchParams(query);
  };

  const dataExist = data?.length !== 0;

  if (!dataExist) return null;

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold">{name}</h3>
      <hr className="my-4" />
      <div className="flex flex-wrap gap-4">
        {data?.map((filter) => (
          <div
            key={filter.id}
            className="flex items-center">
            <Button
              variant={`${selectedValue === filter.id ? 'default' : 'outline'}`}
              className="rounded-md text-sm p-2 border border-gray-300"
              onClick={() => onClick(filter.id)}>
              {filter.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
