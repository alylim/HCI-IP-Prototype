import { ChevronRightIcon } from 'lucide-react';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/ui/item';
import { Button } from '@/components/ui';
import type { LoginType } from './new-login';

function EntryRow({ data, onClick }: { data: LoginType; onClick: () => void }) {
  function handleLaunch() {
    const url =
      data.uri.startsWith('http://') || data.uri.startsWith('https://')
        ? data.uri
        : `https://${data.uri}`;

    window.open(url, '_blank'); // open in new tab
  }

  return (
    <Item variant="outline" onClick={onClick}>
      <ItemContent>
        <ItemTitle>{data.domain}</ItemTitle>
        <ItemDescription>{data.username}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button type="button" onClick={handleLaunch}>
          Launch
        </Button>
        <ChevronRightIcon className="size-4" />
      </ItemActions>
    </Item>
  );
}

export { EntryRow };
