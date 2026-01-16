import React, { useState, useRef, useEffect } from "react";
import {
  Camera,
  Upload,
  Play,
  Pause,
  Trash2,
  Video,
  Check,
  X,
  Film,
} from "lucide-react";

const VideoResumeSection = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [stream, setStream] = useState(null);

  const videoRef = useRef(null);
  const previewRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const timerRef = useRef(null);
  const fileInputRef = useRef(null);

  const MAX_DURATION = 120;

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [stream]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
        audio: true,
      });
      setStream(mediaStream);
      setShowRecordModal(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      }, 100);
    } catch (err) {
      alert(
        "Camera access denied. Please allow camera and microphone permissions."
      );
      console.error("Camera error:", err);
    }
  };

  const startRecording = () => {
    if (!stream) return;

    setRecordedChunks([]);
    setRecordingTime(0);

    const options = { mimeType: "video/webm;codecs=vp8,opus" };
    let mediaRecorder;

    try {
      mediaRecorder = new MediaRecorder(stream, options);
    } catch (e) {
      mediaRecorder = new MediaRecorder(stream);
    }

    mediaRecorderRef.current = mediaRecorder;
    const chunks = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        chunks.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      const file = new File([blob], "video-intro.webm", { type: "video/webm" });
      setVideoFile(file);
      setRecordedChunks(chunks);
    };

    mediaRecorder.start(100);
    setIsRecording(true);
    setIsPaused(false);

    timerRef.current = setInterval(() => {
      setRecordingTime((prev) => {
        const newTime = prev + 1;
        if (newTime >= MAX_DURATION) {
          stopRecording();
          return MAX_DURATION;
        }
        return newTime;
      });
    }, 1000);
  };

  const pauseRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const resumeRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "paused"
    ) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          const newTime = prev + 1;
          if (newTime >= MAX_DURATION) {
            stopRecording();
            return MAX_DURATION;
          }
          return newTime;
        });
      }, 1000);
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const closeRecordModal = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setShowRecordModal(false);
    setIsRecording(false);
    setIsPaused(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("video/")) {
      const video = document.createElement("video");
      video.preload = "metadata";

      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        if (video.duration > MAX_DURATION) {
         alert(`Video must be ${MAX_DURATION / 60} minutes or less`);
          return;
        }
        setVideoFile(file);
      };

      video.onerror = () => {
        setVideoFile(file);
      };

      video.src = URL.createObjectURL(file);
    }
  };

  const deleteVideo = () => {
    setVideoFile(null);
    setRecordedChunks([]);
    setRecordingTime(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const togglePlayPause = () => {
    if (previewRef.current) {
      if (isPlaying) {
        previewRef.current.pause();
      } else {
        previewRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
//     return ${mins}:${secs.toString().padStart(2, "0")};
return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const retakeVideo = () => {
    setRecordedChunks([]);
    setRecordingTime(0);
    setVideoFile(null);
  };

  return (
    <div className="min-h-screen mt-5">
      <div className="mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-700 mb-2 flex items-center gap-3">
            <Film className="w-10 h-10 text-indigo-700" />
            Video Resume Introduction
          </h1>
          <p className="text-gray-700 text-lg">
            Stand out from the crowd with a personalized video introduction (max
            2 minutes)
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#aeadad]">
          {!videoFile ? (
            <div className="p-10">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <button
                  onClick={startCamera}
                  className="bg-gray-50 hover:bg-gray-750 text-white rounded-2xl p-10 transition-all duration-300 border border-gray-700 hover:border-indigo-500"
                >
                  <div className="flex flex-col items-center text-center space-y-5">
                    <div className="bg-gray-300 p-6 rounded-2xl">
                      <Camera className="w-14 h-14 text-black" />
                    </div>
                    <div>
                      <h3 className="text-2xl text-gray-800 font-bold mb-3">Record Live</h3>
                      <p className="text-gray-400 text-base">
                        Use your webcam to record your introduction right now
                      </p>
                    </div>
                  </div>
                </button>

                <label className="bg-white hover:bg-gray-750 text-black rounded-2xl p-10 transition-all duration-300 cursor-pointer border border-gray-700 hover:border-blue-500">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="flex flex-col items-center text-center space-y-5">
                    <div className="bg-gray-300 p-6 rounded-2xl">
                      <Upload className="w-14 h-14" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-3">Upload Video</h3>
                      <p className="text-gray-400 text-base">
                        Choose a pre-recorded video from your device
                      </p>
                    </div>
                  </div>
                </label>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-700">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gray-200 p-3 rounded-xl">
                      <Video className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-lg mb-1">
                        Max Duration
                      </h4>
                      <p className="text-gray-400">Up to 2 minutes</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-700">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gray-200 p-3 rounded-xl">
                      <Check className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h4 className="font-bold text-black text-lg mb-1">
                        Quality Tips
                      </h4>
                      <p className="text-gray-400">
                        Good lighting & clear audio
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-700">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gray-200 p-3 rounded-xl">
                      <Camera className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h4 className="font-bold text-black text-lg mb-1">
                        Be Professional
                      </h4>
                      <p className="text-gray-400">Dress & speak clearly</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-10">
              <div className="relative bg-white rounded-2xl overflow-hidden mb-8 shadow-2xl">
                <video
                  ref={previewRef}
                  src={URL.createObjectURL(videoFile)}
                  className="w-full aspect-video"
                  onEnded={() => setIsPlaying(false)}
                  controls={false}
                />
                <button
                  onClick={togglePlayPause}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition-colors group"
                >
                  {isPlaying ? (
                    <Pause className="w-20 h-20 text-black opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
                  ) : (
                    <Play className="w-20 h-20 text-black drop-shadow-lg" />
                  )}
                </button>
              </div>

              <div className="bg-gray-800 rounded-2xl p-6 mb-8 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-600 p-4 rounded-xl">
                      <Check className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-xl">
                        Video Ready!
                      </h3>
                      <p className="text-gray-400">{videoFile.name}</p>
                    </div>
                  </div>
                  <button
                    onClick={deleteVideo}
                    className="flex items-center space-x-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all duration-300 font-semibold"
                  >
                    <Trash2 className="w-5 h-5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-5 px-8 rounded-xl transition-all duration-300 text-lg">
                  Save Video Introduction
                </button>
                <label className="flex-1 bg-gray-800 hover:bg-gray-750 text-white font-bold py-5 px-8 rounded-xl border-2 border-gray-700 hover:border-indigo-500 transition-all duration-300 cursor-pointer text-center text-lg">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  Replace Video
                </label>
              </div>
            </div>
          )}
        </div>

        {showRecordModal && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-gray-800">
              <div className="bg-gray-800 p-6 text-white border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold flex items-center gap-3">
                    <Camera className="w-8 h-8 text-indigo-400" />
                    Record Your Introduction
                  </h2>
                  <button
                    onClick={closeRecordModal}
                    className="p-2 hover:bg-gray-700 rounded-xl transition-colors"
                  >
                    <X className="w-7 h-7" />
                  </button>
                </div>
              </div>

              <div className="relative bg-black">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full aspect-video"
                />

                {isRecording && (
                  <div className="absolute top-6 left-6 bg-red-600 text-white px-6 py-3 rounded-full font-bold text-xl shadow-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
                      <span>
                        {formatTime(recordingTime)} / {formatTime(MAX_DURATION)}
                      </span>
                    </div>
                  </div>
                )}

                {isRecording && (
                  <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-900">
                    <div
                      className="h-full bg-red-600 transition-all duration-1000"
                      style={{
                    //     width: ${(recordingTime / MAX_DURATION) * 100}%,
                    width: `${(recordingTime / MAX_DURATION) * 100}%`,
                      }}
                    ></div>
                  </div>
                )}
              </div>

              <div className="p-8 bg-gray-900">
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  {!isRecording && recordedChunks.length === 0 && (
                    <button
                      onClick={startRecording}
                      className="flex items-center space-x-3 bg-red-600 hover:bg-red-700 text-white font-bold px-10 py-5 rounded-xl transition-all duration-300 text-lg"
                    >
                      <div className="w-5 h-5 bg-white rounded-full"></div>
                      <span>Start Recording</span>
                    </button>
                  )}

                  {isRecording && !isPaused && (
                    <>
                      <button
                        onClick={pauseRecording}
                        className="flex items-center space-x-3 bg-yellow-600 hover:bg-yellow-700 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 text-lg"
                      >
                        <Pause className="w-6 h-6" />
                        <span>Pause</span>
                      </button>
                      <button
                        onClick={stopRecording}
                        className="flex items-center space-x-3 bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 text-lg"
                      >
                        <div className="w-5 h-5 bg-white rounded"></div>
                        <span>Stop</span>
                      </button>
                    </>
                  )}

                  {isPaused && (
                    <>
                      <button
                        onClick={resumeRecording}
                        className="flex items-center space-x-3 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 text-lg"
                      >
                        <Play className="w-6 h-6" />
                        <span>Resume</span>
                      </button>
                      <button
                        onClick={stopRecording}
                        className="flex items-center space-x-3 bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 text-lg"
                      >
                        <div className="w-5 h-5 bg-white rounded"></div>
                        <span>Stop</span>
                      </button>
                    </>
                  )}

                  {!isRecording && recordedChunks.length > 0 && (
                    <>
                      <button
                        onClick={closeRecordModal}
                        className="flex items-center space-x-3 bg-green-600 hover:bg-green-700 text-white font-bold px-10 py-5 rounded-xl transition-all duration-300 text-lg"
                      >
                        <Check className="w-6 h-6" />
                        <span>Use This Recording</span>
                      </button>
                      <button
                        onClick={retakeVideo}
                        className="flex items-center space-x-3 bg-gray-700 hover:bg-gray-600 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 text-lg"
                      >
                        <Trash2 className="w-6 h-6" />
                        <span>Retake</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoResumeSection;