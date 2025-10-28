// import { useState } from 'react';
import { Input, Button } from '@/components/ui';
import { Label } from '@radix-ui/react-label';
import { Plus } from 'lucide-react';

// type AdditionalFieldType = {
//   label: string;
//   value: string;
// };

function LoginForm() {
  //   const [additionlFields, setAdditionalFields] = useState<
  //     Array<AdditionalFieldType>
  //   >([]);

  return (
    <div>
      <Label></Label>
      <div>
        <Label>Website</Label>
        <Input />
        <Label>Category</Label>
        {/* change to combobox */}
        <Input />
      </div>

      <Label>Credentials</Label>
      <div>
        <Label>Username</Label>
        <Input />
        <Label>Password</Label>
        <Input />
      </div>

      <Label>Additional options</Label>
      <Button>
        <>
          <Plus className="w-4 h-4" />
          Add field
        </>
      </Button>
    </div>
  );
}

export { LoginForm };
