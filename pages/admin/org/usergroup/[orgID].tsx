// @flow
import { useManualQuery } from 'graphql-hooks';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { BreadCrumb } from '../../../../components/nav/BreadCrumb';
import { PageBanner } from '../../../../components/Page/PageBanner';
import { GET_GROUPS_BY_ORG_QUERY } from '../../../../graphql/query/getGroupsByOrg';
import { GET_USERS_BY_ORG } from '../../../../graphql/query/getUsersByOrg';

const Admin_Query = `
query GetGroupsByOrg($ids:[String!]){
  ${GET_GROUPS_BY_ORG_QUERY}
  ${GET_USERS_BY_ORG}
}
`;

export function EditUserGroups() {
  const { query } = useRouter();
  const [fetchAdminData, { loading }] = useManualQuery(Admin_Query);

  useEffect(() => {
    console.log(query);
  }, [query]);

  return (
    <div>
      <PageBanner title="Edit Org Group" />
      <main className="pt-2 px-2">
        <BreadCrumb />
      </main>
    </div>
  );
}

EditUserGroups.Auth = true;

export default EditUserGroups;
