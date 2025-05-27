// src/auth/authApi.ts
import { CognitoUser, AuthenticationDetails, CognitoUserSession } from 'amazon-cognito-identity-js';
import { UserPool } from './cognitoConfig'

import { User } from '@/types/user';

/**
 * ログイン処理
 */
export async function login(username: string, password: string): Promise<User> {
    return new Promise<User>((resolve, reject) => {
        const cognitoUser = new CognitoUser({ Username: username, Pool: UserPool });
        cognitoUser.authenticateUser(
            new AuthenticationDetails({ Username: username, Password: password }),
            {
                onSuccess: (session: CognitoUserSession) => {
                    resolve({ username, loginAt: new Date().toISOString() });
                },
                onFailure: (err: any) => {
                    reject(new Error(err.message || '認証に失敗しました'));
                },
            }
        );
    });
}

/**
 * ログアウト処理
 */
export async function logout(): Promise<void> {
    const user = UserPool.getCurrentUser();
    user?.signOut();
}

/**
 * セッション取得
 */
export async function getSession(): Promise<User> {
    return new Promise<User>((resolve, reject) => {
        const cognitoUser = UserPool.getCurrentUser();
        if (!cognitoUser) {
            return reject(new Error('未認証です。ログインしてください。'));
        }
        cognitoUser.getSession((err: any, session: CognitoUserSession | null) => {
            if (err || !session || !session.isValid()) {
                return reject(new Error('セッションが無効です。ログインしてください。'));
            }
            resolve({ username: cognitoUser.getUsername(), loginAt: new Date().toISOString() });
        });
    });
}