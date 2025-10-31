'use client';

import { useState } from 'react';
import { Eye, EyeOff, Copy, PencilLine } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Label } from '@radix-ui/react-label';
import type { LoginType } from './new-login';
import { DeleteDialog } from './delete-dialog';

function ViewLogin({
  data,
  onEdit,
  onDelete,
}: {
  data: LoginType;
  onEdit: (login: LoginType) => void;
  onDelete?: (loginId: string) => void;
}) {
  const [viewPassword, setViewPassword] = useState(false);
  const [visibleCustomFields, setVisibleCustomFields] = useState<Set<string>>(
    new Set(),
  );
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  function toCopy(value: string) {
    navigator.clipboard.writeText(value);
    toast.success('Copied to clipboard');
  }

  function toggleCustomFieldVisibility(fieldId: string) {
    setVisibleCustomFields((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(fieldId)) {
        newSet.delete(fieldId);
      } else {
        newSet.add(fieldId);
      }
      return newSet;
    });
  }

  function handleDelete() {
    if (onDelete) {
      onDelete(data.id);
      setShowDeleteDialog(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            {data.domain}
          </h3>
          {data.category && (
            <p className="text-sm text-muted-foreground mt-1">
              {data.category}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <div className="bg-muted/30 rounded-md p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Username
              </Label>
              <p className="text-sm text-foreground mt-1 truncate">
                {data.username}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => toCopy(data.username)}
              className="ml-2 hover:bg-accent"
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Password
              </Label>
              <p className="text-sm text-foreground mt-1 font-mono">
                {viewPassword ? data.password : '••••••••••••'}
              </p>
            </div>
            <div className="flex gap-1 ml-2">
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setViewPassword((prev) => !prev)}
                className="hover:bg-accent"
              >
                {viewPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => toCopy(data.password)}
                className="hover:bg-accent"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {data.uri && (
          <div className="bg-muted/30 rounded-md p-4">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Website
            </Label>
            <a
              href={
                data.uri.startsWith('http') ? data.uri : `https://${data.uri}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline mt-1 block truncate"
            >
              {data.uri}
            </a>
          </div>
        )}

        {data.additionalFields && data.additionalFields.length > 0 && (
          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Custom Fields
            </Label>
            {data.additionalFields.map((field) => (
              <div key={field.id} className="bg-muted/30 rounded-md p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      {field.label}
                    </Label>
                    <p className="text-sm text-foreground mt-1 truncate">
                      {field.type === 'hidden' &&
                      !visibleCustomFields.has(field.id)
                        ? '••••••••••••'
                        : field.value}
                    </p>
                  </div>
                  <div className="flex gap-1 ml-2">
                    {field.type === 'hidden' && (
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => toggleCustomFieldVisibility(field.id)}
                        className="hover:bg-accent"
                      >
                        {visibleCustomFields.has(field.id) ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => toCopy(field.value)}
                      className="hover:bg-accent"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="pt-4 flex gap-3 border-t border-border">
          <Button
            variant="default"
            className="flex-1 h-10"
            onClick={() => onEdit(data)}
          >
            <PencilLine className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </div>
      </div>
      <DeleteDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onDelete={handleDelete}
        domain={data.domain}
      />
    </div>
  );
}

export { ViewLogin };
