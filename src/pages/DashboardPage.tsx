
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import DashboardLayout from '@/components/DashboardLayout';

// Dados fictícios para demonstração
const mockOrders = [
  { id: 1, customer: 'João Silva', date: '2023-10-15', status: 'Aberto', value: 'R$ 2.500,00' },
  { id: 2, customer: 'Maria Oliveira', date: '2023-10-14', status: 'Em Andamento', value: 'R$ 3.200,00' },
  { id: 3, customer: 'Carlos Santos', date: '2023-10-12', status: 'Finalizado', value: 'R$ 1.800,00' },
  { id: 4, customer: 'Ana Ferreira', date: '2023-10-10', status: 'Aberto', value: 'R$ 4.100,00' },
];

const statusClass = (status: string) => {
  switch (status) {
    case 'Aberto':
      return 'bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs';
    case 'Em Andamento':
      return 'bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs';
    case 'Finalizado':
      return 'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs';
    default:
      return 'bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs';
  }
};

const DashboardPage = () => {
  const [orders, setOrders] = useState(mockOrders);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Verificar autenticação
    const authUser = localStorage.getItem('authUser');
    if (!authUser) {
      navigate('/login');
      toast({
        title: "Acesso não autorizado",
        description: "Faça login para acessar o dashboard",
        variant: "destructive",
      });
    }
  }, [navigate, toast]);

  return (
    <DashboardLayout>
      <div className="flex flex-col space-y-6 p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Button onClick={() => navigate('/dashboard/new-order')}>
            Novo Orçamento
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Orçamentos Abertos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {orders.filter(order => order.status === 'Aberto').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Em Andamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {orders.filter(order => order.status === 'Em Andamento').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Finalizados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {orders.filter(order => order.status === 'Finalizado').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total de Orçamentos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.length}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Orçamentos Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>#{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                      <span className={statusClass(order.status)}>
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell>{order.value}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => navigate(`/dashboard/orders/${order.id}`)}>
                          Ver
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => navigate(`/dashboard/orders/${order.id}/edit`)}>
                          Editar
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
