import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';

type DeleteDialogProps = {
  domain?: string;
  onDelete: () => void;
} & React.ComponentProps<typeof Dialog>;

function DeleteDialog({ onDelete, domain, ...props }: DeleteDialogProps) {
  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Login?</DialogTitle>
          <DialogDescription>
            {`Are you sure you want to delete${
              domain ? ` ${domain}` : 'this entry'
            }? This action cannot be
            undone.`}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => props.onOpenChange?.(false)}
          >
            Cancel
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { DeleteDialog };
