import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getDashboardStats } from "@/lib/dashboard-data"
import { Users, FileWarning, DollarSign, TrendingUp, Music2, Disc } from "lucide-react"

export default async function DashboardPage() {
  const stats = await getDashboardStats()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Panel de Control</h1>
        <p className="text-muted-foreground">Bienvenido al sistema operativo de Colmax Record.</p>
      </div>

      {/* Fila de KPIs (Tarjetas Principales) - Req. 111 */}
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

      {/* Gráficas de Distribución (Req. 113 y 114) */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Distribución de Ingresos</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="space-y-4 p-4">
              {stats.ventasPorTipo.map((item) => {
                const porcentaje = stats.ventasTotales > 0 
                  ? (Number(item._sum.ganancia) / stats.ventasTotales) * 100 
                  : 0
                
                return (
                  <div key={item.tipo} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{item.tipo || 'Otros'}</span>
                      <span className="text-muted-foreground">{porcentaje.toFixed(1)}%</span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-500" 
                        style={{ width: `${porcentaje}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Accesos Directos</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <button className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors text-left">
              <div className="p-2 bg-primary/10 rounded-full text-primary"><Disc size={18}/></div>
              <div>
                <div className="font-medium text-sm">Nuevo Álbum</div>
                <div className="text-xs text-muted-foreground">Registrar lanzamiento musical</div>
              </div>
            </button>
            <button className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors text-left">
              <div className="p-2 bg-primary/10 rounded-full text-primary"><TrendingUp size={18}/></div>
              <div>
                <div className="font-medium text-sm">Cargar Ventas</div>
                <div className="text-xs text-muted-foreground">Importar datos de plataformas</div>
              </div>
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}