
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Package, 
  LogOut, 
  Menu, 
  X 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem('authUser');
    toast({
      title: "Logout realizado",
      description: "Você saiu do sistema com sucesso",
    });
    navigate('/login');
  };

  const menuItems = [
    { 
      icon: LayoutDashboard, 
      label: 'Dashboard', 
      href: '/dashboard',
      onClick: () => navigate('/dashboard')
    },
    { 
      icon: FileText, 
      label: 'Orçamentos', 
      href: '/dashboard/orders',
      onClick: () => navigate('/dashboard/orders')
    },
    { 
      icon: Users, 
      label: 'Clientes', 
      href: '/dashboard/customers',
      onClick: () => navigate('/dashboard/customers')
    },
    { 
      icon: Package, 
      label: 'Materiais', 
      href: '/dashboard/materials',
      onClick: () => navigate('/dashboard/materials')
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar para desktop */}
      <div 
        className={`bg-white border-r border-gray-200 ${
          sidebarOpen ? 'w-64' : 'w-16'
        } transition-all duration-300 ease-in-out hidden md:flex flex-col`}
      >
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          {sidebarOpen ? (
            <div className="font-bold text-xl">Marmoraria Tech</div>
          ) : (
            <div className="font-bold text-xl">MT</div>
          )}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-0 h-8 w-8"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </Button>
        </div>
        <div className="flex flex-col flex-1 py-4">
          {menuItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className={`flex items-center ${sidebarOpen ? 'justify-start px-4' : 'justify-center'} py-2 my-1 mx-2`}
              onClick={item.onClick}
            >
              <item.icon size={20} />
              {sidebarOpen && <span className="ml-3">{item.label}</span>}
            </Button>
          ))}
        </div>
        <div className="p-4 border-t border-gray-200">
          <Button
            variant="ghost"
            className={`flex items-center ${sidebarOpen ? 'justify-start w-full' : 'justify-center'} text-red-500 hover:text-red-600 hover:bg-red-50`}
            onClick={handleLogout}
          >
            <LogOut size={20} />
            {sidebarOpen && <span className="ml-3">Sair</span>}
          </Button>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
        <div className="flex justify-around">
          {menuItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className="flex flex-col items-center py-2"
              onClick={item.onClick}
            >
              <item.icon size={20} />
              <span className="text-xs mt-1">{item.label}</span>
            </Button>
          ))}
          <Button
            variant="ghost"
            className="flex flex-col items-center py-2 text-red-500"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            <span className="text-xs mt-1">Sair</span>
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top header for mobile */}
        <header className="bg-white border-b border-gray-200 p-4 md:hidden">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-xl">Marmoraria Tech</h1>
            <Button 
              variant="ghost" 
              size="sm"
              className="p-0 h-8 w-8"
              onClick={() => {
                const drawer = document.getElementById('mobile-drawer');
                if (drawer) {
                  drawer.classList.toggle('translate-x-0');
                  drawer.classList.toggle('-translate-x-full');
                }
              }}
            >
              <Menu size={20} />
            </Button>
          </div>
        </header>

        {/* Mobile drawer */}
        <div
          id="mobile-drawer"
          className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform -translate-x-full transition-transform duration-300 ease-in-out md:hidden"
        >
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="font-bold text-xl">Menu</h2>
            <Button 
              variant="ghost" 
              size="sm"
              className="p-0 h-8 w-8"
              onClick={() => {
                const drawer = document.getElementById('mobile-drawer');
                if (drawer) {
                  drawer.classList.toggle('-translate-x-full');
                }
              }}
            >
              <X size={18} />
            </Button>
          </div>
          <div className="flex flex-col p-4">
            {menuItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className="flex items-center justify-start px-4 py-2 my-1"
                onClick={() => {
                  item.onClick();
                  const drawer = document.getElementById('mobile-drawer');
                  if (drawer) {
                    drawer.classList.add('-translate-x-full');
                  }
                }}
              >
                <item.icon size={20} />
                <span className="ml-3">{item.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-auto pb-16 md:pb-0">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
