#!/bin/bash

# Electric City ASI - Local Deployment Helper Script
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Electric City ASI - Local Deployment Helper${NC}"
echo ""

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}AWS CLI is not installed. Please install it first.${NC}"
    exit 1
fi

# Check if user is authenticated
if ! aws sts get-caller-identity &> /dev/null; then
    echo -e "${RED}AWS CLI is not configured. Please run 'aws configure' first.${NC}"
    exit 1
fi

# Get stack outputs
STACK_NAME="electric-city-sharks-infrastructure"
REGION="us-east-2"

echo -e "${YELLOW}Getting deployment configuration from CloudFormation stack...${NC}"

OUTPUTS=$(aws cloudformation describe-stacks \
    --stack-name "$STACK_NAME" \
    --region "$REGION" \
    --query 'Stacks[0].Outputs' \
    --output json 2>/dev/null)

if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to get stack outputs. Make sure the infrastructure is deployed.${NC}"
    echo -e "${YELLOW}Run: cd infrastructure && ./deploy-stack.sh${NC}"
    exit 1
fi

# Extract values
STAGING_BUCKET=$(echo "$OUTPUTS" | jq -r '.[] | select(.OutputKey=="StagingBucketName") | .OutputValue')
PROD_BUCKET=$(echo "$OUTPUTS" | jq -r '.[] | select(.OutputKey=="ProductionBucketName") | .OutputValue')
ELECTRON_DOWNLOADS_STAGING_BUCKET=$(echo "$OUTPUTS" | jq -r '.[] | select(.OutputKey=="ElectronDownloadsStagingBucketName") | .OutputValue')
ELECTRON_DOWNLOADS_PROD_BUCKET=$(echo "$OUTPUTS" | jq -r '.[] | select(.OutputKey=="ElectronDownloadsProductionBucketName") | .OutputValue')

STAGING_DISTRIBUTION_ID=$(echo "$OUTPUTS" | jq -r '.[] | select(.OutputKey=="StagingDistributionId") | .OutputValue')
PROD_DISTRIBUTION_ID=$(echo "$OUTPUTS" | jq -r '.[] | select(.OutputKey=="ProductionDistributionId") | .OutputValue')

# Export environment variables
export STAGING_S3_BUCKET="$STAGING_BUCKET"
export PROD_S3_BUCKET="$PROD_BUCKET"
export ELECTRON_DOWNLOADS_STAGING_S3_BUCKET="$ELECTRON_DOWNLOADS_STAGING_BUCKET"
export ELECTRON_DOWNLOADS_PROD_S3_BUCKET="$ELECTRON_DOWNLOADS_PROD_BUCKET"
export STAGING_CLOUDFRONT_DISTRIBUTION_ID="$STAGING_DISTRIBUTION_ID"
export PROD_CLOUDFRONT_DISTRIBUTION_ID="$PROD_DISTRIBUTION_ID"

echo -e "${GREEN}Environment variables configured:${NC}"
echo -e "${BLUE}  STAGING_S3_BUCKET=${NC}$STAGING_BUCKET"
echo -e "${BLUE}  PROD_S3_BUCKET=${NC}$PROD_BUCKET"
echo -e "${BLUE}  ELECTRON_DOWNLOADS_STAGING_S3_BUCKET=${NC}$ELECTRON_DOWNLOADS_STAGING_BUCKET"
echo -e "${BLUE}  ELECTRON_DOWNLOADS_PROD_S3_BUCKET=${NC}$ELECTRON_DOWNLOADS_PROD_BUCKET"
echo ""

# Show deployment options
echo -e "${YELLOW}Available deployment commands:${NC}"
echo -e "${BLUE}  npm run deploy:web:staging${NC}  - Deploy web app to staging"
echo -e "${BLUE}  npm run deploy:web:prod${NC}     - Deploy web app to production"
echo -e "${BLUE}  npm run deploy:electron${NC}     - Deploy Electron installers"
echo ""

# Ask user what to deploy
echo -e "${YELLOW}What would you like to deploy?${NC}"
echo "1) Web app to staging"
echo "2) Web app to production"  
echo "3) Electron installers"
echo "4) All (web staging + electron)"
echo "5) Exit"

read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        echo -e "${BLUE}Deploying web app to staging...${NC}"
        npm run deploy:web:staging
        ;;
    2)
        echo -e "${BLUE}Deploying web app to production...${NC}"
        npm run deploy:web:prod
        ;;
    3)
        echo -e "${BLUE}Deploying Electron installers...${NC}"
        npm run deploy:electron
        ;;
    4)
        echo -e "${BLUE}Deploying web app to staging and Electron installers...${NC}"
        npm run deploy:web:staging
        npm run deploy:electron
        ;;
    5)
        echo -e "${YELLOW}Deployment cancelled.${NC}"
        exit 0
        ;;
    *)
        echo -e "${RED}Invalid choice. Exiting.${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}Deployment completed successfully!${NC}"
echo ""
echo -e "${YELLOW}Useful URLs:${NC}"
echo -e "${BLUE}  Staging Web:${NC} https://$(echo "$OUTPUTS" | jq -r '.[] | select(.OutputKey=="StagingDistributionDomainName") | .OutputValue')"
echo -e "${BLUE}  Production Web:${NC} https://$(echo "$OUTPUTS" | jq -r '.[] | select(.OutputKey=="ProductionDistributionDomainName") | .OutputValue')"
echo -e "${BLUE}  Electron Downloads:${NC} $(echo "$OUTPUTS" | jq -r '.[] | select(.OutputKey=="ElectronDownloadsURL") | .OutputValue')/latest/"
echo ""
echo -e "${YELLOW}Note: CloudFront invalidations take 5-15 minutes to complete.${NC}" 