// @flow
import React from 'react';
import { BreadCrumb } from '../../components/nav/BreadCrumb';
import { PageBanner } from '../../components/Page/PageBanner';
import { EUserPermissions } from '../../models/UserModel';
export function EditUserGroups() {
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
EditUserGroups.permissions = [EUserPermissions.IS_ADMIN];

export default EditUserGroups;
