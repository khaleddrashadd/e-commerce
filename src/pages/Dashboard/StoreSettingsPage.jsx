import { useLoaderData } from 'react-router-dom';
import SettingsForm from '@/components/Dashboard/settings/SettingsForm';
const StoreSettingsPage = () => {
  const store = useLoaderData();

  return (
    <div className="flex flex-col p-8 pt-6 gap-4">
      <SettingsForm store={store} />
    </div>
  );
};
export default StoreSettingsPage;
