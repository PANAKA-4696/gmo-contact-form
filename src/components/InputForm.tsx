//フォームのデータ型をインポートします
//フォームのデータ型をインポートします
import type { ContactFormData } from '../types';

//App.tsxから受け取るprops(引数)の型を定義します
interface InputFormProps {
    formData: ContactFormData; //現在のフォームの入力内容
    setFormData: React.Dispatch<React.SetStateAction<ContactFormData>>; //フォームの内容を更新するための関数
    onSubmit: () => void; //フォーム送信（確認画面へ進む）ボタンが押されたときに呼ぶ関数
}

//React.FC (Functional Component) 型を使い、props を受け取ります
const InputForm: React.FC<InputFormProps> = ({ formData, setFormData, onSubmit }) => {
    //<input>, <textarea>, <select> が変更されたときに呼ばれる汎用的な関数
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        //setFormData を呼び出して、フォームデータ（の特定の部分）を更新します
        setFormData({
            ...formData, //... (スプレッド構文) で現在の formData をコピーし、
            [name]: value, //[name] (計算されたプロパティ名) で該当するキー (name, email など) の値だけを上書きします
        });
    };

    //プラン（チェックボックス）が変更されたときに呼ばれる専用の関数
    const handlePlanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        let newPlans = [...formData.plans]; //現在のプラン配列をコピー

        if (checked) {
            //チェックが入った場合、配列に追加
            newPlans.push(value);
        } else {
            //チェックが外れた場合、配列から削除
            newPlans = newPlans.filter((plan) => plan !== value);
        }

        //setFormData でプラン配列を更新
        setFormData({
            ...formData,
            plans: newPlans,
        });
    };
    
    //フォームが送信されたときの処理
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); //フォーム送信によるページの再読み込みを防ぐ
        onSubmit(); //App.tsx から渡された onSubmit 関数（バリデーション＆画面遷移）を呼び出す
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* 氏名 */}
            <div>
                <label>氏名 <span>[必須]</span></label>
                <input 
                type="text" 
                name="name" //stateのキーと合わせる
                value={formData.name} //stateと入力値を連動
                onChange={handleChange} //入力されたら handleChange を呼ぶ
                placeholder="山田太郎"
                />
            </div>

            {/* メールアドレス */}
            <div>
                <label>メールアドレス <span>[必須]</span></label>
                <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="mail@example.com"
                />
            </div>

            {/* サービス (ドロップダウン) [cite: 106] */}
            <div>
                <label>サービス <span>[必須]</span></label>
                <select name="service" value={formData.service} onChange={handleChange}>
                <option value="">選択してください</option>
                <option value="サービスA">サービスA</option>
                <option value="サービスB">サービスB</option>
                <option value="サービスC">サービスC</option>
                </select>
            </div>

            {/* TODO: ステップ5
                カテゴリーとプランの表示を、選択されたサービスに応じて動的に変更する
            */}

            {/* カテゴリー (ラジオボタン) [cite: 29, 30, 31, 61, 62, 63] */}
            <div>
                <label>カテゴリー <span>[必須]</span></label>
                <div>
                <label>
                    <input type="radio" name="category" value="カテゴリー1" checked={formData.category === 'カテゴリー1'} onChange={handleChange} />
                    カテゴリー1
                </label>
                <label>
                    <input type="radio" name="category" value="カテゴリー2" checked={formData.category === 'カテゴリー2'} onChange={handleChange} />
                    カテゴリー2
                </label>
                <label>
                    <input type="radio" name="category" value="カテゴリー3" checked={formData.category === 'カテゴリー3'} onChange={handleChange} />
                    カテゴリー3
                </label>
                </div>
            </div>

            {/* プラン (チェックボックス) [cite: 33, 34, 35, 65, 67, 68] */}
            <div>
                <label>プラン</label>
                <div>
                <label>
                    <input type="checkbox" name="plans" value="プランa" checked={formData.plans.includes('プランa')} onChange={handlePlanChange} />
                    プランa
                </label>
                <label>
                    <input type="checkbox" name="plans" value="プランb" checked={formData.plans.includes('プランb')} onChange={handlePlanChange} />
                    プランb
                </label>
                <label>
                    <input type="checkbox" name="plans" value="プランc" checked={formData.plans.includes('プランc')} onChange={handlePlanChange} />
                    プランc
                </label>
                </div>
            </div>

            {/* お問い合わせ内容 [cite: 37] */}
            <div>
                <label>お問い合わせ内容 <span>[必須]</span></label>
                <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="お問い合わせ内容をご記入ください。"
                rows={5}
                />
            </div>

            {/* 送信ボタン [cite: 38, 76] */}
            <div>
                <button type="submit">確認画面に進む</button>
            </div>
        </form>
    );
};

export default InputForm;