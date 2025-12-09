# お問い合わせフォーム (Contact Form)

GMOインターネット社 / [新卒ジョブ型No.1採用] 27卒 フロントエンドエンジニア選考課題の成果物です。
React と TypeScript を使用して実装した、3画面構成（入力・確認・完了）のお問い合わせフォームアプリケーションです。

## 🚀 デモ (Live Demo)

以下のURLから実際の動作を確認できます。
**[https://gmo-contact-form.vercel.app/](https://gmo-contact-form.vercel.app/)**

## ✨ 機能一覧

* **3画面構成のSPA:** ページリロードのないスムーズな画面遷移（入力 → 確認 → 完了）。
* **動的な選択肢制御:** 選択された「サービス」に応じて、「カテゴリー」と「プラン」の選択肢が自動的に切り替わります。
* **入力バリデーション:**
    * 必須項目のチェック
    * メールアドレス形式の正規表現チェック
    * 文字数制限（100文字以内）
    * リアルタイムのエラーメッセージ表示
* **データ保持とリセット:**
    * 確認画面から「戻る」ボタン押下時：入力内容を保持。
    * 完了画面から「戻る」ボタン押下時：全データを初期化。
* **UIデザインの再現:** 課題要件のスクリーンショットに基づき、青色ヘッダー、二列レイアウト、ボタン形状などをCSSで厳密に再現。

## 🛠 使用技術 (Tech Stack)

* **Framework:** React 18
* **Language:** TypeScript
* **Build Tool:** Vite
* **Hosting:** Vercel
* **Version Control:** Git / GitHub

## 💻 ローカルでの実行方法

手元の環境で動作確認を行う場合は、以下の手順を実行してください。

### 1. リポジトリのクローン
```bash
git clone [https://github.com/PANAKA-4696/gmo-contact-form.git](https://github.com/PANAKA-4696/gmo-contact-form.git)
cd gmo-contact-form
