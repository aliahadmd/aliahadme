import { Link, useLocation } from "react-router";
import { useState } from "react";
import { MermaidInit } from "./MermaidInit";

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { to: "/", label: "about me", exact: true },
    { to: "/throughts", label: "throughts" },
    { to: "/projects", label: "projects" },
    { to: "/awards", label: "awards" },
  ];

  const getLinkClass = (path: string, exact?: boolean) => {
    const active = exact 
      ? isActive("/") && !isActive("/throughts") && !isActive("/projects") && !isActive("/awards")
      : isActive(path);
    return active ? "text-green-600 italic" : "text-black hover:text-green-600 italic";
  };

  return (
    <>
      <MermaidInit />
      <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-300">
        <h1 className="text-lg font-semibold">Portfolio</h1>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 hover:bg-gray-100 rounded"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {mobileMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-b border-gray-300 p-4" style={{ backgroundColor: '#f0eee6' }}>
          <ul className="space-y-3">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={getLinkClass(link.to, link.exact)}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Desktop Sidebar */}
      <nav className="hidden md:block w-64 border-r border-gray-300 p-8 flex-shrink-0">
        <ul className="space-y-2">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={getLinkClass(link.to, link.exact)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-8 max-w-4xl w-full">
        {children}
        
        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} MD Ahad Ali. All rights reserved.
        </footer>
      </main>
    </div>
    </>
  );
}

