
export type Sender = 'me' | 'her' | 'system';

export type MessageType = 
   'text' | 
   'options' |
   'audio' | 
   'image_onetime' |
   'video_onetime' |
   'input_save' |
   'final' |
   'reset_button'; 

export type ChatMessage = {
   id: number;
   sender: Sender; 
   type: MessageType; 
   content: string; 
   
   
   nextId?: number; 
   options?: { 
       text: string; 
       nextId: number; 
   }[];

   saveKey?: string; 
   placeholder?: string; 
};

export type ChatState = {
   messages: ChatMessage[]; 
   isFinished: boolean; 
   lastMessageId: number; 
   viewedItems: Record<string, boolean>; 
   savedResponses: Record<string, string>; 
};