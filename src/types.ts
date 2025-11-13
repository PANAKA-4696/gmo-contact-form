// お問い合わせフォームのデータ構造を定義する「型」
export interface ContactFormData {
  name: string;      // 氏名
  email: string;     // メールアドレス
  service: string;   // サービス（選択されるのは1つ）
  category: string;  // カテゴリー（選択されるのは1つ）
  plans: string[];   // プラン（複数選択可 [cite: 66] なので配列）
  content: string;   // お問い合わせ内容
}

// エラーメッセージを格納するオブジェクトの「型」
// Partial<T> は「T のすべてのプロパティをオプショナル（?）にする」という意味
// { name?: string, email?: string, ... } という型になります
export type FormErrrors = Partial<ContactFormData>;