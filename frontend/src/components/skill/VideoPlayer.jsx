import { Play } from 'lucide-react';

const VideoPlayer = ({ videoUrl }) => {
  return (
    <div className="aspect-video bg-gray-900 flex items-center justify-center">
      {videoUrl ? (
        <iframe
          className="w-full h-full"
          src={videoUrl}
          title="Skill Tutorial"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <div className="text-center text-white">
          <Play size={64} className="mx-auto mb-4 opacity-50" />
          <p className="text-gray-400">Video player will be embedded here</p>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;