import { Form, Input } from "antd";
import { FormInstance } from "antd";

interface issueFormProp {
  form: FormInstance;
}

const IssueForm: React.FC<issueFormProp> = ({form}) => {

  const validateTextLength = (_: any, value: string) => {
    // Validate that the input contains more than thirty words
    const words = value.trim().split(/\s+/);
    if (words.length > 30) {
      return Promise.resolve();
    }

    return Promise.reject('Please enter more than thirty words');
  };

  return (
    
    <Form
      // {...layout}
      name="nest-messages"
      // onFinish={onFinish}
      form={form}
      style={{ maxWidth: 600 }}
      // validateMessages={validateMessages}
    >
      <Form.Item name="title" label="Title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item 
        name="content" 
        label="Content"
        rules={[
          {
            required: true,
            message: 'Please enter text',
          },
          {
            validator: validateTextLength,
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>
    </Form>
  );
};

export default IssueForm;
