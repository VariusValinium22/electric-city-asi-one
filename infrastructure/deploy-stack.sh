#!/bin/bash

# Electric City Aquarium: Sharks Interactive – Frontend Infrastructure Deployment Script
set -e

# config
STACK_NAME="electric-city-sharks-infrastructure"
TEMPLATE_FILE="infrastructure/cloudformation-stack.yml"
REGION="us-east-2"
PROJECT_NAME="electric-city-sharks"

# colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # no color

echo -e "${BLUE}🚀 Deploying Electric City Aquarium: Sharks Interactive - Frontend Infrastructure${NC}"
echo -e "${BLUE}Stack Name: ${STACK_NAME}${NC}"
echo -e "${BLUE}Region: ${REGION}${NC}"
echo -e "${BLUE}Project Name: ${PROJECT_NAME}${NC}"
echo ""

# check if aws cli is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}AWS CLI is not installed. Please install it first.${NC}"
    exit 1
fi

# check if user is authenticated
if ! aws sts get-caller-identity &> /dev/null; then
    echo -e "${RED}AWS CLI is not configured. Please run 'aws configure' first.${NC}"
    exit 1
fi

# deploy the cloudformation stack
echo -e "${YELLOW}Deploying CloudFormation stack...${NC}"
aws cloudformation deploy \
    --template-file "$TEMPLATE_FILE" \
    --stack-name "$STACK_NAME" \
    --parameter-overrides ProjectName="$PROJECT_NAME" \
    --capabilities CAPABILITY_NAMED_IAM \
    --region "$REGION" \
    --no-fail-on-empty-changeset

# check if deployment was successful
if [ $? -eq 0 ]; then
    echo -e "${GREEN}CloudFormation stack deployed successfully!${NC}"
else
    echo -e "${RED}CloudFormation deployment failed!${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}Getting stack outputs...${NC}"

# get stack outputs
OUTPUTS=$(aws cloudformation describe-stacks \
    --stack-name "$STACK_NAME" \
    --region "$REGION" \
    --query 'Stacks[0].Outputs' \
    --output json)

# extract important values
STAGING_BUCKET=$(echo "$OUTPUTS" | jq -r '.[] | select(.OutputKey=="StagingBucketName") | .OutputValue')
PROD_BUCKET=$(echo "$OUTPUTS" | jq -r '.[] | select(.OutputKey=="ProductionBucketName") | .OutputValue')
STORYBOOK_BUCKET=$(echo "$OUTPUTS" | jq -r '.[] | select(.OutputKey=="StorybookBucketName") | .OutputValue')

STAGING_DISTRIBUTION_ID=$(echo "$OUTPUTS" | jq -r '.[] | select(.OutputKey=="StagingDistributionId") | .OutputValue')
PROD_DISTRIBUTION_ID=$(echo "$OUTPUTS" | jq -r '.[] | select(.OutputKey=="ProductionDistributionId") | .OutputValue')
STORYBOOK_DISTRIBUTION_ID=$(echo "$OUTPUTS" | jq -r '.[] | select(.OutputKey=="StorybookDistributionId") | .OutputValue')

STAGING_CLOUDFRONT_URL=$(echo "$OUTPUTS" | jq -r '.[] | select(.OutputKey=="StagingDistributionDomainName") | .OutputValue')
PROD_CLOUDFRONT_URL=$(echo "$OUTPUTS" | jq -r '.[] | select(.OutputKey=="ProductionDistributionDomainName") | .OutputValue')
STORYBOOK_CLOUDFRONT_URL=$(echo "$OUTPUTS" | jq -r '.[] | select(.OutputKey=="StorybookDistributionDomainName") | .OutputValue')

ACCESS_KEY_ID=$(echo "$OUTPUTS" | jq -r '.[] | select(.OutputKey=="GitHubActionsAccessKeyId") | .OutputValue')
SECRET_ACCESS_KEY=$(echo "$OUTPUTS" | jq -r '.[] | select(.OutputKey=="GitHubActionsSecretAccessKey") | .OutputValue')

# display results
echo ""
echo -e "${GREEN}Infrastructure deployed successfully!${NC}"
echo ""
echo -e "${YELLOW}Resource Information:${NC}"
echo -e "${BLUE}S3 Buckets:${NC}"
echo "  • Staging: $STAGING_BUCKET"
echo "  • Production: $PROD_BUCKET"
echo "  • Storybook: $STORYBOOK_BUCKET"
echo ""
echo -e "${BLUE}CloudFront Distributions:${NC}"
echo "  • Staging: $STAGING_DISTRIBUTION_ID"
echo "  • Production: $PROD_DISTRIBUTION_ID"
echo "  • Storybook: $STORYBOOK_DISTRIBUTION_ID"
echo ""
echo -e "${BLUE}Website URLs:${NC}"
echo "  • Staging: https://$STAGING_CLOUDFRONT_URL"
echo "  • Production: https://$PROD_CLOUDFRONT_URL"
echo "  • Storybook: https://$STORYBOOK_CLOUDFRONT_URL"
echo ""
echo -e "${YELLOW}GitHub Secrets Configuration:${NC}"
echo "Add these secrets to your GitHub repository environments:"
echo ""
echo -e "${BLUE}Staging Environment:${NC}"
echo "  STAGING_S3_BUCKET: $STAGING_BUCKET"
echo "  STAGING_CLOUDFRONT_DISTRIBUTION_ID: $STAGING_DISTRIBUTION_ID"
echo "  STORYBOOK_S3_BUCKET: $STORYBOOK_BUCKET"
echo "  STORYBOOK_CLOUDFRONT_DISTRIBUTION_ID: $STORYBOOK_DISTRIBUTION_ID"
echo "  AWS_ACCESS_KEY_ID: $ACCESS_KEY_ID"
echo "  AWS_SECRET_ACCESS_KEY: $SECRET_ACCESS_KEY"
echo ""
echo -e "${BLUE}Production Environment:${NC}"
echo "  PROD_S3_BUCKET: $PROD_BUCKET"
echo "  PROD_CLOUDFRONT_DISTRIBUTION_ID: $PROD_DISTRIBUTION_ID"
echo "  AWS_ACCESS_KEY_ID: $ACCESS_KEY_ID"
echo "  AWS_SECRET_ACCESS_KEY: $SECRET_ACCESS_KEY"
echo ""
echo -e "${YELLOW}Important Notes:${NC}"
echo "1. CloudFront distributions take 10-15 minutes to fully deploy"
echo "2. Update your GitHub environment secrets with the values above"
echo "3. The IAM access keys are displayed above - save them securely!"
echo "4. You can delete your manually created resources once this is working"
echo ""
echo -e "${GREEN}Setup complete! Infrastructure is now managed as code.${NC}" 