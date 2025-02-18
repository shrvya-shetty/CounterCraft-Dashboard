import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill'; // Install react-quill (npm install react-quill)
import 'react-quill/dist/quill.snow.css'; // import styles for the editor
import { Box, Button } from '@mui/material';

const RichTextEditor: React.FC = () => {
  const [editorContent, setEditorContent] = useState<string>('');

  // Load saved content from localStorage on component mount
  useEffect(() => {
    const savedContent = localStorage.getItem('editorContent');
    if (savedContent) {
      setEditorContent(savedContent);
    }
  }, []);

  const handleChange = (value: string) => {
    setEditorContent(value);
    localStorage.setItem('editorContent', value); // Persistence
  };

  return (
    <Box sx={{ padding: 2 }}>
      <ReactQuill
        value={editorContent}
        onChange={handleChange}
        modules={{
          toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['bold', 'italic', 'underline'],
            ['link'],
            ['image'],
            [{ 'align': [] }],
            ['clean']
          ]
        }}
      />
      <Button variant="contained" onClick={() => alert(editorContent)}>
        Show Content
      </Button>
    </Box>
  );
};

export default RichTextEditor;
