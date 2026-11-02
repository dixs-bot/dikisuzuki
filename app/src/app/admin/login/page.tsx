"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { LockKeyhole, Mail, ShieldCheck, ArrowRight, Eye, EyeOff, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setErrorMsg("");
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (error || !data.user) throw new Error(error?.message || "Login gagal. Periksa email dan password.");
      const { data: profile, error: profileError } = await supabase.from("admin_profiles").select("role, full_name").eq("id", data.user.id).single();
      if (profileError || !profile || !["super_admin", "sales_admin"].includes(profile.role)) {
        await supabase.auth.signOut();
        throw new Error("Akun ini belum memiliki akses admin. Hubungi pengelola website.");
      }
      router.replace("/admin/dashboard");
      router.refresh();
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : "Tidak dapat terhubung ke Supabase.");
    } finally {
      setLoading(false);
    }
  };

  return <main className="relative flex min-h-[calc(100vh-2rem)] items-center justify-center overflow-hidden bg-gradient-to-br from-white via-[#f5f9ff] to-[#eaf4ff] px-4 py-12">
    <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#168bff]/10 blur-3xl" />
    <div className="pointer-events-none absolute -bottom-20 -right-10 h-80 w-80 rounded-full bg-[#38a5ff]/10 blur-3xl" />
    <div className="relative w-full max-w-md rounded-[2rem] border border-white bg-white/90 p-7 shadow-[0_25px_80px_rgba(18,59,120,.12)] backdrop-blur-xl sm:p-9">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#123b78] to-[#168bff] text-white shadow-lg shadow-blue-500/20"><LockKeyhole className="h-7 w-7" /></div>
        <span className="section-kicker">Secure Admin Access</span>
        <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-[#123b78]">Admin Portal</h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">Masuk untuk mengelola galeri kendaraan Suzuki Diki Wahyudin.</p>
      </div>
      {errorMsg && <div role="alert" className="mb-5 flex items-start gap-2 rounded-xl border border-red-200 bg-[#eaf4ff] p-3 text-xs leading-5 text-red-700"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />{errorMsg}</div>}
      <form onSubmit={handleLogin} className="space-y-4">
        <label className="block"><span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-600">Email Admin</span><span className="relative block"><Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#168bff]" /><input type="email" required autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@domain.com" className="input-premium pl-10" /></span></label>
        <label className="block"><span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-600">Kata Sandi</span><span className="relative block"><LockKeyhole className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#168bff]" /><input type={showPassword ? "text" : "password"} required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukkan kata sandi" className="input-premium pl-10 pr-11" /><button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#1765c0]" aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}>{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></span></label>
        <button type="submit" disabled={loading} className="btn-neon flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-60">{loading ? "Memverifikasi..." : "Masuk ke Dashboard"}<ArrowRight className="h-4 w-4" /></button>
      </form>
      <div className="mt-6 flex items-center justify-center gap-2 border-t border-[#e7f0fb] pt-5 text-[11px] text-slate-400"><ShieldCheck className="h-4 w-4 text-[#168bff]" /> Dilindungi autentikasi Supabase</div>
    </div>
  </main>;
}
