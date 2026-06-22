import { getAlbumes } from "./actions"
import { CatalogoFormModal } from "./catalogo-form"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default async function CatalogoPage() {
  const albumes = await getAlbumes()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Catálogo Musical</h1>
          <p className="text-muted-foreground">Gestiona los álbumes, EPs y sencillos de la disquera.</p>
        </div>
        <CatalogoFormModal />
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-24">ID</TableHead>
                <TableHead>Título del Álbum</TableHead>
                <TableHead>Artista</TableHead>
                <TableHead>Año</TableHead>
                <TableHead>Pistas</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {albumes.map((album) => (
                <TableRow key={album.id_album}>
                  <TableCell className="font-medium text-muted-foreground">#{album.id_album}</TableCell>
                  <TableCell className="font-bold">{album.titulo}</TableCell>
                  <TableCell>{album.artista}</TableCell>
                  <TableCell>{album.lanzamiento}</TableCell>
                  <TableCell>{album.pistas} tracks</TableCell>
                  <TableCell>
                    <Badge variant={album.estado === 'Publicado' ? 'default' : 'secondary'}>
                      {album.estado}
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