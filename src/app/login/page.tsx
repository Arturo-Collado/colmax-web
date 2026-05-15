'use client' // Importante: este componente ahora es del lado del cliente para manejar el estado

import { useActionState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Disc3, AlertCircle } from "lucide-react" // RNF-RV-03: Iconografía Lucide
import { loginAction } from "./actions"

export default function LoginPage() {
  // Vinculamos la acción del servidor con el estado del formulario
  // state contendrá lo que retorne la acción (errores, etc.)
  const [state, formAction, isPending] = useActionState(loginAction, null)

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-lg border-border">
        <CardHeader className="space-y-3 text-center">
          <div className="flex justify-center mb-2">
            <div className="p-3 bg-primary/10 rounded-full">
              <Disc3 className={`w-10 h-10 text-primary ${isPending ? 'animate-spin' : ''}`} />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Colmax Record</CardTitle>
          <CardDescription className="text-muted-foreground">
            Ingresa tus credenciales para acceder al sistema operativo
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form action={formAction} className="space-y-6">
            
            {/* RNF-FU-03: Mensaje de Error descriptivo si las credenciales fallan */}
            {state?.error && (
              <div className="flex items-center gap-2 p-3 text-sm font-medium text-destructive bg-destructive/10 rounded-md border border-destructive/20">
                <AlertCircle size={16} />
                <span>{state.error}</span>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="username">Usuario</Label>
              <Input 
                id="username" 
                name="username" // Este name debe coincidir con formData.get("username")
                placeholder="Ej. admin" 
                required 
                disabled={isPending}
                className="bg-muted/50 focus:ring-primary" // RNF-FU-07: Focus Highlighting
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input 
                id="password" 
                name="password" // Este name debe coincidir con formData.get("password")
                type="password" 
                placeholder="••••••••" 
                required 
                disabled={isPending}
                className="bg-muted/50 focus:ring-primary"
              />
            </div>

            {/* RNF-FU-02 y RNF-FU-05: Feedback visual al procesar */}
            <Button 
              type="submit" 
              className="w-full text-md h-11 font-semibold transition-all active:scale-[0.98]" 
              disabled={isPending}
            >
              {isPending ? (
                <div className="flex items-center gap-2">
                  <Disc3 className="animate-spin h-4 w-4" />
                  <span>Validando...</span>
                </div>
              ) : (
                "Iniciar Sesión"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}