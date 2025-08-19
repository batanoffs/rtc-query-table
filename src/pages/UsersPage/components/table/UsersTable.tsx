import React, { useState } from 'react';
import { Button, Flex, Result, Table, TableProps } from 'antd';

import { User } from '@/models/types/user.types';
import { useGetUsersQuery } from '@/api/endpoints/userEndpoints';
import getTableColumns from './tableColumns';
import { useDispatch } from 'react-redux';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

type UserTableProps = {
  setOpen: (state: boolean) => void;
};

const UserTable: React.FC<UserTableProps> = ({ setOpen }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { data, isLoading, isError } = useGetUsersQuery();
  const dispatch = useDispatch();

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<User> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  if (isError) {
    return (
      <Result
        status="error"
        title="There are some problems with your operation."
        extra={
          <Button type="primary" key="console">
            Go Console
          </Button>
        }
      />
    );
  }

  return (
    <Flex vertical justify="center" align="center">
      <Flex vertical justify="center">
        <Button
          type="primary"
          style={{ maxWidth: '10em', alignSelf: 'end', marginBottom: '1em' }}
          onClick={() => setOpen(true)}
        >
          Add New User
        </Button>

        {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}

        <Table<User>
          rowSelection={rowSelection}
          columns={getTableColumns({ setOpen, dispatch })}
          dataSource={data}
          loading={isLoading}
          pagination={{ position: ['bottomCenter'], pageSize: 10, showSizeChanger: true }}
          rowKey="id"
        />
      </Flex>
    </Flex>
  );
};

export default UserTable;
