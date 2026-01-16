
"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import Link from "next/link";
import FollowButton from "../../components/FollowButton";
import Pagination from "../../components/Pagination";
import { getFollowers, getFollowing } from "@/app/utils/connectionsApi";

export default function NetworkPage() {
  const params = useParams();
  const type = params.type; // followers | following

  const { currentUser } = useSelector((s) => s.users);

  const [people, setPeople] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const perPage = 50;

  useEffect(() => {
    if (!currentUser?.id || !type) return;

    const fetchPeople = async () => {
      try {
        setLoading(true);

        const api = type === "following" ? getFollowing : getFollowers;
        const res = await api(currentUser.id, page, perPage);

        if (!res?.success) return;

        setPeople(res.data || []);
        setTotal(res.pagination?.total || res.data?.length || 0);
      } catch (err) {
        console.error("Failed to fetch network data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPeople();
  }, [currentUser?.id, type, page]);

  if (!currentUser) {
    return <p className="p-6 text-gray-600">No user logged in.</p>;
  }

  return (
    <div className="p-8 md:p-16 min-h-screen bg-white">
      {/* Heading */}
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">
        {type === "following"
          ? `${currentUser.firstName} is Following (${total})`
          : `${currentUser.firstName}’s Followers (${total})`}
      </h1>

      {/* Description */}
      <p className="text-gray-600 mb-6">
        {type === "following"
          ? "People whose updates and posts you follow."
          : "People who follow your updates and posts."}
      </p>

      {/* Loading */}
      {loading && <p className="text-gray-500">Loading...</p>}

      {/* Empty */}
      {!loading && people.length === 0 && (
        <p className="text-gray-500">No {type} yet.</p>
      )}

      {/* List */}
      <div className="space-y-4">
        {people.map((person, index) => (
          <div
            key={person._id ?? person.id ?? index}
            className="flex justify-between items-center border-b border-gray-200 pb-4"
          >
            <Link
              href={`/in/${person.userName || person.username}`}
              className="flex items-center gap-3"
            >
              <img
                src={person.profileImage || person.avatar || "/default-user-profile.svg"}
                alt={person.firstName}
                className="w-12 h-12 rounded-full border border-gray-300 object-cover"
              />

              <div>
                <p className="font-semibold text-gray-900">
                  {person.firstName} {person.lastName}
                </p>
                <p className="text-sm text-gray-500">
                  {person.headline || ""}
                </p>
              </div>
            </Link>

            <FollowButton targetId={person._id || person.id} />
          </div>
        ))}
      </div>

      {/* Pagination */}
      {total > perPage && (
        <Pagination
          page={page}
          total={total}
          perPage={perPage}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
