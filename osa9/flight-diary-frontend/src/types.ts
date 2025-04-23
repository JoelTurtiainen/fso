export interface Diary {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment?: string;
}

export type NewDiary = Omit<Diary, 'id'>;

export interface HeaderProps {
  name: string;
}

export interface DiaryFormProps {
  diaries: Diary[];
  setDiaries: React.Dispatch<React.SetStateAction<Diary[]>>;
}
