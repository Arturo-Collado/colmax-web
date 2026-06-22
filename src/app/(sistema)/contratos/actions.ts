'use server'

export async function getContratos() {
  return [
    { id_contrato: 101, artista: "DJ Nova", fecha_inicio: "15 Ene 2024", fecha_fin: "15 Ene 2025", estado: "Vigente" },
    { id_contrato: 102, artista: "The Vipers", fecha_inicio: "10 May 2022", fecha_fin: "10 May 2023", estado: "Vencido" },
    { id_contrato: 103, artista: "Luna", fecha_inicio: "01 Mar 2024", fecha_fin: "01 Mar 2026", estado: "Vigente" }
  ];
}

export async function guardarContrato(prevState: any, formData: FormData) {
  // Simulamos carga de 1 segundo para la UX
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { success: true, message: "Contrato registrado y vinculado correctamente." };
}