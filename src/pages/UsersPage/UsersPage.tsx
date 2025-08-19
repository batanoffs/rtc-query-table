import { Flex } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import UserTable from './components/table/UsersTable';
import { selectSelectedUserId } from '@/store/slices/usersSlicer';
import { UserModalForm } from './components/modal/UserModalForm';

const UsersPage: React.FC = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const selectedUserId = useSelector(selectSelectedUserId);

  return (
    <Flex justify="center" align="center">
      <UserTable setOpen={setOpen} />

      <UserModalForm
        userId={selectedUserId ?? undefined}
        isEditMode={!!selectedUserId}
        isOpen={isOpen}
        setOpen={setOpen}
      />
    </Flex>
  );
};

export default UsersPage;
