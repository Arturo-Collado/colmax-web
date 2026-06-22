import { getLiquidaciones } from "./actions"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BotonPagar } from "./boton-pagar"

export default async function LiquidacionesPage() {
  const liquidaciones = await getLiquidaciones()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Liquidaciones</h1>
          <p className="text-muted-foreground">Cálculo de pagos por reproducción (Streaming) a artistas.</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Folio</TableHead>
                <TableHead>Artista</TableHead>
                <TableHead>Reproducciones</TableHead>
                <TableHead>Tasa (NIO)</TableHead>
                <TableHead>Total a Pagar</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acción</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {liquidaciones.map((l) => (
                <TableRow key={l.id}>
                  <TableCell>#{l.id}</TableCell>
                  <TableCell className="font-bold">{l.artista}</TableCell>
                  <TableCell>{l.reproducciones.toLocaleString()}</TableCell>
                  <TableCell>{l.tasa}</TableCell>
                  <TableCell className="font-mono font-bold text-red-600">
                    {new Intl.NumberFormat('es-NI', { style: 'currency', currency: 'NIO' }).format(l.total)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={l.estado === 'Pagado' ? 'default' : 'destructive'}>{l.estado}</Badge>
                  </TableCell>
                  <TableCell>
                    {/* Condición: Si ya vino pagado de la base de datos, mostramos el botón bloqueado. Si no, mostramos nuestro botón dinámico */}
                    {l.estado === 'Pagado' ? (
                       <Button variant="outline" size="sm" disabled className="gap-2 text-muted-foreground">
                         <CheckCircle size={14} /> Liquidado
                       </Button>
                    ) : (
                       <BotonPagar artista={l.artista} monto={l.total} />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}