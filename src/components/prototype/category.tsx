// import { ChevronDownIcon } from 'lucide-react';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { cn } from '@/lib/utils';

const colorClassMap: Record<string, string> = {
  '#F1C2C0': 'border-[#F1C2C0]',
  '#a2cce6ff': 'border-[#a2cce6ff]',
  '#caeea6ff': 'border-[#caeea6ff]',
  '#e9eaacff': 'border-[#e9eaacff]',
  '#d1a2d2ff': 'border-[#d1a2d2ff]',
  none: 'border-white',
};

function Category({
  category,
  color = 'none',
  children,
}: {
  category: string;
  color?: string;
  children: React.ReactNode;
}) {
  return (
    <AccordionItem
      value={category}
      className={cn('border-l-4 pl-3 rounded-md', colorClassMap[color])}
    >
      <AccordionTrigger>{category}</AccordionTrigger>
      <AccordionContent className="flex flex-col gap-4">
        {children}
      </AccordionContent>
    </AccordionItem>
  );
}

export { Category };
