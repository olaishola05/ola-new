import React from 'react';


interface CustomModalProps {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
  width?: string;
  height?: string;
}

const CustomModal = ({ open, handleClose, children, width, height }: CustomModalProps) => {
  return (
    <div
      className={`fixed inset-0 ${open ? 'visible opacity-100 bg-gray-300' : 'invisible opacity-0'
        } transition-all duration-300 ease-in-out z-50`}
      onClick={handleClose}
    >
      <div
        className={`w-full h-full flex items-center justify-center p-2 ${open ? 'visible scale-100' : 'invisible scale-95'
          } transition-all duration-300 ease-in-out`}
      >
        <div
          className={`w-[${width}] h-[${height}] md:w-[${width}] lg:w-[${width}] bg-inherit rounded-lg p-1 flex flex-col gap-5 relative `}
          style={{ width: width, height: height }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute -top-4 -right-2 w-12 h-12 bg-red-500 text-white rounded-full text-2xl flex items-center justify-center transition-all duration-300 ease-in-out cursor-pointer z-50"
            onClick={handleClose}
          >
            X
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
