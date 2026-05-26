"use client";

const comments = [
  {
    user: "Alex",
    text: "This section needs clarification.",
  },
  {
    user: "Sarah",
    text: "AI summary looks excellent.",
  },
];

export default function CommentSystem() {
  return (
    <div className="fixed right-6 top-24 w-80 rounded-[28px] border border-white/[0.04] bg-black/30 p-6 backdrop-blur-3xl">
      <h3 className="text-lg font-semibold">
        Comments
      </h3>

      <div className="mt-6 space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.text}
            className="rounded-2xl bg-white/[0.03] p-4"
          >
            <div className="text-sm font-medium">
              {comment.user}
            </div>

            <p className="mt-2 text-sm text-white/60">
              {comment.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}