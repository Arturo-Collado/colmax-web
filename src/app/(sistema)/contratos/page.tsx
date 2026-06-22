import { getContratos } from "./actions"
import { ContratoFormModal } from "./contrato-form"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default async function ContratosPage() {
  const contratos = await getContratos()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Contratos</h1>
          <p className="text-muted-foreground">Administra los acuerdos legales y vencimientos de tus artistas.</p>
        </div>
        <ContratoFormModal />
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-24">ID</TableHead>
                <TableHead>Artista</TableHead>
                <TableHead>Fecha Inicio</TableHead>
                <TableHead>Fecha Fin</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contratos.map((contrato) => (
                <TableRow key={contrato.id_contrato}>
                  <TableCell className="font-medium text-muted-foreground">#{contrato.id_contrato}</TableCell>
                  <TableCell className="font-bold">{contrato.artista}</TableCell>
                  <TableCell>{contrato.fecha_inicio}</TableCell>
                  <TableCell>{contrato.fecha_fin}</TableCell>
                  <TableCell>
                    <Badge variant={contrato.estado === 'Vigente' ? 'default' : 'destructive'}>
                      {contrato.estado}
                    </Badge>
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