
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Upload } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

const materiais = [
  { value: "marmore", label: "Mármore" },
  { value: "granito", label: "Granito" },
  { value: "quartzo", label: "Quartzo" },
  { value: "porcelanato", label: "Porcelanato" },
  { value: "limestone", label: "Limestone" },
  { value: "travertino", label: "Travertino" },
  { value: "outro", label: "Outro" },
];

const OrcamentoPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    email: "",
    endereco: "",
    descricao: "",
    material: "",
    quantidade: "",
    dataEntrega: undefined as Date | undefined,
    arquivo: null as File | null,
  });
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      material: value,
    });
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData({
      ...formData,
      dataEntrega: date,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({
        ...formData,
        arquivo: e.target.files[0],
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitting(false);
      toast({
        title: "Orçamento solicitado com sucesso!",
        description: "Entraremos em contato em breve para dar continuidade ao seu projeto.",
      });
      
      // Reset form
      setFormData({
        nome: "",
        telefone: "",
        email: "",
        endereco: "",
        descricao: "",
        material: "",
        quantidade: "",
        dataEntrega: undefined,
        arquivo: null,
      });
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-12 md:py-20 bg-marble-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-marble-800">
                Solicite um Orçamento
              </h1>
              <p className="text-lg text-marble-600">
                Preencha o formulário abaixo com os detalhes do seu projeto e entraremos
                em contato o mais breve possível.
              </p>
            </div>
            
            <Card className="shadow-lg">
              <CardContent className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome completo *</Label>
                      <Input
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        placeholder="Seu nome completo"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone *</Label>
                      <Input
                        id="telefone"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleInputChange}
                        placeholder="(00) 00000-0000"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="seu.email@exemplo.com"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="endereco">Endereço *</Label>
                      <Input
                        id="endereco"
                        name="endereco"
                        value={formData.endereco}
                        onChange={handleInputChange}
                        placeholder="Endereço completo"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="descricao">Descrição do Projeto *</Label>
                      <Textarea
                        id="descricao"
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleInputChange}
                        placeholder="Descreva detalhes do seu projeto, medidas, acabamentos, etc."
                        className="min-h-[120px]"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="material">Tipo de Material *</Label>
                      <Select
                        value={formData.material}
                        onValueChange={handleSelectChange}
                        required
                      >
                        <SelectTrigger id="material">
                          <SelectValue placeholder="Selecione o material" />
                        </SelectTrigger>
                        <SelectContent>
                          {materiais.map((material) => (
                            <SelectItem key={material.value} value={material.value}>
                              {material.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="quantidade">Quantidade Estimada *</Label>
                      <Input
                        id="quantidade"
                        name="quantidade"
                        value={formData.quantidade}
                        onChange={handleInputChange}
                        placeholder="Ex: 10m², 2 peças, etc."
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="dataEntrega">Data de Entrega Desejada</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !formData.dataEntrega && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.dataEntrega ? (
                              format(formData.dataEntrega, "PP", { locale: ptBR })
                            ) : (
                              <span>Selecione uma data</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={formData.dataEntrega}
                            onSelect={handleDateChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="arquivo">Anexar Imagens ou Arquivos</Label>
                      <div className="border border-input rounded-md p-2">
                        <label
                          htmlFor="arquivo"
                          className="flex items-center justify-center gap-2 cursor-pointer hover:bg-marble-100 py-2 rounded-md transition-colors"
                        >
                          <Upload className="h-4 w-4 text-marble-600" />
                          <span className="text-sm text-marble-600">
                            {formData.arquivo ? formData.arquivo.name : "Selecionar arquivo"}
                          </span>
                        </label>
                        <input
                          id="arquivo"
                          name="arquivo"
                          type="file"
                          onChange={handleFileChange}
                          className="hidden"
                          accept="image/*,.pdf"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full bg-secondary hover:bg-secondary/90 text-white"
                      disabled={submitting}
                    >
                      {submitting ? "Enviando..." : "Solicitar Orçamento"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrcamentoPage;
