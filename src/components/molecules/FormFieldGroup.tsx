import Input from "../atoms/Input";
import { TextareaField } from "../atoms/TextAreaField";

type Props =
  | {
      type: "input";
      label: string;
      id: string;
      value: string;
      placeholder: string;
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    }
  | {
      type: "textarea";
      label: string;
      id: string;
      value: string;
      placeholder: string;
      onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    };

export function FormFieldGroup(props: Props) {
  return props.type === "input" ? (
    <Input
      label={props.label}
      id={props.id}
      value={props.value}
      onChange={props.onChange}
      name={""}
      placeholder={props.placeholder}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#86e64c] focus:border-transparent"
    />
  ) : (
    <TextareaField
      label={props.label}
      id={props.id}
      value={props.value}
      onChange={props.onChange}
      rows={4}
      placeholder={props.placeholder}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#86e64c] focus:border-transparent"
    />
  );
}
