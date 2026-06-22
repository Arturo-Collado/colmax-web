import { getArtistas } from "./actions"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArtistaFormModal } from "./artista-form"
import { ArtistaAcciones } from "./artista-acciones"

// Definimos la estructura exacta para que TypeScript no arroje error
type Artista = {
  id_artista: number;
  nombre_artistico: string;
  nombre_real: string;
  genero_musical: string;
  estado: string;
};

export default async function ArtistasPage() {
  // Obtenemos los datos y le confirmamos a TypeScript qué forma tienen
  const artistas = await getArtistas() as Artista[];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Directorio de Artistas</h1>
          <p className="text-muted-foreground">Gestiona el talento musical registrado en el catálogo de Colmax.</p>
        </div>
        <ArtistaFormModal />
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-24">ID</TableHead>
                <TableHead>Nombre Artístico</TableHead>
                <TableHead>Nombre Real</TableHead>
                <TableHead>Género Musical</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {artistas.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No hay artistas registrados.
                  </TableCell>
                </TableRow>
              ) : (
                artistas.map((artista: Artista) => (
                  <TableRow key={artista.id_artista}>
                    <TableCell className="font-medium text-muted-foreground">#{artista.id_artista}</TableCell>
                    <TableCell className="font-bold">{artista.nombre_artistico}</TableCell>
                    <TableCell>{artista.nombre_real}</TableCell>
                    <TableCell>{artista.genero_musical}</TableCell>
                    <TableCell>
                      <Badge variant={artista.estado === 'Activo' ? 'default' : 'secondary'}>
                        {artista.estado}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <ArtistaAcciones id={artista.id_artista} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}