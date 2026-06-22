import { getReporteFinanciero } from "./actions"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { BotonExportarPDF } from "@/components/boton-exportar-pdf"

export default async function FinanzasPage() {
  const reportes = await getReporteFinanciero()

  // Preparamos los datos crudos para inyectarlos en el PDF
  const datosParaPDF = reportes.map(r => [
    r.plataforma, 
    r.fecha, 
    `C$ ${r.ingresos.toLocaleString('en-US', {minimumFractionDigits: 2})}`, 
    r.estado
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Finanzas y Reportes</h1>
          <p className="text-muted-foreground">Ingresos por plataforma y reportes fiscales (Nicaragua).</p>
        </div>
        
        {/* Aquí va nuestro botón dinámico */}
        <BotonExportarPDF 
          titulo="Reporte Financiero Consolidado - Colmax Record"
          columnas={["Plataforma", "Periodo", "Ingresos Brutos", "Estado"]}
          datos={datosParaPDF}
          nombreArchivo="Reporte_Finanzas_Colmax"
        />
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Plataforma / Origen</TableHead>
                <TableHead>Periodo</TableHead>
                <TableHead>Ingresos Brutos</TableHead>
                <TableHead>Estado Contable</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reportes.map((r, i) => (
                <TableRow key={i}>
                  <TableCell className="font-bold">{r.plataforma}</TableCell>
                  <TableCell>{r.fecha}</TableCell>
                  <TableCell className="font-mono text-green-600">
                    {new Intl.NumberFormat('es-NI', { style: 'currency', currency: 'NIO' }).format(r.ingresos)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={r.estado === 'Conciliado' ? 'default' : 'secondary'}>{r.estado}</Badge>
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