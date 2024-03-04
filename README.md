# cloud-notificaiton
## Overview
このツールはIBM Cloudから送られる通知を要約、日本語化をwatsonx.aiを利用して行い、Slackに再通知するものです。

## Requirement
### Production
- IBM Cloud
- Code Engine(App Platform)
- Container Registry

### Dev
- Node.js v18
- npm

### Common
- watsonx.ai (Watson Machine Learning & Watson Studio)
- Slack Incomming Webhook URL

## Setup
- `.env.sample` を `.env` にコピーする
    ```
    # Mac/Linux
    cp .env.sample .env
    
    # Windows
    copy .env.sample .env
    ```

- `.env` の環境変数を設定する
  |環境変数|必須|説明|
  |:---|:---:|:---|
  |WATSONX_APIKEY|〇|watsonx.aiを利用するためのAPI KEY※|
  |WATSONX_PROJECT_ID|〇|watsonx.aiが稼働するProjctのID※|
  |SLACK_WEBHOOK_URL|〇|Slackで通知するためのWebhook URL
  |BEARER_VALUE|-|IBM Cloudの通知先Webhookに登録する際に、Bearer認証を設定する場合、そのトークンを指定|
  |SLACK_CHANNEL|-|Slackで通知先のチャンネルを指定する場合に指定|
  |SLACK_ICON_EMOJI|-|Slackで通知メッセージの投稿者アイコンをデフォルト(:loudspeaker:)から変更する場合に指定|
  |SLACK_USER_NAME|-|Slackで通知メッセージの投稿者名をデフォルト(IBM Cloud Notification with watsonx)から変更する場合に指定|
  |SLACK_ADD_MESSAGE|-|Slackで通知メッセージの冒頭に含めたい文字列がある場合に指定(ex. `<!channel>`:チャンネル全体にメンション)|
※watsonx.aiのAPIキーとProject ID取得に関しての[参考リンク](https://qiita.com/katahiro/items/3258cd42226ed82268ac)

- npm
  - install
  ```
  npm install
  ```
  - test
  ```
  npm test  
  ```

- Deploy
  - IBM Cloud Login & Select Code Engine Project
  ```
  ibmcloud login -u [email address]
  ibmcloud target -r [region] -g [resource group]
  ibmcloud ce proj select -n [project name]
  ```
  - Create Secret from `.env` file
  ```
  ibmcloud ce secret create -n [secret name] -e .env
  ```
  - Create function
  ```
  ibmcloud ce fn create -n [function name] --runtime nodejs-18 --cpu 0.25 --memory 1G --met 120 --env-sec [secret name] --build-source .
  ```
  - Update function Source
  ```
  ibmcloud ce fn update -n [function name] --build-source .
  ```
## Licence

MIT

## Author

[katahiro](https://qiita.com/katahiro)