
import React from 'react';
import { RiArrowLeftLine, RiMenuFoldLine, RiBugFill, RiDatabase2Fill } from 'react-icons/ri';
import { resetChatState, getSavedResponses } from '../utils/storage'; 

type SidebarProps = {
    onClose: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {

    const handleDebugClick = () => {
        const responses = getSavedResponses();
        const responseText = Object.keys(responses)
            .map(key => `${key}: "${responses[key]}"`)
            .join('\n');

        if (responseText) {
            alert(`--- Respuestas Guardadas ---\n${responseText}\n\n(Doble click en el botón 'BUG' para reiniciar el chat)`);
        } else {
            alert("Aún no hay respuestas guardadas.\n\n(Doble click en el botón 'BUG' para reiniciar el chat)");
        }
    };
    
    const handleReset = () => {
        if (window.confirm("⚠️ ¿Estás seguro de que quieres REINICIAR el chat? Esto borrará TODO el progreso guardado.")) {
             resetChatState();
             window.location.reload(); 
        }
    }


    return (
        <div className="w-1/4 min-w-[280px] bg-pink-50 border-r border-pink-200 flex flex-col">
            
            {}
            <div className="p-4 flex justify-between items-center bg-white border-b border-pink-200">
                <h2 className="text-xl font-['Pacifico'] text-pink-600">Chats 💖</h2>
                <button 
                    onClick={onClose} 
                    className="text-gray-500 hover:text-pink-500 transition-colors"
                    title="Volver a la Flor"
                >
                    <RiArrowLeftLine size={24} />
                </button>
            </div>
            
            {}
            <div className="p-4 bg-pink-100/50 hover:bg-pink-100 transition-colors cursor-pointer border-l-4 border-pink-500">
                <div className="flex items-center">
                    <span className="relative inline-block mr-3">
                        {}
                        <i className="ri-heart-fill ri-xl text-pink-500"></i> 
                        {}
                        <span className="absolute top-0 right-0 block w-2 h-2 bg-yellow-400 rounded-full ring-2 ring-pink-50"></span>
                    </span>
                    <div>
                        <p className="font-semibold text-gray-800">Mi Amor (Cumpleaños #19 🎂)</p>
                        <p className="text-sm text-gray-500 italic">¡Te estoy escribiendo ahora mismo...</p>
                    </div>
                </div>
            </div>
            
            {}
            <div className="flex-grow">
                {}
            </div>

            {}
            <div className="p-4 w-full border-t border-pink-200 bg-pink-50">
                <p className="text-xs text-gray-400 text-center mb-2 font-sans">
                    Hecho con mucho amor ❤️
                </p>
                <div className="flex justify-center space-x-4">
                    {}
                    <button
                        onClick={handleDebugClick}
                        className="opacity-0 focus:opacity-100 transition-opacity p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 shadow-md"
                        title="Clic para ver las respuestas guardadas"
                    >
                        <RiDatabase2Fill size={20} />
                    </button>

                    {}
                    <button
                        onDoubleClick={handleReset} 
                        className="opacity-0 focus:opacity-100 transition-opacity p-2 rounded-full bg-red-500 text-white hover:bg-red-600 shadow-md"
                        title="Doble clic para REINICIAR el chat"
                    >
                        <RiBugFill size={20} />
                    </button>
                </div>
            </div>


            {}
            <div className="p-4 text-center text-sm text-gray-400 border-t border-pink-200">
                Próximamente: Álbum de Fotos & Más Sorpresas...
            </div>
        </div>
    );
};

export default Sidebar;