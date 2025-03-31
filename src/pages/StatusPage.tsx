
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import DashboardLayout from '@/components/DashboardLayout';
import { Plus, Pencil, Trash2 } from 'lucide-react';

const StatusPage = () => {
  // Estado para os status
  const [statusList, setStatusList] = useState([
    { id: 1, name: 'Aberto', color: '#3498db' },
    { id: 2, name: 'Em Andamento', color: '#f39c12' },
    { id: 3, name: 'Finalizado', color: '#2ecc71' },
    { id: 4, name: 'Cancelado', color: '#e74c3c' },
  ]);
  
  // Estado para o formulário de novo status
  const [newStatus, setNewStatus] = useState({ name: '', color: '#000000' });
  const [editingStatus, setEditingStatus] = useState<null | { id: number, name: string, color: string }>(null);
  
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

  const handleAddStatus = () => {
    if (newStatus.name.trim() === '') {
      toast({
        title: "Campo obrigatório",
        description: "O nome do status é obrigatório",
        variant: "destructive",
      });
      return;
    }

    const updatedList = [
      ...statusList,
      {
        id: statusList.length > 0 ? Math.max(...statusList.map(s => s.id)) + 1 : 1,
        name: newStatus.name,
        color: newStatus.color
      }
    ];
    
    setStatusList(updatedList);
    setNewStatus({ name: '', color: '#000000' });
    
    toast({
      title: "Status adicionado",
      description: `O status "${newStatus.name}" foi adicionado com sucesso`,
    });
  };

  const handleUpdateStatus = () => {
    if (!editingStatus) return;
    
    if (editingStatus.name.trim() === '') {
      toast({
        title: "Campo obrigatório",
        description: "O nome do status é obrigatório",
        variant: "destructive",
      });
      return;
    }

    const updatedList = statusList.map(status => {
      if (status.id === editingStatus.id) {
        return {
          ...status,
          name: editingStatus.name,
          color: editingStatus.color
        };
      }
      return status;
    });
    
    setStatusList(updatedList);
    setEditingStatus(null);
    
    toast({
      title: "Status atualizado",
      description: `O status foi atualizado com sucesso`,
    });
  };

  const handleDeleteStatus = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este status?')) {
      const updatedList = statusList.filter(status => status.id !== id);
      setStatusList(updatedList);
      
      toast({
        title: "Status excluído",
        description: "O status foi excluído com sucesso",
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Gerenciar Status de Orçamentos</h1>
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            Voltar
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle>Status Cadastrados</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Cor</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {statusList.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-8">
                        Nenhum status cadastrado
                      </TableCell>
                    </TableRow>
                  ) : (
                    statusList.map((status) => (
                      <TableRow key={status.id}>
                        <TableCell>{status.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-6 h-6 rounded-full border border-gray-200"
                              style={{ backgroundColor: status.color }}
                            />
                            <span>{status.color}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => setEditingStatus(status)}
                              className="flex items-center gap-1"
                            >
                              <Pencil size={16} />
                              Editar
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleDeleteStatus(status.id)}
                              className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 flex items-center gap-1"
                            >
                              <Trash2 size={16} />
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

          <Card>
            <CardHeader>
              <CardTitle>
                {editingStatus ? 'Editar Status' : 'Novo Status'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label htmlFor="statusName" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome do Status
                  </label>
                  <Input
                    id="statusName"
                    value={editingStatus ? editingStatus.name : newStatus.name}
                    onChange={(e) => {
                      if (editingStatus) {
                        setEditingStatus({ ...editingStatus, name: e.target.value });
                      } else {
                        setNewStatus({ ...newStatus, name: e.target.value });
                      }
                    }}
                    placeholder="Ex: Em Análise"
                  />
                </div>
                
                <div>
                  <label htmlFor="statusColor" className="block text-sm font-medium text-gray-700 mb-1">
                    Cor do Status
                  </label>
                  <div className="flex gap-3 items-center">
                    <input
                      type="color"
                      id="statusColor"
                      value={editingStatus ? editingStatus.color : newStatus.color}
                      onChange={(e) => {
                        if (editingStatus) {
                          setEditingStatus({ ...editingStatus, color: e.target.value });
                        } else {
                          setNewStatus({ ...newStatus, color: e.target.value });
                        }
                      }}
                      className="w-10 h-10 border-0 cursor-pointer rounded overflow-hidden"
                    />
                    <Input
                      value={editingStatus ? editingStatus.color : newStatus.color}
                      onChange={(e) => {
                        if (editingStatus) {
                          setEditingStatus({ ...editingStatus, color: e.target.value });
                        } else {
                          setNewStatus({ ...newStatus, color: e.target.value });
                        }
                      }}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  {editingStatus ? (
                    <div className="flex gap-2">
                      <Button 
                        onClick={handleUpdateStatus} 
                        className="flex-1"
                      >
                        Atualizar
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setEditingStatus(null)}
                        className="flex-1"
                      >
                        Cancelar
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      onClick={handleAddStatus} 
                      className="w-full flex items-center gap-1"
                    >
                      <Plus size={16} />
                      Adicionar Status
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Como usar os Status</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Os status criados aqui serão exibidos nas opções de status de orçamento durante a criação e edição de orçamentos.
              Cada status pode ter um nome descritivo e uma cor associada para facilitar a identificação visual.
            </p>
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 text-amber-700">
              <p className="font-medium">Recomendações:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Crie status que representem claramente o estado atual do orçamento</li>
                <li>Use cores distintas para facilitar a identificação</li>
                <li>Mantenha a quantidade de status controlada para não gerar confusão</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StatusPage;
