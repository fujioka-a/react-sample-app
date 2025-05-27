import { CognitoUserPool } from 'amazon-cognito-identity-js';

/**
 * Cognito User Pool の設定
 * 環境ごとに .env ファイルで管理するのがおすすめです。
 */
const poolData = {
    // AWS Cognito コンソールで確認できる User Pool の ID
    UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID || 'ap-northeast-1_XXXXXXX',
    // アプリクライアント（アプリ統合設定）で発行されたクライアントID
    ClientId: process.env.REACT_APP_COGNITO_APP_CLIENT_ID || 'XXXXXXXXXXXXXXXXXXXX',
};

export const UserPool = new CognitoUserPool(poolData);
export const UserPoolId = poolData.UserPoolId;
export const AppClientId = poolData.ClientId;