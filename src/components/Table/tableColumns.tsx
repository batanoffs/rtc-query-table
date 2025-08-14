import React, { useState } from 'react';

import { EditUserModal } from '../Modal/EditUserModal';
import { DeleteUserModal } from '../Modal/DeleteUserModal';
import { User } from '@/shared/types/user.types';
import { Button } from 'antd';
import { EditFilled } from '@ant-design/icons';
import { useModalState } from '@/hooks/useModalState';

type TableColumn = {
  title: string;
  dataIndex?: keyof User;
  key: string;
  render?: (text: string, record: User) => React.ReactNode;
};

const TableColumns: TableColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Street',
    key: 'street',
    render: (_: string, record: User) => record.address?.street || 'N/A',
  },
  {
    title: 'Suite',
    key: 'suite',
    render: (_: string, record: User) => record.address?.suite || 'N/A',
  },
  {
    title: 'City',
    key: 'city',
    render: (_: string, record: User) => record.address?.city || 'N/A',
  },
  {
    title: 'Zipcode',
    key: 'zipcode',
    render: (_: string, record: User) => record.address?.zipcode || 'N/A',
  },

  {
    title: 'Website',
    dataIndex: 'website',
    key: 'website',
  },
  {
    title: 'Company',
    dataIndex: 'company',
    key: 'company',
    render: (_: string, record: User) => {
      return record.company && typeof record.company === 'object' && 'name' in record.company
        ? (record.company as { name: string }).name
        : 'N/A';
    },
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (_, rowData) => {
      const { modalProps } = useModalState();

      return (
        <div style={{ display: 'flex', gap: '8px' }} onClick={(e) => e.stopPropagation()}>
          {/* <EditUserModal userId={rowData.id} /> */}
          <Button icon={<EditFilled />} onClick={modalProps.toggleModal}>
            {/* loading={isUserLoading}  */}
            Edit
          </Button>
          <DeleteUserModal userId={rowData.id} userName={rowData.name} />
        </div>
      );
    },
  },
];

export default TableColumns;
