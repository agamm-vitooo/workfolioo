import { useState } from "react";

import {
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  Eye,
  EyeOff,
  Lock,
  LogIn,
  Mail,
} from "lucide-react";


import { toast } from "sonner";

import { auth } from "../../firebase/firebase";


import { useNavigate } from "react-router-dom";

import LoginImage from "../../assets/login.JPG.jpeg";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");


  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const [loading, setLoading] =
    useState(false);

  const handleLogin = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      toast.success(
        "Login berhasil 🚀"
      );

      navigate("/admin");

    } catch (error) {

      console.error(error);

      toast.error(
        "Email atau password salah"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

      <div
        className="
          w-full
          max-w-5xl
          bg-white
          rounded-3xl
          overflow-hidden
          shadow-2xl
          grid
          grid-cols-1
          lg:grid-cols-2
        "
      >

        {/* LEFT IMAGE */}
        <div className="hidden lg:block relative">

          <img
            src={LoginImage}
            alt="Login"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/30" />

          <div className="absolute bottom-10 left-10 text-white">

            <h1 className="text-4xl font-bold mb-3">
              Workfolio Admin
            </h1>

            <p className="text-lg text-slate-100 max-w-sm">
              Manage your portfolio,
              projects, certificates,
              and work experiences easily.
            </p>

          </div>

        </div>

        {/* RIGHT FORM */}
        <div className="flex items-center justify-center p-8 lg:p-14 bg-white">

          <form
            onSubmit={handleLogin}
            className="w-full max-w-md"
          >

            <div className="mb-10">

              <h2 className="text-4xl font-bold text-slate-900 mb-3">
                Login
              </h2>

              <p className="text-slate-500">
                Enter your credentials to continue
              </p>

            </div>

            {/* EMAIL */}
            <div className="mb-5">

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email
              </label>

              <div className="relative">

                <Mail
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    w-5
                    h-5
                    text-slate-400
                  "
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="Enter your email"
                  className="
                    w-full
                    border
                    border-slate-300
                    rounded-2xl
                    pl-12
                    pr-4
                    py-4
                    text-slate-900
                    bg-white
                    placeholder:text-slate-400
                    outline-none
                    focus:ring-2
                    focus:ring-slate-300
                    focus:border-slate-400
                    transition
                  "
                  required
                />

              </div>

            </div>

            {/* PASSWORD */}
            <div className="mb-8">

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>

              <div className="relative">

                <Lock
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    w-5
                    h-5
                    text-slate-400
                  "
                />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="
                    w-full
                    border
                    border-slate-300
                    rounded-2xl
                    pl-12
                    pr-12
                    py-4
                    text-slate-900
                    bg-white
                    placeholder:text-slate-400
                    outline-none
                    focus:ring-2
                    focus:ring-slate-300
                    focus:border-slate-400
                    transition
                  "
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>


              </div>

            </div>

            {/* BUTTONS */}
            <div className="flex flex-col gap-3">
              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  flex
                  items-center
                  justify-center
                  gap-2
                  bg-slate-900
                  hover:bg-slate-800
                  text-white
                  font-semibold
                  py-4
                  rounded-2xl
                  transition
                  disabled:opacity-70
                  disabled:cursor-not-allowed
                "
              >
                <LogIn className="w-5 h-5" />
                {loading ? "Loading..." : "Login"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/")}
                className="
                  w-full
                  flex
                  items-center
                  justify-center
                  gap-2
                  bg-white
                  border
                  border-slate-200
                  hover:bg-slate-50
                  text-slate-700
                  font-semibold
                  py-4
                  rounded-2xl
                  transition
                "
              >
                Home
              </button>
            </div>


          </form>

        </div>

      </div>

    </div>
  );
};

export default LoginPage;