import Logo from "../atoms/Logo";
import Heading from "../atoms/Heading";
import Text from "../atoms/Teks";
import ContactItem from "../molecules/ContactItem";

export default function Footer() {
  return (
    <footer className="bg-[#050a47] text-white py-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and Tagline */}
        <div>
          <div className="mb-4">
            <Logo />
          </div>
          <Text size="sm" color="white" className="mb-2">
            "Jual Tiket? Beli Tiket? Semudah Ini!"
          </Text>
          <Text size="xs" className="text-gray-300">
            Jual tiket lebih mudah, kelola event lebih praktis. Rasakan
            kemudahan penawaran otomatis dan proses penjualan tiket yang
            efisien.
          </Text>
        </div>

        {/* Contact */}
        <div>
          <Heading level={3} className="mb-4 text-white">
            Hubungi Kami
          </Heading>
          <div className="space-y-3">
            <ContactItem
              icon={<span className="text-[#050a47] text-xs">?</span>}
              text="+62851438823221"
              subtext="(Customer Support)"
            />
            <ContactItem
              icon={<span className="text-[#050a47] text-xs">?</span>}
              text="+628111677655"
              subtext="(Sponsorship)"
            />
            <ContactItem
              icon={<span className="text-[#050a47] text-xs">?</span>}
              text="coretixid"
            />
            <ContactItem
              icon={<span className="text-[#050a47] text-xs">?</span>}
              text="hello@coretix.id"
            />
          </div>
        </div>

        {/* Office */}
        <div>
          <Heading level={3} className="mb-4 text-white">
            Goers Office:
          </Heading>
          <Text size="sm" color="white" className="mb-4">
            Graha Karya Yudha Lt. 4 Unit B<br />
            Jalan Haji Tubby Alawiyah No. 43
            <br />
            Jakarta Selatan 12160
          </Text>

          <Heading level={3} className="mb-2 text-white">
            Working Hours:
          </Heading>
          <Text size="sm" color="white">
            Weekdays @ 09:00 - 20:00
          </Text>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-8 mt-8 border-t border-gray-700">
        <Text size="sm" color="white" className="text-center">
          © 2025 PT CoreTix Indah Selalu. All Rights Reserved.
        </Text>
      </div>
    </footer>
  );
}
