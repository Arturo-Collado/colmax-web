'use client'

import { useActionState, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { UserPlus, Loader2 } from "lucide-react"
import { guardarCompositor } from "./actions"
import { toast } from "sonner"

export function CompositorFormModal() {
  const [open, setOpen] = useState(false)
  const [state, formAction, isPending] = useActionState(guardarCompositor, null)

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
          <UserPlus size={16} /> Nuevo Compositor
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Registrar Compositor</DialogTitle>
          <DialogDescription>Añade un nuevo autor para gestionar sus regalías de catálogo.</DialogDescription>
        </DialogHeader>
        
        <form action={formAction} className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="nombre">Nombre</Label>
              <Input id="nombre" name="nombre" placeholder="Ej. Juan" required disabled={isPending} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="apellido">Apellido</Label>
              <Input id="apellido" name="apellido" placeholder="Ej. Pérez" required disabled={isPending} />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="correo">Correo Electrónico</Label>
            <Input id="correo" name="correo" type="email" placeholder="juan@correo.com" required disabled={isPending} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="regalias">Porcentaje de Regalías (%)</Label>
            <Input id="regalias" name="regalias" type="number" min="0" max="100" placeholder="Ej. 15" required disabled={isPending} />
          </div>
          <Button type="submit" className="mt-4" disabled={isPending}>
            {isPending ? <span className="flex items-center gap-2"><Loader2 className="animate-spin h-4 w-4"/> Guardando...</span> : "Guardar Compositor"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}