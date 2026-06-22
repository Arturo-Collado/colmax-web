'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle, Loader2 } from "lucide-react"
import { toast } from "sonner"

export function BotonPagar({ artista, monto }: { artista: string, monto: number }) {
  const [pagado, setPagado] = useState(false)
  const [cargando, setCargando] = useState(false)

  const procesarPago = () => {
    setCargando(true)
    // Simulamos que contacta al banco por 1.5 segundos
    setTimeout(() => {
      setCargando(false)
      setPagado(true)
      toast.success(`Pago de C$ ${monto} procesado exitosamente a la cuenta de ${artista}.`)
    }, 1500)
  }

  if (pagado) {
    return (
      <Button variant="outline" size="sm" disabled className="gap-2 border-green-200 text-green-600">
        <CheckCircle size={14} /> Liquidado
      </Button>
    )
  }

  return (
    <Button variant="outline" size="sm" onClick={procesarPago} disabled={cargando} className="gap-2">
      {cargando ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle size={14} />}
      {cargando ? "Procesando..." : "Pagar"}
    </Button>
  )
}