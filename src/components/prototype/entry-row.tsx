'use client';

import { ChevronRightIcon } from 'lucide-react';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/ui/item';
import { Button } from '@/components/ui/button';
import type { LoginType } from './new-login';

function EntryRow({ data, onClick }: { data: LoginType; onClick: () => void }) {
  function handleLaunch() {
    const url =
      data.uri.startsWith('http://') || data.uri.startsWith('https://')
        ? data.uri
        : `https://${data.uri}`;

    window.open(url, '_blank');
  }

  return (
    <Item
      variant="muted"
      onClick={onClick}
      className="hover:bg-accent/50 cursor-pointer transition-colors border-0 rounded-none border-b border-border last:border-b-0 px-6 py-3"
    >
      <ItemContent>
        <ItemTitle className="font-medium text-sm">{data.domain}</ItemTitle>
        <ItemDescription className="text-xs text-muted-foreground">
          {data.username}
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleLaunch();
          }}
          size="sm"
          variant="ghost"
          className="text-primary hover:text-primary hover:bg-primary/10"
        >
          Launch
        </Button>
        <ChevronRightIcon className="size-4 text-muted-foreground" />
      </ItemActions>
    </Item>
  );
}

export { EntryRow };
