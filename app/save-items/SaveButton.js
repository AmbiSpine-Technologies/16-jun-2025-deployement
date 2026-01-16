// components/common/SaveButton.js
import { Bookmark } from "lucide-react";
import Dropdown from "../components/Dropdown";
import CollectionMenu from "./CollectionMenu";


export default function SaveButton({ item, type, collections, directSaved = [], onAction, className = "" }) {
  // Check in folders
  const isSavedInFolder = collections?.some(folder => 
    folder.items.some(i => (i.data?.id || i.id) === item.id)
  );
  
  // Check in direct items
const isSavedDirectly = Array.isArray(directSaved) && directSaved.some(i => 
  (i.id === item.id) || (i.data?.id === item.id)
);

  const isSaved = isSavedInFolder || isSavedDirectly;

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Dropdown
        button={
          <div className={`p-2 rounded-full hover:bg-gray-100 transition ${className}`}>
            <Bookmark
              size={22}
              className={isSaved ? "text-blue-600 fill-blue-600" : "text-gray-500"}
            />
          </div>
        }
        className="right-0 !w-64 bottom-full mb-2"
      >
        {({ close }) => (
          <CollectionMenu
            collections={collections}
            // User menu khol kar bina folder ke click kare toh direct save ho jaye
            onSave={(folderId) => {
              // Agar folderId exist karti hai toh folder mein, warna direct
              onAction("save", { folderId, item });
              close();
            }}
            // Ek extra button Menu mein add kar sakte hain "Save to My Items" 
            // jo folderId: null bhejega
            onCreate={(name) => {
              onAction("create_and_save", { name, item });
              close();
            }}
            close={close}
          />
        )}
      </Dropdown>
    </div>
  );
}