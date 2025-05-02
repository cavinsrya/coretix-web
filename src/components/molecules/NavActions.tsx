import Button from "@/components/atoms/Button";

export default function NavActions() {
  return (
    <div className="flex items-center gap-2">
      <Button href="/explore" variant="ghost">
        Explore
      </Button>
      <Button href="/register" variant="primary" className="py-2 px-4">
        Daftar
      </Button>
      <Button href="/login" variant="accent" className="py-2 px-4">
        Masuk
      </Button>
    </div>
  );
}
