#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib/core'
import { CorporateSpeakStack } from '../lib/infra-stack'

const app = new cdk.App()
new CorporateSpeakStack(app, 'CorporateSpeakStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
})
