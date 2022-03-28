// @flow
import { useManualQuery, useMutation } from 'graphql-hooks';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Loader } from '../../../../components/Loader/Loader';
import { BreadCrumb } from '../../../../components/nav/BreadCrumb';
import { PageBanner } from '../../../../components/Page/PageBanner';
import {
  Button,
  EButtonStyle,
} from '../../../../components/StatelessInput/Button';
import { GroupPermissions } from '../../../../components/StatelessInput/GroupPermissions';
import { Input } from '../../../../components/StatelessInput/Input';
import { useToast } from '../../../../components/Toast/ToastContext';
import { UPDATE_ORG_GROUP } from '../../../../graphql/mutation/updateGroup';
import { GET_GROUP_BY_ID } from '../../../../graphql/query/getGroupByID';
import { IGroup } from '../../../../models/OrgModel';
import { EUserPermissions } from '../../../../models/UserModel';
import theme from '../../../../theme/theme.json';

function SingleGroupPage() {
  const [fetchGroup, { loading }] = useManualQuery(GET_GROUP_BY_ID);
  const [updateGroup, setUpdateGroup] = useMutation(UPDATE_ORG_GROUP);
  const { query } = useRouter();
  const { addToast } = useToast();
  const [groupData, setGroupData] = useState<IGroup>();

  useEffect(() => {
    if (query.groupID !== undefined && !Array.isArray(query.groupID)) {
      console.log(query.groupID);
      getGroupData(query.groupID);
    }
  }, [query.groupID]);

  async function getGroupData(groupID: string) {
    const { data, error } = await fetchGroup({
      variables: {
        id: groupID,
      },
    });
    if (error) {
      console.error(error);
      addToast('Error Loading Data', theme.BASE_COLOR.error);
    }
    if (data?.getGroupByID) {
      console.log(data);
      setGroupData(data.getGroupByID);
    }
  }

  function changePermissions(permString: string) {
    const updatedGroup = { id: '', name: '', permissions: [], ...groupData };
    let newPermissions = [...(updatedGroup.permissions || [])];
    if (newPermissions.includes(permString)) {
      newPermissions = newPermissions.filter((g) => g !== permString);
    } else if (!newPermissions.includes(permString)) {
      newPermissions = [...newPermissions, permString];
    }
    updatedGroup.permissions = newPermissions;
    setGroupData(updatedGroup);
  }

  function changeName(permString: string) {
    const updatedGroup = { id: '', name: '', permissions: [], ...groupData };
    updatedGroup.name = permString;
    setGroupData(updatedGroup);
  }

  async function saveGroup() {
    const updatedGroup = {
      updatedGroup: {
        id: groupData?.id,
        name: groupData?.name,
        permissions: groupData?.permissions,
      },
    };

    const { data, error } = await updateGroup({
      variables: updatedGroup,
    });

    console.log(data);

    if (data) {
      addToast(
        `Group ${data.updateGroup.name} updated`,
        theme.BASE_COLOR.success,
      );
    }
    if (error) {
      console.log('Create Group Error', error);
      addToast(`There was an issue updating the group`, theme.BASE_COLOR.error);
    }
  }

  return (
    <div>
      <PageBanner
        title={`Edit ${groupData?.name ? `${groupData?.name} Group` : 'Group'}`}
      />
      <main className="pb-2 px-2 relative">
        <BreadCrumb />
        {loading && (
          <div className="flex justify-center w-full absolute top-3 left-0 z-10">
            <Loader />
          </div>
        )}
        <Input
          id="Groupname"
          label="Group Name"
          value={groupData?.name ? groupData.name : ''}
          onChange={changeName}
        />
        <GroupPermissions
          selectedPermission={groupData?.permissions || []}
          onChange={changePermissions}
        />
        {groupData?.permissions.includes(EUserPermissions.IS_ADMIN) && (
          <div className="bg-yellow-400 text-black p-2 rounded text-sm mt-1">
            This group has admin privileges
          </div>
        )}
        {!groupData?.permissions.includes(EUserPermissions.CAN_VIEW_POST) && (
          <div className="bg-red-400 text-white p-2 rounded text-sm mt-1">
            This group cannot view posts
          </div>
        )}
        <div className="pt-2 flex justify-end">
          <Button onClick={saveGroup} buttonStyle={EButtonStyle.SUCCESS}>
            Save
          </Button>
        </div>
      </main>
    </div>
  );
}

export default SingleGroupPage;
