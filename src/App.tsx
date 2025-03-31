
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
import OrderEditPage from "./pages/OrderEditPage";
import CustomersPage from "./pages/CustomersPage";
import CustomerDetailPage from "./pages/CustomerDetailPage";
import MaterialsPage from "./pages/MaterialsPage";
import MaterialDetailPage from "./pages/MaterialDetailPage";
import GaleriaPage from "./pages/GaleriaPage";

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
          <Route path="/galeria" element={<GaleriaPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Páginas do dashboard (protegidas) */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/new-order" element={<NewOrderPage />} />
          <Route path="/dashboard/orders/:id" element={<DashboardPage />} />
          <Route path="/dashboard/orders/:id/edit" element={<OrderEditPage />} />
          <Route path="/dashboard/customers" element={<CustomersPage />} />
          <Route path="/dashboard/customers/new" element={<CustomerDetailPage />} />
          <Route path="/dashboard/customers/:id" element={<CustomerDetailPage />} />
          <Route path="/dashboard/materials" element={<MaterialsPage />} />
          <Route path="/dashboard/materials/new" element={<MaterialDetailPage />} />
          <Route path="/dashboard/materials/:id/edit" element={<MaterialDetailPage />} />
          
          {/* Rota de fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
