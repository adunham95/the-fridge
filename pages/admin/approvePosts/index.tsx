import { useState } from 'react';
import IconEmptyFolder from '../../../components/Icons/Icon-Empty-Folder';
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
        {posts.length > 0 ? (
          <div>All Posts</div>
        ) : (
          <div className="flex items-center flex-col pt-6">
            <h2 className=" text-xl">No Posts To Approve</h2>
            <span className="w-[200px] text-emerald-600">
              <IconEmptyFolder />
            </span>
          </div>
        )}
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
