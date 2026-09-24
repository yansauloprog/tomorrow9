import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <p className="footer-logo">
          <span className="footer-logo-word">Tomorrow</span>{" "}
          <span className="footer-logo-accent">at 9<span>↗</span></span>
        </p>
      </div>
      <div className="footer-grid">
        <div>
          <p className="micro-label">Come by</p>
          <address>Rua Viriato 9B<br />1050-227 Lisboa, Portugal</address>
        </div>
        <div>
          <p className="micro-label">Every day</p>
          <p>08:00–17:00</p>
          <a href="https://wa.me/351927703617" target="_blank" rel="noreferrer">+351 927 703 617</a>
        </div>
        <nav aria-label="Footer navigation">
          <a href="/#story">Our story</a>
          <Link to="/menu">The menu</Link>
          <a href="/#visit">Find us</a>
        </nav>
        <p className="footer-copy">© 2026 Tomorrow at 9<br />Lisbon, Portugal<br /><br />Food photography via Pexels.</p>
      </div>
    </footer>
  );
}