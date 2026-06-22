'use server'
 
// 1. Simulamos la lectura de datos
export async function getArtistas() {
  // Devolvemos datos "quemados" solo para ver el diseño en Netlify
  return [
    { 
      id_artista: 1, 
      nombre_artistico: "DJ Nova", 
      nombre_real: "Carlos Méndez", 
      genero_musical: "Electrónica", 
      estado: "Activo" 
    },
    { 
      id_artista: 2, 
      nombre_artistico: "The Vipers", 
      nombre_real: "Banda", 
      genero_musical: "Rock", 
      estado: "Inactivo" 
    },
    { 
      id_artista: 3, 
      nombre_artistico: "Luna", 
      nombre_real: "Ana Silva", 
      genero_musical: "Pop", 
      estado: "Activo" 
    }
  ];
}

// 2. Simulamos el guardado (no hará nada real, pero la pantalla creerá que sí)
export async function guardarArtista(prevState: any, formData: FormData) {
  // Simulamos un retraso de 1 segundo para que se vea la animación de "Guardando..."
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  return { success: true, message: "Simulación: Artista guardado correctamente (Modo Diseño)." };
}

// 3. Simulamos la eliminación
export async function eliminarArtista(id: number) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { success: true };
}