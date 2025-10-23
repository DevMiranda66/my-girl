// app/api/save-chat-data/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Parsear el cuerpo del request
    const data = await request.json();

    console.log("📥 Datos recibidos desde el front:", data);

    // Aquí podrías guardar en una base de datos o enviar a un servicio externo.
    // Por ahora solo devolvemos un éxito para verificar la conexión.

    return NextResponse.json(
      { message: "✅ Datos recibidos correctamente en el backend", data },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ Error al procesar los datos:", error);
    return NextResponse.json(
      { message: "❌ Error en el servidor", error: error.message },
      { status: 500 }
    );
  }
}
