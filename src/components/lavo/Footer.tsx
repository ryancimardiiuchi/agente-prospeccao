import { Link } from "@/lib/nav";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="lv-footer">
      <div className="lv-container lv-footer__grid">
        <div>
          <Logo light />
          <p className="lv-footer__tag">Você chega em casa. A roupa não precisa chegar com você.</p>
        </div>
        <nav aria-label="Rodapé: site">
          <h4>Site</h4>
          <Link to="/servicos">Serviços</Link>
          <Link to="/precos">Preços</Link>
          <Link to="/como-funciona">Como funciona</Link>
          <Link to="/sobre">Sobre nós</Link>
          <Link to="/contato">Contato</Link>
        </nav>
        <nav aria-label="Rodapé: sua conta">
          <h4>Sua conta</h4>
          <Link to="/login">Entrar</Link>
          <Link to="/cadastro">Criar conta</Link>
          <Link to="/carrinho">Meu pedido</Link>
          <Link to="/historico">Histórico</Link>
          <Link to="/chat">Chat</Link>
        </nav>
      </div>
      <div className="lv-container lv-footer__bottom">
        <span>© {new Date().getFullYear()} Lavô+ | Lavanderia Online</span>
      </div>
    </footer>
  );
}
