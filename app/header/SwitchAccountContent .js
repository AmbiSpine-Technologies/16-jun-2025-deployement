// "use client";
// import SignInModal from '../signin/SignInModal';

// export default function SwitchAccountContent({
//   currentUser,
//   accounts = [],
//   onSwitch,
// }) {
//   return (
//     <div className="">
//       {/* Current user */}
     
// <div className="flex flex-col items-center">
//      <h3 className="text-center mb-3 border-b-2 border-gray-300 text-[#2A3438] text-lg font-semibold">Switch account</h3>

//   <div className="text-left">
//  <AccountRow user={currentUser} active />

//   {accounts.map((user, idx) => (
//     <AccountRow
//       key={idx}
//       user={user}
//       onClick={() => onSwitch(user)}
//     />
//   ))}
// </div>
//   </div>
 


//       {/* Other accounts */}
  

//       {/* Divider */}
//       <div className="flex items-center ">
//         <div className="flex-1 h-px bg-gray-300" />
//         <span className="text-center text-md text-gray-500 px-3">or</span>
//         <div className="flex-1 h-px bg-gray-300" />
//       </div>

//       {/* Add account */}
//       <button className="w-full hover:cursor-ponter font-medium  text-[#2A3438] mb-4 text-sm  hover:underline">
//         Add an existing account
//       </button>
//     </div>
//   );
// }



"use client";
import { useState } from "react";
import { useAuth } from "../context/auth-context";
import SignInModal from "../signin/SignInModal";

export default function SwitchAccountContent({
  currentUser,
  accounts = [],
  onSwitch,
  onAddAccount,
}) {
  const { openAuth } = useAuth(); // 👈 modal open function
const [showSignIn, setShowSignIn] = useState(false);

  return (
    <div>
      {/* Current user */}
      <div className="flex flex-col items-center ">
        {/* <h3 className="text-center mb-3 border-b-2 border-gray-300 text-[#2A3438] text-lg font-semibold">
          Switch account
        </h3> */}

        <div className="text-left">
          <AccountRow user={currentUser} active />

          {accounts.map((user, idx) => (
            <AccountRow
              key={idx}
              user={user}
              onClick={() => onSwitch(user)}
            />
          ))}
        </div>
      </div>

      {/* Divider */}
      {/* <div className="flex items-center my-4">
        <div className="flex-1 h-px bg-gray-300" />
        <span className="text-center text-md text-gray-500 px-3">or</span>
        <div className="flex-1 h-px bg-gray-300" />
      </div> */}
   <div className="text-center my-2">
   
        <p className="text-center text-md font-medium text-gray-500 px-3">or</p>
        
      </div>
     
       <button
        onClick={()=>setShowSignIn(true)} // 👈 manual open
        className="w-full font-medium text-[#2A3438] pb-6 text-md hover:cursor-pointer"
      >
        Add and existing account
      </button>

      {/* SignIn Modal */}
      {showSignIn && (
        <SignInModal onClose={() => setShowSignIn(false)} />
      )}
    </div>
  );
}




function AccountRow({ user, active, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={active}
      className={` flex items-center gap-3 hover:cursor-pointer  p-1 rounded-xl transition `}
    >
      <img
        src={user?.avatar || "/default-user-profile.svg"}
        className="w-14 h-14 rounded-full border"
        alt="avatar"
      />

      <div className="text-left flex-1 min-w-0">
        <h4 className="font-semibold truncate  text-[#2A3438]">{user?.name || "Defualt user1"}</h4>
        <p className="text-xs text-[#7F8384] truncate">
          @{user?.username || "default user"}
        </p>
      </div>
    </button>
  );
}
