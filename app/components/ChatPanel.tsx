import React, { useState, useEffect, useRef, useMemo } from 'react';
import { RiSendPlaneFill, RiPlayCircleFill, RiImageFill, RiVideoFill, RiLockFill, RiEmotionHappyLine, RiRestartLine } from 'react-icons/ri';
import type { ChatMessage, ChatState } from '../types/chat';
import { chatScript } from '../data/chatScript';
import { getChatState, saveChatState, INITIAL_STATE } from '../utils/storage'; 
import Confetti from './Confetti'; 
import TextType from './TextType';
import MediaModal from './MediaModal'; 


type ChatBubbleProps = {
    message: ChatMessage;
    chatState: ChatState;
    isLastMessage: boolean; 
    isTyping: boolean;      
    onTypingComplete: (nextId: number) => void;
    onViewOneTime: (message: ChatMessage) => void; 
    onResetChat: () => void; 
};

const ChatBubble: React.FC<ChatBubbleProps> = ({ 
    message, 
    chatState, 
    isLastMessage,
    isTyping,
    onTypingComplete,
    onViewOneTime,
    onResetChat
}) => {
    const isMe = message.sender === 'me';
    const isSystem = message.sender === 'system';
    const isOneTime = message.type === 'image_onetime' || message.type === 'video_onetime';
    const isViewed = isOneTime && message.saveKey ? chatState.viewedItems[message.saveKey] : false;

    const baseClasses = "max-w-[75%] rounded-xl px-4 py-2 my-1 shadow-sm text-base leading-relaxed";
    const isFinalized = chatState.isFinished;
    const isTextType = message.type === 'text' || message.type === 'final';
    
    const shouldAnimate = isMe && isLastMessage && isTyping && !isFinalized && isTextType; 
    
    const handleViewOneTime = () => {
        if (isOneTime && message.saveKey) {
            onViewOneTime(message); 
        }
    };
    
    if (isSystem) {
        if (message.type === 'reset_button') {
            if (!isFinalized) return null;
            return (
                <div className="text-center w-full my-5">
                    <button 
                        onClick={onResetChat}
                        className="flex items-center mx-auto text-sm text-red-600 bg-red-100 p-2 rounded-lg font-semibold hover:bg-red-200 transition-colors"
                    >
                        <RiRestartLine size={18} className="mr-1" />
                        {message.content}
                    </button>
                </div>
            );
        }
        
        return (
            <div className="text-center w-full my-3">
                <span className="text-xs text-pink-500 bg-pink-100/70 p-2 rounded-lg italic font-semibold">
                    {message.content}
                </span>
            </div>
        );
    }
    
    if (message.type === 'audio') {
        return (
            <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`${baseClasses} ${
                    isMe 
                        ? 'bg-pink-500 text-white rounded-br-none' 
                        : 'bg-white text-gray-800 rounded-tl-none border border-gray-200'
                } flex items-center cursor-pointer hover:bg-pink-400 transition-colors`}>
                    <RiPlayCircleFill size={24} className="mr-3"/>
                    <span className="font-sans text-sm">Reproducir Audio ({message.content.split('/').pop()})</span>
                </div>
            </div>
        );
    }
    

    if (isOneTime) {
        const isLocked = isViewed || isFinalized; 
        const contentMessage = isViewed ? 'Ya Visto' : 'Ver una sola vez';
        
        return (
            <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div 
                    onClick={isLocked ? undefined : handleViewOneTime} 
                    className={`flex items-center p-3 my-1 rounded-xl shadow-md cursor-pointer transition-all ${
                        isLocked ? 'bg-gray-300 text-gray-600' : 'bg-pink-400 text-white hover:bg-pink-500'
                    }`}
                >
                    {isLocked ? (
                        <>
                            <RiLockFill size={20} className="mr-3"/>
                            <span className="font-semibold text-sm">{contentMessage}</span>
                        </>
                    ) : (
                        <>
                            {message.type === 'image_onetime' ? (
                                <RiImageFill size={20} className="mr-3"/>
                            ) : (
                                <RiVideoFill size={20} className="mr-3"/>
                            )}
                            <div>
                                <span className="font-semibold text-sm">{contentMessage}</span>
                                {}
                                <p className="text-xs opacity-80 mt-1">{message.placeholder || 'Contenido especial'}</p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        );
    }
    
    return (
        <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
            <div className={`${baseClasses} ${
                isMe 
                    ? 'bg-pink-500 text-white rounded-br-none' 
                    : 'bg-white text-gray-800 rounded-tl-none border border-gray-200'
            }`}>
                {shouldAnimate ? (
                    <TextType 
                        text={message.content}
                        typingSpeed={50}
                        showCursor={true}
                        cursorCharacter="_"
                        cursorClassName="text-white"
                        onComplete={() => onTypingComplete(message.nextId || 0)} 
                    />
                ) : (
                    message.content
                )}
                
                {}
                {message.id === 999 && chatState.isFinished && (
                    <div className="mt-3 pt-2 border-t border-pink-200/50 text-xs font-light italic">
                         <h4 className="font-bold mb-1">Resumen de Regalo:</h4>
                         <p>Regalo Deseado: **{chatState.savedResponses.regalo_deseado || 'No Especificado'}**</p>
                         {chatState.savedResponses.info_transferencia && (
                             <p>Transferencia: **{chatState.savedResponses.info_transferencia}**</p>
                         )}
                         <p className="mt-2 text-pink-700">Reacciones Guardadas: {Object.keys(chatState.savedResponses).filter(key => key.includes('opinion_') || key.includes('reaccion_')).length} entradas.</p>
                     </div>
                 )}
            </div>
        </div>
    );
};


type ChatInputProps = {
    isAwaitingInput: boolean;
    currentMessage?: ChatMessage;
    handleManualReply: (text: string, nextId: number) => void;
    handleSaveAndReply: (text: string, saveKey: string, nextId: number) => void;
    isChatFinished: boolean; 
    isTemporarilyBlocked: boolean; 
};

const ChatInput: React.FC<ChatInputProps> = ({ 
    isAwaitingInput, 
    currentMessage, 
    handleManualReply, 
    handleSaveAndReply, 
    isChatFinished,
    isTemporarilyBlocked 
}) => {
    const [inputText, setInputText] = useState('');
    const currentOptions = currentMessage?.options;
    const isSaveInput = currentMessage?.type === 'input_save';
    
    const isDisabled = isChatFinished || isTemporarilyBlocked || !isAwaitingInput;

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        const text = inputText.trim();
        if (isDisabled || text === '' || !currentMessage) return;

        if (isSaveInput && currentMessage.saveKey && currentMessage.nextId) {
            handleSaveAndReply(text, currentMessage.saveKey, currentMessage.nextId);
        } else {
             handleManualReply(text, currentMessage.nextId || (currentMessage.id + 1)); 
        }
        setInputText('');
    };
    
    if (isChatFinished) {
        return (
            <div className="p-3 bg-gray-100 border-t border-gray-200 flex items-center justify-center text-gray-500">
                <RiLockFill size={20} className="mr-2"/> Chat Bloqueado. ¡Disfruta tu regalo!
            </div>
        );
    }

    if (currentOptions && currentOptions.length > 0) {
        return (
            <div className="p-3 bg-pink-50 border-t border-pink-200 flex flex-wrap gap-2 justify-center">
                {currentOptions.map((option, index) => (
                    <button 
                        key={index}
                        onClick={() => handleManualReply(option.text, option.nextId)}
                        disabled={isDisabled} 
                        className={`font-semibold py-2 px-4 rounded-full shadow-md transition-all text-sm 
                            ${isDisabled 
                                ? 'bg-gray-400 text-gray-100 cursor-not-allowed' 
                                : 'bg-pink-400 text-white hover:bg-pink-500 transform hover:scale-105'}`
                        }
                    >
                        {option.text}
                    </button>
                ))}
            </div>
        );
    }

    if (isSaveInput) {
        return (
            <form onSubmit={handleSubmit} className="p-3 bg-pink-50 border-t border-pink-200 flex items-center">
                <button type="button" className="p-2 text-gray-500 hover:text-pink-500">
                    <RiEmotionHappyLine size={24} />
                </button>
                
                <input
                    type="text"
                    placeholder={currentMessage?.placeholder || "Escribe tu respuesta aquí..."}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    disabled={isDisabled}
                    className={`flex-grow mx-2 p-3 rounded-full border focus:outline-none shadow-inner ${
                        isDisabled ? 'bg-white/70 text-gray-500 cursor-not-allowed border-gray-200' : 'bg-white text-gray-800 border-pink-300'
                    }`}
                />

                <button 
                    type="submit"
                    disabled={isDisabled || inputText.trim() === ''}
                    className={`p-2 rounded-full text-white transition-colors shadow-lg ml-2 ${
                        isDisabled || inputText.trim() === ''
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-pink-500 hover:bg-pink-600'
                    }`}
                >
                    <RiSendPlaneFill size={24} />
                </button>
            </form>
        );
    }
    
    // 4. Bloqueo Temporal (Escribiendo/Auto-avance)
    if (!isAwaitingInput && isTemporarilyBlocked) {
        return (
            <div className="p-3 bg-pink-50 border-t border-pink-200 flex items-center justify-center text-gray-500">
                Esperando a que termine el mensaje...
            </div>
        );
    }
    
    // 5. Estado Desconocido / Por Defecto
    return null;
};


// --- 3. COMPONENTE CHAT PANEL PRINCIPAL (Ajustes de Flujo) ---

type ChatPanelProps = {
    onClose: () => void; 
}

const ChatPanel: React.FC<ChatPanelProps> = ({ onClose }) => {
    // CORRECCIÓN: Usar INITIAL_STATE de storage.ts
    const initialChatState = getChatState();
    
    const [chatState, setChatState] = useState<ChatState>({
        ...initialChatState,
        // CRÍTICO: Aseguramos que lastMessageId sea 1 si no hay estado.
        lastMessageId: initialChatState.lastMessageId || INITIAL_STATE.lastMessageId 
    });
    
    // CRÍTICO: La lista de mensajes se carga desde el estado persistido.
    const [messages, setMessages] = useState<ChatMessage[]>(chatState.messages || []);
    
    const [currentId, setCurrentId] = useState(chatState.lastMessageId);
    
    // isAwaitingInput es el estado necesario para que el input APROPIADO aparezca.
    const [isAwaitingInput, setIsAwaitingInput] = useState(false); 
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    // ESTADOS DEL MODAL MULTIMEDIA
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [modalType, setModalType] = useState<'image_onetime' | 'video_onetime'>('image_onetime');
    const [modalNextId, setModalNextId] = useState<number | null>(null);
    const [modalSaveKey, setModalSaveKey] = useState<string | null>(null);

    // Bloqueo temporal (typing o modal)
    const isTemporarilyBlocked = isTyping || isModalOpen; 


    const currentMessage = useMemo(() => {
        return chatScript.find(m => m.id === currentId);
    }, [currentId]);
    
    // Función para actualizar el estado y guardarlo en localStorage
    const updateChatState = (newState: Partial<ChatState>, newMessages?: ChatMessage[]) => {
        // CRÍTICO: Persistir el array de mensajes en el estado
        const updatedMessages = newMessages !== undefined ? newMessages : messages;
        
        // El nuevo ID debe tomarse de newState o del estado actual si no se proporciona
        const newLastMessageId = newState.lastMessageId !== undefined ? newState.lastMessageId : chatState.lastMessageId;

        const updatedState = { 
            ...chatState, 
            ...newState, 
            lastMessageId: newLastMessageId,
            messages: updatedMessages 
        };
        
        setChatState(updatedState);
        saveChatState(updatedState);
        
        // Si se pasan nuevos mensajes, actualizamos el state local
        if (newMessages !== undefined) {
            setMessages(newMessages);
        }
    };
    
    // Función de Reset para DEBUG
    const handleResetChat = () => {
        if (window.confirm("¿Estás seguro que quieres reiniciar el chat? Se perderá todo el progreso.")) {
            // Usa localStorage.removeItem con la clave correcta si no está en storage.ts
            // Aquí usamos la función del storage.ts para mayor limpieza (asumo que la importaste)
            localStorage.removeItem('birthday_chat_state_2024'); 
            
            setChatState(INITIAL_STATE); // Restaura al estado inicial limpio
            setMessages([]);
            setCurrentId(INITIAL_STATE.lastMessageId);
            setIsAwaitingInput(false);
            setIsTyping(false);
        }
    };

    // Lógica para el scroll automático
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    
    // Función que se llama cuando el TextType termina
    const handleTypingComplete = (nextId: number) => {
        setIsTyping(false);
        // Desactivar isAwaitingInput si el siguiente mensaje NO requiere input
        const nextMessage = chatScript.find(m => m.id === nextId);
        const nextRequiresInput = nextMessage?.type === 'options' || nextMessage?.type === 'input_save' || nextMessage?.type === 'image_onetime' || nextMessage?.type === 'video_onetime';

        // Solo actualiza el estado (lastMessageId) y el currentId, el useEffect se encargará del resto
        // No es necesario llamar a updateChatState aquí si lo hacemos en el useEffect por auto-avance.
        setCurrentId(nextId);
    };

    // --- Lógica del Modal Multimedia ---

    const handleViewAndAdvance = (message: ChatMessage) => {
        if (!message.saveKey || !message.nextId) return;

        setModalContent(message.content);
        setModalType(message.type as 'image_onetime' | 'video_onetime');
        setModalNextId(message.nextId);
        setModalSaveKey(message.saveKey);
        setIsModalOpen(true);
        // CRÍTICO: Bloqueamos la espera para que el input desaparezca mientras se ve el modal.
        setIsAwaitingInput(false); 
    };
    
    const handleModalClose = () => {
        setIsModalOpen(false);
        
        if (modalNextId && modalSaveKey) {
            // 1. MARCAR COMO VISTO Y ACTUALIZAR ESTADO (Persistencia del viewedItems)
            const updatedViewedItems = { ...chatState.viewedItems, [modalSaveKey]: true };
            
            // Usamos updateChatState para actualizar y guardar. NO actualizamos lastMessageId aquí.
            updateChatState({ 
                viewedItems: updatedViewedItems 
            });
            
            // 2. FORZAR AVANCE AL SIGUIENTE ID (El input_save o el que sea)
            // Esto desencadena el useEffect, el cual se encargará de:
            // a) Añadir el mensaje de input_save al historial.
            // b) Detectar que requiere input y activar isAwaitingInput(true).
            // c) Actualizar lastMessageId en el storage.
            setCurrentId(modalNextId);
            
            // CRÍTICO: NO TOCAMOS isAwaitingInput. Lo dejamos a cargo del useEffect.
        }
        
        // Limpiar estados del modal
        setModalNextId(null);
        setModalSaveKey(null);
        setModalContent('');
    };

    useEffect(() => {
        if (!currentMessage) return; 

        // 1. Lógica de Finalización (Debe ir PRIMERO)
        if (currentMessage.type === 'final') {
            updateChatState({ isFinished: true });
            setIsAwaitingInput(true); // Bloquea el input y el avance
            if (chatState.isFinished) return;
        }

        // 2. Control estricto de duplicación e historial
        const isAlreadyAdded = messages.some(m => m.id === currentMessage.id);
        
        if (!isAlreadyAdded) {
            // Añadir el mensaje al historial (y al estado persistido)
            const newMessages = [...messages, currentMessage];
            // setMessages(newMessages) y saveChatState(updatedState) se harán en updateChatState
            updateChatState({ lastMessageId: currentId }, newMessages); 
        } else if (chatState.isFinished) {
            // Si ya está agregado y terminó, no hacemos nada más.
            return; 
        }

        // 3. Controlar la pausa por interacción
        const requiresInput = 
            currentMessage.type === 'options' || 
            currentMessage.type === 'input_save' || 
            currentMessage.type === 'image_onetime' || 
            currentMessage.type === 'video_onetime'; 
            
        if (requiresInput) {
            setIsAwaitingInput(true);
            return; 
        } else {
             // Si el mensaje es tipo texto, audio, etc., DESACTIVAMOS la espera
             setIsAwaitingInput(false); 
        }
        
        // 4. Auto-avance (Si no requirió input ni era 'final')
        if (currentMessage.nextId) {
            const isMyMessage = currentMessage.sender === 'me';
            const isAnimatableText = currentMessage.type === 'text'; // 'final' ya se maneja arriba

            if (isMyMessage && isAnimatableText) { 
                // Inicia animación. handleTypingComplete avanzará el currentId.
                setIsTyping(true);
            } else {
                // Mensaje de 'her', 'system', o 'me' no animable (ej: audio)
                const delay = 1000;
                const timer = setTimeout(() => {
                    // Solo actualizamos el currentId, el updateChatState se hizo en el paso 2.
                    setCurrentId(currentMessage.nextId!);
                }, delay); 
                return () => clearTimeout(timer);
            }
        }
        
    }, [currentId, chatState.isFinished, messages.length]);
    
    
    // --- Lógica de Respuestas Manuales (Opciones y Textos) ---

    // Función para manejar la respuesta simple (botones)
    const handleManualReply = (text: string, nextId: number) => {
        // 1. Añadir la respuesta de 'ella'
        const herReply: ChatMessage = {
            id: Date.now(), // ID único
            sender: 'her',
            type: 'text',
            content: text,
            nextId: nextId 
        };
        const newMessages = [...messages, herReply];
        
        // 2. Reanudar el flujo y guardar el estado
        setIsAwaitingInput(false);
        // updateChatState actualiza lastMessageId, messages y guarda.
        updateChatState({ lastMessageId: nextId }, newMessages); 
        setCurrentId(nextId);
    };

    // Función para manejar la respuesta que se debe GUARDAR (Input de Texto)
    const handleSaveAndReply = (text: string, saveKey: string, nextId: number) => {
        // 1. Añadir la respuesta de 'ella'
        const herReply: ChatMessage = {
            id: Date.now(), // ID único
            sender: 'her',
            type: 'text',
            content: text,
            nextId: nextId 
        };
        const newMessages = [...messages, herReply];
        
        // 2. Guardar la respuesta y reanudar el flujo
        setIsAwaitingInput(false);
        updateChatState(
            { 
                lastMessageId: nextId,
                savedResponses: { ...chatState.savedResponses, [saveKey]: text } 
            }, 
            newMessages
        );
        setCurrentId(nextId);
    };


    return (
        <div className="flex flex-col w-3/4 relative bg-gray-50 border border-gray-200 rounded-lg shadow-2xl overflow-hidden h-[90vh]"> 
            
            {/* COMPONENTE DE CONFETI */}
            {chatState.isFinished && <Confetti />} 

            {/* Header del Chat */}
            <div className="p-4 bg-white border-b border-pink-200 flex justify-between items-center shadow-sm z-10">
                <div className="flex items-center">
                    <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center mr-3">
                        <RiEmotionHappyLine size={20} className="text-white"/>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">Mi Amor (Cumpleaños 🎂)</h3>
                </div>
                <div className="text-gray-500">
                    <button onClick={onClose} className="hover:text-pink-500 cursor-pointer text-xl">
                         {/* Puedes usar RiCloseLine si tienes el icono */}
                        X
                    </button>
                </div>
            </div>
            
            {/* Área de Mensajes */}
            <div className="flex-grow p-6 overflow-y-auto bg-pink-100/40 relative">
                <div className="flex flex-col space-y-3">
                    {messages.map((message, index) => (
                        <ChatBubble 
                            key={index} 
                            message={message} 
                            chatState={chatState}
                            isLastMessage={index === messages.length - 1}
                            isTyping={isTyping}
                            onTypingComplete={handleTypingComplete}
                            onViewOneTime={handleViewAndAdvance}
                            onResetChat={handleResetChat}
                        />
                    ))}
                    <div ref={chatEndRef} /> 
                </div>
            </div>
            
            {/* Área de Input y Opciones */}
            <ChatInput 
                isAwaitingInput={isAwaitingInput} 
                currentMessage={currentMessage}
                handleManualReply={handleManualReply}
                handleSaveAndReply={handleSaveAndReply}
                isChatFinished={chatState.isFinished} 
                isTemporarilyBlocked={isTemporarilyBlocked} // Nuevo
            />

            {/* MODAL DE VISUALIZACIÓN DE UNA SOLA VEZ */}
            <MediaModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                content={modalContent}
                type={modalType}
            />
        </div>
    );
};

export default ChatPanel;