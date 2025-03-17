
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import DashboardLayout from '@/components/DashboardLayout';

// Dados fictícios para demonstração
const mockMaterials = [
  { 
    id: 1, 
    name: 'Mármore Carrara', 
    type: 'Mármore', 
    price: 'R$ 350,00',
    stock: 50
  },
  { 
    id: 2, 
    name: 'Granito Preto São Gabriel', 
    type: 'Granito', 
    price: 'R$ 280,00',
    stock: 35
  },
  { 
    id: 3, 
    name: 'Quartzo Branco', 
    type: 'Quartzo', 
    price: 'R$ 420,00',
    stock: 25
  },
  { 
    id: 4, 
    name: 'Mármore Travertino', 
    type: 'Mármore', 
    price: 'R$ 300,00',
    stock: 40
  },
  { 
    id: 5, 
    name: 'Granito Verde Ubatuba', 
    type: 'Granito', 
    price: 'R$ 260,00',
    stock: 30
  },
];

const MaterialsPage = () => {
  const [materials, setMaterials] = useState(mockMaterials);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const filteredMaterials = materials.filter(material => 
    material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.type.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleDeleteMaterial = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este material?')) {
      setMaterials(materials.filter(material => material.id !== id));
      toast({
        title: "Material excluído",
        description: "O material foi excluído com sucesso",
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">Materiais</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-64">
              <Input 
                placeholder="Buscar material..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={() => navigate('/dashboard/materials/new')}>
              Novo Material
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Materiais</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Preço (m²)</TableHead>
                  <TableHead>Estoque (m²)</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMaterials.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      Nenhum material encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMaterials.map((material) => (
                    <TableRow key={material.id}>
                      <TableCell>{material.name}</TableCell>
                      <TableCell>{material.type}</TableCell>
                      <TableCell>{material.price}</TableCell>
                      <TableCell>{material.stock}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => navigate(`/dashboard/materials/${material.id}/edit`)}
                          >
                            Editar
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleDeleteMaterial(material.id)}
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

export default MaterialsPage;
