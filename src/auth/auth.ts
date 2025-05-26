// src/auth/authApi.ts
// AWS Cognito 利用時は aws-amplify や amazon-cognito-identity-js を使います
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { UserPool, UserPoolId } from './cognitoConfig';

export async function login(username: string, password: string) {
    return new Promise<User>((resolve, reject) => {
        const user = new CognitoUser({ Username: username, Pool: UserPool });
        user.authenticateUser(
            new AuthenticationDetails({ Username: username, Password: password }),
            {
                onSuccess: session => {
                    resolve({ username, loginAt: new Date().toISOString() });
                },
                onFailure: err => reject(err),
            }
        );
    });
}

export async function logout() {
    const user = UserPool.getCurrentUser();
    user?.signOut();
}

export async function getSession() {
    return new Promise<User>((resolve, reject) => {
        const user = UserPool.getCurrentUser();
        if (!user) return reject('未認証');
        user.getSession((err, session) => {
            if (err || !session.isValid()) return reject(err);
            resolve({ username: user.getUsername(), loginAt: new Date().toISOString() });
        });
    });
}