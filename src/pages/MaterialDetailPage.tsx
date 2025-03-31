
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import DashboardLayout from '@/components/DashboardLayout';

// Dados fictícios para demonstração
const mockMaterials = [
  { 
    id: 1, 
    name: 'Mármore Carrara', 
    type: 'Mármore', 
    price: 350.00,
    stock: 50,
    unit: 'm²',
    description: 'Mármore branco de alta qualidade, importado da Itália.'
  },
  { 
    id: 2, 
    name: 'Granito Preto São Gabriel', 
    type: 'Granito', 
    price: 280.00,
    stock: 35,
    unit: 'm²',
    description: 'Granito nacional de cor preta com pequenos cristais.'
  },
  { 
    id: 3, 
    name: 'Quartzo Branco', 
    type: 'Quartzo', 
    price: 420.00,
    stock: 25,
    unit: 'm²',
    description: 'Quartzo branco com alta resistência a manchas e riscos.'
  },
];

const materialTypes = ['Mármore', 'Granito', 'Quartzo', 'Porcelanato', 'Outro'];
const unitTypes = ['m²', 'unidade', 'metro linear'];

const MaterialDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isNewMaterial = id === 'new';
  
  const [formData, setFormData] = useState({
    name: '',
    type: 'Mármore',
    price: '',
    stock: '',
    unit: 'm²',
    description: '',
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

    // Carregar dados do material se não for um novo material
    if (!isNewMaterial) {
      const material = mockMaterials.find(m => m.id === parseInt(id || '0'));
      if (material) {
        setFormData({
          name: material.name,
          type: material.type,
          price: material.price.toString(),
          stock: material.stock.toString(),
          unit: material.unit,
          description: material.description || '',
        });
      } else {
        toast({
          title: "Material não encontrado",
          description: "O material solicitado não foi encontrado",
          variant: "destructive",
        });
        navigate('/dashboard/materials');
      }
    }
  }, [id, isNewMaterial, navigate, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulação de envio de dados - será substituído pela integração real
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: isNewMaterial ? "Material cadastrado" : "Material atualizado",
        description: isNewMaterial 
          ? "O material foi cadastrado com sucesso" 
          : "Os dados do material foram atualizados com sucesso",
      });
      
      navigate('/dashboard/materials');
    } catch (error) {
      toast({
        title: "Erro",
        description: isNewMaterial 
          ? "Ocorreu um erro ao cadastrar o material" 
          : "Ocorreu um erro ao atualizar o material",
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
            {isNewMaterial ? 'Novo Material' : 'Editar Material'}
          </h1>
          <Button variant="outline" onClick={() => navigate('/dashboard/materials')}>
            Voltar
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Informações do Material</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Material</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo de Material</Label>
                  <Select 
                    value={formData.type}
                    onValueChange={(value) => handleSelectChange('type', value)}
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {materialTypes.map(type => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="price">Preço (R$)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Estoque</Label>
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.stock}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Unidade</Label>
                  <Select 
                    value={formData.unit}
                    onValueChange={(value) => handleSelectChange('unit', value)}
                  >
                    <SelectTrigger id="unit">
                      <SelectValue placeholder="Selecione a unidade" />
                    </SelectTrigger>
                    <SelectContent>
                      {unitTypes.map(unit => (
                        <SelectItem key={unit} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <textarea
                  id="description"
                  name="description"
                  className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Descrição detalhada do material..."
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/dashboard/materials')}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Salvando..." : "Salvar Material"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MaterialDetailPage;
