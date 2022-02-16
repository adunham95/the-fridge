import { useSession } from 'next-auth/react';
import Layout from '../../components/Layout/Layout';
import { PageBanner } from '../../components/Page/PageBanner';
import { Select } from '../../components/StatelessInput/Select';
import { EUserPermissions } from '../../models/UserModel';

const Timeline = () => {
  const { data: session } = useSession();
  const myUser = session?.user;

  return (
    <div>
      <PageBanner title="Timeline" />
    </div>
  );
};

Timeline.auth = true;
Timeline.permissions = [EUserPermissions.CAN_VIEW_POST];

export default Timeline;
