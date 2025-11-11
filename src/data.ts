//サービス、カテゴリー、プランの対応表データ
export const serviceOptions = {
    "サービスA": {
        categories: ["カテゴリー1", "カテゴリー2", "カテゴリー3"],
        plans: ["プランa", "プランb", "プランc"],
    },
    "サービスB": {
        cattegories: ["カテゴリー4", "カテゴリー5", "カテゴリー6"],
        plans: ["プランd", "プランe", "プランf"],
    },
    "サービスC": {
        categories: ["カテゴリー7", "カテゴリー8", "カテゴリー9"],
        plans: ["プランg", "プランh", "プランi"],
    },
};

//サービス名("サービスA", "サービスB", "サービスC")の配列を動的に作成
// as (keyof typeof serviceOptions)[] はTypeScriptの型推論を補助するための記述(おまじない) = アノテーション
export const serviceNames = Object.keys(serviceOptions) as (keyof typeof serviceOptions)[];