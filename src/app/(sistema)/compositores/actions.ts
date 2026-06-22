'use server'

export async function getCompositores() {
  return [
    { id: 1, nombre: "Roberto", apellido: "Carlos", correo: "roberto@mail.com", regalias: "15%" },
    { id: 2, nombre: "Elena", apellido: "Gómez", correo: "elena.g@mail.com", regalias: "10%" }
  ];
}

export async function guardarCompositor(prevState: any, formData: FormData) {
  // Simulamos carga de 1 segundo
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { success: true, message: "Compositor registrado con éxito en el sistema." };
}