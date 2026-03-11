import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Link } from "wouter";

interface Post {
  id: string;
  title: string;
  content: string;
  image_urls: string[] | null;
  created_at: string;
}

interface Comment {
  id: string;
  post_id: string;
  name: string;
  comment: string;
  created_at: string;
}

export default function News() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [newComments, setNewComments] = useState<Record<string, string>>({});
  const [names, setNames] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdmin();
    fetchPosts();
  }, []);

  const checkAdmin = async () => {
    const { data } = await supabase.auth.getUser();

    if (data?.user) {
      setIsAdmin(true);
    }
  };

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (error) {
      setError("Failed to load news.");
    } else if (data) {
      setPosts(data);
      loadComments(data);
    }

    setLoading(false);
  };

  const loadComments = async (postsData: Post[]) => {
    const { data } = await supabase
      .from("comments")
      .select("*")
      .order("created_at", { ascending: true });

    if (!data) return;

    const grouped: Record<string, Comment[]> = {};

    postsData.forEach((post) => {
      grouped[post.id] = data.filter((c) => c.post_id === post.id);
    });

    setComments(grouped);
  };

  const handleAddComment = async (postId: string) => {
    const name = names[postId];
    const comment = newComments[postId];

    if (!name || !comment) {
      alert("Please enter name and comment.");
      return;
    }

    const { data, error } = await supabase
      .from("comments")
      .insert([{ post_id: postId, name, comment }])
      .select()
      .single();

    if (error) {
      alert("Failed to post comment.");
      return;
    }

    setComments({
      ...comments,
      [postId]: [...(comments[postId] || []), data],
    });

    setNewComments({ ...newComments, [postId]: "" });
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    const { error } = await supabase.from("posts").delete().eq("id", id);

    if (error) {
      alert("Failed to delete post.");
    } else {
      setPosts(posts.filter((post) => post.id !== id));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-white flex items-center justify-center">
        <p className="text-lg animate-pulse">Loading newsletter...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background text-white flex flex-col items-center justify-center">
        <p className="text-red-400 mb-4">{error}</p>
        <Link href="/">
          <button className="text-cyan-400 hover:text-cyan-300">
            ← Back to Home
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-white py-16 px-6">
      <div className="max-w-4xl mx-auto">

        <Link href="/">
          <button className="mb-8 text-cyan-400 hover:text-cyan-300 transition">
            ← Back to Home
          </button>
        </Link>

        <h1 className="text-4xl font-bold mb-12 text-center">
          AI Link Builder Newsletter
        </h1>

        {posts.length === 0 && (
          <p className="text-center text-gray-400">
            No news published yet.
          </p>
        )}

        <div className="space-y-16">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-lg shadow-xl"
            >

              <h2 className="text-3xl font-semibold mb-3">
                {post.title}
              </h2>

              <p className="text-sm text-gray-400 mb-6">
                {new Date(post.created_at).toLocaleString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
               })}
              </p>

              {isAdmin && (
                <button
                  onClick={() => handleDelete(post.id)}
                  className="mb-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Delete Post
                </button>
              )}

              {post.image_urls && post.image_urls.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {post.image_urls.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={post.title}
                      loading="lazy"
                      className="rounded-xl w-full object-cover max-h-[400px]"
                    />
                  ))}
                </div>
              )}

              <div
                className="prose prose-invert max-w-none text-gray-200 mb-10"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* COMMENT SECTION */}

              <div className="mt-10 border-t border-white/10 pt-6">

                <h3 className="text-xl font-semibold mb-4">Comments</h3>

                {(comments[post.id] || []).map((c) => (
                  <div key={c.id} className="mb-4 bg-white/5 p-4 rounded-lg">
                    <p className="text-sm text-cyan-400">{c.name}</p>
                    <p className="text-gray-300">{c.comment}</p>
                  </div>
                ))}

                <div className="mt-6 space-y-3">

                  <input
                    type="text"
                    placeholder="Your name"
                    value={names[post.id] || ""}
                    onChange={(e) =>
                      setNames({ ...names, [post.id]: e.target.value })
                    }
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/10"
                  />

                  <textarea
                    placeholder="Write a comment..."
                    value={newComments[post.id] || ""}
                    onChange={(e) =>
                      setNewComments({
                        ...newComments,
                        [post.id]: e.target.value,
                      })
                    }
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/10"
                  />

                  <button
                    onClick={() => handleAddComment(post.id)}
                    className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-lg"
                  >
                    Post Comment
                  </button>

                </div>
              </div>

            </article>
          ))}
        </div>
      </div>
    </div>
  );
}