//App.tsxから受け取るprops(引数)の型を定義します
interface CompleteScreenProps {
    onReset: () => void; //「入力画面に戻る」ボタンが押されたときの関数
}

const CompleteScreen: React.FC<CompleteScreenProps> = ({ onReset }) => {
    return (
        <div className="complete-container">
            {/* PDF (page 7)の文言を参考にする */}
            <p>
                担当者から折り返しご連絡致しますので、ご回答をお待ちください。
            </p>

            <div className="button-group">
                <button type="button" onClick={onReset} className="back-button">
                    入力画面に戻る
                </button>
            </div>
        </div>
    );
};

export default CompleteScreen;