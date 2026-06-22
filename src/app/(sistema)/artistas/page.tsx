import { getArtistas } from "./actions"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArtistaFormModal } from "./artista-form"
import { ArtistaAcciones } from "./artista-acciones"

// Definimos el tipo exacto para TypeScript
type Artista = {
  id_artista: number;
  nombre_artistico: string;
  nombre_real: string;
  genero_musical: string;
  estado: string;
}

export default async function ArtistasPage() {
  const artistas = await getArtistas()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Catálogo de Artistas</h1>
          <p className="text-muted-foreground">Gestiona el talento registrado en la disquera.</p>
        </div>
        {/* Componente Modal de Creación */}
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
                <TableHead>Género</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {artistas.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
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
                      {/* Componente Menú Desplegable con las acciones por artista */}
                      <ArtistaAcciones id={artista.id_artista} nombre={artista.nombre_artistico} />
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