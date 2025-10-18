
import React from 'react';
import Sidebar from './Sidebar';
import ChatPanel from './ChatPanel';

type CenterViewProps = {
  onClose: () => void; 
};

const CenterView: React.FC<CenterViewProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[9999] bg-pink-50 flex items-center justify-center p-4 font-['Dancing Script']">
      <div className="flex w-full h-full max-w-7xl max-h-[90vh] bg-white rounded-xl shadow-2xl overflow-hidden border border-pink-200">
        
        {}
        <Sidebar onClose={onClose} />
        
        {}
        <ChatPanel onClose={onClose} />
      </div>
    </div>
  );
};

export default CenterView;