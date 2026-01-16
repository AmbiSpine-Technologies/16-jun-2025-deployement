"use client";
import { useState, useRef, useEffect } from "react";
import { useChat } from "../context/ChatProvider";
import dynamic from "next/dynamic";
import { Smile, Mic, Paperclip, SendHorizontal } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { GlobalLoader } from "@/app/components/Loader";

const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });

 function MessageInputClient({ chatId }) {
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);
  const [showEmoji, setShowEmoji] = useState(false);
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
const searchParams = useSearchParams();
  const { sendMessage, activeChatId } = useChat();
  const id = chatId ?? activeChatId;

  const handleSend = () => {
    if ((!text.trim() && files.length === 0) || !id) return;
    sendMessage(id, text, files); // add audio also if required
    setText("");
    setFiles([]);
  };
useEffect(() => {
    const sharedLink = searchParams.get("share");
    if (sharedLink && !text.includes(sharedLink)) {
      setText((prev) => (prev ? `${prev} ${sharedLink}` : sharedLink));
      
      // Clean the URL (optional) to prevent re-adding if user switches chats
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }
  }, [searchParams]);

  const handleFileSelect = (e) => {
    const selected = [...e.target.files];
    setFiles((prev) => [...prev, ...selected]);
  };

  const handleEmojiClick = (emoji) => {
    setText((prev) => prev + emoji.emoji);
    setShowEmoji(false);
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];
    mediaRecorder.ondataavailable = (e) => audioChunksRef.current.push(e.data);

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/mp3" });
      sendMessage(id, "", [], audioBlob);
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  return (
    <div className="border border-gray-400 rounded-full bg-white p-2 relative">
      {showEmoji && (
        <div className="absolute bottom-14 left-3 z-50">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}

      {/* File preview */}
      {files.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-2">
          {files.map((f, i) => (
            <span key={i} className="bg-gray-200 px-2 py-1 rounded text-xs">
              {f.name}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2">
        {/* Emoji button */}
        <button
          onClick={() => setShowEmoji((prev) => !prev)}
          className="text-2xl px-2 text-gray-500"
        >
          <Smile size={22} />
        </button>

        {/* Attachment button */}
        <label className="cursor-pointer text-gray-500 text-2xl px-2">
          <Paperclip size={22} />
          <input type="file" multiple hidden onChange={handleFileSelect} />
        </label>

        {/* Input */}
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Message"
          className="flex-1 bg-gray-100 px-4 py-2 rounded-full text-sm outline-none text-gray-500 "
        />

        {/* If text → show send button */}
        {text.trim() ? (
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-4 py-2 rounded-full"
          >
            <SendHorizontal size={22} />
          </button>
        ) : (
          // If no text → show mic
          <button
            onMouseDown={startRecording}
            onMouseUp={stopRecording}
            className={`text-2xl ${
              recording ? "text-red-500" : "text-gray-700"
            }`}
          >
            <Mic size={24} />
          </button>
        )}
      </div>
    </div>
  );
}


export default function MessageInput({ chatId }) {
  return (
    <Suspense fallback={<GlobalLoader />}>
      <MessageInputClient chatId={chatId} />
    </Suspense>
  );
}