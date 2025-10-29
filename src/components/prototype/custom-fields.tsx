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
import { cn } from '@/lib/utils';

type FieldType = 'text' | 'hidden';

type CustomField = {
  id: number;
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
      { id: Date.now(), label: '', type: 'text', value: '', editing: true },
    ]);
  }

  function updateField(id: number, key: keyof CustomField, value: string) {
    onChange(fields.map((f) => (f.id === id ? { ...f, [key]: value } : f)));
  }

  function saveField(id: number) {
    onChange(fields.map((f) => (f.id === id ? { ...f, editing: false } : f)));
  }

  function cancelField(id: number) {
    onChange(fields.filter((f) => f.id !== id));
  }

  function toggleEdit(id: number) {
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
            <Input
              type={field.type === 'hidden' ? 'password' : 'text'}
              placeholder="Value"
              value={field.value}
              onChange={(e) => updateField(field.id, 'value', e.target.value)}
            />

            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => cancelField(field.id)}
              >
                <X className="w-4 h-4 mr-1" /> Cancel
              </Button>
              <Button
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
