
import React from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ServicosPage = () => {
  const services = [
    {
      id: 1,
      title: 'Bancadas de Cozinha',
      description: 'Bancadas elegantes e duráveis para cozinhas residenciais e comerciais em diversos materiais como granito, mármore e quartzo.',
      image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=640'
    },
    {
      id: 2,
      title: 'Pias e Cubas',
      description: 'Pias e cubas esculpidas em pedras nobres, com acabamento fino e design personalizado para banheiros e lavabos.',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=640'
    },
    {
      id: 3,
      title: 'Mesas e Tampos',
      description: 'Mesas e tampos para sala de jantar, escritório ou área externa com design exclusivo e materiais de alta qualidade.',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=640'
    },
    {
      id: 4,
      title: 'Soleiras e Peitoris',
      description: 'Soleiras e peitoris em diversos tipos de pedras, com acabamento polido ou escovado para portas e janelas.',
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=640'
    },
    {
      id: 5,
      title: 'Revestimentos',
      description: 'Revestimentos em pedra natural para paredes, pisos e fachadas, trazendo sofisticação e durabilidade para seu projeto.',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=640'
    },
    {
      id: 6,
      title: 'Escadas',
      description: 'Escadas em mármore ou granito com design contemporâneo ou clássico, proporcionando elegância e resistência.',
      image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=640'
    },
  ];

  const handleWhatsAppContact = () => {
    window.open("https://wa.me/5500000000000", "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Nossos Serviços</h1>
          <p className="text-lg text-center text-gray-600 mb-12">
            Oferecemos soluções completas em mármore, granito e quartzo para sua residência ou empresa.
            Conheça abaixo os principais serviços que realizamos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service) => (
            <Card key={service.id} className="overflow-hidden h-full flex flex-col">
              <div className="aspect-video w-full overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                />
              </div>
              <CardContent className="flex-1 flex flex-col p-6">
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-6 flex-1">{service.description}</p>
                <div className="mt-auto">
                  <Button 
                    onClick={handleWhatsAppContact}
                    className="w-full bg-orange-500 hover:bg-orange-600"
                  >
                    Solicitar Informações
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-primary/5 rounded-lg p-8 my-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Como Funciona Nosso Atendimento</h2>
            <p className="text-gray-600 mb-8">
              Nosso processo é simples e transparente, garantindo sua satisfação do início ao fim do projeto.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center p-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xl font-bold mb-4">1</div>
                <h3 className="font-semibold mb-2">Contato Inicial</h3>
                <p className="text-sm text-gray-500">Entre em contato pelo WhatsApp ou solicite um orçamento online.</p>
              </div>
              <div className="flex flex-col items-center p-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xl font-bold mb-4">2</div>
                <h3 className="font-semibold mb-2">Visita Técnica</h3>
                <p className="text-sm text-gray-500">Realizamos a medição no local e avaliamos o projeto.</p>
              </div>
              <div className="flex flex-col items-center p-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xl font-bold mb-4">3</div>
                <h3 className="font-semibold mb-2">Orçamento</h3>
                <p className="text-sm text-gray-500">Enviamos um orçamento detalhado e transparente.</p>
              </div>
              <div className="flex flex-col items-center p-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xl font-bold mb-4">4</div>
                <h3 className="font-semibold mb-2">Execução</h3>
                <p className="text-sm text-gray-500">Fabricamos e instalamos conforme o cronograma combinado.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold mb-6">Pronto para Transformar seu Ambiente?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/orcamento">
              <Button size="lg" className="min-w-[200px] bg-orange-500 hover:bg-orange-600">
                Solicitar Orçamento
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg" 
              className="min-w-[200px]"
              onClick={handleWhatsAppContact}
            >
              Falar via WhatsApp
            </Button>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Marmoraria Tech. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default ServicosPage;
