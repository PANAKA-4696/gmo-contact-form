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
        <>
            <div className="confirm-list">
                {/* 氏名 */}
                <div className="confirm-item">
                    <div className="confirm-item-label">氏名</div>
                    <div className="confirm-item-value">{formData.name}</div>
                </div>
                {/* メールアドレス */}
                <div className="confirm-item">
                    <div className="confirm-item-label">メールアドレス</div>
                    <div className="confirm-item-value">{formData.email}</div>
                </div>
                {/* サービス */}
                <div className="confirm-item">
                    <div className="confirm-item-label">サービス</div>
                    <div className="confirm-item-value">{formData.service}</div>
                </div>
                {/* カテゴリー */}
                <div className="confirm-item">
                    <div className="confirm-item-label">カテゴリー</div>
                    <div className="confirm-item-value">{formData.category}</div>
                </div>
                {/* プラン */}
                <div className="confirm-item">
                    <div className="confirm-item-label">プラン</div>
                    <div className="confirm-item-value">{displayedPlans || '(選択なし)'}</div>
                </div>
                {/* お問い合わせ内容 */}
                <div className="confirm-item">
                    <div className="confirm-item-label">お問い合わせ内容</div>
                    <div className="confirm-item-value">{formData.content}</div>
                </div>
            </div>

            {/* ボタンエリア (変更なし) */}
            <div className="button-group">
                <button type="button" onClick={onEdit} className="back-button">
                    入力画面に戻る
                </button>
                <button type="button" onClick={onSubmit} className="submit-button">
                    送信する
                </button>
            </div>
        </>
    );
};

export default ConfirmScreen;