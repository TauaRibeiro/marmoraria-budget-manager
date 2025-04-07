
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, Phone, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleWhatsAppContact = () => {
    window.open("https://wa.me/5500000000000", "_blank");
  };

  return (
    <header className="sticky top-0 w-full bg-white/90 backdrop-blur-sm shadow-sm z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-heading font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Marmoraria Tech
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-primary font-medium text-sm transition-colors">
            Início
          </Link>
          <Link to="/sobre" className="text-gray-700 hover:text-primary font-medium text-sm transition-colors">
            Sobre
          </Link>
          <Link to="/servicos" className="text-gray-700 hover:text-primary font-medium text-sm transition-colors">
            Serviços
          </Link>
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-gray-700 hover:text-primary font-medium text-sm transition-colors flex items-center gap-1"
            >
              Galeria <ChevronDown size={14} />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full mt-1 w-48 bg-white shadow-lg rounded-md overflow-hidden z-20">
                <Link 
                  to="/galeria" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Todos os Projetos
                </Link>
                <Link 
                  to="/galeria?categoria=cozinha" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Cozinhas
                </Link>
                <Link 
                  to="/galeria?categoria=banheiro" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Banheiros
                </Link>
                <Link 
                  to="/galeria?categoria=escada" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Escadas
                </Link>
              </div>
            )}
          </div>
          <Button 
            onClick={handleWhatsAppContact}
            variant="ghost" 
            className="text-gray-700 hover:text-primary font-medium text-sm transition-colors p-0"
          >
            Contato
          </Button>
          <div className="flex items-center space-x-2">
            <Link to="/orcamento">
              <Button className="bg-secondary hover:bg-secondary/90 text-white text-sm rounded-full px-5 py-1 h-auto">
                Solicitar Orçamento
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="flex items-center gap-1 rounded-full border-primary text-primary hover:bg-primary/10 hover:text-primary text-sm px-4 py-1 h-auto">
                <User size={14} /> Área do Colaborador
              </Button>
            </Link>
          </div>
        </nav>

        {/* Mobile Navigation Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 hover:text-primary"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg w-full py-4 glass-card">
          <div className="container mx-auto px-4 flex flex-col space-y-3">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary font-medium px-4 py-2 rounded-md hover:bg-gray-50"
              onClick={toggleMenu}
            >
              Início
            </Link>
            <Link
              to="/sobre"
              className="text-gray-700 hover:text-primary font-medium px-4 py-2 rounded-md hover:bg-gray-50"
              onClick={toggleMenu}
            >
              Sobre
            </Link>
            <Link
              to="/servicos"
              className="text-gray-700 hover:text-primary font-medium px-4 py-2 rounded-md hover:bg-gray-50"
              onClick={toggleMenu}
            >
              Serviços
            </Link>
            <details className="group">
              <summary className="text-gray-700 hover:text-primary font-medium px-4 py-2 rounded-md hover:bg-gray-50 flex items-center justify-between cursor-pointer">
                Galeria
                <ChevronDown size={14} className="group-open:rotate-180 transition-transform" />
              </summary>
              <div className="pl-6 mt-1 space-y-1">
                <Link
                  to="/galeria"
                  className="block text-gray-700 hover:text-primary font-medium px-4 py-2 rounded-md hover:bg-gray-50"
                  onClick={toggleMenu}
                >
                  Todos os Projetos
                </Link>
                <Link
                  to="/galeria?categoria=cozinha"
                  className="block text-gray-700 hover:text-primary font-medium px-4 py-2 rounded-md hover:bg-gray-50"
                  onClick={toggleMenu}
                >
                  Cozinhas
                </Link>
                <Link
                  to="/galeria?categoria=banheiro"
                  className="block text-gray-700 hover:text-primary font-medium px-4 py-2 rounded-md hover:bg-gray-50"
                  onClick={toggleMenu}
                >
                  Banheiros
                </Link>
                <Link
                  to="/galeria?categoria=escada"
                  className="block text-gray-700 hover:text-primary font-medium px-4 py-2 rounded-md hover:bg-gray-50"
                  onClick={toggleMenu}
                >
                  Escadas
                </Link>
              </div>
            </details>
            <Button
              onClick={() => {
                handleWhatsAppContact();
                toggleMenu();
              }}
              className="text-gray-700 hover:text-primary font-medium px-4 py-2 rounded-md hover:bg-gray-50 text-left flex items-center"
              variant="ghost"
            >
              <Phone className="mr-2" size={16} />
              Contato
            </Button>
            <Link
              to="/orcamento"
              className="bg-secondary hover:bg-secondary/90 text-white font-medium px-4 py-2 rounded-md text-center"
              onClick={toggleMenu}
            >
              Solicitar Orçamento
            </Link>
            <Link
              to="/login"
              className="border border-primary text-primary hover:bg-primary/10 font-medium px-4 py-2 rounded-md text-center flex items-center justify-center gap-2"
              onClick={toggleMenu}
            >
              <User size={16} /> Área do Colaborador
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
