import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { ChevronDown, LogOut, Menu, MessageCircle, Package, ShieldCheck, ShoppingBag, User, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Link, useGo, type AppPath } from "@/lib/nav";
import { Logo } from "./Logo";

const LINKS: { to: AppPath; label: string }[] = [
  { to: "/", label: "Início" },
  { to: "/servicos", label: "Serviços" },
  { to: "/precos", label: "Preços" },
  { to: "/como-funciona", label: "Como funciona" },
  { to: "/sobre", label: "Sobre nós" },
  { to: "/contato", label: "Contato" },
];

export function Navbar() {
  const { user, isAdmin, logout } = useAuth();
  const { count } = useCart();
  const go = useGo();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setOpen(false);
    setMenu(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menu) return;
    const onDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenu(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menu]);

  const sair = () => {
    logout();
    setMenu(false);
    go("/");
  };

  const cartButton = (
    <Link to="/carrinho" className="lv-btn lv-btn--ghost lv-cartbtn" aria-label={`Meu pedido, ${count} itens`}>
      <ShoppingBag size={18} />
      <span>Meu pedido</span>
      {count > 0 && <span className="lv-badge">{count}</span>}
    </Link>
  );

  return (
    <header className={`lv-nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="lv-container lv-nav__inner">
        <Logo />

        <nav className="lv-nav__links" aria-label="Principal">
          {LINKS.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "is-active" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="lv-nav__right">
          {cartButton}
          {user ? (
            <div className="lv-user" ref={menuRef}>
              <button
                type="button"
                className="lv-user__btn"
                aria-haspopup="menu"
                aria-expanded={menu}
                onClick={() => setMenu((v) => !v)}
              >
                <span className="lv-avatar">{user.nome.trim().charAt(0).toUpperCase()}</span>
                <span className="lv-user__name">{user.nome.split(" ")[0]}</span>
                <ChevronDown size={16} className={menu ? "is-flip" : ""} />
              </button>
              {menu && (
                <div className="lv-dropdown" role="menu">
                  <Link to="/perfil" role="menuitem">
                    <User size={16} /> Meu perfil
                  </Link>
                  <Link to="/historico" role="menuitem">
                    <Package size={16} /> Meus pedidos
                  </Link>
                  <Link to="/chat" role="menuitem">
                    <MessageCircle size={16} /> Chat
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" role="menuitem">
                      <ShieldCheck size={16} /> Área administrativa
                    </Link>
                  )}
                  <button type="button" role="menuitem" onClick={sair} className="is-danger">
                    <LogOut size={16} /> Sair
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="lv-btn lv-btn--primary">
              Entrar
            </Link>
          )}
          <button
            type="button"
            className="lv-burger"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div className={`lv-mobile ${open ? "is-open" : ""}`}>
        <nav className="lv-container" aria-label="Menu mobile">
          {LINKS.map((l) => (
            <Link key={l.label} to={l.to} activeOptions={{ exact: l.to === "/" }} activeProps={{ className: "is-active" }}>
              {l.label}
            </Link>
          ))}
          <Link to="/carrinho">Meu pedido {count > 0 && <span className="lv-badge">{count}</span>}</Link>
          {user ? (
            <>
              <Link to="/perfil">Meu perfil</Link>
              <Link to="/historico">Meus pedidos</Link>
              <Link to="/chat">Chat</Link>
              {isAdmin && <Link to="/admin">Área administrativa</Link>}
              <button type="button" onClick={sair}>
                Sair
              </button>
            </>
          ) : (
            <Link to="/login" className="lv-btn lv-btn--primary lv-btn--block">
              Entrar
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
