
# interfaceの管理方針
- API利用することを前提として、プロジェクトで共通的にインターフェース定義する。
- 従って、route配下に一元的に定義して、各コンポーネントやページからはtypes配下をimportして利用する。
