
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import DashboardLayout from '@/components/DashboardLayout';

// Mock data - would be replaced with actual API calls
const mockCustomers = [
  { id: 1, name: 'João Silva', phone: '(11) 99999-1234', email: 'joao@example.com' },
  { id: 2, name: 'Maria Oliveira', phone: '(11) 98765-4321', email: 'maria@example.com' },
  { id: 3, name: 'Carlos Santos', phone: '(11) 91234-5678', email: 'carlos@example.com' },
];

const mockMaterials = [
  { id: 1, name: 'Mármore Carrara', price: 350 },
  { id: 2, name: 'Granito Preto São Gabriel', price: 280 },
  { id: 3, name: 'Quartzo Branco', price: 420 },
];

// Mock order data - would come from an API
const getMockOrder = (id: string) => {
  return {
    id: parseInt(id),
    customerId: 1,
    date: '2023-10-15',
    status: 'Em Andamento',
    items: [
      { id: 1, materialId: 1, description: 'Bancada de cozinha', length: 2.5, width: 0.6, quantity: 1, price: 525 },
      { id: 2, materialId: 2, description: 'Soleira', length: 1.2, width: 0.2, quantity: 2, price: 134.4 },
    ],
    notes: 'Cliente solicitou entrega para o fim de semana.',
    total: 659.4
  };
};

const OrderEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState<any>(null);
  const [customerId, setCustomerId] = useState('');
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');
  const [items, setItems] = useState<any[]>([]);
  const [newItemMaterial, setNewItemMaterial] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');
  const [newItemLength, setNewItemLength] = useState('');
  const [newItemWidth, setNewItemWidth] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('1');

  useEffect(() => {
    // Check authentication
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

    // Fetch order data
    if (id) {
      const orderData = getMockOrder(id);
      setOrder(orderData);
      setCustomerId(orderData.customerId.toString());
      setStatus(orderData.status);
      setNotes(orderData.notes);
      setItems(orderData.items);
    }
  }, [id, navigate, toast]);

  const calculateItemPrice = (materialId: number, length: number, width: number, quantity: number) => {
    const material = mockMaterials.find(m => m.id === materialId);
    if (!material) return 0;
    
    // Calculate area and total price
    const area = length * width;
    return material.price * area * quantity;
  };

  const handleAddItem = () => {
    if (!newItemMaterial || !newItemDescription || !newItemLength || !newItemWidth || !newItemQuantity) {
      toast({
        title: "Campos incompletos",
        description: "Preencha todos os campos do item",
        variant: "destructive",
      });
      return;
    }

    const materialId = parseInt(newItemMaterial);
    const length = parseFloat(newItemLength);
    const width = parseFloat(newItemWidth);
    const quantity = parseInt(newItemQuantity);
    const price = calculateItemPrice(materialId, length, width, quantity);

    const newItem = {
      id: Date.now(), // Temporary ID
      materialId,
      description: newItemDescription,
      length,
      width,
      quantity,
      price
    };

    setItems([...items, newItem]);
    
    // Reset form
    setNewItemMaterial('');
    setNewItemDescription('');
    setNewItemLength('');
    setNewItemWidth('');
    setNewItemQuantity('1');
  };

  const handleRemoveItem = (itemId: number) => {
    setItems(items.filter(item => item.id !== itemId));
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.price, 0);
  };

  const handleSave = () => {
    setIsLoading(true);
    
    // Validation
    if (!customerId || !status) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Orçamento atualizado",
        description: "O orçamento foi atualizado com sucesso",
      });
      setIsLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  const getMaterialName = (materialId: number) => {
    const material = mockMaterials.find(m => m.id === materialId);
    return material ? material.name : 'Material não encontrado';
  };

  if (!order) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <div className="flex items-center justify-center h-64">
            <p>Carregando orçamento...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">Editar Orçamento #{id}</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar Orçamento"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Informações do Orçamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="customer">Cliente</Label>
                    <Select value={customerId} onValueChange={setCustomerId}>
                      <SelectTrigger id="customer">
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
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={status} onValueChange={setStatus}>
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Selecione um status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Aberto">Aberto</SelectItem>
                        <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                        <SelectItem value="Finalizado">Finalizado</SelectItem>
                        <SelectItem value="Cancelado">Cancelado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Observações</Label>
                  <Input
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Observações adicionais sobre o orçamento"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resumo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>R$ {calculateTotal().toFixed(2)}</span>
                </div>
                <div className="border-t pt-4 flex justify-between font-bold">
                  <span>Total:</span>
                  <span>R$ {calculateTotal().toFixed(2)}</span>
                </div>
                <Button className="w-full" onClick={handleSave} disabled={isLoading}>
                  {isLoading ? "Salvando..." : "Salvar Orçamento"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Itens do Orçamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-3 space-y-2">
                  <Label htmlFor="material">Material</Label>
                  <Select value={newItemMaterial} onValueChange={setNewItemMaterial}>
                    <SelectTrigger id="material">
                      <SelectValue placeholder="Selecione o material" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockMaterials.map(material => (
                        <SelectItem key={material.id} value={material.id.toString()}>
                          {material.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-3 space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Input
                    id="description"
                    value={newItemDescription}
                    onChange={(e) => setNewItemDescription(e.target.value)}
                    placeholder="Ex: Bancada de cozinha"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="length">Comprimento (m)</Label>
                  <Input
                    id="length"
                    type="number"
                    step="0.01"
                    value={newItemLength}
                    onChange={(e) => setNewItemLength(e.target.value)}
                    placeholder="Ex: 2.5"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="width">Largura (m)</Label>
                  <Input
                    id="width"
                    type="number"
                    step="0.01"
                    value={newItemWidth}
                    onChange={(e) => setNewItemWidth(e.target.value)}
                    placeholder="Ex: 0.6"
                  />
                </div>
                <div className="md:col-span-1 space-y-2">
                  <Label htmlFor="quantity">Qtd</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={newItemQuantity}
                    onChange={(e) => setNewItemQuantity(e.target.value)}
                    placeholder="Ex: 1"
                  />
                </div>
                <div className="md:col-span-1 flex items-end">
                  <Button className="w-full" onClick={handleAddItem}>Adicionar</Button>
                </div>
              </div>

              {items.length === 0 ? (
                <div className="text-center py-6 text-gray-500">
                  Nenhum item adicionado ao orçamento
                </div>
              ) : (
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Material</th>
                      <th className="text-left py-2">Descrição</th>
                      <th className="text-left py-2">Dimensões</th>
                      <th className="text-left py-2">Qtd</th>
                      <th className="text-left py-2">Valor</th>
                      <th className="text-left py-2">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="py-2">{getMaterialName(item.materialId)}</td>
                        <td className="py-2">{item.description}</td>
                        <td className="py-2">{item.length}m × {item.width}m</td>
                        <td className="py-2">{item.quantity}</td>
                        <td className="py-2">R$ {item.price.toFixed(2)}</td>
                        <td className="py-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                          >
                            Remover
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default OrderEditPage;
