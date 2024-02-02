import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return <ReactMarkdown rehypePlugins={[gfm]}>{content}</ReactMarkdown>;
};

export default MarkdownRenderer;