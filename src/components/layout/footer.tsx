export function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} 朱耀龙. All rights reserved.</p>
      </div>
    </footer>
  );
}
