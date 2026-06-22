'use client'

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Trash, Edit } from "lucide-react"
import { eliminarArtista } from "./actions"
import { toast } from "sonner"

export function ArtistaAcciones({ id, nombre }: { id: number, nombre: string }) {
  
  const handleEliminar = async () => {
    if (window.confirm(`¿Estás seguro de que deseas desactivar a ${nombre}?`)) {
      const resultado = await eliminarArtista(id)
      
      if (resultado.error) {
        toast.error(resultado.error)
      } else {
        toast.success("Artista dado de baja correctamente.")
      }
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menú</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => alert("¡Aquí conectaremos el modal de edición!")}>
          <Edit className="mr-2 h-4 w-4" />
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleEliminar} className="text-red-600 focus:text-red-600">
          <Trash className="mr-2 h-4 w-4" />
          Dar de baja
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}