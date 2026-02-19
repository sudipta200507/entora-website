export function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="section-shell flex flex-col items-center justify-between gap-3 text-center text-xs text-slate-400 sm:flex-row sm:text-left">
        <p>© {new Date().getFullYear()} Entora. All rights reserved.</p>
        <p>AI-first technology company building intelligent systems for growth.</p>
      </div>
    </footer>
  );
}
