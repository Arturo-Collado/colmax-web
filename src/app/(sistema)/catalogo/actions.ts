'use server'

export async function getAlbumes() {
  return [
    { id_album: 1, titulo: "Noches Urbanas", artista: "DJ Nova", lanzamiento: "2024", pistas: 12, estado: "Publicado" },
    { id_album: 2, titulo: "Ecos del Ayer", artista: "Luna", lanzamiento: "2025", pistas: 8, estado: "En Producción" },
    { id_album: 3, titulo: "Resonancia", artista: "The Vipers", lanzamiento: "2023", pistas: 10, estado: "Publicado" }
  ];
}

export async function guardarAlbum(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { success: true, message: "Nuevo álbum añadido al catálogo de la disquera." };
}