'use server'

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

export async function guardarArtista(prevState: any, formData: FormData): Promise<AccionResultado> {
  // Simulamos el tiempo de carga del servidor
  await new Promise((resolve) => setTimeout(resolve, 800));
  return { success: true };
}

export async function eliminarArtista(id: number): Promise<AccionResultado> {
  // Simulamos el tiempo de carga del servidor
  await new Promise((resolve) => setTimeout(resolve, 800));
  
  if (id === 999) {
    return { success: false, error: "No se puede eliminar un artista con contratos vigentes." };
  }
  
  return { success: true };
}