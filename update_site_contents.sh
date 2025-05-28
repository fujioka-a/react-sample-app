#!/bin/bash

# .env ファイルを読み込む
export $(grep -v '^#' .env | xargs)

# BUCKET_NAME を使用
npm run build

aws s3 sync build/ s3://$BUCKET_NAME --delete

aws cloudfront create-invalidation \
  --distribution-id $DISTRIBUTION_ID \
  --paths "/*"