import React from 'react';
import { Form, Input, Row, Col, Button, Flex } from 'antd';
import { User } from '@/models/types/user.types';

type CreateEditFormProps = {
  formData: User;
  handleSubmit: React.FormEventHandler<SubmitEvent>;
  onChangeHandler: React.FormEventHandler;
  isLoading: boolean;
  isDisabled: boolean;
};

const UserDataForm: React.FC<CreateEditFormProps> = ({
  formData,
  handleSubmit,
  onChangeHandler,
  isDisabled,
  isLoading,
}) => {
  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item initialValue={formData.name} name="name" label="Name" htmlFor="name" rules={[{ required: true }]}>
            <Input id="name" name="name" value={formData.name} onChange={onChangeHandler} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            initialValue={formData.username}
            name="username"
            label="Username"
            htmlFor="username"
            rules={[{ required: true }]}
          >
            <Input id="username" name="username" value={formData.username} onChange={onChangeHandler} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            initialValue={formData.email}
            name="email"
            label="Email"
            htmlFor="email"
            rules={[{ required: true, type: 'email' }]}
          >
            <Input id="email" name="email" value={formData.email} onChange={onChangeHandler} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            initialValue={formData.phone}
            name="phone"
            label="Phone"
            htmlFor="phone"
            rules={[{ required: true }]}
          >
            <Input id="phone" name="phone" value={formData.phone} onChange={onChangeHandler} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item initialValue={formData.website} name="website" label="Website" htmlFor="website">
            <Input id="website" name="website" value={formData.website} onChange={onChangeHandler} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            initialValue={formData.company?.name}
            name="company.name"
            label="Company Name"
            htmlFor="company.name"
          >
            <Input id="company.name" name="company.name" value={formData.company?.name} onChange={onChangeHandler} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            initialValue={formData.address?.street}
            name="address.street"
            label="Street"
            htmlFor="address.street"
          >
            <Input
              id="address.street"
              name="address.street"
              value={formData.address?.street}
              onChange={onChangeHandler}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item initialValue={formData.address?.suite} name="address.suite" label="Suite" htmlFor="address.suite">
            <Input id="address.suite" name="address.suite" value={formData.address?.suite} onChange={onChangeHandler} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item initialValue={formData.address?.city} name="address.city" label="City" htmlFor="address.city">
            <Input id="address.city" name="address.city" value={formData.address?.city} onChange={onChangeHandler} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            initialValue={formData.address?.zipcode}
            name="address.zipcode"
            label="Zipcode"
            htmlFor="address.zipcode"
          >
            <Input
              id="address.zipcode"
              name="address.zipcode"
              value={formData.address?.zipcode}
              onChange={onChangeHandler}
            />
          </Form.Item>
        </Col>
      </Row>

      <Flex justify="end">
        <Button type="primary" htmlType="submit" disabled={isDisabled} loading={isLoading}>
          Submit
        </Button>
      </Flex>
    </Form>
  );
};

export default UserDataForm;
