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

      {/* <Flex gap="small" wrap>
        <Button type="primary" loading={loadings[0]} onClick={() => enterLoading(0)}>
          Icon Start
        </Button>
        <Button type="primary" loading={loadings[2]} onClick={() => enterLoading(2)} iconPosition="end">
          Icon End
        </Button>
        <Button type="primary" icon={<PoweroffOutlined />} loading={loadings[1]} onClick={() => enterLoading(1)}>
          Icon Replace
        </Button>
        <Button type="primary" icon={<PoweroffOutlined />} loading={loadings[3]} onClick={() => enterLoading(3)} />
        <Button
          type="primary"
          icon={<PoweroffOutlined />}
          loading={loadings[3] && { icon: <SyncOutlined spin /> }}
          onClick={() => enterLoading(3)}
        >
          Loading Icon
        </Button>
      </Flex> */}
    </Flex>
  );
};

export default ButtonLoading;
