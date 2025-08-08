import { Form, Input, Row, Col } from 'antd';
import { IUser } from '@/types/user.types';
import { FormInstance } from 'antd/lib/form';

interface UserFormProps {
  form: FormInstance;
  initialValues: IUser;
}

const UserForm = ({ form, initialValues }: UserFormProps) => {
  // Debugging: Log the form and initial values to console
  console.log('Edit data:', {
    form,
    initialValues,
  });

  return (
    <Form form={form} layout="vertical" initialValues={initialValues}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="username" label="Username" rules={[{ required: true }]}>
            <Input />
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
    </Form>
  );
};

export default UserForm;
