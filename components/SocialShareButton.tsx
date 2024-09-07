import { useState } from 'react';
import { useStore } from '@/utils/store';

interface SocialShareButtonProps {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
}

const SocialShareButton: React.FC<SocialShareButtonProps> = ({
  title,
  description,
  url,
  imageUrl,
}) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsShareModalOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleShare}
        className="px-4 py-2 rounded-md bg-fittrack-primary text-white hover:bg-fittrack-secondary transition duration-300 ease-in-out"
      >
        Share
      </button>
      {isShareModalOpen && (
        <div className="absolute z-10 w-64 mt-2 bg-white rounded-md shadow-lg">
          <div className="p-4">
            <h3 className="text-lg font-bold text-fittrack-primary">
              Share this with your friends!
            </h3>
            <p className="mt-2 text-gray-700">
              {description}
            </p>
            <div className="mt-4 flex space-x-4">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${title}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition duration-300 ease-in-out"
              >
                Facebook
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${title}%20${url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition duration-300 ease-in-out"
              >
                Twitter
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${description}&source=${url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition duration-300 ease-in-out"
              >
                LinkedIn
              </a>
            </div>
            <button
              onClick={handleCloseModal}
              className="mt-4 px-4 py-2 rounded-md bg-gray-300 text-gray-700 hover:bg-gray-400 transition duration-300 ease-in-out"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialShareButton;