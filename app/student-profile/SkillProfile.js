"use client";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { MdPersonAdd } from "react-icons/md";
import { X } from "lucide-react";
import { InputWithCount } from "../components/FormInput";
import SelectField from "../components/FormSelect";
import Modal from "../components/Modal";

export default function SkillsSection() {
  const [skills, setSkills] = useState([
    {
      name: "UI Design",
      percentage: 90,
      endorsements: ["Alice", "John", "aman", "Anil"],
    },
    { name: "Product Design", percentage: 80, endorsements: ["Sam"] },
    { name: "User Research", percentage: 85, endorsements: [] },
    { name: "Coding", percentage: 60, endorsements: ["Ravi", "Kunal"] },
    { name: "No Code Tools", percentage: 65, endorsements: [] },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newSkill, setNewSkill] = useState({ name: "", level: 3 });
  const [editIndex, setEditIndex] = useState(null);

  // level -> percentage
  const levelToPercentage = (level) => [0, 20, 40, 60, 80, 100][level] || 0;

  const handleSave = () => {
    if (!newSkill.name) return;
    const skillObj = {
      ...newSkill,
      percentage: levelToPercentage(newSkill.level),
      endorsements: editIndex !== null ? skills[editIndex].endorsements : [],
    };

    if (editIndex !== null) {
      const updated = [...skills];
      updated[editIndex] = skillObj;
      setSkills(updated);
      setEditIndex(null);
    } else {
      setSkills([...skills, skillObj]);
    }

    setNewSkill({ name: "", level: 3 });
    setShowModal(false);
  };

  const handleDelete = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewSkill({
      name: skills[index].name,
      level: Math.ceil(skills[index].percentage / 20),
    });
    setShowModal(true);
  };

  const handleEndorse = (index) => {
    const user = "You"; // Later integrate with real user identity
    const updated = [...skills];
    if (!updated[index].endorsements.includes(user)) {
      updated[index].endorsements.push(user);
      setSkills(updated);
    }
  };

  return (
    <div className="p-6 rounded-xl shadow-lg  max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl text-white font-semibold">Skills</h3>

        <button
          onClick={() => setShowModal(true)}
          className="border border-white rounded-2xl text-white  px-3 text-sm py-1 flex items-center gap-1 "
        >
          <IoMdAdd className="w-6 h-6" /> Add
        </button>
      </div>

      {/* Skills Grid */}
      <div className="grid  md:grid-cols-2 gap-6">
        {skills.map((skill, idx) => (
          <div
            key={idx}
            className="bg-[#ffffff] p-4 rounded-lg shadow-md flex flex-col gap-3"
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700 text-lg">
                {skill.name}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(idx)}
                  className="p-1 border rounded-md border-blue-400  text-white hover:cursor-pointer"
                >
                  <CiEdit />
                </button>
                <button
                  onClick={() => handleDelete(idx)}
                  className="p-1 border rounded-md border-red-400 text-white hover:cursor-pointer"
                >
                  <MdDelete />
                </button>
              </div>
            </div>

            {/* Slider */}
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={0}
                max={100}
                value={skill.percentage}
                readOnly
                className="w-full accent-blue-500"
              />
              <span className="w-12 text-right text-white">
                {skill.percentage}%
              </span>
            </div>

            {/* Endorsements */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleEndorse(idx)}
                className="border border-white rounded-2xl text-white  px-3 text-sm py-1 flex items-center gap-1 hover:cursor-pointer "
              >
                <MdPersonAdd /> Endorse
              </button>

              <span className="text-sm text-gray-300">
                {skill.endorsements.length} endorsements
              </span>
            </div>

            {skill.endorsements.length > 0 && (
              <div className="text-xs text-gray-400">
                Endorsed by: {skill.endorsements.slice(0, 3).join(", ")}
                {skill.endorsements.length > 3 &&
                  ` +${skill.endorsements.length - 3} more`}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title={editIndex !== null ? "Edit Skill" : "Add Skill"}
      >
        <div className="space-y-4">
          <InputWithCount
            label="Add Your Skills"
            placeholder="Skill Name"
            value={newSkill.name}
            onChange={(e) =>
              setNewSkill({ ...newSkill, name: e.target.value })
            }
          />

          <SelectField
            label="Skill Level"
            value={newSkill.level}
            onChange={(e) =>
              setNewSkill({ ...newSkill, level: parseInt(e.target.value) })
            }
            options={[
              { value: 1, label: "Beginner" },
              { value: 2, label: "Novice" },
              { value: 3, label: "Intermediate" },
              { value: 4, label: "Advanced" },
              { value: 5, label: "Expert" },
            ]}
          />

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              {editIndex !== null ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </Modal>
       
      )}
    </div>
  );
}
