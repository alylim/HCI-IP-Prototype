import { ChevronDownIcon } from 'lucide-react';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

function Category({
  category,
  children,
}: {
  category: string;
  children: React.ReactNode;
}) {
  return (
    <AccordionItem value={category}>
      <AccordionTrigger>{category}</AccordionTrigger>
      <AccordionContent className="flex flex-col gap-4">
        {children}
      </AccordionContent>
    </AccordionItem>
  );
}

export { Category };
