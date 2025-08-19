import React from 'react';
import { Form, Input, Row, Col, Button, Flex } from 'antd';

import { User } from '@/models/types/user.types';

type CreateEditFormProps = {
  formData: User;
  handleSubmit: React.FormEventHandler<SubmitEvent>;
  onChangeHandler: React.FormEventHandler;
  isUserLoading: boolean;
  isDisabled: boolean;
};

const UserDataForm: React.FC<CreateEditFormProps> = ({
  formData,
  handleSubmit,
  onChangeHandler,
  isDisabled,
  isUserLoading,
}) => {
  return (
    <Form
      layout="vertical"
      initialValues={formData}
      onChange={onChangeHandler}
      onFinish={handleSubmit}
      key={formData.id}
    >
      {/* onFinishFailed={onFinishFailed} */}
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="username" label="Username" rules={[{ required: true }]}>
            <Input id="username" name="username" value={formData.username} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="website" label="Website">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={['company', 'name']} label="Company Name">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name={['address', 'street']} label="Street">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={['address', 'suite']} label="Suite">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name={['address', 'city']} label="City">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={['address', 'zipcode']} label="Zipcode">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Flex justify="end">
        <Button type="primary" htmlType="submit" disabled={isDisabled} loading={isUserLoading}>
          Submit
        </Button>
      </Flex>
    </Form>
  );
};

export default UserDataForm;
