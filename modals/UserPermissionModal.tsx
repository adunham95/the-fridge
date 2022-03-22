// @flow
import React, { useEffect, useState } from 'react';
import Modal from '../components/Modal/Modal';
import { ModalContainer } from '../components/Modal/ModalContainer';
import { Button } from '../components/StatelessInput/Button';
import { GroupPermissions } from '../components/StatelessInput/GroupPermissions';

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
    <Modal id={id} className="w-full md:w-3/4 p-2" showClose={false}>
      <ModalContainer>
        <>
          <GroupPermissions
            selectedPermission={devPermissions}
            onChange={changePermissions}
          />
          <div className="pt-1 flex justify-end">
            <Button
              className="bg-rose-500 hover:bg-rose-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              size="sm"
              onClick={clearPermissions}
            >
              Remove All Permissions
            </Button>
          </div>
        </>
      </ModalContainer>
    </Modal>
  );
}

export default UserPermissionModal;
