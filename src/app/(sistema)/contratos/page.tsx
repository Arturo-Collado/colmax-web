import { getContratos } from './actions';
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Si tenías un botón o formulario para crear contratos importado aquí, 
// puedes volver a agregar su importación (ej. import ContratoForm from './contrato-form')

export default async function ContratosPage() {
  const contratos = await getContratos();

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contratos</h1>
          <p className="text-muted-foreground">Gestión de acuerdos legales con los artistas.</p>
        </div>
        {/* Si tenías tu botón de "Nuevo Contrato", ponlo aquí */}
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Folio</TableHead>
                <TableHead>Artista</TableHead>
                <TableHead>Fecha de Inicio</TableHead>
                <TableHead>Fecha de Finalización</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contratos.map((contrato: any) => (
                <TableRow key={contrato.id_contrato}>
                  <TableCell className="font-medium text-muted-foreground">
                    #{contrato.id_contrato}
                  </TableCell>
                  
                  {/* CORRECCIÓN 1: Renderizamos la propiedad string, no el objeto */}
                  <TableCell className="font-bold">
                    {contrato.artista?.nombre_artistico || "Desconocido"}
                  </TableCell>
                  
                  {/* CORRECCIÓN 2: Usamos los nombres reales de la BD y convertimos la Date a String */}
                  <TableCell>
                    {contrato.fecha_de_inicio ? new Date(contrato.fecha_de_inicio).toLocaleDateString() : 'N/A'}
                  </TableCell>
                  <TableCell>
                    {contrato.fecha_de_finalizacion ? new Date(contrato.fecha_de_finalizacion).toLocaleDateString() : 'N/A'}
                  </TableCell>
                  
                  <TableCell>
                    <Badge variant={contrato.estado === 'Vigente' ? 'default' : 'secondary'}>
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
  );
}