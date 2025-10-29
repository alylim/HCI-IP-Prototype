// import { useState } from 'react';
import { useState } from 'react';
import {
  EntryRow,
  Category,
  LoginForm,
  ViewLogin,
} from './components/prototype';
import { Button } from './components/ui';
import { Accordion } from './components/ui/accordion';
import { Plus } from 'lucide-react';

type LoginType = {
  username: string;
  password: string;
  category?: string;
  domain: string;
  additionalFields?: Array<{ label: string; value: string }>;
};

type CategoryColor = {
  label: string;
  color?: string;
};

const mockData = [
  {
    domain: 'Netflix.com',
    category: 'streaming',
    username: 'hello@gmail.com',
    password: 'hunter22',
  },
  {
    domain: 'hulu.com',
    category: 'streaming',
    username: 'hello@gmail.com',
    password: 'hunter23',
  },
];

const initCategories = [{ label: 'streaming', color: '#F1C2C0' }];

function Prototype() {
  const [categories, setCategories] = useState<CategoryColor[]>(initCategories);
  const [logins, setLogins] = useState<LoginType[]>(mockData);
  const [selectedLogin, setSelectedLogin] = useState<LoginType | null>(null);

  function handleAddCategory(cat: CategoryColor) {
    setCategories((prev) => [...prev, cat]);
  }

  const grouped = mockData.reduce((acc, item) => {
    const key = item.category ?? 'Uncategorized';
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {} as Record<string, LoginType[]>);

  return (
    <div className="grid grid-cols-7 gap-4">
      <div className="col-span-4">
        <Accordion
          className="w-full"
          type="multiple"
          defaultValue={Object.keys(grouped)}
        >
          {Object.entries(grouped).map(([category, entries], idx) => (
            <Category
              key={`${category}-${idx}`}
              category={category}
              color={categories.find((cat) => cat.label === category)?.color}
            >
              {entries.map((entry, i) => (
                <EntryRow
                  key={i}
                  domain={entry.domain}
                  username={entry.username}
                  onClick={() => console.log('hello')}
                />
              ))}
            </Category>
          ))}
        </Accordion>
        <Button
          variant="outline"
          className="w-full border-dashed text-muted-foreground hover:bg-muted/40"
          //   onClick={handleAddCategory}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Category
        </Button>
      </div>

      <div className="col-span-3">
        <LoginForm />
        <ViewLogin data={mockData[0]} />
      </div>
    </div>
  );
}

export { Prototype };
