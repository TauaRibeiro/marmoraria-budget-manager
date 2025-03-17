
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-marble-100 marble-texture py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-marble-900">
                Transformamos Pedras em Arte para seu Lar
              </h1>
              <p className="text-lg md:text-xl text-marble-600 mb-8">
                Soluções em mármores e granitos com excelência em qualidade,
                acabamento e pontualidade na entrega.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/orcamento">
                  <Button className="w-full sm:w-auto bg-secondary hover:bg-secondary/90 text-white font-medium px-6 py-3 rounded-md">
                    Solicitar Orçamento <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/contato">
                  <Button className="w-full sm:w-auto bg-white hover:bg-gray-100 text-primary font-medium px-6 py-3 rounded-md border border-marble-300">
                    Fale Conosco <Phone className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-marble-800">
                Nossos Serviços
              </h2>
              <p className="text-lg text-marble-600 max-w-3xl mx-auto">
                Oferecemos uma variedade de soluções em pedras naturais para atender 
                às suas necessidades de design e funcionalidade.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Service 1 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
                <div className="h-48 bg-[url('https://images.unsplash.com/photo-1600607686527-6fb886090705')] bg-cover bg-center"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-marble-800">Bancadas de Cozinha</h3>
                  <p className="text-marble-600 mb-4">
                    Bancadas elegantes e duráveis em granito, mármore ou quartzo para sua cozinha.
                  </p>
                  <Link to="/servicos" className="text-secondary font-medium hover:underline inline-flex items-center">
                    Saiba mais <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Service 2 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
                <div className="h-48 bg-[url('https://images.unsplash.com/photo-1603835398560-2d819d13a8c1')] bg-cover bg-center"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-marble-800">Banheiros e Lavabos</h3>
                  <p className="text-marble-600 mb-4">
                    Cubas, bancadas e revestimentos para banheiros com elegância e sofisticação.
                  </p>
                  <Link to="/servicos" className="text-secondary font-medium hover:underline inline-flex items-center">
                    Saiba mais <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Service 3 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
                <div className="h-48 bg-[url('https://images.unsplash.com/photo-1600566752355-35792bedcfea')] bg-cover bg-center"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-marble-800">Escadas e Pisos</h3>
                  <p className="text-marble-600 mb-4">
                    Escadas, soleiras, pisos e acabamentos em diversos tipos de pedras naturais.
                  </p>
                  <Link to="/servicos" className="text-secondary font-medium hover:underline inline-flex items-center">
                    Saiba mais <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link to="/servicos">
                <Button className="bg-marble-100 hover:bg-marble-200 text-marble-800 font-medium px-6 py-3 rounded-md">
                  Ver Todos os Serviços
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 md:py-24 bg-marble-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-marble-800">
                Por Que Escolher a Marmoraria Tech?
              </h2>
              <p className="text-lg text-marble-600 max-w-3xl mx-auto">
                Combinamos o melhor da tradição artesanal com tecnologia avançada para 
                entregar produtos de qualidade excepcional.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1 */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="bg-secondary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Check className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-marble-800">Qualidade Premium</h3>
                <p className="text-marble-600">
                  Utilizamos apenas pedras de alta qualidade, selecionadas cuidadosamente para garantir durabilidade e beleza.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="bg-secondary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Check className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-marble-800">Tecnologia Avançada</h3>
                <p className="text-marble-600">
                  Equipamentos de última geração para cortes precisos e acabamentos perfeitos em todos os projetos.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="bg-secondary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Check className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-marble-800">Profissionais Experientes</h3>
                <p className="text-marble-600">
                  Nossa equipe é formada por mestres marmoristas com décadas de experiência e conhecimento.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="bg-secondary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Check className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-marble-800">Pontualidade</h3>
                <p className="text-marble-600">
                  Respeitamos prazos e entregamos os projetos conforme combinado, sem atrasos ou surpresas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Pronto para Transformar seu Espaço?
              </h2>
              <p className="text-xl mb-8 text-gray-200">
                Entre em contato e solicite um orçamento sem compromisso. Nossa equipe está pronta para atender às suas necessidades.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/orcamento">
                  <Button className="w-full sm:w-auto bg-secondary hover:bg-secondary/90 text-white font-medium px-6 py-3 rounded-md">
                    Solicitar Orçamento <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/contato">
                  <Button className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white font-medium px-6 py-3 rounded-md border border-white/30">
                    Fale Conosco <Phone className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
