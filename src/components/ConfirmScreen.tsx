import type { ContactFormData } from "../types";

//App.tsxから受け取りprops(引数)の型を定義します
interface ConfirmScreenProps {
    formData: ContactFormData; //入力するフォームデータ
    onEdit: () => void; //「入力画面に戻る」ボタンが押されたときの関数
    onSubmit: () => void; //「送信する」ボタンが押されたときの関数
}

const ConfirmScreen: React.FC<ConfirmScreenProps> = ({ formData, onEdit, onSubmit }) => {
    //プランの配列を「・」で連結して表示する(例: "・プランa・プランb")[cite: 91]
    const displayedPlans = formData.plans.join('・');

    return (
        <div className="confirm-container">
            {/* PDF (Page 6) [cite: 41]のデザインを参考に、テーブルで表示 */}
            <table>
                <tbody>
                    <tr>
                        <th>氏名</th>
                        <td>{formData.name}</td>
                    </tr>
                    <tr>
                        <th>メールアドレス</th>
                        <td>{formData.email}</td>
                    </tr>
                    <tr>
                        <th>サービス</th>
                        <td>{formData.service}</td>
                    </tr>
                    <tr>
                        <th>カテゴリー</th>
                        <td>{formData.category}</td>
                    </tr>
                    <tr>
                        <th>プラン</th>
                        {/* プランが選択されていない場合も考慮 */}
                        <td>{displayedPlans || '(選択なし)'}</td>
                    </tr>
                    <tr>
                        <th>お問い合わせ内容</th>
                        {/* 改行を<br>タグに変換して表示(任意・より新設) */}
                        <td style={{ whiteSpace: 'pre-wrap' }}>{formData.content}</td>
                    </tr>
                </tbody>
            </table>

            {/* ボタンエリア */}
            <div className="button-group">
                <button type="button" onClick={onEdit} className="back-button">
                    入力画面に戻る [cite: 42]
                </button>
                <button type="button" onClick={onSubmit} className="submit-button">
                    送信する [cite: 43]
                </button>
            </div>
        </div>
    );
};

export default ConfirmScreen;