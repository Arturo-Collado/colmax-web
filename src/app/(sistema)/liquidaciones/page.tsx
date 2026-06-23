import { getVentas } from './actions'; 
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BotonPagar } from "./boton-pagar"

export default async function LiquidacionesPage() {
  // Obtenemos los datos reales de Supabase
  const ventas = await getVentas();

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
                <TableHead>Detalle/Tipo</TableHead>
                <TableHead>Ganancia</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Acción</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ventas.map((l: any) => (
                <TableRow key={l.id_venta}>
                  <TableCell>#{l.id_venta}</TableCell>
                  <TableCell className="font-bold">{l.tipo}</TableCell>
                  <TableCell className="font-mono font-bold text-red-600">
                    {new Intl.NumberFormat('es-NI', { style: 'currency', currency: 'NIO' }).format(Number(l.ganancia))}
                  </TableCell>
                  <TableCell>{new Date(l.fecha_evento).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {/* Aquí puedes mantener tu lógica de pago */}
                    <BotonPagar artista={l.tipo} monto={Number(l.ganancia)} />
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