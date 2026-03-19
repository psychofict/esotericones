"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { labelSocials } from "@/data/label";
import { useFormSubmit } from "@/lib/useFormSubmit";
import { useTranslation } from "@/i18n/useTranslation";

const socialIcons: Record<string, React.ReactNode> = {
  spotify: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
  ),
  instagram: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
  ),
  twitter: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
  ),
  soundcloud: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.06-.05-.1-.1-.1m-.899.828c-.06 0-.091.037-.104.094L0 14.479l.172 1.282c.013.06.045.094.104.094.053 0 .09-.04.104-.094l.2-1.282-.2-1.332c-.014-.057-.051-.094-.104-.094m1.8-.6c-.067 0-.12.055-.127.12l-.214 2.026.214 1.98c.007.066.06.118.127.118.064 0 .117-.052.127-.118l.241-1.98-.241-2.026c-.01-.065-.063-.12-.127-.12m.901-.48c-.073 0-.135.06-.14.135l-.185 2.506.185 2.14c.005.075.067.135.14.135.076 0 .135-.06.14-.135l.209-2.14-.209-2.506c-.005-.075-.064-.135-.14-.135m.901-.12c-.08 0-.15.066-.155.15l-.157 2.625.157 2.182c.005.083.075.149.155.149.083 0 .15-.066.155-.15l.176-2.181-.176-2.625c-.005-.084-.072-.15-.155-.15m.903.06c-.088 0-.16.072-.163.164l-.129 2.566.129 2.204c.003.09.075.161.163.161.09 0 .16-.072.164-.161l.147-2.204-.147-2.566c-.004-.092-.074-.164-.164-.164m.9-.18c-.094 0-.17.078-.176.176l-.1 2.746.1 2.22c.006.097.082.175.176.175.097 0 .172-.078.176-.175l.115-2.22-.115-2.746c-.004-.098-.079-.176-.176-.176m1.81-.21c-.003-.105-.088-.19-.194-.19-.104 0-.19.085-.193.19l-.096 2.956.096 2.231c.003.108.089.193.193.193.106 0 .191-.085.194-.193l.11-2.231-.11-2.956m.9.42c-.003-.12-.097-.21-.214-.21-.116 0-.21.09-.213.21l-.073 2.536.073 2.244c.003.12.097.21.213.21.117 0 .211-.09.214-.21l.085-2.244-.085-2.536m.9-.42c-.003-.132-.104-.236-.237-.236-.132 0-.233.104-.236.236l-.06 2.956.06 2.256c.003.135.104.239.236.239.133 0 .234-.104.237-.239l.07-2.256-.07-2.956m.903-.18c-.003-.144-.113-.256-.26-.256-.144 0-.257.112-.259.256l-.046 3.136.046 2.268c.002.147.115.259.259.259.147 0 .257-.112.26-.259l.053-2.268-.053-3.136m.9.06c-.003-.156-.12-.277-.282-.277-.16 0-.279.12-.281.277l-.033 3.076.033 2.28c.002.159.121.279.281.279.162 0 .279-.12.282-.279l.037-2.28-.037-3.076m1.693-.14c-.175 0-.318.143-.321.318l-.014 2.898.014 2.286c.003.177.146.32.321.32.175 0 .318-.143.321-.32l.017-2.286-.017-2.898c-.003-.175-.146-.318-.321-.318m.904.18c-.004-.182-.154-.322-.339-.322-.182 0-.335.14-.338.322l-.008 2.718.008 2.289c.003.184.156.324.338.324.185 0 .335-.14.339-.324l.009-2.289-.009-2.718m2.475-.337c-.348-.159-.752-.256-1.176-.256-.42 0-.823.095-1.182.264-.175.082-.223.164-.224.34l-.003 5.13c.002.181.14.33.319.345h4.33c.93 0 1.685-.755 1.685-1.687 0-.933-.755-1.687-1.685-1.687-.326 0-.63.094-.89.255-.126-.742-.786-1.306-1.578-1.306-.342 0-.66.11-.916.295"/></svg>
  ),
  youtube: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
  ),
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const { loading, success, error, submitForm, reset } = useFormSubmit("/api/newsletter");
  const { t } = useTranslation();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    await submitForm({ email });
    if (!error) setEmail("");
  };

  return (
    <footer className="relative bg-background border-t border-border">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div>
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 overflow-hidden rounded-lg">
                <Image
                  src="/images/esoteric-blk.jpg"
                  alt="The ESOTERIC Ones"
                  width={40}
                  height={40}
                  className="w-10 h-10 object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className="text-base font-bold tracking-wider text-foreground">
                THE ES<span className="text-[#E8385D]">O</span>TERIC ONES
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-secondary">
              {t("footer.description")}
            </p>
            <div className="mt-6 flex items-center gap-2">
              {labelSocials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-9 h-9 rounded-full bg-subtle/5 flex items-center justify-center text-foreground/40 transition-all hover:text-[#E8385D] hover:bg-[#E8385D]/10"
                >
                  {socialIcons[social.icon]}
                </a>
              ))}
            </div>
          </div>

          {/* Navigate column */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#E8385D]">
              {t("footer.navigate")}
            </h3>
            <ul className="space-y-3">
              {[
                { name: t("footer.home"), href: "/" },
                { name: t("nav.artists"), href: "/artists" },
                { name: t("nav.releases"), href: "/releases" },
                { name: t("nav.news"), href: "/news" },
                { name: t("nav.about"), href: "/about" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/50 transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect column */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#E8385D]">
              {t("footer.connect")}
            </h3>
            <ul className="space-y-3">
              {labelSocials.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-foreground/50 transition-colors hover:text-foreground inline-flex items-center gap-2"
                  >
                    <span className="text-[#E8385D]/60">{socialIcons[social.icon]}</span>
                    {social.name}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-foreground/50 transition-colors hover:text-foreground"
                >
                  {t("footer.contact")}
                </Link>
              </li>
              <li>
                <Link
                  href="/demos"
                  className="text-sm text-[#E8385D] transition-colors hover:text-[#FF4D73] font-medium"
                >
                  {t("footer.submitADemo")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter column */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#E8385D]">
              {t("footer.newsletter")}
            </h3>
            <p className="mb-4 text-sm text-text-secondary">
              {t("footer.newsletterDesc")}
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (error) reset(); }}
                placeholder="your@email.com"
                required
                className="w-full rounded-lg bg-subtle/5 border border-border px-4 py-2.5 text-sm text-foreground placeholder-foreground/30 outline-none focus:border-[#E8385D] focus:ring-1 focus:ring-[#E8385D] transition-colors"
              />
              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-[#E8385D] px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#FF4D73] hover:shadow-lg hover:shadow-[#E8385D]/20 disabled:opacity-50 flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {success ? t("common.subscribed") : t("common.subscribe")}
              </button>
            </form>
            {error && (
              <p className="mt-2 text-xs text-red-400">
                {error}{" "}
                <button onClick={reset} className="underline hover:text-red-300">
                  {t("common.tryAgain")}
                </button>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <p className="text-xs text-foreground/30">
            &copy; {new Date().getFullYear()} The ES&Oslash;T&Euml;RIC Ones. {t("footer.allRights")}
          </p>
          <div className="flex items-center gap-4">
            <Link href="/contact" className="text-xs text-foreground/30 hover:text-foreground/50 transition-colors">
              {t("footer.contact")}
            </Link>
            <Link href="/about" className="text-xs text-foreground/30 hover:text-foreground/50 transition-colors">
              {t("nav.about")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
