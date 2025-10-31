import { useState } from 'react';
import { Button, Input } from '@/components/ui';
import { Label } from '@radix-ui/react-label';
import { CustomFields } from './custom-fields';
import { Eye, EyeOff } from 'lucide-react';

type AdditionalField = {
  id: string;
  label: string;
  type: 'text' | 'hidden';
  value: string;
};

export type LoginType = {
  id: string;
  username: string;
  password: string;
  category?: string;
  uri: string;
  domain: string;
  additionalFields?: Array<AdditionalField>;
};

const emptyLogin = {
  id: crypto.randomUUID(),
  domain: '',
  category: '',
  username: '',
  password: '',
  uri: '',
};

type LoginFormProps = {
  addLogin: (values: LoginType) => void;
  defaultValues?: LoginType;
  onCancel?: () => void;
};

function LoginForm({ addLogin, defaultValues, onCancel }: LoginFormProps) {
  const [viewPassword, setViewPassword] = useState(false);
  const [formData, setFormData] = useState(defaultValues || emptyLogin);
  const [additionalFields, setAdditionalFields] = useState<AdditionalField[]>(
    defaultValues?.additionalFields || [],
  );

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    addLogin({
      ...formData,
      additionalFields,
    });

    setFormData(emptyLogin);
    setAdditionalFields([]);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <Label className="font-semibold text-md py-4">
          {defaultValues ? 'Edit login' : 'Add new login'}
        </Label>
        <div className="space-y-2">
          <div>
            <StyledLabel>Website/Application</StyledLabel>
            <Input
              name="domain"
              placeholder="e.g. bitwarden.com"
              value={formData.domain}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <StyledLabel>Category</StyledLabel>
            <Input
              name="category"
              placeholder="e.g. Work, Personal"
              value={formData.category}
              onChange={handleChange}
            />
          </div>
          <div>
            <StyledLabel>URL</StyledLabel>
            <Input
              name="uri"
              placeholder="Enter the URL of the application or website for autofill"
              value={formData.uri}
              onChange={handleChange}
            />
          </div>
        </div>

        <Label>Credentials</Label>
        <div className="space-y-2">
          <div>
            <StyledLabel htmlFor="username">Username</StyledLabel>
            <Input
              name="username"
              placeholder="user@example.com"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <StyledLabel>Password</StyledLabel>
            <div className="relative">
              <Input
                className="pr-10"
                name="password"
                type={viewPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                required
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
          </div>
        </div>

        <Label>Additional options</Label>
        <CustomFields
          fields={additionalFields}
          onChange={setAdditionalFields}
        />

        <div className="pt-2 flex gap-2">
          <Button type="submit" className="flex-1">
            {defaultValues ? 'Save changes' : 'Save login'}
          </Button>
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onCancel}
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}

export { LoginForm };

const StyledLabel = ({ children }: React.ComponentProps<typeof Label>) => (
  <Label className="text-sm text-muted-foreground block">{children}</Label>
);
