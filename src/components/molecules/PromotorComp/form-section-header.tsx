interface FormSectionHeaderProps {
  title: string;
  description?: string;
}

export function FormSectionHeader({
  title,
  description,
}: FormSectionHeaderProps) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-medium">{title}</h2>
      {description && (
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      )}
    </div>
  );
}
