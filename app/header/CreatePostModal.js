"use client";
import React, { useState, useRef, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  ImagePlus,
  Upload,
  Video,
  FileText,
  X,
  Image,
  ImgIcon,
  BarChart2,
  Smile,
  BrickWallFire,
  UserRoundPlus,
  MapPin,
  Globe,
  UserCheck,
  BadgeCheck,
  AtSign,
  Check,
  File,
  Share,
  Search,
  Edit,
} from "lucide-react";
import Modal from "../components/Modal";
import { useSelector } from "react-redux";
import Button from "../components/Button";
import { InputBox } from "../components/FormInput";
import Dropdown, { SmartDropdown } from "../components/Dropdown";
import { BiSmile } from "react-icons/bi";
import { createPortal } from "react-dom";
import { AutoGrowTextarea } from "../components/TextAreaField";
// import { InputField } from "../components/InputField";
import { CreatePostLocation, TagPeopleModal } from "./TagPostLocationPeople";
import { ImageEditorModalPost } from '../student-profile/ImageEditorModal';
import { useImagePreview } from '../hooks/useImagePreview';
import PDFViewer from '../components/pdfpreview';
import { InputField } from '../components/InputField';
import FormDropdown from "../components/FormDropdown";
import TruncateText from "../components/common/TruncateText";
import ParseMentions from "../components/common/ParseMentions";
import { OriginalPostPreview } from "../components/homeresuble/OriginalPostPreview";
// import { handleCreatePost, handleUpdatePost } from '../store/postsSlice';
import { useDispatch } from 'react-redux';
const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });
// import { submitPost } from '../store/postsSlice';
import { createPost, updatePost } from "../utils/postsApi";

// Enhanced demo data with profiles
export const USERS = [
  {
    username: "ravi",
    name: "Ravi Kumar",
    bio: "Frontend Developer",
    avatar: "/avatars/ravi.jpg",
  },
  {
    username: "vishwakarma",
    name: "Amit Vishwakarma",
    bio: "Full Stack Developer",
    avatar: "/avatars/amit.jpg",
  },
  {
    username: "neha",
    name: "Neha Sharma",
    bio: "UI/UX Designer",
    avatar: "/avatars/neha.jpg",
  },
  {
    username: "careerloop",
    name: "CareerLoop",
    bio: "Your Career Partner",
    avatar: "/avatars/careerloop.jpg",
  },
];

const TAGS = [
  { name: "React", count: "12.5K posts" },
  { name: "NextJS", count: "8.2K posts" },
  { name: "AI", count: "15.3K posts" },
  { name: "Frontend", count: "9.1K posts" },
  { name: "MERN", count: "5.7K posts" },
  { name: "Design", count: "11.2K posts" },
  { name: "Students", count: "25.4K posts" },
  { name: "Education", count: "18.7K posts" },
  { name: "Learning", count: "22.1K posts" },
  { name: "Study", count: "15.9K posts" },
];


// Post type constants
const POST_TYPES = {
  TEXT: "text",
  IMAGE: "image",
  VIDEO: "video",
  POLL: "poll",
  DOCUMENT: "document",
};
const MAX_IMAGES = 5;
const MAX_DOCUMENTS = 1;

// const replyOptions = [
//   {
//     key: "public",
//     label: "public",
//     icon: Globe,
//     activeText: "public can see",
//      iconSize: 18,
//   },
//   {
//     key: "friends",
//     label: "Accounts you follow",
//     icon: UserCheck,
//     activeText: "Accounts you follow",
//      iconSize: 18,
//   },
//   {
//     key: "verified",
//     label: "Verified accounts",
//     icon: BadgeCheck,
//     activeText: "Verified accounts",
//     iconSize: 18,
//   },
//   {
//     key: "mentioned",
//     label: "Only accounts you mention",
//     icon: AtSign,
//     activeText: "Only accounts you mention",
//    iconSize: 18,
//   },
// ];

const replyOptions = [
  {
    key: "public",
    label: "public",
    icon: Globe,
    activeText: "public",
     iconSize: 18,
  },
  {
    key: "friends",
    label: "friends",
    icon: UserCheck,
    activeText: "friends",
     iconSize: 18,
  },
  {
    key: "private",
    label: "private",
    icon: BadgeCheck,
    activeText: "private",
    iconSize: 18,
  },
];

export default function CreatePostModal({ isOpen, onClose,  mode = "create",
  originalPost = null,
  onRepost, }) {
const dispatch = useDispatch()
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionType, setSuggestionType] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionPosition, setSuggestionPosition] = useState({ top: 0, left: 0 });
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [pollOptions, setPollOptions] = useState(["", ""]);
  const [pollDuration, setPollDuration] = useState("1 Day");
  const [pollQuestion, setPollQuestion] = useState("");
  const [activePostType, setActivePostType] = useState(POST_TYPES.TEXT);
  const [showReactions, setShowReactions] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [showReplySettings, setShowReplySettings] = useState(false);
  const [replyOption, setReplyOption] = useState("public");
  const [showSaveDraftModal, setShowSaveDraftModal] = useState(false);
  const [showDraftsListModal, setShowDraftsListModal] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [drafts, setDrafts] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);
  const [showTagPeopleModal, setShowTagPeopleModal] = useState(false);
  // New state variables for people and location
  const [showPeopleSuggestions, setShowPeopleSuggestions] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [locationSearchQuery, setLocationSearchQuery] = useState("");
  const [internalIsOpen, setInternalIsOpen] = useState(isOpen);


  const [showImageEditor, setShowImageEditor] = useState(false);
  const [imageToEdit, setImageToEdit] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const {
    getModalImageStyle,
    getCardImageStyle,
    handleFirstImageLoad,
    resetOrientation
  } = useImagePreview();

  // Image Editor Functions add करें
  const handleImageEditClick = (file, index) => {
 
   // close the main modal
    setInternalIsOpen(false);


    setTimeout(() => {
      const url = URL.createObjectURL(file);
      setImageToEdit(url);
      setSelectedImageIndex(index);
      setShowImageEditor(true);
    }, 0);
  };




  const handleEditorSave = (editedImage) => {
    if (editedImage.file && selectedImageIndex !== null) {
      // Replace the old file with edited file
      const newFiles = [...selectedFiles];
      newFiles[selectedImageIndex] = editedImage.file;
      setSelectedFiles(newFiles);

      setShowImageEditor(false);
      setImageToEdit(null);
      setSelectedImageIndex(null);
      const newUrl = URL.createObjectURL(editedImage.file);

      // Main modal को वापस खोलें
      setTimeout(() => {
        setInternalIsOpen(true);
      }, 0);
    }
  };

  const handleEditorCancel = () => {
    setShowImageEditor(false);
    setImageToEdit(null);
    setSelectedImageIndex(null);

    // Main modal को वापस खोलें
    setTimeout(() => {
      setInternalIsOpen(true);
    }, 0);
  };


  const fileInputRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const replySettingsRef = useRef(null);
  const textareaRef = useRef(null);
  const tagInputRef = useRef(null);
  const locationRef = useRef(null);
  const peopleRef = useRef(null);
  const currentUser = useSelector((state) => state.users?.currentUser || null);
  // Sync with external isOpen prop
  useEffect(() => {
    setInternalIsOpen(isOpen);
  }, [isOpen]);

  // Load drafts from localStorage
  useEffect(() => {
    const loadDrafts = () => {
      try {
        const savedDrafts = JSON.parse(localStorage.getItem('postDrafts') || '[]');
        setDrafts(savedDrafts);
      } catch (error) {
        console.error("Error loading drafts:", error);
        setDrafts([]);
      }
    };

    if (showDraftsListModal) {
      loadDrafts();
    }
  }, [showDraftsListModal]);


  // Close main modal when drafts modal opens
  useEffect(() => {
    if (showDraftsListModal && isOpen) {
      onClose();
    }
  }, [showDraftsListModal, isOpen, onClose]);

  // Track unsaved changes
  useEffect(() => {
    const hasContent = text.trim().length > 0 ||
      selectedFiles.length > 0 ||
      (activePostType === POST_TYPES.POLL && pollOptions.some(opt => opt.trim())) ||
      selectedPeople.length > 0 ||
      selectedLocation.trim().length > 0;
    setHasUnsavedChanges(hasContent);
  }, [text, selectedFiles, activePostType, pollOptions, selectedPeople, selectedLocation]);

  // Close emoji picker and reply settings when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
      if (
        replySettingsRef.current &&
        !replySettingsRef.current.contains(event.target)
      ) {
        setShowReplySettings(false);
      }
      if (
        showSuggestions &&
        textareaRef.current &&
        !textareaRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
      if (
        showTagSuggestions &&
        tagInputRef.current &&
        !tagInputRef.current.contains(event.target)
      ) {
        setShowTagSuggestions(false);
      }
      if (
        showLocationSuggestions &&
        locationRef.current &&
        !locationRef.current.contains(event.target)
      ) {
        setShowLocationSuggestions(false);
      }
      if (
        showPeopleSuggestions &&
        peopleRef.current &&
        !peopleRef.current.contains(event.target)
      ) {
        setShowPeopleSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSuggestions, showTagSuggestions, showLocationSuggestions, showPeopleSuggestions]);

  // Enhanced suggestion handler with cursor positioning
  const handleTextChange = useCallback((e) => {
    const value = e.target.value;
    setText(value);

    const cursorPosition = e.target.selectionStart;
    const textBeforeCursor = value.substring(0, cursorPosition);
    const lastWordBeforeCursor = textBeforeCursor.split(/\s/).pop();

    if (lastWordBeforeCursor.startsWith("@")) {
      const query = lastWordBeforeCursor.slice(1).toLowerCase();
      const filtered = USERS.filter(
        (u) =>
          u.username.toLowerCase().includes(query) ||
          u.name.toLowerCase().includes(query)
      );
      setSuggestions(filtered);
      setSuggestionType("mention");

      // Calculate position for suggestions near cursor
      const textarea = e.target;
      const textareaRect = textarea.getBoundingClientRect();

      // Create a temporary span to measure the position of text before cursor
      const tempSpan = document.createElement('span');
      tempSpan.style.whiteSpace = 'pre-wrap';
      tempSpan.style.wordWrap = 'break-word';
      tempSpan.style.visibility = 'hidden';
      tempSpan.style.position = 'absolute';
      tempSpan.style.font = window.getComputedStyle(textarea).font;
      tempSpan.style.width = textarea.clientWidth + 'px';
      tempSpan.textContent = textBeforeCursor;

      document.body.appendChild(tempSpan);
      const spanHeight = tempSpan.offsetHeight;
      document.body.removeChild(tempSpan);

      // Calculate position relative to textarea
      const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight);
      const lines = Math.floor(spanHeight / lineHeight);
      const topPosition = textareaRect.top + (lines * lineHeight) + lineHeight;

      setSuggestionPosition({
        top: topPosition,
        left: textareaRect.left,
        width: textareaRect.width
      });
      setShowSuggestions(true);
    } else if (lastWordBeforeCursor.startsWith("#")) {
      const query = lastWordBeforeCursor.slice(1).toLowerCase();
      const filtered = TAGS.filter((t) => t.name.toLowerCase().includes(query));
      setSuggestions(filtered);
      setSuggestionType("tag");

      // Similar positioning calculation for tags
      const textarea = e.target;
      const textareaRect = textarea.getBoundingClientRect();
      setSuggestionPosition({
        top: textareaRect.bottom,
        left: textareaRect.left,
        width: textareaRect.width
      });
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setSuggestionType(null);
    }
  }, []);

  const handleSuggestionClick = useCallback(
    (suggestion) => {
      const words = text.split(/\s/);
      const lastWord = words.pop();

      let newText;
      if (suggestionType === "mention") {
        newText = words.join(" ") + ` @${suggestion.username} `;
      } else if (suggestionType === "tag") {
        newText = words.join(" ") + ` #${suggestion.name} `;
      } else {
        newText = words.join(" ") + " ";
      }

      setText(newText);
      setShowSuggestions(false);
      setSuggestionType(null);

      // Focus back to textarea after selection
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    },
    [text, suggestionType]
  );

  // Enhanced close handler with save draft confirmation
  const handleClose = () => {
    if (hasUnsavedChanges) {
      setShowSaveDraftModal(true);
    } else {
      setInternalIsOpen(false);
      onClose();
    }
  };

  // 🔥 PREFILL DATA WHEN EDIT MODE
useEffect(() => {
  if (mode !== "edit" || !originalPost) return;

  // TEXT
  setText(originalPost.content || "");

  // TAGS & MENTIONS
  setSelectedTags(originalPost.tags || []);
  setSelectedPeople(originalPost.taggedPeople || []);

  // LOCATION
  setSelectedLocation(originalPost.location || "");

  // REPLY SETTINGS
  setReplyOption(originalPost.replySettings || "public");

  // POST TYPE
  setActivePostType(originalPost.type || POST_TYPES.TEXT);

  // MEDIA
  if (originalPost.image) {
    setSelectedFiles([]); // cannot restore File objects
  }

  if (originalPost.documents) {
    setSelectedFiles([]);
  }

  // POLL
  if (originalPost.poll) {
    setActivePostType(POST_TYPES.POLL);
    setPollQuestion(originalPost.poll.question || "");
    setPollOptions(originalPost.poll.options || ["", ""]);
    setPollDuration(originalPost.poll.timeLeft || "1 Day");
  }

  setHasUnsavedChanges(false);
}, [mode, originalPost]);


  // Save draft functionality
  const handleSaveDraft = () => {
    const draft = {
      id: Date.now().toString(),
      text,
      selectedFiles: selectedFiles.map(file => ({
        name: file.name,
        type: file.type,
        size: file.size,
      })),
      pollOptions,
      pollDuration,
      pollQuestion,
      activePostType,
      replyOption,
      selectedTags,
      selectedPeople,
      selectedLocation,
      createdAt: new Date().toISOString()
    };

    try {
      const existingDrafts = JSON.parse(localStorage.getItem('postDrafts') || '[]');
      const updatedDrafts = [draft, ...existingDrafts.slice(0, 9)];
      localStorage.setItem('postDrafts', JSON.stringify(updatedDrafts));
      console.log("💾 Draft saved successfully");
    } catch (error) {
      console.error("Error saving draft:", error);
    }

    resetForm();
    setShowSaveDraftModal(false);
    setInternalIsOpen(false);
    onClose();
  };

  const handleLoadDraft = (draft) => {
    setText(draft.text || "");
    setSelectedFiles([]); // Files can't be restored from localStorage
    setPollOptions(draft.pollOptions || ["", ""]);
    setPollDuration(draft.pollDuration || "1 Day");
    setPollQuestion(draft.pollQuestion || "")
    setActivePostType(draft.activePostType || POST_TYPES.TEXT);
    setReplyOption(draft.replyOption || "public");
    setSelectedTags(draft.selectedTags || []);
    setSelectedPeople(draft.selectedPeople || []);
    setSelectedLocation(draft.selectedLocation || "");

    setShowDraftsListModal(false);
    setHasUnsavedChanges(true);


    console.log("Drafts modal closed, reopening main modal...");
    setTimeout(() => {
      console.log("Reopening main modal...");
      setInternalIsOpen(true);
    }, 100);

  };

  // Delete draft
  const handleDeleteDraft = (draftId) => {
    const updatedDrafts = drafts.filter(draft => draft.id !== draftId);
    localStorage.setItem('postDrafts', JSON.stringify(updatedDrafts));
    setDrafts(updatedDrafts);
  };


  // Discard draft and close
  const handleDiscardDraft = () => {
    resetForm();
    setShowSaveDraftModal(false);
    setInternalIsOpen(false);
    onClose();
  };


  // Reset form to initial state
  const resetForm = () => {
    setText("");
    setSelectedFiles([]);
    setPollOptions(["", ""]);
    setPollDuration("1 Day");
    setPollQuestion("");
    setActivePostType(POST_TYPES.TEXT);
    setReplyOption("public");
    setSelectedTags([]);
    setSelectedPeople([]);
    setSelectedLocation("");
    setHasUnsavedChanges(false);
    setShowPeopleSuggestions(false);
    setShowLocationSuggestions(false);
    setLocationSearchQuery("");
  };

  // People tagging functions
  const handleAddPerson = (user) => {
    if (!selectedPeople.find(p => p.username === user.username) && selectedPeople.length < 10) {
      setSelectedPeople([...selectedPeople, user]);
    }
    setShowPeopleSuggestions(false);
  };

  const removePerson = (userToRemove) => {
    setSelectedPeople(selectedPeople.filter(user => user.username !== userToRemove.username));
  };

  // Location functions
  const handleLocationClick = () => {
    setShowLocationSuggestions(!showLocationSuggestions);
    setShowLocation(!showLocation);
  };

  const removeLocation = () => {
    setSelectedLocation("");
    setShowLocationSuggestions(false);
  };

  const handleFileChange = (e) => {
    if (!e.target.files) return;

    const filesArray = Array.from(e.target.files);

    const validFiles = filesArray.filter((file) => {
      if (activePostType === POST_TYPES.IMAGE) {
        return file.type.startsWith("image/");
      } else if (activePostType === POST_TYPES.VIDEO) {
        return file.type.startsWith("video/");
      } else if (activePostType === POST_TYPES.DOCUMENT) {
        return file.type === "application/pdf" ||
          file.type.includes("document") ||
          file.type.includes("text") ||
          file.name.endsWith('.pdf') ||
          file.name.endsWith('.doc') ||
          file.name.endsWith('.docx') ||
          file.name.endsWith('.txt');
      }
      return false;
    });

    if (activePostType === POST_TYPES.IMAGE) {
      const remainingSlots = MAX_IMAGES - selectedFiles.length;

      if (remainingSlots <= 0) {
        alert(`Maximum ${MAX_IMAGES} images allowed per post`);
        return;
      }

      const filesToAdd = validFiles.slice(0, remainingSlots);

      if (filesToAdd.length < validFiles.length) {
        alert(
          `You can only add ${remainingSlots} more image(s). ${validFiles.length - filesToAdd.length
          } image(s) were not added.`
        );
      }

      setSelectedFiles((prev) => [...prev, ...filesToAdd]);
    } else if (activePostType === POST_TYPES.DOCUMENT) {
      const remainingSlots = MAX_DOCUMENTS - selectedFiles.length;

      if (remainingSlots <= 0) {
        alert(`Maximum ${MAX_DOCUMENTS} documents allowed per post`);
        return;
      }

      const filesToAdd = validFiles.slice(0, remainingSlots);

      if (filesToAdd.length < validFiles.length) {
        alert(
          `You can only add ${remainingSlots} more document(s). ${validFiles.length - filesToAdd.length
          } document(s) were not added.`
        );
      }

      setSelectedFiles((prev) => [...prev, ...filesToAdd]);
    } else {
      setSelectedFiles(validFiles);
    }
  };

  const removeFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePostTypeChange = (type) => {
    if (type !== activePostType) {
      setSelectedFiles([]);
    }
    setActivePostType(type);

    if (type === POST_TYPES.POLL) {
      return;
    }

    if (type === POST_TYPES.IMAGE || type === POST_TYPES.VIDEO || type === POST_TYPES.DOCUMENT) {
      setFileType(type);
      fileInputRef.current?.click();
    }
  };

  const setFileType = (type) => {
    let accept = "";
    if (type === POST_TYPES.IMAGE) accept = "image/*";
    else if (type === POST_TYPES.VIDEO) accept = "video/*";
    else if (type === POST_TYPES.DOCUMENT) accept = ".pdf,.doc,.docx,.txt,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain";

    if (fileInputRef.current) {
      fileInputRef.current.accept = accept;
    }
  };

  const isImageUploadDisabled =
    selectedFiles.length >= MAX_IMAGES && activePostType === POST_TYPES.IMAGE;

  const isDocumentUploadDisabled =
    selectedFiles.length >= MAX_DOCUMENTS && activePostType === POST_TYPES.DOCUMENT;

  const getFinalPostType = () => {
    if (activePostType === POST_TYPES.POLL) {
      return POST_TYPES.POLL;
    }

    const hasImages = selectedFiles.some((file) =>
      file.type.startsWith("image/")
    );
    const hasVideos = selectedFiles.some((file) =>
      file.type.startsWith("video/")
    );
    const hasDocuments = selectedFiles.some((file) =>
      file.type.includes("pdf") || file.type.includes("document") || file.type.includes("text") ||
      file.name.endsWith('.pdf') || file.name.endsWith('.doc') || file.name.endsWith('.docx') || file.name.endsWith('.txt')
    );

    if (hasImages) return POST_TYPES.IMAGE;
    if (hasVideos) return POST_TYPES.VIDEO;
    if (hasDocuments) return POST_TYPES.DOCUMENT;

    return POST_TYPES.TEXT;
  };

  const handleAddPollOption = () => {
    if (pollOptions.length < 6) {
      setPollOptions([...pollOptions, ""]);
    }
  };

  const handlePollChange = (i, val) => {
    const updated = [...pollOptions];
    updated[i] = val;
    setPollOptions(updated);
  };

  const removePollOption = (index) => {
    if (pollOptions.length > 2) {
      setPollOptions(pollOptions.filter((_, i) => i !== index));
    }
  };

 

  const removeTag = (tagToRemove) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

// const handlePost = async () => {
//   if (!currentUser) return;

  
//   // 🔥 IMPORTANT: ID logic
//   const postId = isEdit ? originalPost.id : Date.now().toString();


//   // ✅ BASE POST
//   const postPayload = {
//     // id: postId,
//     type: finalPostType,
//     user: {
//       id: currentUser.id,
//       name: currentUser.name,
//       username: currentUser.username,
//       avatar: currentUser.avatar || "/circle-based.png",
//       heading: currentUser.headline,
//       jobtitle: currentUser?.jobtitle || "Content writer | Seo",
//     },

//     content: text,
 
//     // activity: "Posts",
//     tags: [...new Set([...extractTags(text), ...selectedTags])],
//     mentions: selectedPeople,
//     location: selectedLocation,
//     privacy: replyOption,

//     // createdAt: isEdit
//     //   ? originalPost.createdAt
//     //   : new Date().toISOString(),

//     // updatedAt: new Date().toISOString(),
//   };

//   //REPOST WITH QUOTE
//   if (mode === "repost_with_quote" && originalPost) {
//     postPayload.type = "repost_with_quote";
//     postPayload.repostOf = {
//       id: originalPost.id,
//       user: originalPost.user,
//       content: originalPost.content,
//       image: originalPost.image,
//       video: originalPost.video,
//       poll: originalPost.poll,
//       createdAt: originalPost.createdAt,
//     };
//   }

//   //MEDIA HANDLING
//   if (finalPostType === POST_TYPES.IMAGE && mediaUrls.length) {
//     postPayload.image = mediaUrls;
//   }

//   if (finalPostType === POST_TYPES.VIDEO && mediaUrls.length) {
//     postPayload.video = mediaUrls[0];
//   }

//   if (finalPostType === POST_TYPES.DOCUMENT && selectedFiles.length) {
//     postPayload.documents = selectedFiles.map((file) => ({
//       name: file.name,
//       type: file.type,
//       size: file.size,
//       url: URL.createObjectURL(file),
//     }));
//   }

//   // 📊 POLL
//   if (finalPostType === POST_TYPES.POLL) {
//     const validOptions = pollOptions.filter((o) => o.trim());

//     postPayload.poll = {
//       question: pollQuestion,
//       options: validOptions,
//       votes: new Array(validOptions.length).fill(0),
//       timeLeft: pollDuration,
//     };

//     postPayload.pollVoted = false;
//     postPayload.pollSelection = null;
//   }

//   // 💾 LOCAL STORAGE SAVE (CREATE vs EDIT)
//   try {

// const formData = new FormData();
// formData.append("content", text);
// formData.append("location", selectedLocation);
// selectedFiles.forEach(file => {
//   formData.append("media", file);
// });

//     const posts = userData?.posts || [];

//     const updatedPosts = isEdit
//       ? posts.map((p) => (p.id === postId ? postPayload : p))
//       : [postPayload, ...posts];


//     const updatedState = {
//       ...state,
//       currentUser: {
//         ...userData,
//         posts: updatedPosts,
//       },
//       users: state.users?.map((u) =>
//         u.id === currentUser.id
//           ? { ...u, posts: updatedPosts }
//           : u
//       ),
//     };

    
//     localStorage.setItem(
//       "socialAppState",
//       JSON.stringify(updatedState)
//     );
    
//     let result = await createPost(postPayload)
//     console.log("result");

//   } catch (err) {
//     console.error("Save error:", err);
//   }

//   // 🧹 CLEANUP
//   resetForm();
//   setInternalIsOpen(false);
//   onClose();
// };


const handlePost = async () => {
  if (!currentUser) return;

  const finalPostType = getFinalPostType();
  const isEdit = mode === "edit" && originalPost;

  try {
    const formData = new FormData();

    /* ---------------- BASIC FIELDS ---------------- */
   formData.append("content", text || "");
formData.append("location", selectedLocation || "");
formData.append("privacy", replyOption || "public");

    /* ---------------- TAGS ---------------- */
    const uniqueTags = [...new Set([...extractTags(text), ...selectedTags])];
    uniqueTags.forEach(tag => formData.append("tags[]", tag));

    /* ---------------- MENTIONS ---------------- */
    selectedPeople.forEach(person =>
      formData.append("mentions[]", person.id)
    );

    /* ---------------- MEDIA ---------------- */
    if (
      [POST_TYPES.IMAGE, POST_TYPES.VIDEO, POST_TYPES.DOCUMENT].includes(finalPostType)
      && selectedFiles.length
    ) {
      selectedFiles.forEach(file => {
        formData.append("media", file); // multer-storage-cloudinary
      });
    }

    /* ---------------- POLL ---------------- */
    if (finalPostType === POST_TYPES.POLL) {
      const validOptions = pollOptions.filter(opt => opt.trim());

      if (!pollQuestion || validOptions.length < 2) {
        throw new Error("Poll requires question and at least 2 options");
      }

      formData.append("poll[question]", pollQuestion);
      formData.append("poll[timeLeft]", pollDuration);

      validOptions.forEach(opt =>
        formData.append("poll[options][]", opt)
      );
    }

    /* ---------------- REPOST WITH QUOTE ---------------- */
    if (mode === "repost_with_quote" && originalPost) {
      formData.append("repostOf", originalPost._id);
      if (text?.trim()) {
        formData.append("quoteText", text.trim());
      }
    }

    console.log("Post success:", formData);
    /* ---------------- EDIT POST ---------------- */
    let result;
    if (isEdit) {
      result = await updatePost(originalPost._id, formData);
    } else {
      result = await createPost(formData);
    }
 
    console.log("Post success:", result);

    /* ---------------- UI CLEANUP ---------------- */
    resetForm();
    setInternalIsOpen(false);
    onClose();

  } catch (error) {
    console.error("Post error:", error.message);
    alert(error.message);
  }
};


  const extractTags = (text) => {
    const tagRegex = /#(\w+)/g;
    const matches = text.match(tagRegex);
    return matches ? matches.map((tag) => tag.replace("#", "")) : [];
  };

  const isPostDisabled =
    !text.trim() &&
    selectedFiles.length === 0 &&
    !(
      activePostType === POST_TYPES.POLL &&
      pollOptions.some((opt) => opt.trim())
    );


  // UPDATED: Function to render document preview with PDF support
  const renderDocumentPreview = (file, index) => {
    if (file.type === "application/pdf" || file.name.endsWith('.pdf')) {
      return (
        <PDFViewer
          key={index}
          file={file}
          onRemove={() => removeFile(index)}
        />
      );
    } else {
      return (
        <div key={index} className="relative group min-w-[200px] bg-gray-100 rounded-lg p-4">
          {/* <FileText className="w-12 h-12 text-blue-500 mx-auto mb-2" /> */}
          <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
          <p className="text-xs text-gray-500">Document</p>
          <button
            onClick={() => removeFile(index)}
            className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
          >
            <X size={16} />
          </button>
        </div>
      );
    }
  };

  return (
    <>
      {/* Save Draft Confirmation Modal */}
      <Modal
        show={showSaveDraftModal}
        onClose={() => setShowSaveDraftModal(false)}
        // size="sm"
        widthClass="!w-[400px]"
        bodycenter="!items-center bg-[#09090923]"
      >
        <div className="pb-4">
          <h3 className="text-xl font-semibold  text-gray-800 mb-2">
            Save Draft?
          </h3>
          <p className="text-gray-600 mb-6">
            You have unsaved changes. Do you want to save them as draft or discard?
          </p>
          <div className="flex gap-3 justify-end">
            <Button
              onClick={handleDiscardDraft}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50"
            >
              Discard
            </Button>
            <Button
              onClick={handleSaveDraft}
              className="px-2 py-1 hover:cursor-pointer bg-blue-700 text-sm text-white rounded-full hover:bg-blue-700"
            >
              <span className="text-sm">
                Save Draft
              </span>
           
            </Button>
          </div>
        </div>
      </Modal>


      {/* Drafts List Modal */}
      <Modal
        show={showDraftsListModal}
        onClose={() => {
          setShowDraftsListModal(false);

          setTimeout(() => {
            setInternalIsOpen(true);
          }, 0); // small delay for smooth open
        }}

        widthClass="!w-[600px]"

      >
        <div className="w-full mb-2">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Saved Drafts
          </h3>
          {drafts.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No drafts saved yet.</p>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {drafts.map((draft, index) => (
                <div
                  key={draft.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium truncate">
                      {draft.text || "Empty draft"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(draft.createdAt).toLocaleDateString()} • {draft.activePostType}
                    </p>
                    {draft.selectedTags && draft.selectedTags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {draft.selectedTags.slice(0, 3).map(tag => (
                          <span key={tag} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            #{tag}
                          </span>
                        ))}
                        {draft.selectedTags.length > 3 && (
                          <span className="text-xs text-gray-500">
                            +{draft.selectedTags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                    {(draft.selectedPeople && draft.selectedPeople.length > 0) && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        <span className="text-xs text-gray-500">With: </span>
                        {draft.selectedPeople.slice(0, 2).map(person => (
                          <span key={person.username} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            @{person.username}
                          </span>
                        ))}
                        {draft.selectedPeople.length > 2 && (
                          <span className="text-xs text-gray-500">
                            +{draft.selectedPeople.length - 2} more
                          </span>
                        )}
                      </div>
                    )}
                    {draft.selectedLocation && (
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin size={12} className="text-gray-500" />
                        <span className="text-xs text-gray-500">{draft.selectedLocation}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleLoadDraft(draft)}
                      className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700"
                    >
                      Post
                    </Button>
                    <Button
                      onClick={() => handleDeleteDraft(draft.id)}
                      className="px-3 py-1 border border-red-300 text-red-600 rounded-full text-sm hover:bg-red-50"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </Modal>

      {/* Main Create Post Modal */}
      <Modal show={internalIsOpen} onClose={handleClose} size="md" widthClass="custom-scroll !w-[700px]">
        {/* Main container with flex column and fixed height structure */}
        <div className="flex flex-col h-full max-h-[calc(85vh-2rem)] relative">
          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto custom-scroll px-5 pt-4">
            {/* User Section */}
            <div className="flex items-start gap-4 pb-4">
              <div>
                <img
                  src={currentUser?.avatar || "/default-user-profile.svg"}
                  alt="profile"
                  className="w-[76px] h-[65px] rounded-full object-cover border  border-gray-200"
                />
              </div>

              {/* User Info and Text Area */}
              <div className="mt-2 relative w-full">
                <h3 className="font-semibold text-gray-800 text-[22px]">
                  {currentUser?.name}
                </h3>

                <div className="relative">
                  <AutoGrowTextarea
                    ref={textareaRef}
                    text={text}
                    handleTextChange={handleTextChange}
                  />

                  {/* Suggestions Box - Now positioned absolutely in the modal */}
                  {showSuggestions && (
                    <div
                      className="fixed bg-white border -mt-5 rounded-lg  max-h-48 overflow-y-auto custom-scroll shadow z-50"
                      style={{
                        top: `${suggestionPosition.top}px`,
                        left: `${suggestionPosition.left}px`,
                        width: `${suggestionPosition.width}px`
                      }}
                    >
                      {suggestions.map((suggestion, i) => (
                        <div
                          key={i}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          {suggestionType === "mention" ? (
                            <div className="flex items-center gap-3">
                              <img
                                src={suggestion.avatar || "/circle-based.png"}
                                alt={suggestion.username}
                                className="w-8 h-8 rounded-full"
                              />
                              <div>
                                <p className="font-medium text-gray-900">
                                  {suggestion.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                  @{suggestion.username}
                                </p>
                                <p className="text-xs text-gray-400">
                                  {suggestion.bio}
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <p className="font-medium text-gray-900">
                                #{suggestion.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {suggestion.count}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {mode === "repost_with_quote" && originalPost && (
  <OriginalPostPreview originalPost={originalPost} />
)}
               
                {/* Selected Tags */}
                {selectedTags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedTags.map((tag, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        #{tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Selected People */}
                {selectedPeople.length > 0 && (
                  <div className="flex flex-wrap  items-center gap-2 mt-3">
                    <span className="text-sm text-gray-600 font-medium">With:</span>
                    {selectedPeople.map((person, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1  text-blue-700 px-2 py-1 rounded-full text-sm"
                      >
                        @{person.username}
                        <button
                          onClick={() => removePerson(person)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Selected Location */}
                {selectedLocation && (
                  <div className="flex items-center gap-2 mt-3">
                    <MapPin size={16} className="text-gray-500" />
                    <span className="text-sm text-gray-700">{selectedLocation}</span>
                    <button
                      onClick={removeLocation}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}


                {/* Poll Section */}
                {activePostType === POST_TYPES.POLL && (
                  <div className="rounded-lg">
                    <h3 className="font-medium text-lg text-gray-700 mb-3">Create Poll</h3>

<InputField
        label="What would you like to ask?"
        value={pollQuestion}
        onChange={(e) => setPollQuestion(e.target.value)}
        placeholder="What would you like to ask?"
        className="mb-2"
      />
                    {pollOptions.map((option, index) => (
                      <div key={index} className="flex items-center gap-2 mb-4">
                        <InputField
                          label={`Option ${index + 1}`}
                          name={`pollOption${index}`}
                          value={option}
                          onChange={(e) => handlePollChange(index, e.target.value)}
                          className="h-[50px]"
                        />

                        {pollOptions.length > 2 && (
                          <button
                            onClick={() => removePollOption(index)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded"
                          >
                            <X size={16} />
                          </button>
                        )}
                      </div>
                    ))}

                    {pollOptions.length < 4 && (
                      <button
                        onClick={handleAddPollOption}
                        className="text-blue-600 text-[16px] font-medium mt-2"
                      >
                        + Add Option
                      </button>
                    )}

                    {/* Poll Duration Dropdown */}
                    <div className="mt-3">
                  
                      <FormDropdown
  label="Poll Duration"
  name="pollDuration"
 value={pollDuration}
  onChange={(e) => setPollDuration(e.target.value)}
  options={[
    { label: "1 Day", value: "1 Day" },
    { label: "3 Days", value: "3 Days" },
    { label: "7 Days", value: "7 Days" }
  ]}
/>
                    </div>

                    {/* Remove Entire Poll */}
                    <button
                      onClick={() => {
                        setPollOptions(["", ""]);
                        setPollDuration("1 Day");
                        setActivePostType(null);
                      }}
                      className="mt-4 text-red-600 font-medium hover:cursor-pointer"
                    >
                      Remove Poll
                    </button>
                  </div>
                )}


                <div>
 <div className="flex gap-4 overflow-x-auto max-w-full custom-scroll"> 
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="relative group ">

                      {file.type.startsWith("image/") && (
                        <>
                          <div className="relative " style={getModalImageStyle(index, "modal")}>
  

                            <img
                              src={URL.createObjectURL(file)}
                              className="rounded-xl border border-gray-400"
                              alt={`Uploaded image ${index + 1}`}
                              onLoad={(e) => {
                                if (index === 0) {
                                  handleFirstImageLoad(e);
                                }
                              }}
                              style={getModalImageStyle()} // No index needed
                            />



                            {/* Edit Button */}
                            <div className="absolute top-2 left-2 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200">
                              <button
                                onClick={() => handleImageEditClick(file, index)}
                                className="text-[#000] font-medium bg-[#e0e0e0b7] rounded-full px-3 py-1"
                                title="Edit Image"
                              >
                                Edit
                              </button>
                            </div>
                          </div>
                        </>
                      )}


                      {/* Video Preview */}
                      {file.type.startsWith("video/") && (
                        <video
                          src={URL.createObjectURL(file)}
                          controls
                          className="w-[280px] h-[220px] rounded-xl border object-cover flex-shrink-0"
                        />
                      )}

                      {/* Document Preview */}
                      {(file.type.includes("pdf")) && (
                        <div className="">
                          {renderDocumentPreview(file, index)}
                        </div>
                      )}

                      <button
                        onClick={() => removeFile(index)}
                        className="absolute top-4  right-4 hover:cursor-pointer text-[#000] font-medium bg-[#e0e0e0b7] rounded-full opacity-0 group-hover:opacity-100 transition"
                      >
                        <X size={26} className="p-1" />
                      </button>
                    </div>
                  ))}
                </div>
                </div>
               


                {/* Action Buttons */}
                <div className="flex relative items-center gap-5 py-3 space-x-2 rounded-lg">

                  <SmartDropdown
                    width={350}
                    closeOnClick={false}
                    trigger={
                      <Button
                        variant="ghost"
                        size="small"
                        buttonclass="!text-[#394E57] !bg-transparent !px-0"
                        showIcon
                        icon={Smile}
                      />
                    }
                  >
                    <EmojiPicker
                      onEmojiClick={(emojiData) => {
                        setText((prev) => prev + emojiData.emoji);
                      }}
                      searchDisabled={false}
                      skinTonesDisabled={true}
                      height={400}
                      width={350}
                    />
                  </SmartDropdown>


                  <Button
                    variant="ghost"
                    size="small"
                    onClick={() => handlePostTypeChange(POST_TYPES.IMAGE)}
                    buttonclass={`!text-[#394E57] !bg-transparent !px-0 -!mt-2 ${isImageUploadDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isImageUploadDisabled}
                    showIcon
                    icon={ImagePlus}
                  />

                  <Button
                    variant="ghost"
                    size="small"
                    onClick={() => handlePostTypeChange(POST_TYPES.POLL)}
                    buttonclass="!text-[#394E57] !bg-transparent !px-0"
                    showIcon
                    icon={BarChart2}
                  />

                  <Button
                    variant="ghost"
                    size="small"
                    onClick={() => handlePostTypeChange(POST_TYPES.DOCUMENT)}
                    buttonclass={`!text-[#394E57] !bg-transparent !px-0 ${isDocumentUploadDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isDocumentUploadDisabled}
                    showIcon
                    icon={FileText}
                  />

                  <Button
                    variant="ghost"
                    size="small"
                    onClick={() => setShowReactions(!showReactions)}
                    showIcon
                    buttonclass="!text-[#394E57] !bg-transparent !px-0"
                    icon={BrickWallFire}
                  />

                   <Button
                    variant="ghost"
                    size="small"
                        onClick={() => {
                  setInternalIsOpen(false);
                   
                  setTimeout(() => {
                    setShowTagPeopleModal(true);
                  }, 0); // small safe delay
                }}
                    showIcon
                    icon={UserRoundPlus}
                    buttonclass="!text-[#394E57] !bg-transparent !px-0"
                  />

     
               <div className="relative" ref={locationRef}>
                    <Button
                      variant="ghost"
                      size="small"
                                     onClick={() => {
                  setInternalIsOpen(false);

                  setTimeout(() => {
                    setShowLocationModal(true);
                  }); // small safe delay
                }}
                      showIcon
                      icon={MapPin}
                      buttonclass="!text-[#394E57] !bg-transparent !px-0"
                    />

          
                  </div>

                </div>
              </div>
            </div>

 
<SmartDropdown
  width={320}
  trigger={
    <button className="flex items-center hover:cursor-pointer gap-2 text-[#2A3438] px-3 py-1 rounded-full">
      <Globe size={18} />
      <span className="text-sm font-semibold">
        {replyOptions.find(o => o.key === replyOption)?.activeText}
      </span>
    </button>
  }
>
  <div className="p-4 border-b border-gray-100">
    <h3 className="font-bold text-gray-900">Who can see ?</h3>
    <p className="text-xs text-gray-500 mt-1">
      Choose who can reply to this post.
    </p>
    <p className="text-xs text-gray-500">
      Anyone mentioned can always reply.
    </p>
  </div>

  <div className="py-2 px-4">
    {replyOptions.map(({ key, label, icon: Icon, iconSize }) => (
     <button
  key={key}
  onClick={() => setReplyOption(key)}
  className="w-full py-2 flex items-center hover:cursor-pointer justify-start gap-3 text-left hover:bg-gray-50"
>
  <div className="p-1 rounded-full bg-[#1a1a38] flex items-center justify-center shrink-0">
    <Icon size={iconSize} className="text-white" />
  </div>

  <p className="text-[#7F8384] text-sm flex-1">
    {label}
  </p>

  {replyOption === key && (
    <Check size={20} className="text-[#0a66c2]" />
  )}
</button>
    ))}
  </div>
</SmartDropdown>

          </div>

          {/* Fixed Footer */}
          <div className="border-t border-[#B6C9DF] pt-4 px-5 pb-4 bg-white flex-shrink-0">

           
            <div className="flex justify-between pb-8 gap-3">

              <Button
                buttonclass="!text-[#2646d4] !bg-[#fff] border border-blue rounded-full "
                onClick={() => {
                  setInternalIsOpen(false);

                  setTimeout(() => {
                    setShowDraftsListModal(true);
                  }, 0); // small safe delay
                }}
              >
                Drafts
              </Button>

              <Button
                onClick={handlePost}
                disabled={isPostDisabled}
                className="rounded-full h-11 px-8 font-semibold bg-[#0013E3] text-white hover:bg-blue-800 "
              >
                Post
              </Button>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple={activePostType === POST_TYPES.IMAGE || activePostType === POST_TYPES.DOCUMENT}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </Modal>
                   <TagPeopleModal
                    isOpen={showTagPeopleModal}
                    // onClose={() => setShowTagPeopleModal(false)}
                             onClose={() => {
                  
                    setShowTagPeopleModal(false);
                  setTimeout(() => {
                    setInternalIsOpen(true);
                   
                  }, 0); // small safe delay
                }}
                    USERS={USERS}
                    selectedPeople={selectedPeople}
                    setSelectedPeople={setSelectedPeople}
                    handleAddPerson={handleAddPerson}

                  />

<CreatePostLocation
  isOpen={showLocationModal}
  // onClose={() => setShowLocationModal(false)}
    onClose={() => {
           setShowLocationModal(false)
// setInternalIsOpen(false);
          setTimeout(() => {
            setInternalIsOpen(true);
          }, 0); // small delay for smooth open
        }}
  onLocationSelect={(loc) => {
    setSelectedLocation(loc.label); // ✅ ONLY STRING
  }}
  selectedLocation={selectedLocation}
/>
    
      <ImageEditorModalPost
        show={showImageEditor}
        onClose={handleEditorCancel}
        image={imageToEdit}
        onSave={handleEditorSave}
      />
    </>
  );
}

