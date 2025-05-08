import Input from "@/components/atoms/Input";

interface BuyerInformationProps {
  name: string;
  setName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
}

export default function BuyerInformation({
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
}: BuyerInformationProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-bold">Informasi Pembeli</h3>
      <div>
        <label>Nama</label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          id={""}
          name={""}
        />
      </div>
      <div>
        <label>Email</label>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id={""}
          name={""}
        />
      </div>
      <div>
        <label>Telepon</label>
        <Input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          id={""}
          name={""}
        />
      </div>
    </div>
  );
}
