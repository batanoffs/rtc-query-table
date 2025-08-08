import React from 'react';
import { IUser } from '@/types/user.types';
import { EditUserModal } from './modal/EditUserModal';
import { DeleteUserModal } from './modal/DeleteUserModal';

type TableColumn = {
  title: string;
  dataIndex?: keyof IUser;
  key: string;
  // TODO check if needed at all
  render?: (text: string, record: IUser) => React.ReactNode;
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
    render: (_: string, record: IUser) => record.address?.street || 'N/A',
  },
  {
    title: 'Suite',
    key: 'suite',
    render: (_: string, record: IUser) => record.address?.suite || 'N/A',
  },
  {
    title: 'City',
    key: 'city',
    render: (_: string, record: IUser) => record.address?.city || 'N/A',
  },
  {
    title: 'Zipcode',
    key: 'zipcode',
    render: (_: string, record: IUser) => record.address?.zipcode || 'N/A',
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
    render: (_: string, record: IUser) => {
      return record.company && typeof record.company === 'object' && 'name' in record.company
        ? (record.company as { name: string }).name
        : 'N/A';
    },
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (_, rowData) => (
      // onClick={(e) => e.stopPropagation()}
      <div style={{ display: 'flex', gap: '8px' }}>
        <EditUserModal rowData={rowData} />
        <DeleteUserModal userId={rowData.id} />
      </div>
    ),
  },
];

export default TableColumns;
