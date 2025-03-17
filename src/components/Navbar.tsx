
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 w-full bg-white/90 backdrop-blur-sm shadow-sm z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-heading font-bold text-primary">Marmoraria Tech</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-marble-700 hover:text-secondary font-medium transition-colors">
            Início
          </Link>
          <Link to="/sobre" className="text-marble-700 hover:text-secondary font-medium transition-colors">
            Sobre
          </Link>
          <Link to="/servicos" className="text-marble-700 hover:text-secondary font-medium transition-colors">
            Serviços
          </Link>
          <Link to="/galeria" className="text-marble-700 hover:text-secondary font-medium transition-colors">
            Galeria
          </Link>
          <Link to="/contato" className="text-marble-700 hover:text-secondary font-medium transition-colors">
            Contato
          </Link>
          <Link to="/orcamento">
            <Button className="bg-secondary hover:bg-secondary/90 text-white">
              Solicitar Orçamento
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" className="flex items-center gap-2">
              <User size={18} /> Área do Cliente
            </Button>
          </Link>
        </nav>

        {/* Mobile Navigation Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-marble-700 hover:text-secondary"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg w-full py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <Link
              to="/"
              className="text-marble-700 hover:text-secondary font-medium px-4 py-2 rounded-md hover:bg-gray-100"
              onClick={toggleMenu}
            >
              Início
            </Link>
            <Link
              to="/sobre"
              className="text-marble-700 hover:text-secondary font-medium px-4 py-2 rounded-md hover:bg-gray-100"
              onClick={toggleMenu}
            >
              Sobre
            </Link>
            <Link
              to="/servicos"
              className="text-marble-700 hover:text-secondary font-medium px-4 py-2 rounded-md hover:bg-gray-100"
              onClick={toggleMenu}
            >
              Serviços
            </Link>
            <Link
              to="/galeria"
              className="text-marble-700 hover:text-secondary font-medium px-4 py-2 rounded-md hover:bg-gray-100"
              onClick={toggleMenu}
            >
              Galeria
            </Link>
            <Link
              to="/contato"
              className="text-marble-700 hover:text-secondary font-medium px-4 py-2 rounded-md hover:bg-gray-100"
              onClick={toggleMenu}
            >
              Contato
            </Link>
            <Link
              to="/orcamento"
              className="bg-secondary hover:bg-secondary/90 text-white font-medium px-4 py-2 rounded-md text-center"
              onClick={toggleMenu}
            >
              Solicitar Orçamento
            </Link>
            <Link
              to="/login"
              className="border border-gray-300 bg-white hover:bg-gray-50 text-marble-700 font-medium px-4 py-2 rounded-md text-center flex items-center justify-center gap-2"
              onClick={toggleMenu}
            >
              <User size={18} /> Área do Cliente
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
