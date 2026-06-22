'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Trash2, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { eliminarArtista } from "./actions"

export function ArtistaAcciones({ id }: { id: number }) {
  const [isPending, setIsPending] = useState(false)

  const handleEliminar = async () => {
    setIsPending(true)
    try {
      const resultado = await eliminarArtista(id)

      // Validación tipada que satisface a TypeScript
      if (resultado && resultado.success === false && resultado.error) {
        toast.error(resultado.error)
      } else {
        toast.success("Artista dado de baja correctamente.")
      }
    } catch (err) {
      toast.error("Error al procesar la solicitud.")
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={handleEliminar} 
      disabled={isPending}
      className="text-red-500 hover:text-red-700 hover:bg-red-50"
    >
      {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
    </Button>
  )
}