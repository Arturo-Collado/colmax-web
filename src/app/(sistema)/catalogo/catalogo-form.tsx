'use client'

import { useActionState, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Disc3 } from "lucide-react"
import { guardarAlbum } from "./actions"
import { toast } from "sonner"

export function CatalogoFormModal() {
  const [open, setOpen] = useState(false)
  const [state, formAction, isPending] = useActionState(guardarAlbum, null)

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message)
      setOpen(false)
    } else if (state?.error) {
      toast.error(state.error) // Agregamos esto para que te avise si hay un error
    }
  }, [state])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Disc3 size={16} />
          Nuevo Lanzamiento
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Registrar Lanzamiento</DialogTitle>
          <DialogDescription>Añade un nuevo álbum o EP al catálogo oficial de Colmax.</DialogDescription>
        </DialogHeader>
        
        <form action={formAction} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="titulo">Título del Álbum</Label>
            <Input id="titulo" name="titulo" required disabled={isPending} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="artista">Artista / Banda</Label>
            <Input id="artista" name="artista" required disabled={isPending} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              {/* CORRECCIÓN AQUÍ: Cambiamos htmlFor, id y name a "lanzamiento" */}
              <Label htmlFor="lanzamiento">Año de Lanzamiento</Label>
              <Input id="lanzamiento" name="lanzamiento" type="number" min="2000" max="2030" required disabled={isPending} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pistas">Cant. de Pistas</Label>
              <Input id="pistas" name="pistas" type="number" min="1" required disabled={isPending} />
            </div>
          </div>
          <Button type="submit" className="mt-4" disabled={isPending}>
            {isPending ? <span className="flex items-center gap-2"><Disc3 className="animate-spin h-4 w-4"/> Guardando...</span> : "Guardar Lanzamiento"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}