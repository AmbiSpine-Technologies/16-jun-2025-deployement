

"use client";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import RichTextEditorInput from "../components/RichTextEditorInput";

const BulletPointsEditor = ({
  bullets = [],
  onChange,
  addButtonText = "Add Key Achievement",
  maxBullets = 2,
  maxChars = 300, // ✅ Limit per achievement
  showCount = true,
}) => {
  const addBullet = () => {
    if (bullets.length < maxBullets) {
      onChange([...bullets, ""]);
    }
  };

  const updateBullet = (index, value) => {
    const updated = [...bullets];
    updated[index] = value;
    onChange(updated);
  };

  const removeBullet = (index) => {
    const updated = bullets.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-200">Key Achievements</label>

        {showCount && (
          <span className="text-xs text-gray-400">
            {bullets.length}/{maxBullets}
          </span>
        )}
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {bullets.map((bullet, index) => {
            const plainText = bullet.replace(/<[^>]*>?/gm, "");
            const remainingChars = Math.max(maxChars - plainText.length, 0);

            return (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="flex items-start gap-2 group border border-gray-700/40 p-3 rounded-lg transition-colors"
              >
                {/* Dot indicator */}
                <span className="mt-2 w-[6px] h-[6px] rounded-full bg-gray-400 flex-shrink-0 transition-colors" />

                {/* RichTextEditor per bullet */}
                <div className="flex-1 space-y-1">
                  <RichTextEditorInput
                    value={bullet}
                    onChange={(value) => updateBullet(index, value)}
                    placeholder={`Write achievement ${index + 1} (max ${maxChars} chars)`}
                    maxLength={maxChars} // ✅ Proper limit passed
                    showCharCount={false}
                  />
                  <div
                    className={`text-[10px] text-right ${
                      remainingChars === 0 ? "text-red-400" : "text-gray-500"
                    }`}
                  >
                    {remainingChars} characters left
                  </div>
                </div>

                {/* Delete button */}
                <button
                  onClick={() => removeBullet(index)}
                  title="Remove"
                  className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-400 transition-opacity mt-1"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Add button */}
        {bullets.length < maxBullets ? (
          <motion.button
            onClick={addBullet}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <FiPlus className="w-4 h-4" /> {addButtonText}
          </motion.button>
        ) : (
          <p className="text-xs text-gray-500 italic">
            Maximum of {maxBullets} achievements reached.
          </p>
        )}
      </div>
    </div>
  );
};

export default BulletPointsEditor;
