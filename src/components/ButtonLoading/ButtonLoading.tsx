import { useState } from 'react';
import { Button, Flex } from 'antd';

const ButtonLoading = ({ handleSubmit, btnText }) => {
  const [loadings, setLoadings] = useState<boolean[]>([]);

  const enterLoading = (index: number) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 3000);

    handleSubmit();
  };

  return (
    <Flex gap="small" align="center" justify="center" wrap>
      <Button type="primary" size="large" loading={loadings[0]} onClick={() => enterLoading(0)}>
        {btnText || 'Handle Submit'}
      </Button>
    </Flex>
  );
};

export default ButtonLoading;
