
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
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

const CustomerDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isNewCustomer = id === 'new';
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    document: '',
  });
  
  const [isLoading, setIsLoading] = useState(false);

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
      return;
    }

    // Carregar dados do cliente se não for um novo cliente
    if (!isNewCustomer) {
      const customer = mockCustomers.find(c => c.id === parseInt(id || '0'));
      if (customer) {
        setFormData({
          name: customer.name,
          phone: customer.phone,
          email: customer.email,
          address: customer.address,
          document: customer.document,
        });
      } else {
        toast({
          title: "Cliente não encontrado",
          description: "O cliente solicitado não foi encontrado",
          variant: "destructive",
        });
        navigate('/dashboard/customers');
      }
    }
  }, [id, isNewCustomer, navigate, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulação de envio de dados - será substituído pela integração real
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: isNewCustomer ? "Cliente cadastrado" : "Cliente atualizado",
        description: isNewCustomer 
          ? "O cliente foi cadastrado com sucesso" 
          : "Os dados do cliente foram atualizados com sucesso",
      });
      
      navigate('/dashboard/customers');
    } catch (error) {
      toast({
        title: "Erro",
        description: isNewCustomer 
          ? "Ocorreu um erro ao cadastrar o cliente" 
          : "Ocorreu um erro ao atualizar o cliente",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            {isNewCustomer ? 'Novo Cliente' : 'Editar Cliente'}
          </h1>
          <Button variant="outline" onClick={() => navigate('/dashboard/customers')}>
            Voltar
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Informações do Cliente</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="document">CPF/CNPJ</Label>
                  <Input
                    id="document"
                    name="document"
                    value={formData.document}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Endereço Completo</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/dashboard/customers')}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Salvando..." : "Salvar Cliente"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CustomerDetailPage;
