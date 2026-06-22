'use server'

// Definimos la estructura exacta que retorna la acción
export interface AccionResultado {
  success: boolean;
  error?: string;
}

export async function getArtistas() {
  return [
    { id: 1, nombre: "DJ Nova", genero: "Urbano", contratos: 1 },
    { id: 2, nombre: "Luna", genero: "Pop", contratos: 1 },
    { id: 3, nombre: "The Vipers", genero: "Rock", contratos: 0 }
  ];
}

export async function eliminarArtista(id: number): Promise<AccionResultado> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  
  // Simulamos lógica de negocio
  if (id === 999) {
    return { success: false, error: "No se puede eliminar un artista con contratos vigentes." };
  }
  
  return { success: true };
}