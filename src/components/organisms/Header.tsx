import Logo from "@/components/atoms/Logo";
import SearchBar from "@/components/molecules/SearchBar";
import NavActions from "@/components/molecules/NavActions";
import MobileMenu from "@/components/molecules/MobileMenu";

export default function Header() {
  return (
    <header className="bg-[#050a47] text-white py-4 px-4 sticky top-0 z-10">
      {/* Main Container */}
      <div className="container mx-auto">
        {/* Desktop & Mobile Header Row */}
        <div className="flex items-center justify-between">
          {/* Logo - Always on left */}
          <div className="flex-shrink-0">
            <Logo width={150} height={150} />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center flex-1 relative mx-9">
            {/* Search Bar */}

            <SearchBar />
          </div>

          {/* Navigation Actions */}
          <div className="hidden md:block">
            <NavActions />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <MobileMenu />
          </div>
        </div>

        {/* Mobile Search Bar - Below main row */}
        <div className="mt-4 md:hidden">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}
