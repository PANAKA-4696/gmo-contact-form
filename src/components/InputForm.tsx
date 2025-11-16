//useEffectとuseRefをreactからインポートします。
import { useEffect, useRef } from 'react';
//フォームのデータ型をインポートします FormErrors型をインポートします
import type { ContactFormData, FormErrors } from '../types';
//作成したデータファイルをインポートします
import { serviceOptions, serviceNames } from '../data';

//App.tsxから受け取るprops(引数)の型を定義します
interface InputFormProps {
    formData: ContactFormData; //現在のフォームの入力内容
    setFormData: React.Dispatch<React.SetStateAction<ContactFormData>>; //フォームの内容を更新するための関数
    // onSubmit: () => void; //フォーム送信（確認画面へ進む）ボタンが押されたときに呼ぶ関数
    
    //errorsをpropsとして受け取れるようにします。
    errors: FormErrors;
}

//propsからerrorsを受け取ります
//React.FC (Functional Component) 型を使い、props を受け取ります
const InputForm: React.FC<InputFormProps> = ({ formData, setFormData, errors }) => {
    //「前の service の値」を保持するための ref を作成
    const prevServiceRef = useRef(formData.service)

    //サービスが変更されたときの副作用を定義します
    useEffect(() => {
        //「前の service の値」と「現在の service の値」を比較
        //(この2つが異なる ＝ ユーザーがサービスを変更した時だけ)
        if (prevServiceRef.current != formData.service) {
            //リセット処理を実行
            //サービスが変更されたら(特に「サービスA」→「サービスB」など)
            //関連するカテゴリーとプランの選択をリセットする
            setFormData((prevData) => ({
                ...prevData,
                category: '',//カテゴリーをリセット
                plans: [],//プランをリセット
            }));
        }

        //処理の最後に「前の値」を「今の値」に更新し、次の変更に備える
        prevServiceRef.current = formData.service;

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
    
    // //フォームが送信されたときの処理
    // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault(); //フォーム送信によるページの再読み込みを防ぐ
    //     onSubmit(); //App.tsx から渡された onSubmit 関数（バリデーション＆画面遷移）を呼び出す
    // };

    //現在選択されているサービスに対応する選択肢を取得します
    //formData.service が"サービスA"など、有効なキーであることを型アサーションで伝えます。
    const currentOptions = serviceOptions[formData.service as keyof typeof serviceOptions];

    return (
        <>
            {/* 氏名 */}
            <div className="form-row">
                {/* ★修正★ 必須ラベルを追加 */}
                <label>氏名 <span className="required-label">必須</span></label>
                <div className="input-field">
                    <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="山田太郎"
                    />
                    {errors.name && <p className="error-message">{errors.name}</p>}
                </div>
            </div>

            {/* メールアドレス */}
            <div className="form-row">
                {/* ★修正★ 必須ラベルを追加 */}
                <label>メールアドレス <span className="required-label">必須</span></label>
                <div className="input-field">
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="mail@example.com"
                    />
                    {errors.email && <p className="error-message">{errors.email}</p>}
                </div>
            </div>

            {/* サービス */}
            <div className="form-row">
                {/* ★修正★ 必須ラベルを追加 */}
                <label>サービス <span className="required-label">必須</span></label>
                <div className="input-field">
                    <select name="service" value={formData.service} onChange={handleChange}>
                        <option value="">選択してください</option>
                        {serviceNames.map((serviceName) => (
                            <option key={serviceName} value={serviceName}>
                                {serviceName}
                            </option>
                        ))}
                    </select>
                    {errors.service && <p className="error-message">{errors.service}</p>}
                </div>
            </div>

            {/* カテゴリー */}
            <div className="form-row">
                {/* ★修正★ 必須ラベルを追加 */}
                <label>カテゴリー <span className="required-label">必須</span></label>
                <div className="input-field">
                    {currentOptions?.categories.map((category) => (
                        <div key={category}>
                            <label>
                                <input
                                    type="radio"
                                    name='category'
                                    value={category}
                                    checked={formData.category === category}
                                    onChange={handleChange}
                                />
                                {category}
                            </label>
                        </div>
                    ))}
                    {!formData.service && <p style={{ color: 'gray', margin: 0}}>サービスを選択してください</p>}
                    {errors.category && <p className="error-message">{errors.category}</p>}
                </div>
            </div>

            {/* プラン */}
            <div className="form-row">
                <label>プラン</label>
                <div className="input-field">
                    {currentOptions?.plans.map((plan) => (
                        <div key={plan}>
                            <label>
                                <input
                                    type="checkbox"
                                    name='plans'
                                    value={plan}
                                    checked={formData.plans.includes(plan)}
                                    onChange={handlePlanChange}
                                />
                                {plan}
                            </label>
                        </div>
                    ))}
                    {!formData.service && <p style={{ color: 'gray', margin: 0 }}>サービスを選択してください</p>}
                </div>
            </div>

            {/* お問い合わせ内容 */}
            <div className="form-row">
                {/* ★修正★ 必須ラベルを追加 */}
                <label>お問い合わせ内容 <span className="required-label">必須</span></label>
                <div className="input-field">
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        placeholder="お問い合わせ内容をご記入ください。"
                        rows={5}
                    />
                    {errors.content && <p className="error-message">{errors.content}</p>}
                </div>
            </div>
        </>
    );
};

export default InputForm;