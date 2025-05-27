// .eslintrc.js
module.exports = {
    extends: ['react-app', 'react-app/jest'],  // CRA デフォルト設定を使う
    rules: {
        // 任意で追加したいものだけここに
        'no-console': 'warn',
    },
};