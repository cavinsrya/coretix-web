import Button from "../atoms/Button";

type Props = {
  onSave: () => void;
  onCancel: () => void;
};

export function ActionButtonGroup({ onSave, onCancel }: Props) {
  return (
    <div className="flex justify-end space-x-4">
      <Button onClick={onCancel}>Batal</Button>
      <Button onClick={onSave}>Simpan</Button>
    </div>
  );
}
