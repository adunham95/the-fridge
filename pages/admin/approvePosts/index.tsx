import { useState } from 'react';
import { BreadCrumb } from '../../../components/nav/BreadCrumb';
import { PageBanner } from '../../../components/Page/PageBanner';
import { IPost } from '../../../models/PostModel';
import { EUserPermissions } from '../../../models/UserModel';

const ApprovePosts = () => {
  const [posts, setPosts] = useState<Array<IPost>>([]);

  return (
    <>
      <PageBanner title="Approve Posts" />
      <main className="pt-2 px-1">
        <BreadCrumb />
        <div></div>
      </main>
    </>
  );
};

ApprovePosts.auth = true;
ApprovePosts.permissions = [
  EUserPermissions.IS_ADMIN,
  EUserPermissions.CAN_APPROVE_POSTS,
];

export default ApprovePosts;
