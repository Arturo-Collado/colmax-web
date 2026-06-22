'use client'

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import { toast } from "sonner"

interface ExportProps {
  titulo: string;
  columnas: string[];
  datos: (string | number)[][];
  nombreArchivo: string;
}

export function BotonExportarPDF({ titulo, columnas, datos, nombreArchivo }: ExportProps) {
  const exportar = () => {
    const doc = new jsPDF()
    
    // Título del documento
    doc.setFontSize(18)
    doc.text(titulo, 14, 22)
    
    // Generar la tabla con el color primario de Colmax (RNF-CV-03)
    autoTable(doc, {
      startY: 30,
      head: [columnas],
      body: datos,
      theme: 'grid',
      headStyles: { fillColor: [44, 62, 80] } 
    })
    
    // Descargar el archivo
    doc.save(`${nombreArchivo}.pdf`)
    toast.success("Documento PDF generado y descargado exitosamente.")
  }

  return (
    <Button onClick={exportar} className="gap-2">
      <Download size={16} /> Exportar PDF
    </Button>
  )
}