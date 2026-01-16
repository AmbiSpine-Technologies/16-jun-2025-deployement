import ParseMentions from "../common/ParseMentions";
import TruncateText from "../common/TruncateText";

  
  export const OriginalPostPreview = ({originalPost  = "" }) => {
  if (!originalPost) return null;
  const {
    user = {},
    content,
    poll,
    createdAt,
  } = originalPost;

  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4 mt-3">
      <div className="flex items-center gap-3 mb-3">
        <img
          src={originalPost.user?.avatar || "/default-user-profile.svg"}
          alt={originalPost.user?.name}
          className="w-14 h-14 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-600">{originalPost.user?.name}</h4>
              <p className="text-sm text-gray-500">@{originalPost.user?.username}</p>
            </div>
            <span className="text-xs text-gray-400">
              {new Date(originalPost.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
      {/* Media Preview */}

      {/* CONTENT */}
      {content && (
       
            <TruncateText text={content}>
                      {(limit) => <ParseMentions text={content.slice(0, limit)} />}
                </TruncateText>
      )}

      {originalPost.image && originalPost.image.length > 0 && (
        <div className="my-3">
          <img
            src={originalPost.image[0]}
            alt="Post"
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
      )}
      
       {poll && (
        <div className="mt-4 border border-gray-200 rounded-lg p-4 bg-gray-50">
          <p className="font-medium text-gray-800 text-sm mb-3">
            {poll.question}
          </p>

          <div className="space-y-2">
            {poll.options.map((option, idx) => (
              <button
                key={idx}
                className="w-full text-left px-4 py-2 rounded-full border border-blue-500 text-blue-600 text-sm font-medium hover:bg-blue-50 transition"
              >
                {option}
              </button>
            ))}
          </div>

          {/* POLL FOOTER */}
          <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
            <span>{poll.totalVotes || 614} votes</span>
            <span>•</span>
            <span>{poll.daysLeft || "3d left"}</span>
          </div>
        </div>
      )}
    </div>
  );
};