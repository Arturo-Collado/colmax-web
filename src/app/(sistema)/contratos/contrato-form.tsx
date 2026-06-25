'use client'

import { useActionState, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PlusCircle, Disc3 } from "lucide-react"
import { guardarContrato } from "./actions"
import { toast } from "sonner"

export function ContratoFormModal() {
  const [open, setOpen] = useState(false)
  const [state, formAction, isPending] = useActionState(guardarContrato, null)

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message)
      setOpen(false)
    } else if (state?.error) {
      toast.error(state.error)
    }
  }, [state])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle size={16} />
          Nuevo Contrato
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Registrar Contrato</DialogTitle>
          <DialogDescription>Asegúrate de poner el ID numérico del artista ya registrado.</DialogDescription>
        </DialogHeader>
        
        <form action={formAction} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="id_artista">ID del Artista</Label>
            {/* OJO A ESTE CAMBIO: Debe ser el ID (número) del artista porque es una tabla relacional */}
            <Input id="id_artista" type="number" name="id_artista" placeholder="Ej. 1" required disabled={isPending} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="fecha_de_inicio">Fecha de Inicio</Label>
              <Input id="fecha_de_inicio" type="date" name="fecha_de_inicio" required disabled={isPending} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="fecha_de_finalizacion">Fecha de Fin</Label>
              <Input id="fecha_de_finalizacion" type="date" name="fecha_de_finalizacion" required disabled={isPending} />
            </div>
          </div>
          <Button type="submit" className="mt-4" disabled={isPending}>
            {isPending ? <span className="flex items-center gap-2"><Disc3 className="animate-spin h-4 w-4"/> Procesando...</span> : "Guardar Contrato"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}