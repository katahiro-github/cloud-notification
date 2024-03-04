const dictionaryJsonArray = [
  // 契約文言
  {en:"Data Processing Addendum",jp:"データ処理補足契約書"},
  {en:"Service Description",jp:"サービス記述"},
  {en:"Service Level Agreement",jp:"サービス・レベル・アグリーメント"},
  {en:"pay-as-you-go",jp:"従量課金"},
  {en:"material change",jp:"重大な変更"},
  {en:"terminating your account",jp:"アカウント削除"},
  {en:"3rd-party offerings?",jp:"サードパーティの製品"},
  {en:"The wording",jp:"文言"},
  {en:"simplified language",jp:"簡略化された文言"},
  {en:"late payment fee",jp:"損害遅延金"},

  // 保守関連用語
  {en:"[mM]aintenance window",jp:"メンテナンスウインドウ"},
  {en:"[sS]ecurity bulletin",jp:"セキュリティ速報"},
  {en:"IBM [rR]epresentative",jp:"IBM担当者"},
  {en:"IBM Support [rR]epresentative",jp:"IBMサポート担当"},
  {en:"client support",jp:"IBMサポート担当"},
  {en:"unavailability",jp:"利用不可"},
  {en:"[iI]nfrastructure replacement",jp:"インフラストラクチャ交換"},
  {en:"[nN]ew accounts",jp:"新規アカウント"},
  {en:"[eE]xisting accounts",jp:"既存アカウント"},
  {en:"potential downtime",jp:"潜在的なダウンタイム"},
  {en:"potential disruptions?",jp:"潜在的なダウンタイム"},
  {en:"outage",jp:"停止"},
  {en:"customer advocate",jp:"IBMサポート担当"},
  {en:"production",jp:"本番環境"},

  // 製品用語
  {en:"IBM Cloud",jp:"IBM Cloud"},
  {en:"[cC]lassic infrastructure",jp:"クラシックインフラストラクチャ"},
  {en:"[nN]etwork infrastructure",jp:"ネットワークインフラストラクチャ"},
  {en:"[pP]ublic service endpoint",jp:"パブリックサービスエンドポイント"},
  {en:"[pP]rivate service endpoint",jp:"プライベートサービスエンドポイント"},
  {en:"the tier",jp:"ティア"},
  {en:"[bB]are metal servers",jp:"ベアメタルサーバ"},
  {en:"Continuous Delivery Service",jp:"Continuous Delivery"},
  {en:"[eE]ndurance",jp:"エンデュランス"},

  // 技術用語
  {en:"[pP]enetration testing",jp:"侵入テスト"},
  {en:"[rR]eserved instance",jp:"リザーブドインスタンス"},
  {en:"[iI]ncompatibilities",jp:"非互換性"},
  {en:"[iI]ncompatibility",jp:"非互換性"},
  {en:"database deployments",jp:"データベース導入環境"},
  {en:"[cC]onvergence",jp:"コンバージェンス"},
  {en:"redundant configurations?",jp:"冗長構成"},
  {en:"redundant paths?",jp:"冗長パス"},
  {en:"discrete",jp:"個別"},
  {en:"multi-pathing software",jp:"マルチパスソフトウェア"},

  // その他
  {en:"[iI]f you have any questions or concerns",jp:"ご質問や懸念がある場合は"},
  {en:"[iI]f you have any questions",jp:"ご質問がある場合は"},
  {en:"[fF]amiliarize yourself with",jp:"よく理解してください"},  
  {en:"[cC]oncerns",jp:"ご懸念"},
  {en:"Osaka",jp:"大阪"},
  {en:"remain",jp:"継続"},

  // 英英
  {en:"environment(s)",jp:"environment"},

]

const jpToJpJsonArray = [
  {jp1:"実装の詳細",jp2:"内容"},
  {jp1:"開いておください",jp2:"開いてください"},
  {jp1:"IBM ?クラウド",jp2:"IBM Cloud"},
  {jp1:"顧客",jp2:"利用者"},
  {jp1:"（s）",jp2:""},
  {jp1:"働きましています",jp2:"動き出しています"},
]

// Replace English words to Japanese words
const replaceTextWord = (text) => {
  let textTmp = text;
  for(const wordPair of dictionaryJsonArray){
    const reg0 = new RegExp(`${wordPair.en}`,'g');
    if(text.match(reg0)){
      const reg1 = new RegExp(`${wordPair.en} `,'g');
      const reg2 = new RegExp(` ${wordPair.en}`,'g');
      textTmp = textTmp.replace(reg1, `${wordPair.jp} `);
      textTmp = textTmp.replace(reg2, ` ${wordPair.jp}`);
    }
  }
  return textTmp;
}

// Replace Japanese words to another Japanese words
const replaceTextJpToJpWord = (text) => {
  let textTmp = text;
  for(const wordPair of jpToJpJsonArray){
    const reg0 = new RegExp(`${wordPair.jp1}`,'g');
    if(text.match(reg0)){
      textTmp = textTmp.replace(reg0, `${wordPair.jp2}`);
    }
  }
  return textTmp;
}

module.exports = {
  replaceTextWord,
  replaceTextJpToJpWord,
}