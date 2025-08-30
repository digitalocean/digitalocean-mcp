# DigitalOcean MCP Server Test Suite

This directory contains comprehensive tests for the DigitalOcean App Platform API tools.

## Test Files

### `comprehensive-test.js`
Complete test suite that verifies all three main App Platform tools:

- **`validate_app_spec`** - Validates app specifications and returns cost estimates
- **`create_app`** - Creates new apps using Docker images (no GitHub authentication required)  
- **`update_app`** - Updates existing apps with new configurations

## Running Tests

### Prerequisites
1. Node.js installed
2. DigitalOcean API token with App Platform permissions
3. Built project (`npm run build`)

### Setup
1. Copy `.env.example` to `.env`
2. Add your DigitalOcean API token to `.env`:
   ```
   DIGITALOCEAN_API_TOKEN=your_token_here
   ```

### Run Tests
```bash
# Run comprehensive test suite
node comprehensive-test.js
```

## Test Scenarios

### 1. validate_app_spec Test
- Tests app specification validation
- Uses Docker-based nginx app (no GitHub required)
- Verifies cost calculation and spec validation
- **Expected Result**: Returns cost estimates and validates spec

### 2. create_app Test  
- Creates a real app using Docker Hub nginx image
- Tests with minimal but valid configuration
- Verifies app creation and deployment initiation
- **Expected Result**: Successfully creates app and returns app details

### 3. update_app Test
- Updates the app created in test 2
- Changes Docker image tag and instance configuration
- Tests path parameter substitution (`/v2/apps/{id}`)
- **Expected Result**: Successfully updates app configuration

## Test Results

When all tests pass, you should see:
```
📊 Test Results: 3/3 tests passed

📋 Detailed Results:
  validate_app_spec: ✅ PASS
  create_app: ✅ PASS  
  update_app: ✅ PASS

🎉 ALL TESTS PASSED!
✅ All three DigitalOcean App Platform API tools are working correctly
🚀 The tools are ready for production use
```

## Cleanup

The test suite automatically:
- Deletes any apps created during testing
- Cleans up temporary resources
- Reports cleanup status

## Important Notes

### App Naming Constraints
- App names must be ≤ 32 characters
- Test uses timestamp-based names to ensure uniqueness

### Instance Size Limitations
- `apps-s-1vcpu-0.5gb` only supports 1 instance
- Update test uses `apps-s-1vcpu-1gb` to support 2 instances

### No GitHub Authentication Required
- Tests use Docker Hub images to avoid GitHub authentication
- Real-world usage may require GitHub/GitLab integration

## Troubleshooting

### Common Issues

**"GitHub user not authenticated"**
- Expected when using GitHub-based app specs
- Use Docker images instead (as shown in tests)

**"App name too long"**  
- App names must be ≤ 32 characters
- Test suite handles this automatically

**"Instance count exceeds limit"**
- Smaller instance sizes have lower instance limits
- Use appropriate instance size for desired instance count

### API Token Issues
- Ensure token has App Platform permissions
- Check token is correctly set in `.env` file
- Verify token hasn't expired

## Production Usage

After tests pass, the tools are ready for production use with:
- MCP clients (Claude Desktop, Cursor, etc.)
- Direct API integration
- Custom applications

The test suite validates that all three tools correctly:
- Communicate with DigitalOcean API
- Handle parameters and responses properly
- Perform expected operations successfully
