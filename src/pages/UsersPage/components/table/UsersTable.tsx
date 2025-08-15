import React, { MouseEventHandler, useState } from 'react';
import { Button, Flex, Result, Table, TableProps } from 'antd';

import TableColumns from './tableColumns';
import { User } from '@/models/types/user.types';
import { useGetUsersQuery } from '@/api/endpoints/userEndpoints';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

type UserTableProps = {
  toggleOpenClose: MouseEventHandler<HTMLElement>;
};

const UserTable: React.FC<UserTableProps> = ({ toggleOpenClose }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { data, isLoading, isError } = useGetUsersQuery();

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
          onClick={toggleOpenClose}
        >
          Add New User
        </Button>

        {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}

        <Table<User>
          rowSelection={rowSelection}
          columns={TableColumns}
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
