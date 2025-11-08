
import React, { useState } from 'react';
import { generateImage } from '../services/geminiService';

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('A vibrant illustration of the Calvin Cycle inside a plant cell chloroplast, showing molecules and energy flow.');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateImage = async () => {
    if (!prompt) {
      setError('Please enter a prompt.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);
    try {
      const base64Image = await generateImage(prompt);
      if (base64Image) {
        setGeneratedImage(`data:image/jpeg;base64,${base64Image}`);
      } else {
         setError('Failed to generate image. The API returned no data.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-800/50 rounded-2xl shadow-2xl p-6 ring-1 ring-white/10">
      <h2 className="text-2xl font-bold text-cyan-400 mb-4">AI Image Generator</h2>
      <p className="text-gray-300 mb-4">
        Create a unique visualization related to photosynthesis. Enter a descriptive prompt and let AI bring it to life.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., A chloroplast absorbing sunlight"
          className="flex-grow bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          disabled={isLoading}
        />
        <button
          onClick={handleGenerateImage}
          disabled={isLoading}
          className="bg-cyan-500 hover:bg-cyan-400 text-gray-900 font-bold py-2 px-6 rounded-lg transition-colors duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            'Generate Image'
          )}
        </button>
      </div>
      
      {error && <p className="text-red-400 bg-red-900/50 p-3 rounded-lg text-center">{error}</p>}
      
      {generatedImage && (
        <div className="mt-6 border-2 border-dashed border-gray-600 rounded-lg p-4">
          <img src={generatedImage} alt="Generated visualization of the Calvin cycle" className="rounded-lg mx-auto max-w-full h-auto" />
        </div>
      )}
    </div>
  );
};

export default ImageGenerator;
