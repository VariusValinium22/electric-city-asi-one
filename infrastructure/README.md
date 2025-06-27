# Electric City Aquarium: Sharks Interactive – Frontend Infrastructure

This directory contains Infrastructure as Code (IaC) templates for deploying the Electric City Aquarium: Sharks Interactive frontend application infrastructure on AWS.

## Architecture Overview

The infrastructure includes:

- **S3 Buckets**: Static website hosting for staging, production, and storybook
- **CloudFront Distributions**: Global CDN for fast content delivery
- **IAM User & Policies**: Secure access for GitHub Actions deployments

## Resources Created

### S3 Buckets
- `electric-city-sharks-frontend-staging` - Staging environment
- `electric-city-sharks-frontend-prod` - Production environment  
- `electric-city-sharks-storybook` - Component documentation

### CloudFront Distributions
- Staging distribution with caching disabled for development
- Production distribution with optimized caching
- Storybook distribution with caching disabled

### IAM Resources
- GitHub Actions user with deployment permissions
- Policies for S3 and CloudFront access
- Access keys for CI/CD integration

## Prerequisites

1. **AWS CLI** installed and configured
   ```bash
   aws configure
   ```

2. **jq** for JSON parsing (optional, for deployment script)
   ```bash
   # macOS
   brew install jq
   
   # Ubuntu/Debian
   sudo apt-get install jq
   ```

3. **Appropriate AWS permissions** to create:
   - S3 buckets and policies
   - CloudFront distributions
   - IAM users and policies

## Deployment

### Option 1: Using the Deployment Script (Recommended)

1. Make the script executable:
   ```bash
   chmod +x infrastructure/deploy-stack.sh
   ```

2. Run the deployment:
   ```bash
   ./infrastructure/deploy-stack.sh
   ```

The script will:
- Deploy the CloudFormation stack
- Display all resource information
- Show the exact values needed for GitHub secrets

### Option 2: Manual CloudFormation Deployment

```bash
aws cloudformation deploy \
  --template-file infrastructure/cloudformation-stack.yml \
  --stack-name electric-city-frontend-infrastructure \
  --parameter-overrides ProjectName=electric-city-shark \
  --capabilities CAPABILITY_IAM \
  --region us-east-2
```

## Post-Deployment Setup

### 1. Update GitHub Environment Secrets

After deployment, add these secrets to your GitHub repository:

**Staging Environment:**
- `STAGING_S3_BUCKET`
- `STAGING_CLOUDFRONT_DISTRIBUTION_ID`  
- `STORYBOOK_S3_BUCKET`
- `STORYBOOK_CLOUDFRONT_DISTRIBUTION_ID`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

**Production Environment:**
- `PROD_S3_BUCKET`
- `PROD_CLOUDFRONT_DISTRIBUTION_ID`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

### 2. Test Deployments

1. Push to a feature branch → should deploy to staging
2. Push to main → should deploy to staging + storybook
3. Manual dispatch with "prod" → should deploy to production

## Stack Outputs

The CloudFormation stack provides these outputs:

| Output | Description |
|--------|-------------|
| `StagingBucketName` | S3 bucket name for staging |
| `ProductionBucketName` | S3 bucket name for production |
| `StorybookBucketName` | S3 bucket name for storybook |
| `StagingDistributionId` | CloudFront distribution ID for staging |
| `ProductionDistributionId` | CloudFront distribution ID for production |
| `StorybookDistributionId` | CloudFront distribution ID for storybook |
| `StagingDistributionDomainName` | CloudFront URL for staging |
| `ProductionDistributionDomainName` | CloudFront URL for production |
| `StorybookDistributionDomainName` | CloudFront URL for storybook |
| `GitHubActionsAccessKeyId` | Access key for GitHub Actions |
| `GitHubActionsSecretAccessKey` | Secret key for GitHub Actions |

## Management Commands

### View Stack Status
```bash
aws cloudformation describe-stacks \
  --stack-name electric-city-frontend-infrastructure \
  --region us-east-2
```

### Update Stack
```bash
aws cloudformation deploy \
  --template-file infrastructure/cloudformation-stack.yml \
  --stack-name electric-city-frontend-infrastructure \
  --parameter-overrides ProjectName=electric-city-shark \
  --capabilities CAPABILITY_IAM \
  --region us-east-2
```

### Delete Stack
```bash
# WARNING: this will delete all resources!
aws cloudformation delete-stack \
  --stack-name electric-city-frontend-infrastructure \
  --region us-east-2
```

## Troubleshooting

### CloudFormation Deployment Issues

1. **Bucket name conflicts**: S3 bucket names must be globally unique
   - Solution: Change the `ProjectName` parameter

2. **Permission errors**: Ensure your AWS user has sufficient permissions
   - Required: S3, CloudFront, IAM permissions

3. **Region issues**: Ensure you're deploying to the correct region
   - Currently configured for `us-east-2`

### GitHub Actions Issues

1. **403 Forbidden on S3**: Check bucket policies and public access settings
2. **CloudFront not updating**: Invalidations can take 10-15 minutes
3. **Wrong region**: Ensure GitHub Actions workflow uses correct region

## Security Considerations

- S3 buckets are configured for public read access (required for static hosting)
- CloudFront distributions use HTTPS by default
- IAM user has minimal required permissions
- Access keys should be rotated regularly

## Cost Optimization

- CloudFront distributions use `PriceClass_100` (lowest cost)
- Staging uses `CachingDisabled` for development efficiency
- Production uses `CachingOptimized` for performance

## Maintenance

### Regular Tasks
1. **Monitor AWS costs** in the Billing & Cost Management console
2. **Rotate IAM access keys** periodically
3. **Update CloudFormation template** as infrastructure needs change
4. **Review security settings** quarterly

### Scaling Considerations
- Add custom domain names when ready for production
- Consider adding Route 53 for DNS management
- Add CloudWatch monitoring and alerts
- Consider adding WAF for security 