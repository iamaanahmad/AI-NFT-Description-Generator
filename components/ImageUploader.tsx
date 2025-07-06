
import React, { useState, useCallback, useRef } from 'react';
import { UploadIcon, XCircleIcon } from './IconComponents';

interface ImageUploaderProps {
  onImageUpload: (file: File | null) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
      setPreview(URL.createObjectURL(file));
      setFileName(file.name);
    }
  }, [onImageUpload]);

  const handleClearImage = () => {
    setPreview(null);
    setFileName(null);
    onImageUpload(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  const handleAreaClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">
        NFT Image (optional)
      </label>
      <div
        onClick={handleAreaClick}
        className="mt-1 flex justify-center items-center px-6 pt-5 pb-6 border-2 border-slate-600 border-dashed rounded-md cursor-pointer hover:border-purple-500 transition-colors duration-200 bg-slate-700/50"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png, image/jpeg, image/gif, image/webp"
          onChange={handleFileChange}
          className="sr-only"
        />
        {preview ? (
          <div className="relative w-full text-center">
            <img src={preview} alt="NFT Preview" className="mx-auto max-h-48 rounded-md shadow-lg" />
            <p className="text-xs text-slate-400 mt-2 truncate">{fileName}</p>
            <button
                onClick={(e) => { e.stopPropagation(); handleClearImage(); }}
                className="absolute -top-2 -right-2 bg-slate-800 rounded-full text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
                aria-label="Remove image"
            >
                <XCircleIcon className="w-6 h-6" />
            </button>
          </div>
        ) : (
          <div className="space-y-1 text-center">
            <UploadIcon className="mx-auto h-12 w-12 text-slate-500" />
            <div className="flex text-sm text-slate-400">
              <p className="pl-1">Click to upload or drag and drop</p>
            </div>
            <p className="text-xs text-slate-500">PNG, JPG, GIF, WEBP up to 10MB</p>
          </div>
        )}
      </div>
    </div>
  );
};
