import { useState } from 'react';
import { Eye, EyeOff, Copy, PencilLine } from 'lucide-react';
import { toast } from 'sonner';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/ui/item';
import { Button } from '@/components/ui';
import { Separator } from '@/components/ui/separator';
import { Label } from '@radix-ui/react-label';
import type { LoginType } from './new-login';

function ViewLogin({
  data,
  onEdit,
}: {
  data: LoginType;
  onEdit: (login: LoginType) => void;
}) {
  const [viewPassword, setViewPassword] = useState(false);

  function toCopy(value: string) {
    navigator.clipboard.writeText(value);
    toast.success('Copied');
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Item variant="default">
          <ItemContent>
            <ItemTitle>{data.domain}</ItemTitle>
          </ItemContent>
        </Item>
        <Button variant="outline" size="sm" onClick={() => onEdit(data)}>
          <PencilLine /> Edit
        </Button>
      </div>

      <div>
        <Item variant="default">
          <ItemContent>
            <Label>Username</Label>
            <ItemDescription>{data.username}</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => toCopy(data.username)}
            >
              <Copy size={4} />
            </Button>
          </ItemActions>
        </Item>

        <Separator />

        <Item variant="default">
          <ItemContent>
            <Label>Password</Label>
            <ItemDescription>
              {viewPassword ? data.password : '********'}
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => setViewPassword((prev) => !prev)}
            >
              {viewPassword ? <EyeOff size={4} /> : <Eye size={4} />}
            </Button>

            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => toCopy(data.password)}
            >
              <Copy size={4} />
            </Button>
          </ItemActions>
        </Item>
      </div>
    </div>
  );
}

export { ViewLogin };
