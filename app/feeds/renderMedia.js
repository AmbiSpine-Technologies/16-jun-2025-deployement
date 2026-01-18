export  const renderMedia = ({post}) => {
  if (!post?.media || post.media.length === 0) return null;

  const images = post.media
    .filter(m => m.type === "image")
    .map(m => m.url);

  const videos = post.media
    .filter(m => m.type === "video")
    .map(m => m.url);

  /* ================= IMAGES ================= */
  if (images.length > 0) {
    // Single Image
    if (images.length === 1) {
      return (
        <div className="mt-2">
          <img
            src={images[0]}
            alt="Post image"
            className="w-full max-h-[420px] object-cover rounded-xl border"
          />
        </div>
      );
    }

    // Multiple Images (Horizontal Scroll)
    return (
      <div className="mt-2 flex gap-3 overflow-x-auto custom-scroll">
        {images.map((img, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[260px] h-[260px] rounded-xl overflow-hidden border"
          >
            <img
              src={img}
              alt={`Post image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    );
  }

  /* ================= VIDEOS ================= */
  if (videos.length > 0) {
    return (
      <div
        className="mt-2 rounded-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          src={videos[0]}
          controls
          className="w-full max-h-[420px] object-cover"
        />
      </div>
    );
  }

  return null;
};
