import React, { useState } from 'react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onExitAdmin: () => void;
  getValidCredentials: () => { username: string; password: string };
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  onLoginSuccess,
  onExitAdmin,
  getValidCredentials,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    const validCreds = getValidCredentials();

    setTimeout(() => {
      if (
        username.trim().toLowerCase() === validCreds.username.toLowerCase() &&
        password === validCreds.password
      ) {
        onLoginSuccess();
      } else {
        setErrorMsg('Invalid username or password. Please try again.');
        setIsLoading(false);
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#fff8f6] text-[#201a18] flex flex-col items-center justify-center p-4 relative font-sans selection:bg-[#ffdbcd] selection:text-[#370e00]">
      {/* Background ambient accents */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#9e5432]/10 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-[#803d1d]/5 blur-[80px] pointer-events-none rounded-full" />

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-[#fff8f6] border border-[#dac2b9]/80 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 backdrop-blur-sm">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#803d1d] text-white flex items-center justify-center font-bold text-2xl shadow-md font-serif-display mb-4">
            F
          </div>
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#803d1d] font-bold block mb-1">
            Payload CRM · Atelier Admin
          </span>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-normal text-[#201a18]">
            Flurrygraphy Sign In
          </h1>
          <p className="text-xs text-[#54433c] mt-1.5 max-w-xs">
            Authenticate to manage portfolio works, lead pipeline, page copy, and media assets.
          </p>
        </div>

        {/* Error Notice */}
        {errorMsg && (
          <div className="mb-6 p-3.5 rounded-xl bg-[#ffdad6]/60 border border-[#ffb4ab] text-[#ba1a1a] text-xs flex items-center gap-2.5 animate-shake">
            <span className="material-symbols-outlined text-base shrink-0">
              error
            </span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#201a18] mb-1.5">
              Username
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-base text-[#54433c]">
                person
              </span>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setErrorMsg(null);
                }}
                placeholder="Enter username"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#dac2b9] focus:outline-none focus:border-[#803d1d] focus:ring-1 focus:ring-[#803d1d] text-xs text-[#201a18] transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-[#201a18]">
                Password
              </label>
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-base text-[#54433c]">
                lock
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMsg(null);
                }}
                placeholder="Enter password"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white border border-[#dac2b9] focus:outline-none focus:border-[#803d1d] focus:ring-1 focus:ring-[#803d1d] text-xs text-[#201a18] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#54433c] hover:text-[#201a18] transition-colors cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <span className="material-symbols-outlined text-base">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 px-4 rounded-xl bg-[#803d1d] hover:bg-[#8e4d32] active:bg-[#6d351e] text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-md hover:shadow-lg disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Verifying credentials...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-base">
                  login
                </span>
                <span>Sign In to Atelier CRM</span>
              </>
            )}
          </button>
        </form>

        {/* Return to Public Atelier */}
        <div className="mt-6 pt-5 border-t border-[#dac2b9]/60 flex flex-col items-center text-center">
          <button
            onClick={onExitAdmin}
            className="text-xs text-[#54433c] hover:text-[#803d1d] transition-colors flex items-center gap-1 font-medium cursor-pointer"
          >
            <span>← Return to Public Atelier</span>
          </button>
        </div>
      </div>

      {/* Footer Atelier Tag */}
      <div className="mt-8 text-center text-[11px] text-[#54433c] font-mono">
        Flurrygraphy Creative Direction Atelier · Payload CRM v3.1
      </div>
    </div>
  );
};
