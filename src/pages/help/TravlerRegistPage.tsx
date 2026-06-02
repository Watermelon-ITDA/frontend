import Button from '@/components/common/Button';
import { helpType } from '@/constants/helpType';
import { useState } from 'react';

const TravlerRegistPage = () => {
  const [selectedHelpType, setSelectedHelpType] = useState<number | null>(null);

  return (
    <main className="pt-header px-3">
      <h2>어떤 도움이 필요하신가요?</h2>
      <ul className="grid grid-cols-5 gap-2 mt-2">
        {helpType.map((item) => (
          <li key={item.id}>
            <Button
              variant="outline"
              className={`w-full flex-col gap-1 rounded-xl px-2 py-3
                ${item.id === selectedHelpType ? `border-primary` : `border-lightgray`}`}
              onClick={() => {
                if (selectedHelpType === item.id) setSelectedHelpType(null);
                else setSelectedHelpType(item.id);
              }}
            >
              <span className="text-2xl">{item.icon}</span>
              <small>{item.name}</small>
            </Button>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default TravlerRegistPage;
