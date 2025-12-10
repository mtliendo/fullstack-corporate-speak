import * as cdk from 'aws-cdk-lib/core'
import { Construct } from 'constructs'
import {
  CorsHttpMethod,
  HttpApi,
  HttpMethod,
} from 'aws-cdk-lib/aws-apigatewayv2'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { Runtime } from 'aws-cdk-lib/aws-lambda'
import { HttpLambdaIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations'
import { PolicyStatement } from 'aws-cdk-lib/aws-iam'
import * as path from 'path'
import { Duration } from 'aws-cdk-lib/core'

export class CorporateSpeakStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // create an api gateway http api
    const httpApi = new HttpApi(this, 'CorporateSpeakApi', {
      corsPreflight: {
        allowOrigins: ['http://localhost:3000'],
        allowMethods: [CorsHttpMethod.ANY],
        allowHeaders: ['*'],
      },
    })

    // create a nodejs lambda function
    const lambda = new NodejsFunction(this, 'CorporateSpeakLambda', {
      runtime: Runtime.NODEJS_22_X,
      entry: path.join(__dirname, 'functions', 'generate-corporate-speak.ts'),
      handler: 'handler',
      timeout: Duration.seconds(7),
    })

    httpApi.addRoutes({
      path: '/generate-corporate-speak',
      methods: [HttpMethod.POST],
      integration: new HttpLambdaIntegration('CorporateSpeakLambda', lambda),
    })

    lambda.addToRolePolicy(
      new PolicyStatement({
        actions: ['bedrock:InvokeModel'],
        resources: ['*'],
      })
    )

    new cdk.CfnOutput(this, 'ApiUrl', {
      value: httpApi.url ?? '',
      description: 'API URL',
    })
  }
}
