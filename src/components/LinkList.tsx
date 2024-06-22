// src/components/LinkList.tsx
import React from 'react';
import LinkItem from './LinkItem';
import { Box } from '@mui/material';

interface Link {
  title: string;
  url: string;
}

interface LinkListProps {
  links: Link[];
}

const LinkList: React.FC<LinkListProps> = ({ links }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2} mt={4}>
      {links.map((link, index) => (
        <LinkItem key={index} title={link.title} url={link.url} />
      ))}
    </Box>
  );
};

export default LinkList;
