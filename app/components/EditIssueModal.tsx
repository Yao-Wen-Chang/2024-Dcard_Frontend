import { Modal, Button } from "antd";
import IssueForm from "./IssueForm";
import { useForm } from 'antd/lib/form/Form';
import { useEffect, useState } from "react";
import { createIssue } from "../api/github";
import { fetchPostById } from "../api/github";
import { updateIssue } from "../api/github";

interface EditIssueModalProps {
  id: string;
  title: string;
  body: string;
  onEditSubmit: () => void;
}

const EditIssueModal = ({id, title, body, onEditSubmit}: EditIssueModalProps) => {
  const [isOpen, setIsOpen] = useState(false); 
  const [initialValues, setInitialValues] = useState({
    issueId: id,
    title: title,
    content: body
  });
  const [form] = useForm();
  // const [post, setPost] = useState({});
  const handleCancel = () => {
    setIsOpen(false);
  }
  const handleSubmit = async() => {
    const title = form.getFieldValue("title");
    const content = form.getFieldValue("content");
    updateIssue({
      issueId: id,
      title: title,
      body: content
    });
    onEditSubmit();
    setIsOpen(false);
  }


  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Edit Article</Button>
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
        <IssueForm form={form} initialValues={initialValues}/>
      </Modal>  
    </>
  );
};

export default EditIssueModal;