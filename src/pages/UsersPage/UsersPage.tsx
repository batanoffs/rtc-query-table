import { Flex } from 'antd';
import { useState } from 'react';

type UsersPageProps = {
  table: React.ComponentType<{ toggleOpenClose: () => void }>;
  createButton: React.ComponentType<{ toggleOpenClose: () => void; isOpen: boolean }>;
};

const UsersPage: React.FC<UsersPageProps> = ({ table: TableComponent, createButton: CreateUserComponent }) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const toggleOpenClose = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Flex justify="center" align="center">
      <TableComponent toggleOpenClose={toggleOpenClose} />
      <CreateUserComponent toggleOpenClose={toggleOpenClose} isOpen={isOpen} />
    </Flex>
  );
};

export default UsersPage;
