import React from 'react';
import { RiCloseCircleFill, RiImageFill, RiVideoFill } from 'react-icons/ri';

type MediaModalProps = {
    isOpen: boolean;
    onClose: () => void;
    content: string; 
    type: 'image_onetime' | 'video_onetime';
};

const MediaModal: React.FC<MediaModalProps> = ({ isOpen, onClose, content, type }) => {
    if (!isOpen) return null;

    const isImage = type === 'image_onetime';

    const isImagePath = isImage && (content.endsWith('.png') || content.endsWith('.jpg') || content.endsWith('.jpeg') || content.endsWith('.gif'));

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm" onClick={onClose}>
            
            {}
            <div 
                className="bg-white rounded-xl shadow-2xl max-w-lg w-11/12 p-6 transform transition-all scale-100"
                onClick={(e) => e.stopPropagation()} 
            >
                
                {}
                <div className="flex items-center justify-between border-b pb-3 mb-4">
                    <div className="flex items-center">
                        {isImage ? (
                            <RiImageFill size={24} className="text-pink-500 mr-2" />
                        ) : (
                            <RiVideoFill size={24} className="text-pink-500 mr-2" />
                        )}
                        <h3 className="text-xl font-bold text-gray-800">Contenido Exclusivo</h3>
                    </div>
                    
                    {}
                    <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition-colors">
                        <RiCloseCircleFill size={30} />
                    </button>
                </div>

                {}
                <div className="mt-4 text-center">
                    <p className="text-gray-600 mb-3 font-semibold">
                        {isImage ? "¡Tu Foto de una sola vez!" : "¡Tu Video de una sola vez!"}
                    </p>
                    
                    {}
                    {isImagePath ? (
                        <div className="w-full max-h-96 overflow-hidden rounded-lg shadow-inner mb-3 flex justify-center items-center p-2 bg-gray-100">
                            <img 
                                src={content} 
                                alt="Contenido Exclusivo" 
                                className="max-w-full max-h-full object-contain" 
                                onError={(e) => {
                                    (e.target as HTMLImageElement).onerror = null; 
                                    (e.target as HTMLImageElement).src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='; 
                                    (e.target as HTMLImageElement).alt = "Error al cargar la imagen. Mostrando URL.";
                                }}
                            />
                        </div>
                    ) : (
                        <textarea
                            readOnly
                            value={content}
                            className="w-full h-24 p-3 border rounded-lg bg-gray-100 text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-pink-300"
                            placeholder="Aquí iría la URL del contenido (ej: video de YouTube o un enlace)"
                        />
                    )}
                    
                    <p className="text-xs text-red-500 mt-2 italic">
                        Una vez que cierres esta ventana, no podrás verlo de nuevo.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default MediaModal;