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
    if (state?.success) {
      toast.success("Artista registrado correctamente.")
      setOpen(false)
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
          <div className="grid gap-2">
            <Label htmlFor="nombre">Nombre del Artista</Label>
            <Input id="nombre" name="nombre" required placeholder="Ej. DJ Nova" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="genero">Género Musical</Label>
            <Input id="genero" name="genero" required placeholder="Ej. Urbano" />
          </div>
          <Button type="submit" disabled={isPending}>
            {isPending ? <Loader2 className="animate-spin mr-2" size={16} /> : "Guardar Artista"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}