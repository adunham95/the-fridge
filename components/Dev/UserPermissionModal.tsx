// @flow
import React, { useEffect, useState } from 'react';
import Modal from '../Modal/Modal';
import { Button } from '../StatelessInput/Button';
import { GroupPermissions } from '../StatelessInput/GroupPermissions';
type Props = {
  id: string,
};
function UserPermissionModal({ id }: Props) {
  const localStorageName = 'devPermissions';
  const [devPermissions, setDevPermissions] = useState<Array<string>>([]);

  useEffect(() => {
    const devPermissions = localStorage.getItem(localStorageName) || '';
    console.log(devPermissions);
    if (devPermissions !== '') {
      setDevPermissions(JSON.parse(devPermissions));
    }
  }, []);

  function changePermissions(permString: string) {
    let newPermissions = [...(devPermissions || [])];
    if (newPermissions.includes(permString)) {
      newPermissions = newPermissions.filter((g) => g !== permString);
    } else if (!newPermissions.includes(permString)) {
      newPermissions = [...newPermissions, permString];
    }
    localStorage.setItem(localStorageName, JSON.stringify(newPermissions));
    setDevPermissions(newPermissions);
  }

  function clearPermissions() {
    setDevPermissions([]);
    localStorage.removeItem(localStorageName);
  }

  return (
    <Modal id={id} className="bg-white w-3/4 p-2 rounded-md shadow-2xl">
      <>
        <GroupPermissions
          selectedPermission={devPermissions}
          onChange={changePermissions}
        />
        <div className="pt-1">
          <Button
            className="bg-red-600 text-white"
            size="sm"
            onClick={clearPermissions}
          >
            Remove Permissions
          </Button>
        </div>
      </>
    </Modal>
  );
}

export default UserPermissionModal;
