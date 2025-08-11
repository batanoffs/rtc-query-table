import React, { useState } from 'react';
import { Button, Flex, Table, TableProps } from 'antd';

import TableColumns from './tableColumns';
import { useGetUsersQuery } from '../../api/endpoints/userEndpoints';
import { User } from '@/pages/UsersPage/types/user.types';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

const UserTable = ({ showModal }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { data, error, isLoading } = useGetUsersQuery();

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<User> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <>
      <Flex gap="middle" align="flex-end" justify="flex-end" style={{ marginBottom: '16px' }}>
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
        <Button type="primary" onClick={showModal}>
          Create New User
        </Button>
      </Flex>

      <Table<User>
        rowSelection={rowSelection}
        columns={TableColumns}
        dataSource={data}
        loading={isLoading}
        pagination={{ position: ['bottomCenter'], pageSize: 5, showSizeChanger: true }}
        rowKey="id"
      />
    </>
  );
};

export default UserTable;
