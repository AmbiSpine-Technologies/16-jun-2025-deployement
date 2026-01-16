"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { Button2 } from "../components/button/Button2";

const MAX_ABOUT_CHARS = 1500;
const initialSkills = [
    {
        id: 1,
        name: "Cloud Computing",
        rating: 4,
        description:
            "Experience in building scalable cloud-based systems with a focus on performance, security, and cost efficiency.",
    },
    {
        id: 2,
        name: "Team Management",
        rating: 3,
        description:
            "Leading cross-functional teams, task planning, mentorship, and ensuring timely project delivery.",
    },
];


export default function ProfileAboutSkills() {
    /* ---------------- ABOUT STATE ---------------- */
    const [about, setAbout] = useState(
        "We are building the future with purpose — driven by a vision to blend human connection with intelligent technology."
    );
    /* ---------------- SKILLS STATE ---------------- */
    const [skills, setSkills] = useState(initialSkills);
    const [newSkill, setNewSkill] = useState({ name: "", rating: 0, description: "" });
    const [tempAbout, setTempAbout] = useState(about);
    const [isEditingAbout, setIsEditingAbout] = useState(false);

    /* ---------------- HANDLERS ---------------- */
    const saveAbout = () => {
        setAbout(tempAbout.trim());
        setIsEditingAbout(false);
    };


    return (
        <section className="w-full bg-white p-2 rounded-xl">
            {/* ================= ABOUT SECTION ================= */}
            <div className="flex items-start justify-between">
                <h2 className="text-lg text-gray-800 font-semibold">About</h2>
                {/* <Button2
                    onClick={() => setIsEditingAbout(true)}
                    name="Edit"
                    classNameborder="!text-sm w-20 h-8 !px-4 !py-2" >
                    <Pencil size={14} /> Edit
                </Button2> */}
            </div>

            {!isEditingAbout ? (
                <p className="mt-3 whitespace-pre-line text-sm leading-snug text-gray-600">
                    {about || "No about information added yet."}
                </p>
            ) : (
                <div className="mt-3">
                    <textarea
                        value={tempAbout}
                        onChange={(e) => {
                            if (e.target.value.length <= MAX_ABOUT_CHARS) {
                                setTempAbout(e.target.value);
                            }
                        }}
                        rows={6}
                        className="w-full rounded-xl border p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Write something about yourself..."
                    />
                    <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-gray-400">
                            {tempAbout.length}/{MAX_ABOUT_CHARS}
                        </span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setIsEditingAbout(false)}
                                className="rounded-lg border border-[#aeadad] text-gray-500 px-4 py-1.5 text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={saveAbout}
                                className="rounded-lg bg-blue-600 px-4 py-1.5 text-sm text-white"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ================= TOP SKILLS ================= */}
            {/* <div className="pt-3 border border-[#aeadad] p-3 rounded-2xl mt-10">
                <h2 className="text-lg text-gray-800 font-semibold">Top skills</h2> */}
                {/* Skills List */}
                {/* <div className="mt-4 space-y-5">
                    {skills.map((skill) => (
                        <div key={skill.id} className="flex gap-4">
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-medium text-gray-800">{skill.name}</h3>
                                    <div className="flex items-center gap-1">

                                    </div>
                                </div>
                                <p className="mt-1 text-sm text-gray-600">
                                    {skill.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div> */}


            {/* </div> */}
        </section>
    );
}
