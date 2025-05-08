interface PointsSectionProps {
  usePoints: boolean;
  setUsePoints: (value: boolean) => void;
  userPoints: number;
}

export default function PointsSection({
  usePoints,
  setUsePoints,
  userPoints,
}: PointsSectionProps) {
  return (
    <div className="space-y-2">
      <h3 className="font-bold">Poin Pengguna</h3>
      <div>
        <input
          type="checkbox"
          checked={usePoints}
          onChange={() => setUsePoints(!usePoints)}
        />
        <span>Gunakan {userPoints} Poin</span>
      </div>
    </div>
  );
}
