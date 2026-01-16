"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import * as communityApi from "../utils/communityApi";
import { toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image";

export default function CommunitiesPage() {
  const router = useRouter();
  const [communities, setCommunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    privacy: "",
    category: "",
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0,
  });

  useEffect(() => {
    fetchCommunities();
  }, [filters, pagination.page]);

  const fetchCommunities = async () => {
    setIsLoading(true);
    try {
      const apiFilters = {
        ...(filters.privacy && { privacy: filters.privacy }),
        ...(filters.category && { category: filters.category }),
        ...(searchQuery && { search: searchQuery }),
      };

      const response = await communityApi.getCommunities(
        apiFilters,
        pagination.page,
        pagination.limit
      );

      if (response.success) {
        setCommunities(response.data || []);
        setPagination((prev) => ({
          ...prev,
          ...(response.pagination || {}),
        }));
      } else {
        toast.error(response.message || "Failed to fetch communities");
        setCommunities([]);
      }
    } catch (error) {
      console.error("Failed to fetch communities:", error);
      toast.error("Failed to load communities");
      setCommunities([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPagination((prev) => ({ ...prev, page: 1 }));
    fetchCommunities();
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Browse Communities
          </h1>
          <p className="text-gray-600">
            Discover and join communities that match your interests
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <form onSubmit={handleSearch} className="mb-4">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Search communities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          <div className="flex gap-4 flex-wrap">
            <select
              value={filters.privacy}
              onChange={(e) => handleFilterChange("privacy", e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Privacy Types</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="restricted">Restricted</option>
            </select>

            <select
              value={filters.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              <option value="Students">Students</option>
              <option value="College">College</option>
              <option value="Recruiter">Recruiter</option>
              <option value="Professional">Professional</option>
            </select>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-sm p-6 animate-pulse"
              >
                <div className="w-16 h-16 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && communities.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🔍</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No communities found
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || filters.privacy || filters.category
                ? "Try adjusting your search or filters"
                : "Be the first to create a community!"}
            </p>
            {!searchQuery && !filters.privacy && !filters.category && (
              <Link
                href="/community/create"
                className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Community
              </Link>
            )}
          </div>
        )}

        {/* Communities Grid */}
        {!isLoading && communities.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {communities.map((community) => (
                <Link
                  key={community._id || community.id}
                  href={`/community/${community._id || community.id}`}
                  className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    {/* Community Icon */}
                    <div className="flex-shrink-0">
                      {community.image ? (
                        <img
                          src={community.image}
                          alt={community.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center">
                          <span className="text-2xl text-blue-600">
                            {community.name?.charAt(0).toUpperCase() || "C"}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Community Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                        {community.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {community.description || "No description"}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>
                          👥 {community.membersCount || 0} members
                        </span>
                        {community.category && (
                          <span className="px-2 py-1 bg-gray-100 rounded">
                            {community.category}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="flex justify-center gap-2">
                <button
                  onClick={() =>
                    setPagination((prev) => ({
                      ...prev,
                      page: Math.max(1, prev.page - 1),
                    }))
                  }
                  disabled={pagination.page === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-gray-700">
                  Page {pagination.page} of {pagination.pages}
                </span>
                <button
                  onClick={() =>
                    setPagination((prev) => ({
                      ...prev,
                      page: Math.min(prev.pages, prev.page + 1),
                    }))
                  }
                  disabled={pagination.page === pagination.pages}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}








