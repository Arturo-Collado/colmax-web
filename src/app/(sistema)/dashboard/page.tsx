import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getDashboardStats } from "@/lib/dashboard-data"
import { Users, FileWarning, DollarSign, TrendingUp, Disc } from "lucide-react"
import { GraficoIngresos } from "@/components/grafico-ingresos"
import Link from "next/link"

export default async function DashboardPage() {
  const stats = await getDashboardStats()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Panel de Control</h1>
        <p className="text-muted-foreground">Bienvenido al sistema operativo de Colmax Record.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-l-4 border-l-primary shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Artistas</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalArtistas}</div>
            <p className="text-xs text-muted-foreground">Talento registrado en catálogo</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-destructive shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas de Contratos</CardTitle>
            <FileWarning className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.contratosVencer}</div>
            <p className="text-xs text-muted-foreground">Vencimientos en los próximos 30 días</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas Globales</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat('es-NI', { style: 'currency', currency: 'NIO', maximumFractionDigits: 0 }).format(stats.ventasTotales)}
            </div>
            <p className="text-xs text-muted-foreground">Ingresos totales acumulados</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Distribución de Ingresos</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 h-72">
            <GraficoIngresos />
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Accesos Directos</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Link href="/catalogo" className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors text-left">
              <div className="p-2 bg-primary/10 rounded-full text-primary"><Disc size={18}/></div>
              <div>
                <div className="font-medium text-sm">Nuevo Álbum</div>
                <div className="text-xs text-muted-foreground">Registrar lanzamiento musical</div>
              </div>
            </Link>
            <Link href="/finanzas" className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors text-left">
              <div className="p-2 bg-primary/10 rounded-full text-primary"><TrendingUp size={18}/></div>
              <div>
                <div className="font-medium text-sm">Cargar Ventas</div>
                <div className="text-xs text-muted-foreground">Importar datos de plataformas</div>
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}