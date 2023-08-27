import { Outlet, useNavigation } from 'react-router-dom';
import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  useAuth,
  useOrganizationList,
} from '@clerk/clerk-react';
import { Navbar } from '@/components/Dashboard';
import Loader from '@/components/ui/Loader';
import Container from '@/components/ui/Container';
import Heading from '@/components/ui/Heading';
import { AlertTriangle } from 'lucide-react';

const organizationId = import.meta.env.VITE_ORGANIZATION_ID;

const DashboardLayout = () => {
  const navigation = useNavigation();
  const { userId } = useAuth();
  const { organizationList, isLoaded } = useOrganizationList();
  const isLoading = navigation.state === 'loading';

  const currentOrg =
    isLoaded &&
    organizationList?.find((org) => org.organization.id === organizationId);

  const isAllowed =
    isLoaded &&
    organizationList?.length &&
    currentOrg?.membership?.role === 'admin';

  if (!isAllowed && userId) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Heading
          title="Unauthorized"
          description="Unauthorized to access admin dashboard"
          icon={
            <AlertTriangle
              size={30}
              color="red"
            />
          }
          center
        />
      </div>
    );
  }

  return (
    <Container>
      {isLoading && <Loader isLoading={isLoading} />}
      <SignedIn>
        {isAllowed && (
          <>
            <Navbar />
            <Outlet />
          </>
        )}
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </Container>
  );
};

export default DashboardLayout;
