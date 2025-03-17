
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ContatoPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    mensagem: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitting(false);
      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Agradecemos seu contato. Responderemos o mais breve possível.",
      });
      
      // Reset form
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        mensagem: "",
      });
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-12 md:py-20 bg-marble-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-marble-800">
                Entre em Contato
              </h1>
              <p className="text-lg text-marble-600 max-w-2xl mx-auto">
                Estamos à disposição para esclarecer suas dúvidas, receber sugestões 
                ou agendar uma visita à nossa loja.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Form */}
              <Card className="shadow-lg">
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-2xl font-bold mb-6 text-marble-800">Envie uma Mensagem</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome *</Label>
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
                      <Label htmlFor="mensagem">Mensagem *</Label>
                      <Textarea
                        id="mensagem"
                        name="mensagem"
                        value={formData.mensagem}
                        onChange={handleInputChange}
                        placeholder="Descreva como podemos ajudar"
                        className="min-h-[120px]"
                        required
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full bg-secondary hover:bg-secondary/90 text-white"
                      disabled={submitting}
                    >
                      {submitting ? "Enviando..." : "Enviar Mensagem"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              {/* Contact Information */}
              <div className="space-y-8">
                <Card className="shadow-lg">
                  <CardContent className="p-6 md:p-8">
                    <h2 className="text-2xl font-bold mb-6 text-marble-800">Informações de Contato</h2>
                    
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <MapPin className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-bold text-marble-700">Endereço</h3>
                          <p className="text-marble-600">
                            Av. das Pedras, 1234<br />
                            Centro, São Paulo - SP<br />
                            CEP: 01234-567
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <Phone className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-bold text-marble-700">Telefone</h3>
                          <p className="text-marble-600">
                            <a href="tel:+551199999999" className="hover:text-secondary">
                              (11) 9999-9999
                            </a><br />
                            <a href="tel:+551144444444" className="hover:text-secondary">
                              (11) 4444-4444
                            </a>
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <Mail className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-bold text-marble-700">E-mail</h3>
                          <p className="text-marble-600">
                            <a href="mailto:contato@marmorariatech.com.br" className="hover:text-secondary">
                              contato@marmorariatech.com.br
                            </a><br />
                            <a href="mailto:vendas@marmorariatech.com.br" className="hover:text-secondary">
                              vendas@marmorariatech.com.br
                            </a>
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <Clock className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-bold text-marble-700">Horário de Funcionamento</h3>
                          <p className="text-marble-600">
                            Segunda a Sexta: 8h às 18h<br />
                            Sábado: 8h às 12h<br />
                            Domingo: Fechado
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-lg">
                  <CardContent className="p-6 md:p-8">
                    <h2 className="text-2xl font-bold mb-6 text-marble-800">Localização</h2>
                    <div className="aspect-[4/3] rounded-lg overflow-hidden">
                      <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1975388531287!2d-46.6522202!3d-23.5649664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1654123456789!5m2!1spt-BR!2sbr"
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Localização da Marmoraria Tech"
                      ></iframe>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContatoPage;
