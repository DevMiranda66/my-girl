import type { ChatState } from '../types/chat'; 

const CHAT_STORAGE_KEY = 'birthday_chat_state_2024';

const INITIAL_STATE: ChatState = {
    isFinished: false,
    lastMessageId: 1,
    viewedItems: {},
    savedResponses: {},
    messages: []
};

export function getChatState(): ChatState {
    try {
        const storedState = localStorage.getItem(CHAT_STORAGE_KEY);
        if (storedState) {
            return JSON.parse(storedState) as ChatState;
        }
    } catch (error) {
        console.error("Error loading chat state from localStorage:", error);
    }
    return INITIAL_STATE;
}

export function saveChatState(state: ChatState): void {
    try {
        localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
        console.error("Error saving chat state to localStorage:", error);
    }
}

export function resetChatState(): void {
    try {
        localStorage.removeItem(CHAT_STORAGE_KEY);
        console.log("Chat state has been successfully reset.");
    } catch (error) {
        console.error("Error resetting chat state:", error);
    }
}
export { INITIAL_STATE };

export function getSavedResponses(): Record<string, string> {
    const state = getChatState();
    return state.savedResponses;
}