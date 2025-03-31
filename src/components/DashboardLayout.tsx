
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Package, 
  LogOut, 
  Menu, 
  X,
  Tags,
  ChevronRight,
  Bell,
  Settings,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem('authUser');
    toast({
      title: "Logout realizado",
      description: "Você saiu do sistema com sucesso",
    });
    navigate('/login');
  };

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
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
      href: '/dashboard',
      onClick: () => navigate('/dashboard')
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
    { 
      icon: Tags, 
      label: 'Status', 
      href: '/dashboard/status',
      onClick: () => navigate('/dashboard/status')
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar para desktop */}
      <div 
        className={`bg-white border-r border-gray-100 ${
          sidebarOpen ? 'w-64' : 'w-20'
        } transition-all duration-300 ease-in-out hidden md:flex flex-col`}
      >
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          {sidebarOpen ? (
            <div className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">StoneWorks</div>
          ) : (
            <div className="font-bold text-xl text-primary">SW</div>
          )}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-0 h-8 w-8 text-gray-500 hover:text-primary"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </Button>
        </div>
        
        {sidebarOpen && (
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar..."
                className="w-full pl-9 h-9 bg-gray-50 border-gray-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        )}
        
        <div className="flex flex-col flex-1 py-4 overflow-y-auto">
          <div className="space-y-1 px-3">
            {menuItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className={`flex items-center ${sidebarOpen ? 'justify-start px-4' : 'justify-center'} py-2 w-full ${
                  isActive(item.href) 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                }`}
                onClick={item.onClick}
              >
                <item.icon size={20} />
                {sidebarOpen && <span className="ml-3 font-medium">{item.label}</span>}
                {sidebarOpen && isActive(item.href) && <ChevronRight className="ml-auto h-4 w-4" />}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-100">
          <Button
            variant="ghost"
            className={`flex items-center ${sidebarOpen ? 'justify-start w-full' : 'justify-center'} text-red-500 hover:text-red-600 hover:bg-red-50`}
            onClick={handleLogout}
          >
            <LogOut size={20} />
            {sidebarOpen && <span className="ml-3 font-medium">Sair</span>}
          </Button>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-10">
        <div className="flex justify-around">
          {menuItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className={`flex flex-col items-center py-2 ${
                isActive(item.href) 
                  ? 'text-primary' 
                  : 'text-gray-600 hover:text-primary'
              }`}
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
        {/* Top header for desktop and mobile */}
        <header className="bg-white border-b border-gray-100 p-4 flex justify-between items-center">
          <div className="flex items-center md:hidden">
            <Button 
              variant="ghost" 
              size="sm"
              className="p-0 h-10 w-10 text-gray-600 mr-3"
              onClick={() => {
                const drawer = document.getElementById('mobile-drawer');
                if (drawer) {
                  drawer.classList.toggle('translate-x-0');
                  drawer.classList.toggle('-translate-x-full');
                }
              }}
            >
              <Menu size={24} />
            </Button>
            <h1 className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">StoneWorks</h1>
          </div>
          
          {/* Search bar - hidden on small screens */}
          <div className="hidden md:flex items-center w-1/3 ml-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar..."
                className="w-full pl-10 h-10 bg-gray-50 border-gray-200"
              />
            </div>
          </div>
          
          {/* User actions */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-gray-600">
              <Bell size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-600">
              <Settings size={20} />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="hidden md:flex items-center gap-2 text-gray-600 hover:text-primary"
            >
              <span>Sair</span>
              <LogOut size={16} />
            </Button>
          </div>
        </header>

        {/* Mobile drawer */}
        <div
          id="mobile-drawer"
          className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 transform -translate-x-full transition-transform duration-300 ease-in-out md:hidden"
        >
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <h2 className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">StoneWorks</h2>
            <Button 
              variant="ghost" 
              size="sm"
              className="p-0 h-8 w-8 text-gray-600"
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
          
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar..."
                className="w-full pl-10 h-10 bg-gray-50 border-gray-200"
              />
            </div>
          </div>
          
          <div className="flex flex-col p-4 space-y-1">
            {menuItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className={`flex items-center justify-start px-4 py-2 w-full ${
                  isActive(item.href) 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                }`}
                onClick={() => {
                  item.onClick();
                  const drawer = document.getElementById('mobile-drawer');
                  if (drawer) {
                    drawer.classList.add('-translate-x-full');
                  }
                }}
              >
                <item.icon size={20} />
                <span className="ml-3 font-medium">{item.label}</span>
                {isActive(item.href) && <ChevronRight className="ml-auto h-4 w-4" />}
              </Button>
            ))}
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-auto pb-16 md:pb-0 dashboard-gradient">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
