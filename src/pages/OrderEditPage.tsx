
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import DashboardLayout from '@/components/DashboardLayout';
import { Printer } from 'lucide-react';

// Mock data - would be replaced with actual API calls
const mockCustomers = [
  { id: 1, name: 'João Silva', phone: '(11) 99999-1234', email: 'joao@example.com', address: 'Rua das Flores, 123 - São Paulo/SP' },
  { id: 2, name: 'Maria Oliveira', phone: '(11) 98765-4321', email: 'maria@example.com', address: 'Av. Principal, 456 - São Paulo/SP' },
  { id: 3, name: 'Carlos Santos', phone: '(11) 91234-5678', email: 'carlos@example.com', address: 'Rua Secundária, 789 - São Paulo/SP' },
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
    shippingCost: 150,
    installationCost: 300,
    discount: 100,
    notes: 'Cliente solicitou entrega para o fim de semana.',
    total: 1009.4
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
  const [shippingCost, setShippingCost] = useState('');
  const [installationCost, setInstallationCost] = useState('');
  const [discount, setDiscount] = useState('');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });

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
      setShippingCost(orderData.shippingCost?.toString() || '');
      setInstallationCost(orderData.installationCost?.toString() || '');
      setDiscount(orderData.discount?.toString() || '');
      
      // Fetch customer info
      const customer = mockCustomers.find(c => c.id === orderData.customerId);
      if (customer) {
        setCustomerInfo({
          name: customer.name,
          phone: customer.phone,
          email: customer.email,
          address: customer.address
        });
      }
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

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.price, 0);
  };

  const calculateTotal = () => {
    let total = calculateSubtotal();
    
    // Add shipping and installation costs
    if (shippingCost) total += parseFloat(shippingCost);
    if (installationCost) total += parseFloat(installationCost);
    
    // Subtract discount
    if (discount) total -= parseFloat(discount);
    
    return total;
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

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast({
        title: "Erro ao imprimir",
        description: "Não foi possível abrir a janela de impressão",
        variant: "destructive",
      });
      return;
    }

    // Find customer
    const customer = mockCustomers.find(c => c.id.toString() === customerId);

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Orçamento #${id}</title>
        <meta charset="utf-8">
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            font-size: 12px;
            color: #333;
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
            border-bottom: 1px solid #ddd;
            padding-bottom: 15px;
          }
          .title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 5px;
          }
          .info-block {
            margin-bottom: 15px;
          }
          .info-block h3 {
            margin: 0 0 5px 0;
            font-size: 14px;
            border-bottom: 1px solid #eee;
            padding-bottom: 3px;
          }
          .info-block p {
            margin: 5px 0;
          }
          .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
          }
          table, th, td {
            border: 1px solid #ddd;
          }
          th, td {
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f5f5f5;
          }
          .summary {
            margin-top: 20px;
            text-align: right;
          }
          .summary div {
            margin-bottom: 5px;
          }
          .total {
            font-weight: bold;
            font-size: 14px;
            border-top: 1px solid #ddd;
            padding-top: 5px;
          }
          .footer {
            margin-top: 30px;
            text-align: center;
            border-top: 1px solid #ddd;
            padding-top: 15px;
            font-size: 10px;
          }
          @media print {
            @page {
              size: A4;
              margin: 15mm 10mm;
            }
            body {
              padding: 0;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="title">MARMORARIA TECH</div>
          <div>Rua Exemplo, 123 - Bairro - Cidade/UF</div>
          <div>Tel: (11) 1234-5678 | Email: contato@marmorariatech.com</div>
        </div>
        
        <div class="title">ORÇAMENTO #${id}</div>
        <div>Data: ${new Date().toLocaleDateString()}</div>
        <div>Status: ${status}</div>
        
        <div class="info-grid">
          <div class="info-block">
            <h3>Informações do Cliente</h3>
            <p><strong>Nome:</strong> ${customer?.name || '-'}</p>
            <p><strong>Telefone:</strong> ${customer?.phone || '-'}</p>
            <p><strong>Email:</strong> ${customer?.email || '-'}</p>
            <p><strong>Endereço:</strong> ${customer?.address || '-'}</p>
          </div>
          
          <div class="info-block">
            <h3>Observações</h3>
            <p>${notes || 'Nenhuma observação'}</p>
          </div>
        </div>
        
        <div class="info-block">
          <h3>Itens do Orçamento</h3>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Material</th>
                <th>Dimensões</th>
                <th>Qtd</th>
                <th>Valor Unit.</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${items.map((item, index) => `
                <tr>
                  <td>${index + 1}. ${item.description}</td>
                  <td>${getMaterialName(item.materialId)}</td>
                  <td>${item.length}m × ${item.width}m</td>
                  <td>${item.quantity}</td>
                  <td>R$ ${(item.price / item.quantity).toFixed(2)}</td>
                  <td>R$ ${item.price.toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <div class="summary">
            <div><strong>Subtotal:</strong> R$ ${calculateSubtotal().toFixed(2)}</div>
            ${shippingCost ? `<div><strong>Frete:</strong> R$ ${parseFloat(shippingCost).toFixed(2)}</div>` : ''}
            ${installationCost ? `<div><strong>Instalação:</strong> R$ ${parseFloat(installationCost).toFixed(2)}</div>` : ''}
            ${discount ? `<div><strong>Desconto:</strong> R$ ${parseFloat(discount).toFixed(2)}</div>` : ''}
            <div class="total"><strong>TOTAL:</strong> R$ ${calculateTotal().toFixed(2)}</div>
          </div>
        </div>
        
        <div class="footer">
          <p>Este orçamento tem validade de 15 dias a partir da data de emissão.</p>
          <p>Marmoraria Tech | CNPJ: 00.000.000/0001-00</p>
        </div>
        
        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
              setTimeout(function() {
                window.close();
              }, 100);
            }, 500);
          }
        </script>
      </body>
      </html>
    `);

    printWindow.document.close();
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
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="mr-2" size={16} /> Imprimir
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

                {/* Customer Information */}
                {customerId && (
                  <Card className="border border-gray-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Informações do Cliente</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-xs text-gray-500">Nome</Label>
                          <p className="text-sm">{customerInfo.name}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-500">Telefone</Label>
                          <p className="text-sm">{customerInfo.phone}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-500">Email</Label>
                          <p className="text-sm">{customerInfo.email}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-500">Endereço</Label>
                          <p className="text-sm">{customerInfo.address}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="space-y-2">
                  <Label htmlFor="notes">Observações</Label>
                  <Input
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Observações adicionais sobre o orçamento"
                  />
                </div>

                {/* Additional Cost Fields */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="shippingCost">Valor do Frete (R$)</Label>
                    <Input
                      id="shippingCost"
                      type="number"
                      step="0.01"
                      min="0"
                      value={shippingCost}
                      onChange={(e) => setShippingCost(e.target.value)}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="installationCost">Valor da Instalação (R$)</Label>
                    <Input
                      id="installationCost"
                      type="number"
                      step="0.01"
                      min="0"
                      value={installationCost}
                      onChange={(e) => setInstallationCost(e.target.value)}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discount">Desconto (R$)</Label>
                    <Input
                      id="discount"
                      type="number"
                      step="0.01"
                      min="0"
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                      placeholder="0.00"
                    />
                  </div>
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
                  <span>R$ {calculateSubtotal().toFixed(2)}</span>
                </div>
                {parseFloat(shippingCost) > 0 && (
                  <div className="flex justify-between">
                    <span>Frete:</span>
                    <span>R$ {parseFloat(shippingCost).toFixed(2)}</span>
                  </div>
                )}
                {parseFloat(installationCost) > 0 && (
                  <div className="flex justify-between">
                    <span>Instalação:</span>
                    <span>R$ {parseFloat(installationCost).toFixed(2)}</span>
                  </div>
                )}
                {parseFloat(discount) > 0 && (
                  <div className="flex justify-between">
                    <span>Desconto:</span>
                    <span>- R$ {parseFloat(discount).toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t pt-4 flex justify-between font-bold">
                  <span>Total:</span>
                  <span>R$ {calculateTotal().toFixed(2)}</span>
                </div>
                <Button className="w-full" onClick={handleSave} disabled={isLoading}>
                  {isLoading ? "Salvando..." : "Salvar Orçamento"}
                </Button>
                <Button variant="outline" className="w-full" onClick={handlePrint}>
                  <Printer className="mr-2" size={16} /> Imprimir Orçamento
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
                          {material.name} - R$ {material.price.toFixed(2)}/m²
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
