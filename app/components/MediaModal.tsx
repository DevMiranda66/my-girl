import React from 'react';
import { RiCloseCircleFill, RiImageFill, RiVideoFill, RiPlayCircleFill } from 'react-icons/ri'; // Importar RiPlayCircleFill

// 1. CORRECCIÓN PRINCIPAL: Agregar el tipo 'audio_onetime'
type MediaModalProps = {
    isOpen: boolean;
    onClose: () => void;
    content: string; 
    type: 'image_onetime' | 'video_onetime' | 'audio_onetime'; // ¡Tipo corregido!
};

const MediaModal: React.FC<MediaModalProps> = ({ isOpen, onClose, content, type }) => {
    // Usamos useRef para el audio y video si quieres que se detengan al cerrar. 
    // Por ahora, solo nos enfocaremos en el renderizado y el tipo.
    
    if (!isOpen) return null;

    const isImage = type === 'image_onetime';
    const isVideo = type === 'video_onetime';
    const isAudio = type === 'audio_onetime'; // Nuevo: Detección de audio

    // Detección de imagen (se mantiene para la etiqueta <img>)
    const isImagePath = isImage && (content.endsWith('.png') || content.endsWith('.jpg') || content.endsWith('.jpeg') || content.endsWith('.gif'));

    let title = "Contenido Exclusivo";
    let message = "¡Tu Contenido de una sola vez!";
    let Icon = RiImageFill; // Default

    // Lógica para asignar título e ícono basado en el tipo
    if (isImage) {
        title = "Foto Especial";
        message = "¡Tu Foto de una sola vez!";
        Icon = RiImageFill;
    } else if (isVideo) {
        title = "Video Especial";
        message = "¡Tu Video de una sola vez!";
        Icon = RiVideoFill;
    } else if (isAudio) {
        title = "Mensaje de Voz"; // Nuevo título
        message = "¡Tu Audio de una sola vez!"; // Nuevo mensaje
        Icon = RiPlayCircleFill; // Nuevo ícono para audio
    }

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm" 
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-xl shadow-2xl max-w-lg w-11/12 p-6 transform transition-all scale-100"
                onClick={(e) => e.stopPropagation()} 
            >
                
                <div className="flex items-center justify-between border-b pb-3 mb-4">
                    <div className="flex items-center">
                        <Icon size={24} className="text-pink-500 mr-2" />
                        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                    </div>
                    
                    <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition-colors">
                        <RiCloseCircleFill size={30} />
                    </button>
                </div>

                <div className="mt-4 text-center">
                    <p className="text-gray-600 mb-3 font-semibold">
                        {message}
                    </p>
                    
                    <div className="w-full max-h-96 overflow-hidden rounded-lg shadow-inner mb-3 flex justify-center items-center p-2 bg-gray-100">
                        {isImagePath ? (
                            <img 
                                src={content} 
                                alt={title} 
                                className="max-w-full max-h-full object-contain" 
                                onError={(e) => {
                                    (e.target as HTMLImageElement).onerror = null; 
                                    (e.target as HTMLImageElement).alt = "Error al cargar la imagen.";
                                }}
                            />
                        ) : isVideo ? (
                            <video 
                                controls 
                                src={content} 
                                className="max-w-full max-h-full object-contain"
                            >
                                Tu navegador no soporta la reproducción de video.
                            </video>
                        ) : isAudio ? ( // 2. NUEVO: Lógica de renderizado para Audio
                            <audio 
                                controls 
                                autoPlay // Opcional: para que inicie la reproducción automáticamente
                                src={content} 
                                className="w-full max-w-[90%] h-12 my-4"
                            >
                                Tu navegador no soporta el elemento de audio.
                            </audio>
                        ) : (
                            <p className="text-red-600">Error: El archivo multimedia no se pudo cargar.</p>
                        )}
                    </div>
                    
                    <p className="text-xs text-red-500 mt-2 italic">
                        Una vez que cierres esta ventana, no podrás verlo de nuevo.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default MediaModal;