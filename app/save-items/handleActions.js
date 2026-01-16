
// utils/handleActions.js
export const handleGlobalAction = async (actionType, payload, type, { setCollections, setDirectSaved, router }) => {
  // 1. Data extraction ko safe banayein
  // Agar payload ke andar item hai toh wo lein, nahi toh payload hi item hai
  const targetItem = payload.item || payload; 
  const itemData = targetItem.data || targetItem;
  const itemId = itemData.id;

  switch (actionType) {
    case "copy":
      const url = `${window.location.origin}/${type === 'job' ? 'jobs' : 'posts'}/${itemId}`;
      await navigator.clipboard.writeText(url);
      // alert("Link copied to clipboard!"); 
      break;

    case "save":
      const { folderId, item: itemToSave } = payload;
const isSystemOption = typeof folderId === 'string' && folderId.startsWith('system_');

  if (isSystemOption || !folderId) {
    if (setDirectSaved) {
      setDirectSaved(prev => {
        // Ensure prev is always an array
        const prevArray = Array.isArray(prev) ? prev : [];
        const exists = prevArray.find(i => (i.data?.id || i.id) === itemToSave.id);
        if (exists) return prevArray;
        
        return [...prevArray, { 
          id: itemToSave.id, 
          type: type, 
          data: itemToSave,
          systemTag: folderId // Taaki baad mein filter kar sakein
        }];
      });
    }
  }
      // 2. Agar folderId hai, toh sirf folder mein daalo (Collections tab ke liye)
      else {
        setCollections(prev => prev.map(folder => {
          if (folder.id === folderId) {
            const exists = folder.items.find(i => (i.data?.id || i.id) === itemToSave.id);
            if (exists) return folder;
            return { ...folder, items: [...folder.items, { id: itemToSave.id, type, data: itemToSave }] };
          }
          return folder;
        }));
      }
      break;
    case "create_and_save":
      // 🔥 FIX: Destructure safely
      const { name, item: newSaveItem } = payload;
      const newFolder = {
        id: Date.now(),
        name: name,
        items: [{ id: newSaveItem.id, type: type, data: newSaveItem }]
      };
      setCollections(prev => [...prev, newFolder]);
      break;
case "unsave": {
      const itemToRemove = payload.item || payload;
      // String comparison safe banane ke liye
      const unsaveId = String(itemToRemove.id || itemToRemove.data?.id);

      if (!unsaveId || unsaveId === "undefined") {
        console.error("Unsave failed: No ID found", payload);
        break;
      }

      // 1. Folders se remove
      if (setCollections) {
        setCollections(prev => {
          if (!Array.isArray(prev)) return prev;
          return prev.map(folder => ({
            ...folder,
            items: folder.items.filter(i => String(i.data?.id || i.id) !== unsaveId)
          }));
        });
      }

      // 2. Direct Saved se remove
      if (setDirectSaved) {
        setDirectSaved(prev => {
          const prevArray = Array.isArray(prev) ? prev : [];
          return prevArray.filter(i => String(i.data?.id || i.id) !== unsaveId);
        });
      }
      break;
    }

    case "send":
      const shareLink = `${window.location.origin}/${type === 'job' ? 'jobs' : 'posts'}/${itemId}`;
      const params = new URLSearchParams({
        share: shareLink,
        title: itemData.title || itemData.company || "Shared Item",
        type: type,
        image: itemData.companyLogo || itemData.authorAvatar || ""
      });
      router.push(`/messages?${params.toString()}`);
      break;

    case "report":
      console.log(`Reported ${type}: ${itemId}`);
      break;

    default:
      console.warn("Unknown action:", actionType);
  }
};