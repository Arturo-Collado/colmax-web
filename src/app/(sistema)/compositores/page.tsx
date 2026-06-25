import { getCompositores } from "./actions"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BotonExportarPDF } from "@/components/boton-exportar-pdf"
import { CompositorFormModal } from "./compositor-form" 

export default async function CompositoresPage() {
  const compositores = await getCompositores()

  // Preparamos los datos crudos para inyectarlos en el PDF
  // CORRECCIÓN: Cambiamos c.id por c.id_compositor
  const datosParaPDF = compositores.map(c => [
    c.id_compositor.toString(), 
    c.nombre, 
    c.apellido, 
    c.correo, 
    c.regalias
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Compositores</h1>
          <p className="text-muted-foreground">Gestión de autores y porcentajes de regalías.</p>
        </div>
        <div className="flex gap-3">
          <BotonExportarPDF 
            titulo="Catálogo Oficial de Compositores - Colmax Record"
            columnas={["ID", "Nombre", "Apellido", "Correo", "Regalías"]}
            datos={datosParaPDF}
            nombreArchivo="Catalogo_Compositores"
          />
          <CompositorFormModal />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Apellido</TableHead>
                <TableHead>Correo</TableHead>
                <TableHead>Regalías Acordadas</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {compositores.map((c) => (
                // CORRECCIÓN: Cambiamos c.id por c.id_compositor en las llaves y celdas
                <TableRow key={c.id_compositor}>
                  <TableCell>#{c.id_compositor}</TableCell>
                  <TableCell className="font-bold">{c.nombre}</TableCell>
                  <TableCell>{c.apellido}</TableCell>
                  <TableCell>{c.correo}</TableCell>
                  <TableCell className="text-green-600 font-medium">{c.regalias}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}