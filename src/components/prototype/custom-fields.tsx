import { useState } from 'react';
import { Input, Button } from '@/components/ui';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@radix-ui/react-label';
import { Plus, EyeOff, Eye, Pencil, Check, X } from 'lucide-react';

type FieldType = 'text' | 'hidden';

type CustomField = {
  id: string;
  label: string;
  type: FieldType;
  value: string;
  editing?: boolean;
};

type CustomFieldsProps = {
  fields: CustomField[];
  onChange: (fields: CustomField[]) => void;
};

function CustomFields({ onChange, fields }: CustomFieldsProps) {
  function addField() {
    onChange([
      ...fields,
      {
        id: crypto.randomUUID(),
        label: '',
        type: 'text',
        value: '',
        editing: true,
      },
    ]);
  }

  function updateField(id: string, key: keyof CustomField, value: string) {
    onChange(fields.map((f) => (f.id === id ? { ...f, [key]: value } : f)));
  }

  function saveField(id: string) {
    onChange(fields.map((f) => (f.id === id ? { ...f, editing: false } : f)));
  }

  function cancelField(id: string) {
    onChange(fields.filter((f) => f.id !== id));
  }

  function toggleEdit(id: string) {
    onChange(fields.map((f) => (f.id === id ? { ...f, editing: true } : f)));
  }

  return (
    <div className="rounded-lg border bg-card p-4 space-y-3">
      <Label className="font-medium text-sm">Custom fields</Label>

      {fields.map((field) =>
        field.editing ? (
          <div
            key={field.id}
            className="flex flex-col gap-2 rounded-md border p-3 bg-background"
          >
            <div className="flex gap-2">
              <Select
                value={field.type}
                onValueChange={(v) =>
                  updateField(field.id, 'type', v as FieldType)
                }
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="hidden">Hidden</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Field name"
                value={field.label}
                onChange={(e) => updateField(field.id, 'label', e.target.value)}
              />
            </div>

            {field.type === 'hidden' ? (
              <HiddenFieldInput
                value={field.value}
                onChange={(val) => updateField(field.id, 'value', val)}
              />
            ) : (
              <Input
                type="text"
                placeholder="Value"
                value={field.value}
                onChange={(e) => updateField(field.id, 'value', e.target.value)}
              />
            )}

            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => cancelField(field.id)}
              >
                <X className="w-4 h-4 mr-1" /> Cancel
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={() => saveField(field.id)}
                disabled={!field.label || !field.value}
              >
                <Check className="w-4 h-4 mr-1" /> Save
              </Button>
            </div>
          </div>
        ) : (
          <div
            key={field.id}
            className="flex items-center gap-2 rounded-md border p-3 bg-background"
          >
            <div className="flex-1">
              <Label className="text-xs text-muted-foreground">
                {field.label}
              </Label>
              <Input
                readOnly
                type={field.type === 'hidden' ? 'password' : 'text'}
                value={field.value}
                className="mt-1"
              />
              <p>{field.type}</p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => toggleEdit(field.id)}
            >
              <Pencil className="w-4 h-4" />
            </Button>
          </div>
        ),
      )}

      <Button
        type="button"
        variant="ghost"
        className="text-primary flex items-center gap-2 font-medium"
        onClick={addField}
      >
        <Plus className="w-4 h-4" /> Add field
      </Button>
    </div>
  );
}

export { CustomFields, type CustomField };

function HiddenFieldInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const [viewPassword, setViewPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        className="pr-10"
        type={viewPassword ? 'text' : 'password'}
        placeholder="Value"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Button
        variant="ghost"
        className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:bg-transparent"
        size="icon"
        type="button"
        onClick={() => setViewPassword((prev) => !prev)}
      >
        {viewPassword ? (
          <EyeOff className="w-4 h-4" />
        ) : (
          <Eye className="w-4 h-4" />
        )}
      </Button>
    </div>
  );
}
