import type React from 'react';
// import { ChevronDownIcon } from 'lucide-react';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { cn } from '@/lib/utils';

function Category({
  category,
  children,
}: {
  category: string;
  color?: string;
  children: React.ReactNode;
}) {
  return (
    <AccordionItem
      value={category}
      className={cn('border border-border bg-card rounded-md overflow-hidden')}
    >
      <AccordionTrigger className="px-4 py-3 hover:bg-accent/50 font-medium text-sm">
        {category}
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-2 pt-1 space-y-1 bg-muted/30">
        {children}
      </AccordionContent>
    </AccordionItem>
  );
}

export { Category };
