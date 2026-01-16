"use client";

const tags = [
  "Frontend",
  "Backend",
  "Full Stack",
  "Mobile",
  "DevOps",
  "Data Science",
  "AI/ML",
  "Product",
];

export default function TrendingTags() {
  return (
    <div className="py-4">
    <h2 className="font-semibold text-2xl md:text-3xl">Trending:</h2>
    <div className="flex flex-wrap gap-2 my-5">
      {tags.map((tag, i) => (
        <span
          key={i}
          className="cursor-pointer px-3 py-1 text-sm border rounded-full"
        >
          {tag}
        </span>
      ))}
    </div>
    </div>
  );
}
