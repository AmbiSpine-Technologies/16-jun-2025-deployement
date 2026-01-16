"use client";

import { useState } from "react";
import { Heart, MessageCircle, Repeat2, Bookmark } from "lucide-react";
import { Button2 } from "../components/button/Button2";

/* ================= DUMMY DATA ================= */
const initialPinnedPosts = [
    {
        id: 1,
        user: {
            name: "Prabha Shrinivasan",
            role: "Content Writer | SEO",
            avatar: null,
        },
        title: "Happiness Is the Key Achievement of Life",
        description:
            "In every age, from the ancient Vedic seekers who walked barefoot across forests, to the modern builders who code beneath the glow of blue screens, the truth has remained quietly undefeated: we are all searching for happiness.",
        images: ["/post1.jpg", "/post2.jpg"],
        stats: {
            likes: "1.2k",
            comments: "12k",
            reposts: "1.2k",
        },
    },
    {
        id: 2,
        user: {
            name: "Prabha Shrinivasan",
            role: "Content Writer | SEO",
            avatar: null,
        },
        title: "Happiness Is the Key Achievement of Life",
        description:
            "In every age, from the ancient Vedic seekers who walked barefoot across forests, to the modern builders who code beneath the glow of blue screens, the truth has remained quietly undefeated: we are all searching for happiness.",
        images: ["/post3.jpg", "/post4.jpg"],
        stats: {
            likes: "1.2k",
            comments: "12k",
            reposts: "1.2k",
        },
    },
];

export default function PinnedPosts() {
    const [posts, setPosts] = useState(initialPinnedPosts);
    
    // Track expanded state for each post
    const [expandedPosts, setExpandedPosts] = useState({});

    const toggleExpanded = (postId) => {
        setExpandedPosts(prev => ({
            ...prev,
            [postId]: !prev[postId]
        }));
    };

    // Helper function to check if text should be expandable
    const isTextLong = (text) => {
        return text.length > 150; // Adjust this threshold as needed
    };

    return (
        <section className="w-full border-[0.3px] border-[#cccccc] rounded-2xl bg-white p-6">
            {/* Header */}
            <div className="flex justify-between mb-5">
                <h2 className="text-lg text-gray-800 font-semibold">Pinned</h2>
                {/* <Button2
                // onClick={"/community post"}
                    name="Community Pinned"
                    className="!rounded-full !px-4 !py-1.5 !text-sm"
                /> */}
            
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.map((post) => {
                    const isExpanded = expandedPosts[post.id] || false;
                    const shouldShowExpand = isTextLong(post.description) && !isExpanded;
                    
                    return (
                        <div
                            key={post.id}
                            className="rounded-2xl border border-[#dadada] p-4 flex flex-col gap-4"
                        >
                            {/* User Info */}
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                                    {post.user.avatar ? (
                                        <img
                                            src={post.user.avatar}
                                            alt={post.user.name}
                                            className="h-full w-full rounded-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-sm font-medium text-gray-600">
                                            {post.user.name.charAt(0)}
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">
                                        {post.user.name}
                                    </p>
                                    <p className="text-xs text-gray-500">{post.user.role}</p>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="text-sm text-gray-700">
                                <p className="font-medium">{post.title}</p>

                                <div className="mt-1 text-xs text-gray-600">
                                    <p className={isExpanded ? "" : "line-clamp-2"}>
                                        {post.description}
                                    </p>
                                    {isTextLong(post.description) && (
                                        <span
                                            className="font-medium cursor-pointer mt-1 inline-block"
                                            onClick={() => toggleExpanded(post.id)}
                                        >
                                            {isExpanded ? "Show less" : "...more"}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Media */}
                            <div className="grid grid-cols-2 gap-3">
                                {post.images.map((img, idx) => (
                                    <div
                                        key={idx}
                                        className="h-40 rounded-xl border border-dashed flex items-center justify-center"
                                    >
                                        <img
                                            src={img}
                                            alt={`post media ${idx + 1}`}
                                            className="h-full w-full rounded-xl object-cover"
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-between pt-2 text-gray-500">
                                <div className="flex items-center gap-4 text-xs">
                                    <span className="flex items-center gap-1">
                                        <Heart size={14} /> {post.stats.likes}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <MessageCircle size={14} /> {post.stats.comments}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Repeat2 size={14} /> {post.stats.reposts}
                                    </span>
                                </div>
                                <Bookmark size={14} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}