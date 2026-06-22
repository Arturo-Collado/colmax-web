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
          <DialogDescription>Establece las fechas de inicio y vencimiento del acuerdo.</DialogDescription>
        </DialogHeader>
        
        <form action={formAction} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="artista">Nombre del Artista</Label>
            <Input id="artista" name="artista" placeholder="Ej. DJ Nova" required disabled={isPending} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="fecha_inicio">Fecha de Inicio</Label>
              <Input id="fecha_inicio" type="date" name="fecha_inicio" required disabled={isPending} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="fecha_fin">Fecha de Fin</Label>
              <Input id="fecha_fin" type="date" name="fecha_fin" required disabled={isPending} />
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