import React from 'react'
import { Button } from 'antd'
import { closeIssue } from '../api/github'

interface RemoveArticleBtnProps {
  issueId: string;
  onRemove: () => void;
}

const RemoveArticleBtn: React.FC<RemoveArticleBtnProps> = ({issueId, onRemove}) => {
  const handleRemove = () => {
    closeIssue({issueId: issueId});
    onRemove();
  }
  return (
    <Button onClick={handleRemove}>Remove</Button>
  )
}

export default RemoveArticleBtn