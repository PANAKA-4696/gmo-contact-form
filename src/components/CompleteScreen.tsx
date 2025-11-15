//App.tsxから受け取るprops(引数)の型を定義します
interface CompleteScreenProps {
    onReset: () => void; //「入力画面に戻る」ボタンが押されたときの関数
}

const CompleteScreen: React.FC<CompleteScreenProps> = ({ onReset }) => {
    return (
        <div className="complete-container">
            {/* ★修正★ お手本に合わせてテキストを修正 */}
            <p style={{fontWeight: 'bold' }}>
                お問い合わせが送信されました。
            </p>
            <p>
                担当者から折り返しご連絡いたしますので、ご回答をお待ちください。
            </p>
            {/* ↑↑↑ */}

            <div className="button-group">
                <button type="button" onClick={onReset} className="back-button">
                    入力画面に戻る
                </button>
            </div>
        </div>
    );
};

export default CompleteScreen;