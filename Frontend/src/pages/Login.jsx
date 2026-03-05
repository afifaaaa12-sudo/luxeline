import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  const isSignUp = currentState === "Sign Up";

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isSignUp) {
        const response = await axios.post(backendUrl + "/api/user/register", { name, email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", { email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="relative min-h-[calc(100vh-2rem)] sm:min-h-[calc(100vh-3rem)] flex items-center justify-center py-8 overflow-hidden">
      <style>{`
        @keyframes floatOne {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-16px) translateX(10px); }
        }
        @keyframes floatTwo {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(18px) translateX(-12px); }
        }
        .auth-blob-one { animation: floatOne 7s ease-in-out infinite; }
        .auth-blob-two { animation: floatTwo 8s ease-in-out infinite; }
      `}</style>

      <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-rose-50" />
      <div className="auth-blob-one absolute -top-14 -left-10 h-56 w-56 rounded-full bg-rose-200/45 blur-3xl" />
      <div className="auth-blob-two absolute -bottom-14 -right-10 h-64 w-64 rounded-full bg-sky-200/45 blur-3xl" />

      <div
        className={`relative z-10 w-full max-w-5xl rounded-3xl border border-slate-100 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr]">
          <div className="hidden lg:flex flex-col justify-between rounded-l-3xl border-r border-slate-100 bg-gradient-to-br from-white to-slate-50 p-10">
            <div>
              <p className="text-xs tracking-[0.25em] uppercase text-slate-500">Luxeline</p>
              <h1 className="mt-5 text-4xl leading-tight font-semibold text-slate-900">Welcome back to premium shopping.</h1>
              <p className="mt-4 text-sm text-slate-600">
                Sign in to manage orders, track shipments, and checkout faster with saved details.
              </p>
            </div>

            <div className="space-y-3 text-sm text-slate-600">
              <p>Secure authentication and fast checkout</p>
              <p>Order history and real-time delivery updates</p>
              <p>Personalized product suggestions</p>
            </div>
          </div>

          <div className="p-5 sm:p-8 md:p-10 bg-white rounded-3xl lg:rounded-none lg:rounded-r-3xl">
            <div className="mb-6 inline-flex rounded-xl bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setCurrentState("Login")}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  !isSignUp ? "bg-white text-slate-900 shadow" : "text-slate-500"
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setCurrentState("Sign Up")}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  isSignUp ? "bg-white text-slate-900 shadow" : "text-slate-500"
                }`}
              >
                Sign Up
              </button>
            </div>

            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
              {isSignUp ? "Create your account" : "Sign in to your account"}
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              {isSignUp ? "Start shopping in less than a minute." : "Enter your credentials to continue."}
            </p>

            <form onSubmit={onSubmitHandler} className="mt-7 space-y-4">
              {isSignUp && (
                <div className="transition-all duration-300">
                  <label className="mb-1 block text-sm text-slate-700">Full Name</label>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type="text"
                    placeholder="John Doe"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-300/50"
                  />
                </div>
              )}

              <div>
                <label className="mb-1 block text-sm text-slate-700">Email Address</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="your@email.com"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-300/50"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-slate-700">Password</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  placeholder="Enter your password"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-300/50"
                />
              </div>

              <div className="flex items-center justify-between pt-1 text-sm">

                <button
                  type="button"
                  onClick={() => setCurrentState(isSignUp ? "Login" : "Sign Up")}
                  className="font-medium text-slate-900 hover:text-slate-600 transition"
                >
                  {isSignUp ? "Have an account? Login" : "New here? Create account"}
                </button>
              </div>

              <button
                disabled={isSubmitting}
                className="mt-2 w-full rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:translate-y-[-1px] hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Please wait..." : isSignUp ? "Create Account" : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

