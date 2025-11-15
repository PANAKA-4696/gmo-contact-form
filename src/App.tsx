import { useState } from "react";
import InputForm from './components/InputForm'; // InputForm をインポート
//ConfirmScreenをインポート
import ConfirmScreen from './components/ConfirmScreen';
//CompleteScreenもインポート
import CompleteScreen from './components/CompleteScreen';
import type { FormErrors, ContactFormData } from './types'; // ContactFormData 型をインポート
import './App.css'; // あとでCSSを当てるためにCSSファイルをインポート

//'input', 'confirm', 'complete' の3つのどの画面を表示しているかを管理するための「型」
type ScreenState = 'input' | 'confirm' | 'complete';

//フォームデータの初期値
const initialFormData: ContactFormData = {
  name: '',
  email: '',
  service: '',
  category: '',
  plans: [],
  content: ''
};

function App() {
  //useStateで現在の画面状態を管理します。初期値は 'input' です
  const [screen, setScreen] = useState<ScreenState>('input');

  //フォームの入力内容全体をApp.tsx(親コンポーネント)で管理する
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);

  //エラーメッセージを保持するためのstateを追加します
  const [errors, setErrors] = useState<FormErrors>({});

  //バリデーションを実行する関数を作成します
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    //必須項目のチェック
    if (!formData.name) newErrors.name = '氏名は必須です。';
    if (!formData.email) newErrors.email = 'メールアドレスは必須です。';
    if (!formData.service) newErrors.service = 'サービスは必須です。';
    if (!formData.category) newErrors.category = 'カテゴリーは必須です。';
    if (!formData.content) newErrors.content = 'お問い合わせ内容は必須です。';

    //メール形式のチェック(簡易的な正規表現)
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'メールアドレスの形式が正しくありません。';
    }

    //文字数制限のチェック
    if (formData.content.length > 100) {
      newErrors.content = 'お問い合わせ内容は100文字以内で入力してください。';
    }

    setErrors(newErrors); //エラーstateを更新

    //newErrorsオブジェクトにキーが一つもなければtureを返す(バリデーション成功)
    return Object.keys(newErrors).length === 0;
  };

  //確認画面に進むときの処理[cite: 77]
  const handleConfirm = () => {
    //バリデーションを実行し、成功(true)した場合のみ画面遷移
    if (validateForm()) {
      console.log('Validation OK. Form Data:', formData); //デバッグ用にコンソールに出力
      setScreen('confirm'); //確認画面へ遷移
    }else {
      console.log('Validation Failed. Errors:', errors); //バリデーション失敗時は何もしない（エラーメッセージが表示される）
    }
  };

  //「入力画面に戻る」ボタン用の関数を追加
  //(Stateを"input"に戻すだけ。formDataは保持される)
  const handleEdit = () => {
    setScreen('input');
  };

  //「送信する」ボタン用の関数を追加[cite: 97]
  const handkeSubmitForm = () => {
    //TODO: ここでメール送信処理を実行する
    //(今回はフロントエンド課題のため、コンソールへの出力で代替)
    console.log('---フォーム送信実行---');
    console.log('送信先: rookies@gmo.jp(仮)');
    console.log('送信データ:', formData);
    console.log('---送信完了---');

    //完了画面へ遷移
    setScreen('complete');
  };
  
  //「完了画面から入力画面に戻る」処理を追加
  const handleReset = () => {
    //仕様通り、フォームデータを初期値に戻します
    setFormData(initialFormData);
    //エラーメッセージもリセットします
    setErrors({});
    //入力画面に遷移します
    setScreen('input');
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
            //errors state をInputForm に渡します
            errors={errors}
          />
        </>
      )}

      {/* confirm画面のTODOをConfirmScreenコンポーネントｂに置き換える */}
      {/* screen の状態が 'confirm' の場合に表示する内容 */}
      {screen === 'confirm' && (
        <>
          <h1>お問い合わせフォーム</h1>
          <p>入力内容にお間違いないかご確認ください。</p>
          <ConfirmScreen
            formData={formData} //データを表示用に渡す
            onEdit={handleEdit} //「戻る」関数を渡す
            onSubmit={handkeSubmitForm} //「送信」関数を渡す
          />
        </>
      )}


      {/* complete画面のTODOをCompleteScreenコンポーネントに置き換える */}
      {/* screen の状態が 'complete' の場合に表示する内容 */}
      {screen === 'complete' && (
        <>
          <h1>お問い合わせフォーム</h1>
          <p>お問い合わせが送信されました。</p>
          <CompleteScreen
            onReset={handleReset} //「入力画面に戻る」関数を渡す
          />
        </>
      )}

    </div>
  );
}

export default App;