import { useEffect, useState } from "react";
import { useParams } from "wouter";
import { supabase } from "@/lib/supabase";

interface Post {
  id: string;
  title: string;
  content: string;
  image_urls: string[] | null;
  created_at: string;
}

export default function NewsPost() {
  const { slug } = useParams();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .single();

      if (!error) {
        setPost(data);
      }

      setLoading(false);
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center">
        Loading article...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center">
        Post not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white py-16 px-6">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold mb-6">{post.title}</h1>

        {post.image_urls && post.image_urls.length > 0 && (
          <img
            src={post.image_urls[0]}
            alt={post.title}
            className="rounded-xl mb-6"
          />
        )}

        <div
          dangerouslySetInnerHTML={{ __html: post.content }}
          className="prose prose-invert max-w-none"
        />

      </div>
    </div>
  );
}