
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

// Dados fictícios para demonstração
const mockCustomers = [
  { id: 1, name: 'João Silva', phone: '(11) 98765-4321', email: 'joao@exemplo.com' },
  { id: 2, name: 'Maria Oliveira', phone: '(11) 91234-5678', email: 'maria@exemplo.com' },
  { id: 3, name: 'Carlos Santos', phone: '(11) 99876-5432', email: 'carlos@exemplo.com' },
];

const mockMaterials = [
  { id: 1, name: 'Mármore Carrara', type: 'Mármore', price: 350.00, stock: 50 },
  { id: 2, name: 'Granito Preto São Gabriel', type: 'Granito', price: 280.00, stock: 35 },
  { id: 3, name: 'Quartzo Branco', type: 'Quartzo', price: 420.00, stock: 25 },
];

const NewOrderPage = () => {
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedMaterials, setSelectedMaterials] = useState<{ id: string; quantity: number }[]>([]);
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [status, setStatus] = useState('Aberto');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

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

  const addMaterial = () => {
    setSelectedMaterials([...selectedMaterials, { id: '', quantity: 1 }]);
  };

  const removeMaterial = (index: number) => {
    const updatedMaterials = [...selectedMaterials];
    updatedMaterials.splice(index, 1);
    setSelectedMaterials(updatedMaterials);
  };

  const updateMaterial = (index: number, field: 'id' | 'quantity', value: string | number) => {
    const updatedMaterials = [...selectedMaterials];
    updatedMaterials[index] = { 
      ...updatedMaterials[index], 
      [field]: value 
    };
    setSelectedMaterials(updatedMaterials);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulação de envio de dados - será substituído pela integração real
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Orçamento criado",
        description: "O orçamento foi criado com sucesso",
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Erro ao criar orçamento",
        description: "Ocorreu um erro ao tentar criar o orçamento",
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
          <h1 className="text-2xl font-bold">Novo Orçamento</h1>
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            Voltar
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Informações do Orçamento</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Cliente */}
              <div className="space-y-2">
                <Label htmlFor="customer">Cliente</Label>
                <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCustomers.map(customer => (
                      <SelectItem key={customer.id} value={customer.id.toString()}>
                        {customer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button 
                  type="button" 
                  variant="link" 
                  className="p-0 h-auto" 
                  onClick={() => navigate('/dashboard/customers/new')}
                >
                  + Adicionar novo cliente
                </Button>
              </div>

              {/* Materiais */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Materiais</Label>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={addMaterial}
                  >
                    + Adicionar Material
                  </Button>
                </div>
                
                {selectedMaterials.length === 0 && (
                  <div className="text-sm text-muted-foreground py-2">
                    Nenhum material selecionado. Clique em "+ Adicionar Material" para começar.
                  </div>
                )}

                {selectedMaterials.map((material, index) => (
                  <div key={index} className="grid grid-cols-12 gap-4 items-end py-2 border-b border-gray-100">
                    <div className="col-span-5">
                      <Label htmlFor={`material-${index}`}>Material</Label>
                      <Select 
                        value={material.id} 
                        onValueChange={(value) => updateMaterial(index, 'id', value)}
                      >
                        <SelectTrigger id={`material-${index}`}>
                          <SelectValue placeholder="Selecione um material" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockMaterials.map(m => (
                            <SelectItem key={m.id} value={m.id.toString()}>
                              {m.name} - R$ {m.price.toFixed(2)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-3">
                      <Label htmlFor={`quantity-${index}`}>Quantidade</Label>
                      <Input
                        id={`quantity-${index}`}
                        type="number"
                        min="1"
                        value={material.quantity}
                        onChange={(e) => updateMaterial(index, 'quantity', parseInt(e.target.value))}
                      />
                    </div>
                    <div className="col-span-3">
                      <Label>Subtotal</Label>
                      <div className="h-10 flex items-center px-3 border border-input rounded-md bg-background text-foreground">
                        {material.id && mockMaterials.find(m => m.id.toString() === material.id) 
                          ? `R$ ${(mockMaterials.find(m => m.id.toString() === material.id)!.price * material.quantity).toFixed(2)}`
                          : '-'
                        }
                      </div>
                    </div>
                    <div className="col-span-1">
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => removeMaterial(index)}
                      >
                        Remover
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Descrição */}
              <div className="space-y-2">
                <Label htmlFor="description">Descrição do Projeto</Label>
                <textarea
                  id="description"
                  className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Descreva os detalhes do projeto..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Valor e Data */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="value">Valor Estimado (R$)</Label>
                  <Input
                    id="value"
                    type="text"
                    placeholder="0,00"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deliveryDate">Data de Entrega</Label>
                  <Input
                    id="deliveryDate"
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                  />
                </div>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Aberto">Aberto</SelectItem>
                    <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                    <SelectItem value="Finalizado">Finalizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Botões */}
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => navigate('/dashboard')}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Salvando..." : "Salvar Orçamento"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default NewOrderPage;
