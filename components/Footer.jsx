export default function Footer() {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 py-8 text-center text-neutral-400 text-sm mt-16">
      <div className="container mx-auto px-4">
        <p className="mb-2">&copy; {new Date().getFullYear()} Vulture. All rights reserved.</p>
        <p className="text-neutral-500">
          Designed to uncover, not to discourage.
        </p>
      </div>
    </footer>
  );
}