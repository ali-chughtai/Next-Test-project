import { useState } from "react";
import Loader from "./loadingSpinner";

interface ConfirmationProps {
  message: string; 
  onOk: () => Promise<void>; 
  onCancel: () => void; 
  waitingMessage: string;
}

export default function Confirmation({ message, onOk, onCancel, waitingMessage }: ConfirmationProps) {
    const [waitingMessageVisible , setWaitingMessageVisible] = useState(false);
    return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative p-6 text-gray-500 bg-white rounded shadow-md z-10 max-w-md w-full">
            {waitingMessageVisible ?
                <div className="flex flex-col items-center justify-center gap-2">
                <h1>{waitingMessage}</h1>
                <Loader/>
            </div>:

            <h1 className="text-lg font-bold mb-4 text-center">{message}</h1>
            }
        {!waitingMessageVisible && 
            <div className="flex justify-center gap-4">
          <button
            onClick={async () => {
              try {
                setWaitingMessageVisible(true);
                await onOk(); 
                setWaitingMessageVisible(false);
                onCancel();
              } catch (error) {
                console.error("Error in onOk callback:", error);
              }
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Ok
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>}
      </div>
    </div>
  );
}