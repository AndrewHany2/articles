import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import App from '../../ui/layouts/App';

// Startup the application by rendering the App layout component.
Meteor.startup(() => {
    const container = document.getElementById('react-target');
    const root = createRoot(container!);
    root.render(<App />);
  });
