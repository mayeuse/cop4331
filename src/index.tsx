import React from 'react';
import '@/styles/global.css';
import { createRoot } from 'react-dom/client';
import { Root } from '@/Root.tsx';

createRoot(document.getElementById('root')!)
  .render(
      <Root/>
  );




