import React, { useState } from 'react';
import { Form, Input, Row, Col, Button, Result } from 'antd';

import initialUserValues from './constants';
import { useCreateUserMutation } from '../../api/endpoints/userEndpoints';
import { User } from '@/shared/types/user.types';
import useModal from '@/hooks/useModal';

type UserFormProps = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddUserModal: React.FC<UserFormProps> = ({ setIsModalOpen }) => {
  const [formData, setFormData] = useState(initialUserValues);
  const [createUser, { isLoading, isError }] = useCreateUserMutation();
  const { notification } = useModal();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onFinish = async (values: User) => {
    await createUser(values);
    setFormData((prev) => ({ ...prev, initialUserValues }));
    setIsModalOpen(false);
    notification.success({
      message: `Done! User ${values.name} created successfully!`,
    });
  };

  if (isError) {
    return <Result status={'error'}> <p></p></Result>;
  }

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input value={formData.name} onChange={onChangeHandler} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="username" label="Username" rules={[{ required: true }]}>
            <Input value={formData.username} onChange={onChangeHandler} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
            <Input value={formData.email} onChange={onChangeHandler} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
            <Input value={formData.phone} onChange={onChangeHandler} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="website" label="Website">
            <Input value={formData.website} onChange={onChangeHandler} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={['company', 'name']} label="Company Name">
            <Input value={formData.company.name} onChange={onChangeHandler} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name={['address', 'street']} label="Street">
            <Input value={formData.address.street} onChange={onChangeHandler} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={['address', 'suite']} label="Suite">
            <Input value={formData.address.suite} onChange={onChangeHandler} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name={['address', 'city']} label="City">
            <Input value={formData.address.city} onChange={onChangeHandler} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={['address', 'zipcode']} label="Zipcode">
            <Input value={formData.address.zipcode} onChange={onChangeHandler} />
          </Form.Item>
        </Col>
      </Row>

      <Button type="primary" htmlType="submit" loading={isLoading}>
        Submit
      </Button>
    </Form>
  );
};

export default AddUserModal;
