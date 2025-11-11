//useEffectをreactからインポートします。
import { useEffect } from 'react';
//フォームのデータ型をインポートします
import type { ContactFormData } from '../types';
//作成したデータファイルをインポートします
import { serviceOptions, serviceNames } from '../data';

//App.tsxから受け取るprops(引数)の型を定義します
interface InputFormProps {
    formData: ContactFormData; //現在のフォームの入力内容
    setFormData: React.Dispatch<React.SetStateAction<ContactFormData>>; //フォームの内容を更新するための関数
    onSubmit: () => void; //フォーム送信（確認画面へ進む）ボタンが押されたときに呼ぶ関数
}

//React.FC (Functional Component) 型を使い、props を受け取ります
const InputForm: React.FC<InputFormProps> = ({ formData, setFormData, onSubmit }) => {
    //サービスが変更されたときの副作用を定義します
    useEffect(() => {
        //サービスが変更されたら(特に「サービスA」→「サービスB」など)
        //関連するカテゴリーとプランの選択をリセットする
        setFormData((prevData) => ({
            ...prevData,
            category: '',//カテゴリーをリセット
            plans: [],//プランをリセット
        }));
    //formData.serviceが変更されるたびに、この中が実行される
    },[formData.service, setFormData]); //setFormDataも依存配列に追加しておく(ESLint推奨)

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

    //現在選択されているサービスに対応する選択肢を取得します
    //formData.service が"サービスA"など、有効なキーであることを型アサーションで伝えます。
    const currentOptions = serviceOptions[formData.service as keyof typeof serviceOptions];

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

            {/* サービス (ドロップダウン) を data.ts から動的に生成します */}
            <div>
                <label>サービス <span>[必須]</span></label>
                <select name ="service" value={formData.service} onChange={handleChange}>
                    <option value="">選択してください</option>

                    {/* serviceNames配列を.map()で<option>タグに変換 */}
                    {serviceNames.map((serviceName) => (
                        <option key={serviceName} value={serviceName}>
                            {serviceName}
                        </option>
                    ))}
                </select>
            </div>

            {/* カテゴリー (ラジオボタン) を動的に生成します */}
            <div>
                <label>カテゴリー <span>[必須]</span></label>
                <div>
                    {/* サービスが選択されていて(currentOptionsが存在し)、currentOptions.categories があれば、それを .map() でラジオボタンに変換 */}
                    {currentOptions?.categories.map((category) => (
                        <label key={category}>
                            <input
                            type="radio"
                            name='category'
                            value={category}
                            checked={formData.category === category}
                            onChange={handleChange}
                            />
                            {category}
                        </label>
                    ))}
                    {/* サービスが未選択の場合の表示 (任意) */}
                    {!formData.service && <p style={{ color: 'gray', margin: 0}}>サービスを選択してください</p>}
                </div>
            </div>

            {/* プラン (チェックボックス) を動的に生成します */}
            <div>
                <label>プラン</label>
                <div>
                    {/* カテゴリーと同様に、currentOptions.plansを.map()でチェックボックスに変換 */}
                    {currentOptions?.plans.map((plan) => (
                        <label key={plan}>
                            <input
                            type="checkbox"
                            name='plans' //name属性はhandlePlanChangeでは使いませんが、フォーム要素として一応設定
                            value={plan}
                            checked={formData.plans.includes(plan)}
                            onChange={handlePlanChange}
                            />
                            {plan}
                        </label>
                    ))}
                    {/* サービスが未選択の場合の表示 (任意) */}
                    {!formData.service && <p style={{ color: 'gray', margin: 0 }}>サービスを選択してください</p>}
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