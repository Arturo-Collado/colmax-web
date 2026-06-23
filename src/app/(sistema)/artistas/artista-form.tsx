'use client'

import { useActionState, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PlusCircle, Loader2 } from "lucide-react"
import { guardarArtista } from "./actions"
import { toast } from "sonner"

export function ArtistaFormModal() {
  const [open, setOpen] = useState(false)
  const [state, formAction, isPending] = useActionState(guardarArtista, null)

  useEffect(() => {
    // Si la acción fue un éxito
    if (state?.success) {
      toast.success(state.message || "Artista registrado correctamente.")
      setOpen(false)
    } 
    // Si la acción devolvió un error (ej. faltan campos) lo mostramos en pantalla
    else if (state?.error) {
      toast.error(state.error)
    }
  }, [state])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2"><PlusCircle size={16} /> Nuevo Artista</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Registrar Nuevo Artista</DialogTitle>
          <DialogDescription>Completa los datos del artista para el catálogo.</DialogDescription>
        </DialogHeader>
        <form action={formAction} className="grid gap-4 py-4">
          
          {/* CAMPO 1: nombre_artistico */}
          <div className="grid gap-2">
            <Label htmlFor="nombre_artistico">Nombre Artístico</Label>
            <Input id="nombre_artistico" name="nombre_artistico" required placeholder="Ej. DJ Nova" />
          </div>

          {/* CAMPO 2: nombre_real (Este faltaba y es obligatorio para Supabase) */}
          <div className="grid gap-2">
            <Label htmlFor="nombre_real">Nombre Real</Label>
            <Input id="nombre_real" name="nombre_real" required placeholder="Ej. Carlos Mendoza" />
          </div>

          {/* CAMPO 3: genero_musical */}
          <div className="grid gap-2">
            <Label htmlFor="genero_musical">Género Musical</Label>
            <Input id="genero_musical" name="genero_musical" required placeholder="Ej. Urbano" />
          </div>

          <Button type="submit" disabled={isPending}>
            {isPending ? <Loader2 className="animate-spin mr-2" size={16} /> : "Guardar Artista"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}