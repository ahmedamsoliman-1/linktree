// src/App.tsx
import React from 'react';
import LinkList from './components/LinkList';
import { Container, Typography } from '@mui/material';

const App: React.FC = () => {
  const links = [
    { title: 'Google', url: 'https://www.google.com' },
    { title: 'Facebook', url: 'https://www.facebook.com' },
    { title: 'Twitter', url: 'https://www.twitter.com' },
    // Add more links here
  ];

  return (
    <Container>
      <Typography variant="h2" align="center" gutterBottom>
        Ahmed Ali Moh Soliman
      </Typography>
      <LinkList links={links} />
    </Container>
  );
};

export default App;
