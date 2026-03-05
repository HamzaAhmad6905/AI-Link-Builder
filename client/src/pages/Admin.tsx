import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const ADMIN_EMAIL = "usamaahmad2718@gmail.com";

export default function Admin() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<FileList | null>(null);

  const [message, setMessage] = useState("");
  const [publishing, setPublishing] = useState(false);

  // ================= CHECK SESSION =================
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setLoading(false);
    };
    checkUser();
  }, []);

  // ================= LOGIN =================
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage("Login failed: " + error.message);
      return;
    }

    if (data.user?.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      setMessage("Access denied. Not authorized.");
      await supabase.auth.signOut();
      return;
    }

    setUser(data.user);
  };

  // ================= LOGOUT =================
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  // ================= PUBLISH POST =================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPublishing(true);
    setMessage("");

    try {
      let uploadedUrls: string[] = [];

      // MULTIPLE IMAGE UPLOAD
      if (images && images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          const file = images[i];
          const fileName = `${Date.now()}-${file.name}`;

          const { error: uploadError } = await supabase.storage
            .from("post-images")
            .upload(fileName, file);

          if (uploadError) {
            setMessage("Image upload failed: " + uploadError.message);
            setPublishing(false);
            return;
          }

          const { data } = supabase.storage
            .from("post-images")
            .getPublicUrl(fileName);

          uploadedUrls.push(data.publicUrl);
        }
      }

      const { error } = await supabase.from("posts").insert([
        {
          title,
          content,
          image_urls: uploadedUrls,
          published: true,
        },
      ]);

      if (error) {
        setMessage("Error: " + error.message);
      } else {
        setMessage("Post published successfully!");
        setTitle("");
        setContent("");
        setImages(null);
      }
    } catch (err) {
      setMessage("Unexpected error occurred.");
    }

    setPublishing(false);
  };

  if (loading) {
    return <div className="p-10 text-white">Checking access...</div>;
  }

  // ================= LOGIN SCREEN =================
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 w-full max-w-md shadow-xl">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Admin Login
          </h1>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              className="w-full bg-black/40 border border-white/20 text-white placeholder-gray-400 p-3 rounded-lg focus:outline-none focus:border-cyan-400"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full bg-black/40 border border-white/20 text-white placeholder-gray-400 p-3 rounded-lg focus:outline-none focus:border-cyan-400"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-white"
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-semibold py-3 rounded-lg transition"
            >
              Login
            </button>
          </form>

          {message && (
            <p className="mt-4 text-red-400 text-sm text-center">
              {message}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    return <div className="p-10 text-white">Access Denied</div>;
  }

  // ================= ADMIN PANEL =================
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-xl">
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            Newsletter Admin Panel
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <input
            className="w-full bg-black/40 border border-white/20 text-white placeholder-gray-400 p-3 rounded-lg focus:outline-none focus:border-cyan-400"
            placeholder="Post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {/* MULTIPLE IMAGE UPLOAD */}
          <div>
            <label className="block mb-2 text-sm text-gray-400">
              Upload Images (Multiple Allowed)
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setImages(e.target.files)}
              className="text-sm text-gray-300"
            />
          </div>

          {/* FIXED EDITOR TEXT COLOR */}
          <div className="bg-white rounded-lg overflow-hidden">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              placeholder="Write your post content here..."
              className="text-black"
            />
          </div>

          <button
            type="submit"
            disabled={publishing}
            className="bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 text-black font-semibold px-6 py-3 rounded-lg transition"
          >
            {publishing ? "Publishing..." : "Publish"}
          </button>

        </form>

        {message && (
          <p className="mt-4 text-green-400 text-sm">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}