
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-marble-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-heading font-bold mb-4">Marmoraria Tech</h3>
            <p className="mb-4 text-marble-300">
              Transformamos pedras naturais em obras de arte para seu lar ou negócio, com qualidade e excelência em cada detalhe.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-secondary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-secondary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-secondary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-heading font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-marble-300 hover:text-secondary transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-marble-300 hover:text-secondary transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/servicos" className="text-marble-300 hover:text-secondary transition-colors">
                  Serviços
                </Link>
              </li>
              <li>
                <Link to="/galeria" className="text-marble-300 hover:text-secondary transition-colors">
                  Galeria
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-marble-300 hover:text-secondary transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link to="/orcamento" className="text-marble-300 hover:text-secondary transition-colors">
                  Solicitar Orçamento
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-heading font-bold mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                <span className="text-marble-300">Av. das Pedras, 1234, Centro, São Paulo - SP</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-secondary" />
                <a href="tel:+551199999999" className="text-marble-300 hover:text-secondary transition-colors">
                  (11) 9999-9999
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-secondary" />
                <a href="mailto:contato@marmorariatech.com.br" className="text-marble-300 hover:text-secondary transition-colors">
                  contato@marmorariatech.com.br
                </a>
              </li>
              <li className="flex items-start">
                <Clock className="mr-2 h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                <span className="text-marble-300">
                  Segunda a Sexta: 8h às 18h<br />
                  Sábado: 8h às 12h
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-marble-700 mt-8 pt-8 text-center text-marble-400">
          <p>&copy; {new Date().getFullYear()} Marmoraria Tech. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
