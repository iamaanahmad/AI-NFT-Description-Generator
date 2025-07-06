
import React, { useState, useCallback } from 'react';
import { NftMetadata } from './types';
import { generateNftDescription } from './services/geminiService';
import { ImageUploader } from './components/ImageUploader';
import { ResultCard } from './components/ResultCard';
import { Loader } from './components/Loader';
import { SparklesIcon, WarningIcon } from './components/IconComponents';

const App: React.FC = () => {
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string | null>(null);
  const [keywords, setKeywords] = useState<string>('');
  const [generatedContent, setGeneratedContent] = useState<NftMetadata | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback((file: File | null) => {
    if (!file) {
      setImageBase64(null);
      setImageMimeType(null);
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      // remove data:image/png;base64, part
      const base64 = result.split(',')[1];
      setImageBase64(base64);
      setImageMimeType(file.type);
    };
    reader.onerror = () => {
        setError("Failed to read the image file.");
    };
    reader.readAsDataURL(file);
  }, []);

  const handleGenerate = async () => {
    if (!imageBase64 && !keywords) {
      setError('Please upload an image or enter some keywords to generate a description.');
      return;
    }
    setError(null);
    setIsLoading(true);
    setGeneratedContent(null);

    try {
      const content = await generateNftDescription(keywords, imageBase64, imageMimeType);
      setGeneratedContent(content);
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Failed to generate content. ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center p-4 sm:p-6 md:p-8">
      <header className="w-full max-w-5xl text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          AI NFT Description Generator
        </h1>
        <p className="mt-2 text-lg text-slate-400">
          Bring your NFTs to life with unique, AI-generated lore and traits.
        </p>
      </header>
      
      <main className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-slate-200">1. Provide Your Input</h2>
          <div className="space-y-6">
            <ImageUploader onImageUpload={handleImageUpload} />
            <div>
              <label htmlFor="keywords" className="block text-sm font-medium text-slate-300 mb-2">
                Keywords (optional)
              </label>
              <input
                id="keywords"
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="e.g., cyberpunk warrior, ancient artifact, neon glow"
                className="w-full bg-slate-700 border border-slate-600 rounded-md px-4 py-2 text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
              />
            </div>
          </div>
          <button
            onClick={handleGenerate}
            disabled={isLoading || (!imageBase64 && !keywords)}
            className="mt-8 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-purple-500 disabled:bg-slate-500 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <SparklesIcon className="w-5 h-5 mr-2" />
                Generate Description
              </>
            )}
          </button>
        </div>

        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg flex flex-col">
          <h2 className="text-2xl font-bold mb-4 text-slate-200">2. Generated Metadata</h2>
          <div className="flex-grow flex items-center justify-center rounded-lg bg-slate-900/50 border-2 border-dashed border-slate-700 p-4">
            {isLoading && (
              <div className="text-center text-slate-400">
                <Loader />
                <p className="mt-2">Generating... this may take a moment.</p>
              </div>
            )}
            {error && (
               <div className="text-center text-red-400 max-w-md mx-auto">
                    <WarningIcon className="w-12 h-12 mx-auto mb-2 text-red-500" />
                    <p className="font-semibold">An Error Occurred</p>
                    <p className="text-sm">{error}</p>
                </div>
            )}
            {!isLoading && !error && generatedContent && (
              <ResultCard content={generatedContent} />
            )}
            {!isLoading && !error && !generatedContent && (
              <div className="text-center text-slate-500">
                <p>Your generated NFT metadata will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;