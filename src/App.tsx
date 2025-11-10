import { useState } from "react";

//'input', 'confirm', 'complete' の3つのどの画面を表示しているかを管理するための「型」
type ScreenState = 'input' | 'confirm' | 'complete';

function App() {
  //useStateで現在の画面状態を管理します。初期値は 'input' です。
  const [screen, setScreen] = useState<ScreenState>('input');
  
  return(
    <div className="container">
      {/* screen の状態が 'input' の場合に表示する内容 */}
      {screen === "input" && (
        <>
          <h1>お問い合わせフォーム</h1>
          <p>こちらは○○に関するお問い合わせフォームです。</p>
          {/* TODO: ここに入力フォームコンポーネント <InputForm /> を後で配置 */}
        </>
        )}

        {/* screen の状態が 'confirm' の場合に表示する内容 */}
        {screen === "confirm" && (
          <>
            <h1>お問い合わせフォーム</h1>
            <p>入力内容にお間違いないかご確認ください。</p>
            {/* TODO: ここに確認画面コンポーネント <ConfirmForm /> を後で配置 */}
          </>
        )}

        {/* screen の状態が 'complete' の場合に表示する内容 */}
        {screen === "complete" && (
          <>
            <h1>お問い合わせフォーム</h1>
            <p>お問い合わせが送信されました。</p>
            {/* TODO: ここに完了画面コンポーネント <CompleteForm /> を後で配置 */}
          </>
        )}
    </div>
  );
}

export default App;