import React, { useState } from 'react';
import { Button, Flex, Table } from 'antd';
import type { TableProps } from 'antd';

import TableColumns from './tableColumns';
import { IUser } from '@/types/user.types';
import { useGetUsersQuery } from '../../api/endpoints/userEndpoints';
// import dataSource from './mockdata';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

const UserTable = ({ showModal }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const { data, error, isLoading } = useGetUsersQuery();

  const start = () => {
    setLoading(true);
    // ajax request after empty completing

    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<IUser> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <>
      <Flex gap="middle" align="flex-end" justify="flex-end" style={{ marginBottom: '16px' }}>
        <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
          Reload
        </Button>

        <Button type="primary" onClick={showModal}>
          Create New User
        </Button>
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
      </Flex>

      <Table<IUser>
        rowSelection={rowSelection}
        columns={TableColumns}
        dataSource={data}
        pagination={{ position: ['bottomCenter'], pageSize: 5, showSizeChanger: true }}
        rowKey="id"
      />
    </>
  );
};

export default UserTable;
