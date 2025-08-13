import { ChangeEventHandler, FormEventHandler, useEffect } from 'react';
import { Form, Input, Row, Col, Button, FormInstance } from 'antd';

type CreateEditFormProps = {
  form: FormInstance;
  handleSubmit: FormEventHandler<SubmitEvent>;
  initialValues: Object | undefined;
  isLoading: boolean;
  onChange: ChangeEventHandler;
  isDisabled: boolean;
};

const UserDataForm: React.FC<CreateEditFormProps> = ({
  form,
  isDisabled,
  onChange,
  handleSubmit,
  initialValues,
  isLoading,
}) => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);

    handleSubmit;
  };

  // Set initial values when the component mounts
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  return (
    <Form
      name="user-edit"
      initialValues={initialValues}
      onValuesChange={onChange}
      form={form}
      layout="vertical"
      onFinish={onFinish}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="name" label="Name" htmlFor="name" rules={[{ required: true }]}>
            <Input id="name" name="name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="username" label="Username" htmlFor="username" rules={[{ required: true }]}>
            <Input id="username" name="username" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="email"
            label="Email"
            htmlFor="email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input id="email" name="email" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="phone"
            label="Phone"
            htmlFor="phone"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <Input id="phone" name="phone" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="website" label="Website" htmlFor="website">
            <Input id="website" name="website" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={['company', 'name']} label="Company Name" htmlFor="company.name">
            <Input id="company.name" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name={['address', 'street']} label="Street" htmlFor="address.street">
            <Input id="address.street" name="address.street" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={['address', 'suite']} label="Suite" htmlFor="address.suite">
            <Input id="address.suite" name="address.suite" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name={['address', 'city']} label="City" htmlFor="address.city">
            <Input id="address.city" name="address.city" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={['address', 'zipcode']} label="Zipcode" htmlFor="address.zipcode">
            <Input id="address.zipcode" name="address.zipcode" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item shouldUpdate>
        {() => (
          <Button
            style={{ justifySelf: 'end' }}
            type="primary"
            htmlType="submit"
            disabled={isDisabled}
            loading={isLoading}
          >
            Submit
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default UserDataForm;
