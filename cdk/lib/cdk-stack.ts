import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as cloudfront_origins from 'aws-cdk-lib/aws-cloudfront-origins';


export class CdkStack extends cdk.Stack {
  public readonly siteBucket: s3.Bucket;
  public readonly distribution: cloudfront.Distribution;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.siteBucket = new s3.Bucket(this, 'SiteBucket', {
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html',
      publicReadAccess: false,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      autoDeleteObjects: false
    });

    // L2ディストリビューション作成（CfnDistributionからの移行)
    this.distribution = new cloudfront.Distribution(this, 'SiteDistribution', {
      defaultRootObject: 'index.html',
      defaultBehavior: {
        origin:
          cloudfront_origins.S3BucketOrigin.withOriginAccessControl(
            this.siteBucket
          ),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD,
      },
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: cdk.Duration.seconds(0),
        },
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: cdk.Duration.seconds(0),
        },
      ],
    });

    // S3のバケットポリシー追加
    this.siteBucket.addToResourcePolicy(new iam.PolicyStatement({
      actions: ['s3:GetObject'],
      resources: [this.siteBucket.arnForObjects('*')],
      principals: [
        new iam.ServicePrincipal('cloudfront.amazonaws.com'),
      ],
      conditions: {
        StringEquals: {
          'AWS:SourceArn': `arn:aws:cloudfront::${this.account}:distribution/${this.distribution.distributionId}`,
        },
      },
    }));

    // 出力（CLIで値を使えるように）
    new cdk.CfnOutput(this, 'BucketName', {
      value: this.siteBucket.bucketName,
    });

    new cdk.CfnOutput(this, 'CloudFrontDomain', {
      value: this.distribution.domainName,
    });
  }
}
