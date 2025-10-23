import type { ChatMessage } from '../types/chat';

const FOTO_1_URL = "/lindos.jpg"; 
const FOTO_2_URL = "/lindos.jpg"; 
const VIDEO_URL = "/x.mp4"; 
const AUDIO_CONTENT = "/music.m4a"; 

export const chatScript: ChatMessage[] = [
    { 
        id: 1, 
        sender: 'me', 
        type: 'text', 
        content: "Hola mi niña preciosa... hoy es un dia especial.. si es tu cumpleaños",
        nextId: 2
    },
    { 
        id: 2, 
        sender: 'me', 
        type: 'text', 
        content: "Feliz cumpleaños mi niña quiero que la pases muy bien",
        nextId: 3
    },
    { 
        id: 3, 
        sender: 'me', 
        type: 'text', 
        content: "Bueno al grano moria por darte un regalo pero mi mente me gano :( no se que darte mi niña asi que me tome el tiempo de hacer esto",
        nextId: 4
    },
    
    { 
        id: 4, 
        sender: 'system', 
        type: 'options', 
        content: "Elige una opción para responderle a tu niño...",
        options: [
            { text: "No pasa nada amor", nextId: 5 }, 
            { text: "No importa mi niño", nextId: 5 }, 
        ]
    },
    { 
        id: 5, 
        sender: 'me', 
        type: 'text', 
        content: "Que bien amor jajaja pero aun asi quiero regalarte algo aunque no se aun",
        nextId: 6
    },

    { 
        id: 6, 
        sender: 'system', 
        type: 'options', 
        content: "Elige la siguiente pista para tu niño...",
        options: [
            { text: "Lo que quieras me gustaria", nextId: 11 }, 
            { text: "Pss sigue pensando", nextId: 21 }, 
        ]
    },

    { 
        id: 11, 
        sender: 'me', 
        type: 'text', 
        content: "Aww tan linda amor pero por mi parte te regalaria todo el mundo",
        nextId: 30 
    },

    { 
        id: 21, 
        sender: 'me', 
        type: 'text', 
        content: "JAJAJA amorrr eso intento pero ya, ya se que darte",
        nextId: 30 
    },

    { 
        id: 30, 
        sender: 'system', 
        type: 'options', 
        content: "Decide: ¿Quieres que te lo diga ya o seguir con el juego?",
        options: [
            { text: "Decir el regalo ya", nextId: 100 }, 
            { text: "Seguir con la conversacion", nextId: 400 }, 
        ]
    },

    
    { id: 100, sender: 'me', type: 'text', content: "Bueno mi amor como yo no sabria que decirte es mejor que elijas tu", nextId: 101 },
    {
        id: 101,
        sender: 'system',
        type: 'input_save',
        placeholder: "Escribe tu regalo deseado (OJO: Este mensaje se guardará)",
        saveKey: "regalo_deseado",
        nextId: 102,
        content: ''
    },
    { id: 102, sender: 'me', type: 'text', content: "Graciasss mi amorr, no importa lo que sea pero yo te lo dare", nextId: 103 },
    { id: 103, sender: 'me', type: 'text', content: "Aunque tengo una duda, ¿el regalo cuesta dinero??", nextId: 104 },
    
    { 
        id: 104, 
        sender: 'system', 
        type: 'options', 
        content: "¿Tu regalo es gratis o tiene costo?",
        options: [
            { text: "No, claro que no amor", nextId: 201 }, 
            { text: "Un poco JAJAJA", nextId: 301 }, 
        ]
    },

    { 
        id: 201, 
        sender: 'me', 
        type: 'text', 
        content: "Ahh pasa nada mi niña solo era una duda Te amo", 
        nextId: 202 
    },
    { 
        id: 202, 
        sender: 'me', 
        type: 'final', 
        content: "¡Pronto te lo daré (Osea ahora mismo)! 🎁",
        nextId: 999 
    },

    { 
        id: 301, 
        sender: 'me', 
        type: 'text', 
        content: "AHhh no pasa nada amor yo te lo regalo", 
        nextId: 302 
    },
    { id: 302, sender: 'me', type: 'text', content: "Pero estoy bien lejitos para dartelo ¿cómo lo haria?", nextId: 303 },
    { 
        id: 303, 
        sender: 'system', 
        type: 'options', 
        content: "Elige la forma de recibirlo:",
        options: [
            { text: "Pero puedes comprarlo desde alla lejitos", nextId: 201 }, 
            { text: "Podrias transferirme (carita feliz)", nextId: 321 }, 
        ]
    },
    
    
    { id: 321, sender: 'me', type: 'text', content: "JAJAJA claro mi amor ¿por donde lo hago?", nextId: 322 },
    {
        id: 322,
        sender: 'system',
        type: 'input_save',
        placeholder: "Escribe la cuenta/monto (OJO: Este mensaje se guardará)",
        saveKey: "info_transferencia",
        nextId: 323,
        content: ''
    },
    { id: 323, sender: 'me', type: 'text', content: "¡Listo mi amor!", nextId: 202 }, 
    
    
    { id: 400, sender: 'me', type: 'text', content: "Que curiosita amor JAJAJA", nextId: 401 },
    { id: 401, sender: 'me', type: 'text', content: "Por eso te ganastes esto", nextId: 402 },
    { 
        id: 402, 
        sender: 'me', 
        type: 'image_onetime', 
        content: FOTO_1_URL,
        placeholder: "asi ando ahorita creando esto JAJAJA aun dudo si podria mandarte esto o tan siquiera terminarlo",
        saveKey: "foto1_visto", 
        nextId: 403 
    },
    {
        id: 403,
        sender: 'me', 
        type: 'input_save', 
        content: 'Escribe tu reacción a la foto 🥹', 
        placeholder: "Di que te parece (OJO: Este mensaje se guardará)",
        saveKey: "opinion_foto1",
        nextId: 404,
    },
    
    { 
        id: 404, 
        sender: 'system', 
        type: 'options', 
        content: "¿Qué quieres hacer ahora?",
        options: [
            { text: "Me da curiosidad que seguira despues", nextId: 410 }, 
            { text: "Decir el regalo ya", nextId: 100 }, 
        ]
    },
    
    { id: 410, sender: 'me', type: 'text', content: "No me sorprende que elijieras esa opcion JAJAJA pero bueno", nextId: 411 },
    { id: 411, sender: 'me', type: 'text', content: "Veamos que tan curiosa estas", nextId: 412 },
    { 
        id: 412, 
        sender: 'system', 
        type: 'options', 
        content: "Elige el siguiente elemento:",
        options: [
            { text: "Otra foto", nextId: 420 },
            { text: "Un video", nextId: 430 },
            { text: "Un audio", nextId: 440 },
        ]
    },
    
    { 
        id: 420, 
        sender: 'me', 
        type: 'image_onetime',
        content: FOTO_2_URL,
        placeholder: "Feliz cumpleaños mi niña... Te amo",
        saveKey: "foto2_visto",
        nextId: 450 
    },
    { 
        id: 430, 
        sender: 'me', 
        type: 'video_onetime',
        content: VIDEO_URL,
        placeholder: "Uy amor no esperabas que elijieras esto pero aca esta jajaja",
        saveKey: "video_visto",
        nextId: 450 
    },
    { 
        id: 440, 
        sender: 'me', 
        type: 'audio_onetime', // 👈 ¡CAMBIO AQUÍ!
        content: AUDIO_CONTENT, // '/music.m4a'
        placeholder: "Un mensaje de voz especial, ¡escucha con atención!", // Nuevo texto de placeholder
        saveKey: "audio_visto", // Clave para registrar que fue visto/escuchado
        nextId: 450 
    },
    
    {
        id: 450,
        sender: 'me', 
        type: 'input_save', 
        content: '¡Qué buena elección! Ahora, dime, ¿qué te pareció lo último? 🥺',
        placeholder: "Escribe tu reacción (OJO: Este mensaje se guardará)",
        saveKey: "reaccion_multimedia",
        nextId: 451,
    },
    { id: 451, sender: 'me', type: 'text', content: "Graciass amor Te amo pero ya veamos tu regalo", nextId: 452 },
    { 
        id: 452, 
        sender: 'system', 
        type: 'options', 
        content: "Ya es hora de la verdad.",
        options: [
            { text: "Decir el regalo ya", nextId: 100 }, 
        ]
    },

    { 
        id: 999, 
        sender: 'me', 
        type: 'final', 
        content: "¡Fin del juego! ¡Estoy muy feliz de haberte hecho esta sorpresa! Ahora presiona 'Volver' en el menú de la izquierda para ver tu regalo. 🥳",
        nextId: 1000 
    },
    { 
        id: 1000, 
        sender: 'system', 
        type: 'reset_button', 
        content: "Chat finalizado. Presiona aquí para reiniciar el estado (DEBUG ONLY).",
    },
];