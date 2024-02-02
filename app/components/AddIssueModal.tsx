import { Modal, Button } from "antd";
import IssueForm from "./IssueForm";
import { useForm } from 'antd/lib/form/Form';
import { useState } from "react";
import { createIssue } from "../api/github";

const AddIssueModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const [form] = useForm();

  const handleCancel = () => {
    setIsOpen(false);
  }
  const handleSubmit = async() => {
    const title = form.getFieldValue("title");
    const content = form.getFieldValue("content");
    createIssue({
      title,
      content,
      owner: "Yao-Wen-Chang",
      repo: "2024-Dcard_Frontend"
    });
    setIsOpen(false);

  }
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Add Article</Button>
      <Modal
        title="Title"
        open={isOpen}
        // onOk={handleOk}
        // confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" type="primary" onClick={handleSubmit}>
            Submit
          </Button>,
        ]}
      >
        <IssueForm form={form}/>
      </Modal>  
    </>
  );
};

export default AddIssueModal;