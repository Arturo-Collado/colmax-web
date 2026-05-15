import { LayoutDashboard, Users, Music, FileText, Settings, Disc3 } from "lucide-react";
import React from "react";

export default function SistemaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Navegación Lateral (Sidebar) */}
      <aside className="w-64 border-r bg-card px-4 py-6 flex-col hidden md:flex">
        <div className="flex items-center gap-2 mb-8 px-2">
          <Disc3 className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold tracking-tight text-foreground">Colmax Record</span>
        </div>
        
        <nav className="flex-1 space-y-2">
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
          <NavItem icon={<Users size={20} />} label="Artistas" />
          <NavItem icon={<Music size={20} />} label="Catálogo Musical" />
          <NavItem icon={<FileText size={20} />} label="Contratos" />
        </nav>

        <div className="mt-auto">
          <NavItem icon={<Settings size={20} />} label="Configuración" />
        </div>
      </aside>

      {/* Área Central Dinámica */}
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <button 
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-sm font-medium
        ${active 
          ? "bg-primary text-primary-foreground" 
          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
        }`}
    >
      {icon}
      {label}
    </button>
  );
}