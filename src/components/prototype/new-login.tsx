'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CustomFields } from './custom-fields';
import { Eye, EyeOff, Trash2 } from 'lucide-react';
import { DeleteDialog } from './delete-dialog';

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
  onDelete?: (loginId: string) => void;
};

function LoginForm({
  addLogin,
  defaultValues,
  onCancel,
  onDelete,
}: LoginFormProps) {
  const [viewPassword, setViewPassword] = useState(false);
  const [formData, setFormData] = useState(defaultValues || emptyLogin);
  const [additionalFields, setAdditionalFields] = useState<AdditionalField[]>(
    defaultValues?.additionalFields || [],
  );
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

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

  function handleDelete() {
    if (defaultValues && onDelete) {
      onDelete(defaultValues.id);
      setShowDeleteDialog(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {defaultValues ? 'Edit Login' : 'Add Login'}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {defaultValues
                  ? 'Update your login information'
                  : 'Create a new login entry'}
              </p>
            </div>
            {defaultValues && onDelete && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={() => setShowDeleteDialog(true)}
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
            )}
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <StyledLabel>Category</StyledLabel>
              <Input
                name="category"
                placeholder="e.g. Work, Personal, Streaming"
                value={formData.category}
                onChange={handleChange}
                className="h-10"
              />
            </div>

            <div className="space-y-2">
              <StyledLabel>Website/Application name</StyledLabel>
              <Input
                name="domain"
                placeholder="e.g. Netflix, Gmail"
                value={formData.domain}
                onChange={handleChange}
                required
                className="h-10"
              />
            </div>

            <div className="space-y-2">
              <StyledLabel>URL</StyledLabel>
              <Input
                name="uri"
                placeholder="https://example.com"
                value={formData.uri}
                onChange={handleChange}
                className="h-10"
              />
              <p className="text-xs text-muted-foreground">
                Used for autofill detection
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <StyledLabel htmlFor="username">Username</StyledLabel>
              <Input
                name="username"
                placeholder="user@example.com"
                value={formData.username}
                onChange={handleChange}
                required
                className="h-10"
              />
            </div>

            <div className="space-y-2">
              <StyledLabel>Password</StyledLabel>
              <div className="relative">
                <Input
                  className="pr-10 h-10"
                  name="password"
                  type={viewPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <Button
                  variant="ghost"
                  className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:bg-transparent hover:text-foreground"
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

          <div className="space-y-2">
            <StyledLabel>Custom Fields</StyledLabel>
            <CustomFields
              fields={additionalFields}
              onChange={setAdditionalFields}
            />
          </div>

          <div className="pt-4 flex gap-3 border-t border-border">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-10 bg-transparent"
                onClick={onCancel}
              >
                Cancel
              </Button>
            )}
            <Button type="submit" className="flex-1 h-10">
              {defaultValues ? 'Save' : 'Save'}
            </Button>
          </div>
        </div>
      </form>
      <DeleteDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onDelete={handleDelete}
        domain={defaultValues?.domain}
      />
    </div>
  );
}

export { LoginForm };

const StyledLabel = ({
  children,
  htmlFor,
}: React.ComponentProps<typeof Label>) => (
  <Label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
    {children}
  </Label>
);
