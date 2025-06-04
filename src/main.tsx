// Import necessary modules
import { createRoot } from 'react-dom/client'  // For rendering React components
import App from './App.tsx'  // Main App component
import './index.css'  // Global styles

// Create a root element and render the App component inside it
// The '!' tells TypeScript that getElementById will not return null
createRoot(document.getElementById("root")!).render(<App />);
