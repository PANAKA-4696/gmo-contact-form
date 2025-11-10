import { useState } from "react";

//'input', 'confirm', 'complete' の3つのどの画面を表示しているかを管理するための「型」
type ScreenState = 'input' | 'confirm' | 'complete';

//フォームデータの初期値
const initiakFormData: FormData = {
  name: '',
  email: '',
  service: '',
  category: '',
  plans: [],
  content: ''
};

function App() {
  //useStateで現在の画面状態を管理します。初期値は 'input' です。
  const [screen, setScreen] = useState<ScreenState>('input');

  //フォームの入力内容全体をApp.tsx(親コンポーネント)で管理する
  const [formData, setFormData] = useState<FormData>(initialFormData);

  //確認画面に進むときの処理[cite: 77]
  const handlecConfirm = () => {
    //TODO: ここでバリデーションチェックを行う
    console.log("Form Data Submitted:", formData); //ひとまずコンソールに入力内容を表示
    setScreen('confirm');
  };
  
  return (
    <div className="container">

      {/* screen の状態が 'input' の場合に表示する内容 */}
      {screen === 'input' && (
        <>
          <h1>お問い合わせフォーム</h1>
          <p>こちらは○○に関するお問い合わせフォームです。</p>
          {/* InputForm コンポーネントを呼び出し、必要な情報を渡す */}
          <InputForm 
            formData={formData}       // 現在の入力内容を props として渡す
            setFormData={setFormData} // 内容を更新する関数を props として渡す
            onSubmit={handleConfirm}  // 送信ボタンが押されたときの関数を props として渡す
          />
        </>
      )}

      {/* screen の状態が 'confirm' の場合に表示する内容 */}
      {screen === 'confirm' && (
        <>
          <h1>お問い合わせフォーム</h1>
          <p>入力内容にお間違いないかご確認ください。</p>
          {/* TODO: ここに <ConfirmScreen /> コンポーネントを後で配置します */}
        </>
      )}

      {/* screen の状態が 'complete' の場合に表示する内容 */}
      {screen === 'complete' && (
        <>
          <h1>お問い合わせフォーム</h1>
          <p>お問い合わせが送信されました。</p>
          {/* TODO: ここに <CompleteScreen /> コンポーネントを後で配置します */}
        </>
      )}

    </div>
  );
}

export default App;