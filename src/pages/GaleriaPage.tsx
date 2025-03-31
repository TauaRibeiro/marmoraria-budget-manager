import React from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const GaleriaPage = () => {
  // Dados fictícios para a galeria
  const galleryItems = [
    {
      id: 1,
      title: 'Bancada de Cozinha em Mármore',
      description: 'Bancada para cozinha residencial em Mármore Carrara.',
      image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=640',
    },
    {
      id: 2,
      title: 'Pia de Banheiro em Granito',
      description: 'Pia de banheiro elegante em Granito Preto São Gabriel.',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=640',
    },
    {
      id: 3,
      title: 'Mesa de Jantar em Quartzo',
      description: 'Mesa de jantar sofisticada em Quartzo Branco.',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=640',
    },
    {
      id: 4,
      title: 'Balcão de Recepção em Granito',
      description: 'Balcão de recepção corporativa em Granito Verde Ubatuba.',
      image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=640',
    },
    {
      id: 5,
      title: 'Soleiras em Mármore',
      description: 'Soleiras para portas em Mármore Travertino.',
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=640',
    },
    {
      id: 6,
      title: 'Escada em Granito',
      description: 'Escada residencial em Granito Cinza Corumbá.',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=640',
    },
    {
      id: 7,
      title: 'Lavabo com Acabamento em Mármore',
      description: 'Lavabo residencial com acabamento em Mármore Carrara.',
      image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=640',
    },
    {
      id: 8,
      title: 'Banheiro com Revestimento em Granito',
      description: 'Banheiro com revestimento completo em Granito Preto São Gabriel.',
      image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=640',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Nossa Galeria de Serviços</h1>
          <p className="text-lg text-center text-gray-600 mb-12">
            Confira alguns dos nossos trabalhos realizados em residências e empresas.
            Nossa expertise em mármore, granito e quartzo proporciona acabamentos de alta qualidade.
          </p>
        </div>

        {/* Carrossel de Destaques */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Projetos em Destaque</h2>
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {galleryItems.slice(0, 3).map((item) => (
                <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3 h-auto">
                  <div className="p-1 h-full">
                    <Card className="overflow-hidden h-full">
                      <CardContent className="flex flex-col p-0 h-full">
                        <div className="relative aspect-video overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          />
                        </div>
                        <div className="p-4 flex-1">
                          <h3 className="font-semibold text-lg">{item.title}</h3>
                          <p className="text-sm text-gray-600 mt-2">{item.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>

        {/* Galeria Completa */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Todos os Projetos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-sm text-gray-600 mt-2">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
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

export default GaleriaPage;
