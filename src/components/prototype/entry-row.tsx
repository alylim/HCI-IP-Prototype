import { ChevronRightIcon } from 'lucide-react';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/ui/item';
import { Button } from '@/components/ui';

function EntryRow({
  domain,
  username,
  onClick,
}: {
  domain: string;
  username: string;
  onClick: () => void;
}) {
  return (
    <Item variant="outline">
      <ItemContent>
        <ItemTitle>{domain}</ItemTitle>
        <ItemDescription>{username}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button type="button" onClick={onClick}>
          Launch
        </Button>
        <ChevronRightIcon className="size-4" />
      </ItemActions>
    </Item>
  );
}

export { EntryRow };
