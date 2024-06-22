// src/components/LinkItem.tsx
import React from 'react';
import { Button } from '@mui/material';

interface LinkItemProps {
  title: string;
  url: string;
}

const LinkItem: React.FC<LinkItemProps> = ({ title, url }) => {
  return (
    <Button variant="contained" color="primary" href={url} target="_blank" rel="noopener noreferrer" fullWidth>
      {title}
    </Button>
  );
};

export default LinkItem;
