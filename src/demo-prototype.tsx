// import { useState } from 'react';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import {
  EntryRow,
  Category,
  LoginForm,
  ViewLogin,
  type LoginType,
} from './components/prototype';
import { Accordion } from './components/ui/accordion';
import { EmptyPage } from '@/components/prototype/empty-page';

type Category = {
  label: string;
};

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

  const grouped = logins.reduce((acc, item) => {
    const key = item.category ?? 'Uncategorized';
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {} as Record<string, LoginType[]>);

  return (
    <div className="flex flex-col">
      <div className="h-16 w-screen bg-gray-100 flex flex-row justify-between p-4">
        <p>My nav bar</p>
        <Button variant="default" onClick={handleAddLogin}>
          <Plus className="w-4 h-4" />
          New
        </Button>
      </div>

      {logins.length === 0 ? (
        <EmptyPage onAddLogin={handleSubmitLogin} />
      ) : (
        <div className="grid grid-cols-7 gap-4">
          <div className="col-span-4">
            <Accordion
              className="w-full"
              type="multiple"
              defaultValue={openCategories}
              onValueChange={setOpenCategories}
            >
              {Object.entries(grouped).map(([category, entries], idx) => (
                <Category key={`${category}-${idx}`} category={category}>
                  {entries.map((entry, i) => (
                    <EntryRow
                      key={i}
                      data={entry}
                      onClick={() => handleSelectedLogin(entry)}
                    />
                  ))}
                </Category>
              ))}
            </Accordion>
          </div>

          <div className="col-span-3">
            {formMode === 'adding' && (
              <LoginForm
                addLogin={handleSubmitLogin}
                onCancel={() => setFormMode('view')}
              />
            )}

            {formMode === 'editing' && selectedLogin && (
              <LoginForm
                addLogin={handleSubmitLogin}
                defaultValues={selectedLogin}
                onCancel={() => setFormMode('view')}
              />
            )}

            {formMode === 'view' && selectedLogin && (
              <ViewLogin data={selectedLogin} onEdit={handleEditLogin} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export { Prototype };
