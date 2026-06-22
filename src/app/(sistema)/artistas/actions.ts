'use server'

export interface AccionResultado {
  success: boolean;
  error?: string;
}

export async function getArtistas() {
  return [
    { 
      id_artista: 1, 
      nombre_artistico: "DJ Nova", 
      nombre_real: "Carlos Mendoza", 
      genero_musical: "Urbano", 
      estado: "Activo" 
    },
    { 
      id_artista: 2, 
      nombre_artistico: "Luna", 
      nombre_real: "Valeria Gómez", 
      genero_musical: "Pop", 
      estado: "Activo" 
    },
    { 
      id_artista: 3, 
      nombre_artistico: "The Vipers", 
      nombre_real: "Banda The Vipers", 
      genero_musical: "Rock", 
      estado: "Inactivo" 
    }
  ];
}

export async function guardarArtista(prevState: any, formData: FormData): Promise<AccionResultado> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return { success: true };
}

export async function eliminarArtista(id: number): Promise<AccionResultado> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  if (id === 999) {
    return { success: false, error: "No se puede eliminar un artista con contratos vigentes." };
  }
  return { success: true };
}