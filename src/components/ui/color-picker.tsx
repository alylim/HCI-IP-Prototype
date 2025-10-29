import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils'; // shadcn util for conditional class merging

const colorList = [
  '#F1C2C0',
  '#a2cce6ff',
  '#caeea6ff',
  '#e9eaacff',
  '#d1a2d2ff',
  'none',
];

function ColorIcon({
  color,
  selected,
  onClick,
}: {
  color: string;
  selected?: boolean;
  onClick?: () => void;
}) {
  const isNone = color === 'none';
  return (
    <div
      onClick={onClick}
      className={cn(
        'size-6 rounded-full border flex items-center justify-center cursor-pointer transition-all',
        selected
          ? 'ring-2 ring-offset-2 ring-primary'
          : 'hover:ring-2 hover:ring-muted',
        isNone && 'bg-transparent border-dashed border-muted-foreground/40',
      )}
      style={!isNone ? { backgroundColor: color } : {}}
      title={isNone ? 'No color' : color}
    >
      {isNone && (
        <div className="w-3 h-[1px] bg-muted-foreground/50 rotate-45" />
      )}
    </div>
  );
}

function ColorPicker({
  value,
  onChange,
  className,
  ...props
}: {
  value?: string;
  onChange?: (color: string) => void;
} & React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant="outline"
      className={cn('flex gap-2 items-center', className)}
      {...props}
    >
      {colorList.map((color) => (
        <ColorIcon
          key={color}
          color={color}
          selected={value === color}
          onClick={() => onChange?.(color)}
        />
      ))}
    </Button>
  );
}

export { ColorPicker };
