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
  children: React.ReactNode;
}) {
  return (
    <AccordionItem
      value={category}
      className={cn('border-l-4 pl-3 rounded-md')}
    >
      <AccordionTrigger>{category}</AccordionTrigger>
      <AccordionContent className="flex flex-col gap-4">
        {children}
      </AccordionContent>
    </AccordionItem>
  );
}

export { Category };
