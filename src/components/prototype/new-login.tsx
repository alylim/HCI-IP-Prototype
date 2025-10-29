import { useState } from 'react';
import { Input } from '@/components/ui';
import { Label } from '@radix-ui/react-label';
import { CustomFields } from './custom-fields';

type AdditionalField = {
  id: number;
  label: string;
  type: 'text' | 'hidden';
  value: string;
};
function LoginForm() {
  const [formData, setFormData] = useState();
  const [additionlFields, setAdditionalFields] = useState<AdditionalField[]>(
    [],
  );

  const [color, setColor] = useState<string | null>(null);

  return (
    <div>
      <Label>Add new login</Label>
      <div>
        <Label>Website</Label>
        <Input placeholder="example.com" />
        <Label>Category</Label>
        {/* change to combobox */}
        <Input placeholder="e.g. Work, Personal" />
      </div>

      <Label>Credentials</Label>
      <div>
        <Label>Username</Label>
        <Input />
        <Label>Password</Label>
        <Input />
      </div>

      <Label>Additional options</Label>
      <CustomFields fields={additionlFields} onChange={setAdditionalFields} />
    </div>
  );
}

export { LoginForm };
