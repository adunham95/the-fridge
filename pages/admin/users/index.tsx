import React from 'react';
import { Avatar } from '../../../components/Avatar/Avatar';
import Card from '../../../components/Layout/Card';
import Modal from '../../../components/Modal/Modal';
import { ModalContainer } from '../../../components/Modal/ModalContainer';
import { useModal } from '../../../components/Modal/ModalContext';
import { BreadCrumb } from '../../../components/nav/BreadCrumb';
import { PageBanner } from '../../../components/Page/PageBanner';

const Users = [
  {
    id: 'Adrian',
    color: '#28B463',
    name: 'Adrian',
    email: 'adunham95@gmail.com',
  },
  {
    id: 'AdrianTest',
    color: '#5B2C6F',
    name: 'Adrian Test',
    email: 'atest@gmail.com',
  },
  {
    id: 'AdrianFridge',
    color: '#884EA0',
    name: 'Adrian Fridge',
    email: 'adrian@fridge.social',
  },
];

function UsersPage() {
  return (
    <>
      <PageBanner title="Users" />
      <main className="pt-2 px-1">
        <BreadCrumb />
        <div className="max-w-[500px] mx-auto">
          {Users.map((u) => (
            <UserItem key={u.id} {...u} />
          ))}
        </div>
      </main>
    </>
  );
}

interface IUserItem {
  id: string;
  color: string;
  name: string;
  email: string;
}

function UserItem({ id, color, name, email }: IUserItem) {
  const { setModalID } = useModal();
  return (
    <>
      <Card
        display="flex"
        padding="p-2"
        margin="mb-1"
        className="w-full"
        onClick={() => setModalID(id)}
      >
        <>
          <Avatar name={name} color={color} height="h-[3em]" width="w-[3em]" />
          <div className="pl-2">
            <p className="font-bold text-left">{name}</p>
            <p className=" text-slate-500 text-xs">{email}</p>
          </div>
        </>
      </Card>
      <Modal id={id} showClose={false} background="light">
        <ModalContainer>
          <h1>User Modal</h1>
        </ModalContainer>
      </Modal>
    </>
  );
}

export default UsersPage;
