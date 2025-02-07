
export interface CarFormProps {
    make: string;
    setMake: React.Dispatch<React.SetStateAction<string>>;
    model: string;
    setModel: React.Dispatch<React.SetStateAction<string>>;
    year: string;
    setYear: React.Dispatch<React.SetStateAction<string>>;
    onSearch: (e: React.FormEvent) => void;
  }
  