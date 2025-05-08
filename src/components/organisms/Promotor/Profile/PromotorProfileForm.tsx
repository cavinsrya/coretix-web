import { FormFieldGroup } from "@/components/molecules/FormFieldGroup";
import { ActionButtonGroup } from "@/components/molecules/ActionButtonGroup";

type Props = {
  name: string;
  email: string;
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onCancel: () => void;
};

export function PromoterProfileForm({
  name,
  email,
  onChangeName,
  onChangeEmail,
  onSave,
  onCancel,
}: Props) {
  return (
    <div className="flex-1 space-y-4">
      <FormFieldGroup
        type="input"
        label="Nama Promotor"
        id="name"
        value={name}
        placeholder="Masukan nama promotor"
        onChange={onChangeName}
      />
      <FormFieldGroup
        type="input"
        label="Email"
        id="email"
        value={email}
        placeholder="Masukan email anda"
        onChange={onChangeEmail}
      />
      <ActionButtonGroup onSave={onSave} onCancel={onCancel} />
    </div>
  );
}
