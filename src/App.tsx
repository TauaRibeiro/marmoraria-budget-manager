
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import OrcamentoPage from "./pages/OrcamentoPage";
import ContatoPage from "./pages/ContatoPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import NewOrderPage from "./pages/NewOrderPage";
import CustomersPage from "./pages/CustomersPage";
import MaterialsPage from "./pages/MaterialsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Páginas públicas */}
          <Route path="/" element={<Index />} />
          <Route path="/orcamento" element={<OrcamentoPage />} />
          <Route path="/contato" element={<ContatoPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Páginas do dashboard (protegidas) */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/new-order" element={<NewOrderPage />} />
          <Route path="/dashboard/orders/:id" element={<DashboardPage />} />
          <Route path="/dashboard/orders/:id/edit" element={<DashboardPage />} />
          <Route path="/dashboard/customers" element={<CustomersPage />} />
          <Route path="/dashboard/customers/new" element={<CustomersPage />} />
          <Route path="/dashboard/customers/:id" element={<CustomersPage />} />
          <Route path="/dashboard/customers/:id/edit" element={<CustomersPage />} />
          <Route path="/dashboard/materials" element={<MaterialsPage />} />
          <Route path="/dashboard/materials/new" element={<MaterialsPage />} />
          <Route path="/dashboard/materials/:id/edit" element={<MaterialsPage />} />
          
          {/* Rota de fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
