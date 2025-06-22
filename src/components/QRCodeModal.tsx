import React from 'react';
import { X, Smartphone, ExternalLink } from 'lucide-react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDemoClick = () => {
    window.open('https://nebula-decentralized-community-governance-app.rork.app', '_blank');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
        onClick={handleBackdropClick}
      />
      
      {/* Modal */}
      <div className="relative bg-black/95 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-6 sm:p-8 max-w-sm w-full mx-4 text-center animate-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          <X className="w-4 h-4 text-white" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-3 mx-auto mb-4">
            <Smartphone className="w-full h-full text-white" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Get the Nebula Mobile App
          </h3>
          <p className="text-gray-300 text-sm sm:text-base">
            Scan the QR code with your mobile device to access the DAO app
          </p>
        </div>

        {/* QR Code */}
        <div className="bg-white p-4 sm:p-6 rounded-xl mb-6 mx-auto max-w-xs">
          <img 
            src="/2025-06-22 16_13_18-Rork — vibe code a mobile app in minutes.png" 
            alt="QR Code for Nebula Mobile App"
            className="w-full h-auto rounded"
            onError={(e) => {
              // Fallback if image doesn't exist
              const target = e.currentTarget as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) {
                fallback.style.display = 'flex';
              }
            }}
          />
          <div className="hidden w-full h-48 items-center justify-center bg-gray-100 rounded">
            <div className="text-gray-500 text-center">
              <Smartphone className="w-12 h-12 mx-auto mb-2" />
              <p className="text-sm">QR Code Loading...</p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="space-y-3 text-sm text-gray-300 mb-6">
          <div className="flex items-center justify-center gap-2">
            <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-xs font-bold text-purple-400">
              1
            </div>
            <span>Open your camera app</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-xs font-bold text-purple-400">
              2
            </div>
            <span>Point it at the QR code</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-xs font-bold text-purple-400">
              3
            </div>
            <span>Tap the notification to open</span>
          </div>
        </div>

        {/* Direct link button */}
        <button
          onClick={handleDemoClick}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 border border-blue-500/30 rounded-full text-blue-100 transition-colors font-medium"
        >
          <ExternalLink className="w-4 h-4" />
          <span>Direct Link To Demo</span>
        </button>
      </div>
    </div>
  );
};