
import React from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';

const SobrePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Sobre Nós</h1>
          <p className="text-lg text-center text-gray-600 mb-12">
            Conheça a história e missão da Marmoraria Tech, uma empresa dedicada à excelência em mármores e granitos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-4">Nossa História</h2>
            <p className="text-gray-700 mb-4">
              Fundada em 2005, a Marmoraria Tech começou como uma pequena oficina familiar dedicada ao trabalho artesanal com pedras ornamentais. Com o passar dos anos, crescemos e nos modernizamos, sempre mantendo o compromisso com a qualidade e o atendimento personalizado.
            </p>
            <p className="text-gray-700 mb-4">
              Hoje, contamos com uma equipe especializada e equipamentos de última geração que nos permitem criar projetos sofisticados e precisos, atendendo às mais diversas necessidades de nossos clientes.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1604328698692-f76ea9498e76?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=640" 
              alt="Nossa oficina" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <Card className="mb-16">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-6">Nossa Missão</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Qualidade</h3>
                <p className="text-gray-600">Entregamos produtos que aliam beleza, durabilidade e acabamento impecável.</p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Atendimento</h3>
                <p className="text-gray-600">Primamos pelo atendimento personalizado, entendendo as necessidades de cada cliente.</p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10"></path></svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Transparência</h3>
                <p className="text-gray-600">Trabalhamos com transparência em todos os processos, do orçamento à entrega final.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Nossos Diferenciais</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">Profissionais Qualificados</h3>
                <p className="text-gray-700">
                  Nossa equipe é formada por profissionais com décadas de experiência no trabalho com pedras ornamentais, garantindo a excelência em cada projeto.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">Tecnologia Avançada</h3>
                <p className="text-gray-700">
                  Utilizamos equipamentos modernos para corte e acabamento, assegurando precisão milimétrica em cada peça.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">Materiais Selecionados</h3>
                <p className="text-gray-700">
                  Trabalhamos apenas com materiais de primeira linha, selecionados criteriosamente para garantir beleza e durabilidade.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">Garantia de Serviço</h3>
                <p className="text-gray-700">
                  Oferecemos garantia em todos os nossos serviços, refletindo a confiança que temos na qualidade do que entregamos.
                </p>
              </CardContent>
            </Card>
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

export default SobrePage;
