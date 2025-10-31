import { ArrowUpRightIcon, Vault } from 'lucide-react';

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { LoginForm, type LoginType } from './new-login';
import { DialogTitle } from '@radix-ui/react-dialog';

function EmptyPage({
  onAddLogin,
}: {
  onAddLogin: (newLogin: LoginType) => void;
}) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Vault />
        </EmptyMedia>
        <EmptyTitle>No logins yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any logins yet. Get started by creating your
          first login.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Dialog>
            <DialogTitle className="sr-only">Add login</DialogTitle>
            <DialogTrigger asChild>
              <Button type="button">Add login</Button>
            </DialogTrigger>

            <DialogContent>
              <LoginForm
                addLogin={(newLogin) => {
                  onAddLogin(newLogin);
                }}
              />
            </DialogContent>
          </Dialog>
          <Button variant="outline" disabled>
            Import login
          </Button>
        </div>
      </EmptyContent>
      <Button
        variant="link"
        asChild
        className="text-muted-foreground"
        size="sm"
      >
        <a href="https://bitwarden.com/help/password-manager-overview/">
          Learn More <ArrowUpRightIcon />
        </a>
      </Button>
    </Empty>
  );
}

export { EmptyPage };
