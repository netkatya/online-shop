export interface User {
  email: string;
  username: string;
  avatar: string;
  telegramChatId: string | null;
  telegramLinked: boolean;
  id: string;
}
