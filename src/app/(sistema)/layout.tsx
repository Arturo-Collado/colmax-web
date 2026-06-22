import Link from "next/link"
import { Home, Users, FileText, Music, LogOut, Disc3, TrendingUp, DollarSign } from "lucide-react"

export default function SistemaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-slate-950 text-white flex flex-col shadow-xl">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <Disc3 className="h-8 w-8 text-blue-500 animate-[spin_10s_linear_infinite]" />
          <span className="text-xl font-bold tracking-widest text-white">COLMAX</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-6">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-slate-800 transition-colors text-slate-300 hover:text-white">
            <Home className="h-5 w-5 text-blue-400" /> Dashboard
          </Link>
          <Link href="/artistas" className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-slate-800 transition-colors text-slate-300 hover:text-white">
            <Users className="h-5 w-5 text-blue-400" /> Artistas
          </Link>
          <Link href="/contratos" className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-slate-800 transition-colors text-slate-300 hover:text-white">
            <FileText className="h-5 w-5 text-blue-400" /> Contratos
          </Link>
          <Link href="/catalogo" className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-slate-800 transition-colors text-slate-300 hover:text-white">
            <Music className="h-5 w-5 text-blue-400" /> Catálogo Musical
          </Link>
          <Link href="/compositores" className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-slate-800 transition-colors text-slate-300 hover:text-white">
            <Users className="h-5 w-5 text-blue-400" /> Compositores
          </Link>
          <Link href="/finanzas" className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-slate-800 transition-colors text-slate-300 hover:text-white">
            <TrendingUp className="h-5 w-5 text-blue-400" /> Finanzas y Reportes
          </Link>
          <Link href="/liquidaciones" className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-slate-800 transition-colors text-slate-300 hover:text-white">
            <DollarSign className="h-5 w-5 text-blue-400" /> Liquidaciones
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800 mb-2">
          <Link href="/login" className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-red-950 text-red-400 transition-colors">
            <LogOut className="h-5 w-5" /> Cerrar Sesión
          </Link>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-500 ease-in-out">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}