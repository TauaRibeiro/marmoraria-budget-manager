
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import DashboardLayout from '@/components/DashboardLayout';

// Dados fictícios para demonstração
const mockCustomers = [
  { 
    id: 1, 
    name: 'João Silva', 
    phone: '(11) 98765-4321', 
    email: 'joao@exemplo.com',
    address: 'Rua das Flores, 123 - São Paulo/SP',
    document: '123.456.789-00',
    totalSpent: 'R$ 5.800,00'
  },
  { 
    id: 2, 
    name: 'Maria Oliveira', 
    phone: '(11) 91234-5678', 
    email: 'maria@exemplo.com',
    address: 'Av. Paulista, 1000 - São Paulo/SP',
    document: '987.654.321-00',
    totalSpent: 'R$ 3.200,00'
  },
  { 
    id: 3, 
    name: 'Carlos Santos', 
    phone: '(11) 99876-5432', 
    email: 'carlos@exemplo.com',
    address: 'Rua Augusta, 500 - São Paulo/SP',
    document: '456.789.123-00',
    totalSpent: 'R$ 1.800,00'
  },
];

const CustomersPage = () => {
  const [customers, setCustomers] = useState(mockCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  useEffect(() => {
    // Verificar autenticação
    const authUser = localStorage.getItem('authUser');
    if (!authUser) {
      navigate('/login');
      toast({
        title: "Acesso não autorizado",
        description: "Faça login para acessar o sistema",
        variant: "destructive",
      });
    }
  }, [navigate, toast]);

  const handleDeleteCustomer = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      setCustomers(customers.filter(customer => customer.id !== id));
      toast({
        title: "Cliente excluído",
        description: "O cliente foi excluído com sucesso",
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">Clientes</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-64">
              <Input 
                placeholder="Buscar cliente..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={() => navigate('/dashboard/customers/new')}>
              Novo Cliente
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Total Gasto</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      Nenhum cliente encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.totalSpent}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => navigate(`/dashboard/customers/${customer.id}`)}
                          >
                            Ver e Editar
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleDeleteCustomer(customer.id)}
                            className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                          >
                            Excluir
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CustomersPage;
