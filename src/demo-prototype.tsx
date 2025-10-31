'use client';

import { useState } from 'react';
import { Plus, Lock, CircleUserRound } from 'lucide-react';
import { EntryRow } from './components/prototype/entry-row';
import { LoginForm, type LoginType } from './components/prototype/new-login';
import { ViewLogin } from './components/prototype/login-view';
import { Button } from './components/ui/button';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './components/ui/accordion';
import { EmptyPage } from './components/prototype/empty-page';

type FormMode = 'view' | 'adding' | 'editing';

const mockData = [
  {
    id: crypto.randomUUID(),
    domain: 'Netflix',
    uri: 'netflix.com',
    category: 'streaming',
    username: 'hello@gmail.com',
    password: 'hunter22',
  },
  {
    id: crypto.randomUUID(),
    domain: 'Hulu',
    uri: 'hulu.com',
    category: 'streaming',
    username: 'hello@gmail.com',
    password: 'hunter23',
  },
];

function Prototype() {
  const [logins, setLogins] = useState<LoginType[]>([]);
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const [selectedLogin, setSelectedLogin] = useState<LoginType | null>(null);

  const [formMode, setFormMode] = useState<FormMode>('view');

  function handleSubmitLogin(newLogin: LoginType) {
    const exists = logins.some((l) => l.id === newLogin.id);
    if (exists) {
      setLogins((prev) =>
        prev.map((l) => (l.id === newLogin.id ? { ...newLogin } : l)),
      );
    } else {
      setLogins((prev) => [...prev, newLogin]);
    }

    const category = newLogin.category?.trim() || 'Uncategorized';
    setOpenCategories((prev) =>
      prev.includes(category) ? prev : [...prev, category],
    );

    setSelectedLogin(newLogin);
    setFormMode('view');
  }

  function handleAddLogin() {
    setSelectedLogin(null);
    setFormMode('adding');
  }

  function handleSelectedLogin(login: LoginType) {
    setSelectedLogin(login);
    setFormMode('view');
  }

  function handleEditLogin(login: LoginType) {
    setSelectedLogin(login);
    setFormMode('editing');
  }

  function handleDeleteLogin(loginId: string) {
    setLogins((prev) => prev.filter((l) => l.id !== loginId));
    setSelectedLogin(null);
    setFormMode('view');
  }

  const grouped = logins.reduce((acc, item) => {
    const key = item.category ?? 'Uncategorized';
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {} as Record<string, LoginType[]>);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="h-14 w-full bg-card border-b border-border flex flex-row items-center justify-between px-6 shadow-sm">
        <div className="flex items-center gap-3">
          <Lock className="text-primary" />
          <span className="font-semibold text-lg">My Password Manager</span>
        </div>
        <div className="flex flex-row items-center gap-6">
          <Button variant="default" onClick={handleAddLogin} size="sm">
            <Plus className="w-4 h-4 mr-1" />
            New Item
          </Button>
          <CircleUserRound className="text-muted-foreground" size={32} />
        </div>
      </div>

      {logins.length === 0 ? (
        <EmptyPage onAddLogin={handleSubmitLogin} />
      ) : (
        <div className="flex-1 p-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-7 gap-6">
            <div className="lg:col-span-4 space-y-2">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                My Vault
              </h2>
              <Accordion
                className="w-full space-y-1"
                type="multiple"
                value={openCategories}
                onValueChange={setOpenCategories}
              >
                {Object.entries(grouped).map(([category, entries]) => (
                  <AccordionItem
                    key={category}
                    value={category}
                    className="border-none"
                  >
                    <AccordionTrigger className="bg-card border border-border rounded-md px-4 py-3 hover:bg-accent/50 font-medium text-sm data-[state=open]:rounded-b-none data-[state=open]:border-b-0">
                      <div className="flex items-center gap-2">
                        <span>{category}</span>
                        <span className="text-xs text-muted-foreground">
                          ({entries.length})
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="border-x border-b border-border rounded-b-md bg-card">
                      <div className="py-1">
                        {entries.map((entry) => (
                          <EntryRow
                            key={entry.id}
                            data={entry}
                            onClick={() => handleSelectedLogin(entry)}
                          />
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div className="lg:col-span-3">
              {formMode === 'adding' && (
                <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
                  <LoginForm
                    addLogin={handleSubmitLogin}
                    onCancel={() => setFormMode('view')}
                    onDelete={handleDeleteLogin}
                  />
                </div>
              )}

              {formMode === 'editing' && selectedLogin && (
                <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
                  <LoginForm
                    addLogin={handleSubmitLogin}
                    defaultValues={selectedLogin}
                    onCancel={() => setFormMode('view')}
                    onDelete={handleDeleteLogin}
                  />
                </div>
              )}

              {formMode === 'view' && selectedLogin && (
                <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
                  <ViewLogin data={selectedLogin} onEdit={handleEditLogin} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { Prototype };
