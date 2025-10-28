// import { useState } from 'react';
import {
  EntryRow,
  Category,
  LoginForm,
  ViewLogin,
} from './components/prototype';
import { Accordion } from './components/ui/accordion';

type LoginType = {
  username: string;
  password: string;
  category?: string;
  domain: string;
  additionalFields?: Array<{ label: string; value: string }>;
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

function Prototype() {
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
            <Category key={`${category}-${idx}`} category={category}>
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
      </div>

      <div className="col-span-3">
        <LoginForm />
        <ViewLogin data={mockData[0]} />
      </div>
    </div>
  );
}

export { Prototype };
