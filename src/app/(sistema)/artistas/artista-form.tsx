'use client'

import { useActionState, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PlusCircle, Disc3 } from "lucide-react"
import { guardarArtista } from "./actions"
import { toast } from "sonner"

export function ArtistaFormModal() {
  const [open, setOpen] = useState(false)
  const [state, formAction, isPending] = useActionState(guardarArtista, null)

  // Escuchar si la acción del servidor fue exitosa para cerrar el modal
  useEffect(() => {
    if (state?.success) {
      toast.success(state.message)
      setOpen(false) // Cierra la ventana
    } else if (state?.error) {
      toast.error(state.error)
    }
  }, [state])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle size={16} />
          Nuevo Artista
        </Button>
      </DialogTrigger>
      
      {/* Corrección de Tailwind aplicada aquí */}
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Registrar Artista</DialogTitle>
          <DialogDescription>
            Ingresa los datos del nuevo talento. Haz clic en guardar cuando termines.
          </DialogDescription>
        </DialogHeader>
        
        <form action={formAction} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="nombre_artistico">Nombre Artístico</Label>
            <Input id="nombre_artistico" name="nombre_artistico" required disabled={isPending} />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="nombre_real">Nombre Real</Label>
            <Input id="nombre_real" name="nombre_real" required disabled={isPending} />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="genero_musical">Género Musical</Label>
            <Input id="genero_musical" name="genero_musical" placeholder="Ej. Electrónica, Pop" required disabled={isPending} />
          </div>

          <Button type="submit" className="mt-4" disabled={isPending}>
            {isPending ? (
              <span className="flex items-center gap-2"><Disc3 className="animate-spin h-4 w-4"/> Guardando...</span>
            ) : "Guardar Registro"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}