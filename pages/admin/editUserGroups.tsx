// @flow
import React from 'react';
import { BreadCrumb } from '../../components/nav/BreadCrumb';
import { PageBanner } from '../../components/Page/PageBanner';
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

export default EditUserGroups;
