// Import UI components for notifications and tooltips
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

// Import React Query for data fetching and state management
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Import routing components
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import page components
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Create a new QueryClient instance for React Query
const queryClient = new QueryClient();

// Main App component that wraps the entire application
const App = () => (
  // Provide the QueryClient to all child components
  <QueryClientProvider client={queryClient}>
    {/* Enable tooltips throughout the app */}
    <TooltipProvider>
      {/* Add toast notification providers */}
      <Toaster />
      <Sonner />
      
      {/* Set up client-side routing */}
      <BrowserRouter>
        <Routes>
          {/* Home page route */}
          <Route path="/" element={<Index />} />
          
          {/* 
            IMPORTANT: Add all custom routes above this catch-all route
            Any undefined path will show the 404 page 
          */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
