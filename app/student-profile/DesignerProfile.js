// "use client";
// import React, { useRef, useState, useCallback, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { updateSection, updateUser } from "../store/userSlice";
// import ExperienceForm from "./ExperienceForm";
// import ExperienceList from "./ExperienceList";
// import ProfileAbout from "./ProfileAbout";
// import EducationForm from "./EducationForm";
// import EducationList from "./EducationList";
// import CertificationForm from "./CertificationForm";
// import CertificationList from "./CertificationList";
// import { Buttonborder } from "../components/Button";
// import { HiOutlineDocumentChartBar } from "react-icons/hi2";
// import Modal from "../components/Modal";
// import ProfileActivity from "./ProfileActivity";
// import Image from "next/image";
// import { Button2 } from "../components/button/Button2";

// const DesignerProfile = ({ user }) => {
//   const dispatch = useDispatch();
//   const currentUser = useSelector((s) => s.users?.currentUser);
//   const isOwner = currentUser?.id === user?.id;

//   // Tabs
//   const tabs = [
//     { id: "overview", label: "Overview" },
//     { id: "education", label: "Education" },
//     { id: "experience", label: "Experience" },
//     { id: "certification", label: "Certification" },
//   ];

//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // UI state
//   const [activeTab, setActiveTab] = useState("overview");
//   const [openModal, setOpenModal] = useState(false);
//   const [modalActiveTab, setModalActiveTab] = useState("overview");

//   // Local state
//   const [about, setAbout] = useState(currentUser?.about || "");
//   const [educations, setEducations] = useState(currentUser?.educations || []);
//   const [experiences, setExperiences] = useState(
//     currentUser?.experiences || []
//   );
//   const [certifications, setCertifications] = useState(
//     currentUser?.certifications || []
//   );

//   const [editIndex, setEditIndex] = useState(null);
//   const [currentData, setCurrentData] = useState(null);

//   const formRef = useRef(null);
//   const listRef = useRef(null);

//   // Sync local changes to Redux safely after render
//   const [syncData, setSyncData] = useState({});

//   // ==========================
//   // 🟢 MODAL CONTROL
//   // ==========================
//   const openModalForTab = useCallback(
//     (tabId, data = null, idx = null) => {
//       if (!isOwner) return;
//       setModalActiveTab(tabId);
//       setCurrentData(data);
//       setEditIndex(idx);
//       setOpenModal(true);
//     },
//     [isOwner]
//   );

//   const closeModal = useCallback(() => {
//     setOpenModal(false);
//     setCurrentData(null);
//     setEditIndex(null);
//   }, []);

//   // ==========================
//   // 🟢 SAVE HANDLER
//   // ==========================
//   const handleSave = useCallback(
//     (listSetter, type, data) => {
//       listSetter((prev) => {
//         const updated = [...prev];
//         if (editIndex !== null) updated[editIndex] = data;
//         else updated.push(data);

//         setSyncData((prevSync) => ({ ...prevSync, [type]: updated }));
//         return updated;
//       });
//       closeModal();
//     },
//     [editIndex, closeModal]
//   );

//   // ==========================
//   // 🟢 DELETE HANDLER (LOCAL)
//   // ==========================
//   const handleDelete = useCallback(
//     (listSetter, type, idx) => {
//       if (!isOwner) return;
//       if (!confirm(`Are you sure you want to delete this ${type}?`)) return;
//       listSetter((prev) => {
//         const updated = prev.filter((_, i) => i !== idx);
//         setSyncData((prevSync) => ({ ...prevSync, [type]: updated }));
//         return updated;
//       });
//       if (editIndex === idx) setEditIndex(null);
//     },
//     [editIndex, isOwner]
//   );

//   // ==========================
//   // 🟢 DELETE HANDLER (REDUX DIRECT)
//   // ==========================
//   const handleDeleteSection = useCallback(
//     (section, id) => {
//       if (!isOwner) return;
//       if (!confirm(`Are you sure you want to delete this ${section}?`)) return;
//       dispatch(updateSection({ section, action: "delete", id }));
//     },
//     [dispatch, isOwner]
//   );

//   // ==========================
//   // 🟢 SYNC LOCAL → REDUX
//   // ==========================
//   useEffect(() => {
//     Object.entries(syncData).forEach(([section, data]) => {
//       dispatch(updateUser({ id: currentUser.id, section, data }));
//     });
//     if (Object.keys(syncData).length > 0) setSyncData({});
//   }, [syncData, dispatch, currentUser.id]);

//   // ==========================
//   // 🟢 WRAPPERS FOR SECTIONS
//   // ==========================
//   const handleSaveEducation = (data) =>
//     handleSave(setEducations, "educations", data);
//   const handleSaveExperience = (data) =>
//     handleSave(setExperiences, "experiences", data);
//   const handleSaveCertification = (data) =>
//     handleSave(setCertifications, "certifications", data);

//   const handleDeleteEducation = (idx) => handleDeleteSection("educations", idx);
//   const handleDeleteExperience = (idx) =>
//     handleDeleteSection("experiences", idx);
//   const handleDeleteCertification = (idx) =>
//     handleDeleteSection("certifications", idx);

//   // ==========================
//   // 🟢 UI RENDER
//   // ==========================
//   return (
//     <div className="rounded-xl mt-6 p-2 bg-white border border-[#aeadad]">

//       {/* Tabs */}
//       {/* <div className="flex justify-between items-center border-b border-[#aeadad] pb-5">
//         <div className="flex space-x-6 my-3">
//           {tabs.map((tab) => (
//             <Buttonborder
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               classNameborder={`bg-blue-700 capitalize  border rounded-2xl px-2  hover:cursor-pointer ${
//                 activeTab === tab.id
//                   ? "text-white font-semibold "
//                   : "!text-white"
//               }`}
//               name={tab.label}
//             />
//           ))}
//         </div>

//         {isOwner && (
//           <Buttonborder
//             onClick={() => openModalForTab(activeTab)}
//             icon={HiOutlineDocumentChartBar}
//             name={activeTab === "overview" && !about ? "Add" : "Edit"}
//           />
//         )}
//       </div> */}

//       {/* Modal */}
//       {/* {isOwner && openModal && (
//         <Modal
//           show={openModal}
//           onClose={closeModal}
//           widthClass="max-w-3xl"
//           onSubmit={() => formRef.current?.submit?.()}
//           submitLabel="Save"
//         > */}
//       {/* Modal Tabs */}
//       {/* <div className="flex relative justify-between gap-2 mb-3">
//             {tabs.map((tab) => (
//               <Buttonborder
//                 key={tab.id}
//                 onClick={() => setModalActiveTab(tab.id)}
//                 classNameborder={` !rounded-3xl !text-sm px-3 py-2 capitalize ${
//                   modalActiveTab === tab.id
//                     ? "border-b-3 text-gray-700 pb-2 border-blue-600 font-semibold"
//                     : "text-gray-400"
//                 }`}
//                 name={tab.label}
//               />
//             ))}
//           </div> */}

//       {/* Modal Content */}
//       {/* <div>
//             {modalActiveTab === "overview" && (
//               <ProfileAbout
//                 about={about}
//                 setAbout={setAbout}
//                 onClose={closeModal}
//               />
//             )}
//             {modalActiveTab === "education" && (
//               <EducationForm
//                 ref={formRef}
//                 initialData={currentData}
//                 onSave={handleSaveEducation}
//                 onCancel={closeModal}
//               />
//             )}
//             {modalActiveTab === "experience" && (
//               <ExperienceForm
//                 ref={formRef}
//                 initialData={currentData}
//                 onSave={handleSaveExperience}
//                 onCancel={closeModal}
//               />
//             )}
//             {modalActiveTab === "certification" && (
//               <CertificationForm
//                 ref={formRef}
//                 initialData={currentData}
//                 onSave={handleSaveCertification}
//                 onCancel={closeModal}
//               />
//             )}
//           </div>
//         </Modal>
//       )} */}

//       {/* Content */}
//       {/* {activeTab === "overview" && (
//         <div className="space-y-6">
//           <div className="mb-4 py-4 ">
//             {about ? (
//               <p className="text-gray-600 whitespace-pre-wrap break-all">
//                 {about}
//               </p>
//             ) : (
//               <div className="text-center flex flex-col items-center justify-center">
//                 <Image
//                   src="/Happy Girl.png"
//                   alt={currentUser.name}
//                   width={147}
//                   height={180}
//                 />
//                 {!isOwner && (
//                   <p className="text-gray-500 text-sm mt-1">
//                     This user has not added an overview yet.
//                   </p>
//                 )}
//               </div>
//             )}
//           </div>
//           <ProfileActivity />
//         </div>
//       )}

//       {activeTab === "education" && (
//         <EducationList
//           educations={educations}
//           onAdd={isOwner ? () => openModalForTab("education") : undefined}
//           onEdit={
//             isOwner
//               ? (idx) => openModalForTab("education", educations[idx], idx)
//               : undefined
//           }
//           onDelete={isOwner ? handleDeleteEducation : undefined}
//         />
//       )}

//       {activeTab === "experience" && (
//         <div ref={listRef}>
//           <ExperienceList
//             experiences={experiences}
//             onAdd={isOwner ? () => openModalForTab("experience") : undefined}
//             onEdit={
//               isOwner
//                 ? (idx) => openModalForTab("experience", experiences[idx], idx)
//                 : undefined
//             }
//             onDelete={isOwner ? handleDeleteExperience : undefined}
//           />
//         </div>
//       )}

//       {activeTab === "certification" && (
//         <CertificationList
//           certifications={certifications}
//           onAdd={isOwner ? () => openModalForTab("certification") : undefined}
//           onEdit={
//             isOwner
//               ? (idx) =>
//                   openModalForTab("certification", certifications[idx], idx)
//               : undefined
//           }
//           onDelete={isOwner ? handleDeleteCertification : undefined}
//           profileUser={user}
//         />
//       )} */}
//     </div>
//   );
// };

// export default DesignerProfile;

// ------------------------------

"use client";
import React, { useRef, useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateSection, updateUser } from "../store/userSlice";
import ExperienceForm from "./ExperienceForm";
import ExperienceList from "./ExperienceList";
import ProfileAbout from "./ProfileAbout";
import EducationForm from "./EducationForm";
import EducationList from "./EducationList";
import CertificationForm from "./CertificationForm";
import CertificationList from "./CertificationList";
import { Buttonborder } from "../components/Button";
import { HiOutlineDocumentChartBar } from "react-icons/hi2";
import Modal from "../components/Modal";
import ProfileActivity from "./ProfileActivity";
import Image from "next/image";
import { Button2 } from "../components/button/Button2";

const DesignerProfile = ({ user }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((s) => s.users?.currentUser);

  // ✅ BUILD TIME SAFETY CHECK
  const safeUser = currentUser || user || {};
  const isOwner = currentUser?.id === user?.id;

  // Tabs
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "education", label: "Education" },
    { id: "experience", label: "Experience" },
    { id: "certification", label: "Certification" },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  // UI state
  const [activeTab, setActiveTab] = useState("overview");
  const [openModal, setOpenModal] = useState(false);
  const [modalActiveTab, setModalActiveTab] = useState("overview");

  // ✅ SAFE LOCAL STATE WITH FALLBACKS
  const [about, setAbout] = useState(safeUser?.about || "");
  const [educations, setEducations] = useState(safeUser?.educations || []);
  const [experiences, setExperiences] = useState(safeUser?.experiences || []);
  const [certifications, setCertifications] = useState(
    safeUser?.certifications || []
  );

  const [editIndex, setEditIndex] = useState(null);
  const [currentData, setCurrentData] = useState(null);

  const formRef = useRef(null);
  const listRef = useRef(null);

  // Sync local changes to Redux safely after render
  const [syncData, setSyncData] = useState({});

  // ==========================
  // 🟢 MODAL CONTROL
  // ==========================
  const openModalForTab = useCallback(
    (tabId, data = null, idx = null) => {
      if (!isOwner) return;
      setModalActiveTab(tabId);
      setCurrentData(data);
      setEditIndex(idx);
      setOpenModal(true);
    },
    [isOwner]
  );

  const closeModal = useCallback(() => {
    setOpenModal(false);
    setCurrentData(null);
    setEditIndex(null);
  }, []);

  // ==========================
  // 🟢 SAVE HANDLER
  // ==========================
  const handleSave = useCallback(
    (listSetter, type, data) => {
      listSetter((prev) => {
        const updated = [...prev];
        if (editIndex !== null) updated[editIndex] = data;
        else updated.push(data);

        setSyncData((prevSync) => ({ ...prevSync, [type]: updated }));
        return updated;
      });
      closeModal();
    },
    [editIndex, closeModal]
  );

  // ==========================
  // 🟢 DELETE HANDLER (LOCAL)
  // ==========================
  const handleDelete = useCallback(
    (listSetter, type, idx) => {
      if (!isOwner) return;
      if (!confirm(`Are you sure you want to delete this ${type}?`)) return;
      listSetter((prev) => {
        const updated = prev.filter((_, i) => i !== idx);
        setSyncData((prevSync) => ({ ...prevSync, [type]: updated }));
        return updated;
      });
      if (editIndex === idx) setEditIndex(null);
    },
    [editIndex, isOwner]
  );

  // ==========================
  // 🟢 DELETE HANDLER (REDUX DIRECT)
  // ==========================
  const handleDeleteSection = useCallback(
    (section, id) => {
      if (!isOwner) return;
      if (!confirm(`Are you sure you want to delete this ${section}?`)) return;
      dispatch(updateSection({ section, action: "delete", id }));
    },
    [dispatch, isOwner]
  );

  // ==========================
  // 🟢 SYNC LOCAL → REDUX
  // ==========================
  useEffect(() => {
    if (!currentUser?.id) return; // ✅ Skip if no user

    Object.entries(syncData).forEach(([section, data]) => {
      dispatch(updateUser({ id: currentUser.id, section, data }));
    });
    if (Object.keys(syncData).length > 0) setSyncData({});
  }, [syncData, dispatch, currentUser?.id]);

  // ==========================
  // 🟢 WRAPPERS FOR SECTIONS
  // ==========================
  const handleSaveEducation = (data) =>
    handleSave(setEducations, "educations", data);
  const handleSaveExperience = (data) =>
    handleSave(setExperiences, "experiences", data);
  const handleSaveCertification = (data) =>
    handleSave(setCertifications, "certifications", data);

  const handleDeleteEducation = (idx) => handleDeleteSection("educations", idx);
  const handleDeleteExperience = (idx) =>
    handleDeleteSection("experiences", idx);
  const handleDeleteCertification = (idx) =>
    handleDeleteSection("certifications", idx);

  // ==========================
  // 🟢 UI RENDER
  // ==========================
  return (
    <div className="rounded-xl mt-6 p-2 bg-white border border-[#aeadad]">
      {/* Your existing JSX - no changes needed */}
    </div>
  );
};

export default DesignerProfile;
