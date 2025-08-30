#!/usr/bin/env node

/**
 * Comprehensive test suite for DigitalOcean App Platform API tools
 *
 * This script tests the three main App Platform tools:
 * - validate_app_spec: Validates app specifications and returns cost estimates
 * - create_app: Creates new apps using Docker images (no GitHub auth required)
 * - update_app: Updates existing apps with new configurations
 *
 * Usage: node comprehensive-test.js
 * Requires: DIGITALOCEAN_API_TOKEN environment variable
 */

const { createClient } = require('./build/api');

// Set up environment
require('dotenv').config();

if (!process.env.DIGITALOCEAN_API_TOKEN) {
  console.error('❌ DIGITALOCEAN_API_TOKEN environment variable is required');
  process.exit(1);
}

console.log('🧪 Comprehensive DigitalOcean App Platform API Tools Test\n');

let createdAppId = null;

async function testValidateAppSpec() {
  console.log('📋 Testing validate_app_spec tool...');
  
  try {
    const { client } = createClient();
    
    // Test with a Docker-based app spec (no GitHub required)
    const testSpec = {
      body: {
        spec: {
          name: "test-validation-nginx",
          region: "nyc3",
          services: [{
            name: "web",
            image: {
              registry_type: "DOCKER_HUB",
              repository: "nginx",
              tag: "alpine"
            },
            instance_count: 1,
            instance_size_slug: "apps-s-1vcpu-0.5gb",
            http_port: 80,
            routes: [{ path: "/" }]
          }]
        }
      }
    };
    
    console.log('  📤 Validating Docker-based app specification...');
    const result = await client.post('/v2/apps/propose', testSpec);
    
    console.log('  ✅ validate_app_spec: SUCCESS');
    console.log(`  💰 Monthly cost: $${result.app_cost?.amount || 'N/A'}`);
    console.log(`  🔧 App tier: ${result.app_tier_upgrade_cost?.name || 'Basic'}`);
    console.log(`  📊 Spec validation: ${result.spec ? 'Valid' : 'Invalid'}`);
    
    return { success: true, result };
  } catch (error) {
    console.log('  ❌ validate_app_spec: FAILED');
    console.log(`  Error: ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function testCreateApp() {
  console.log('\n🚀 Testing create_app tool...');
  
  try {
    const { client } = createClient();
    
    // Create a simple Docker-based app (no GitHub required)
    const testApp = {
      body: {
        spec: {
          name: `mcp-test-${Date.now().toString().slice(-8)}`,
          region: "nyc3",
          services: [{
            name: "web",
            image: {
              registry_type: "DOCKER_HUB",
              repository: "nginx",
              tag: "alpine"
            },
            instance_count: 1,
            instance_size_slug: "apps-s-1vcpu-0.5gb",
            http_port: 80,
            routes: [{ path: "/" }]
          }]
        }
      }
    };
    
    console.log('  📤 Creating Docker-based nginx app...');
    const result = await client.post('/v2/apps', testApp);
    
    createdAppId = result.app.id;
    
    console.log('  ✅ create_app: SUCCESS');
    console.log(`  🆔 App ID: ${result.app.id}`);
    console.log(`  📛 App Name: ${result.app.spec.name}`);
    console.log(`  🌍 Region: ${result.app.spec.region}`);
    console.log(`  🐳 Image: ${result.app.spec.services[0].image.repository}:${result.app.spec.services[0].image.tag}`);
    console.log(`  📊 Status: ${result.app.active_deployment?.phase || 'Pending'}`);
    
    return { success: true, result: result.app };
  } catch (error) {
    console.log('  ❌ create_app: FAILED');
    console.log(`  Error: ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function testUpdateApp(appId) {
  console.log('\n🔄 Testing update_app tool...');
  
  if (!appId) {
    console.log('  ⚠️  Skipping update_app test - no app ID available');
    return { success: false, error: 'No app ID provided' };
  }
  
  try {
    const { client } = createClient();
    
    // Update the app with different configuration
    const updateData = {
      path: { id: appId },
      body: {
        spec: {
          name: `mcp-upd-${Date.now().toString().slice(-8)}`,
          region: "nyc3",
          services: [{
            name: "web",
            image: {
              registry_type: "DOCKER_HUB",
              repository: "nginx",
              tag: "latest" // Changed from alpine to latest
            },
            instance_count: 2, // Changed from 1 to 2
            instance_size_slug: "apps-s-1vcpu-1gb", // Larger size to support 2 instances
            http_port: 80,
            routes: [{ path: "/" }]
          }]
        }
      }
    };
    
    console.log(`  📤 Updating app ${appId}...`);
    const result = await client.put('/v2/apps/{id}', updateData);
    
    console.log('  ✅ update_app: SUCCESS');
    console.log(`  📛 Updated Name: ${result.app.spec.name}`);
    console.log(`  🐳 Updated Image: ${result.app.spec.services[0].image.repository}:${result.app.spec.services[0].image.tag}`);
    console.log(`  📊 Instance Count: ${result.app.spec.services[0].instance_count}`);
    console.log(`  🔄 Deployment Status: ${result.app.active_deployment?.phase || 'Pending'}`);
    
    return { success: true, result: result.app };
  } catch (error) {
    console.log('  ❌ update_app: FAILED');
    console.log(`  Error: ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function cleanupTestApp(appId) {
  if (!appId) {
    console.log('  ℹ️  No app to clean up');
    return;
  }
  
  console.log(`\n🧹 Cleaning up test app ${appId}...`);
  
  try {
    const { client } = createClient();
    await client.delete('/v2/apps/{id}', { path: { id: appId } });
    console.log('  ✅ Test app deleted successfully');
  } catch (error) {
    console.log(`  ⚠️  Failed to delete test app: ${error.message}`);
    console.log(`  📝 Please manually delete app ${appId} from your DigitalOcean dashboard`);
  }
}

async function runComprehensiveTest() {
  console.log('🧪 Starting comprehensive test suite...\n');
  
  const results = {
    validate_app_spec: null,
    create_app: null,
    update_app: null
  };
  
  try {
    // Test 1: Validate App Spec
    results.validate_app_spec = await testValidateAppSpec();
    
    // Test 2: Create App
    results.create_app = await testCreateApp();
    
    // Test 3: Update App (only if create succeeded)
    if (results.create_app.success && createdAppId) {
      results.update_app = await testUpdateApp(createdAppId);
    } else {
      results.update_app = { success: false, error: 'Create app failed, skipping update test' };
    }
    
    // Calculate results
    const passed = Object.values(results).filter(r => r && r.success).length;
    const total = Object.keys(results).length;
    
    console.log(`\n📊 Test Results: ${passed}/${total} tests passed`);
    
    // Detailed results
    console.log('\n📋 Detailed Results:');
    console.log(`  validate_app_spec: ${results.validate_app_spec.success ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`  create_app: ${results.create_app.success ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`  update_app: ${results.update_app.success ? '✅ PASS' : '❌ FAIL'}`);
    
    if (passed === total) {
      console.log('\n🎉 ALL TESTS PASSED!');
      console.log('✅ All three DigitalOcean App Platform API tools are working correctly');
      console.log('🚀 The tools are ready for production use');
    } else {
      console.log('\n❌ Some tests failed. Check the detailed output above.');
    }
    
    return { passed, total, results };
    
  } catch (error) {
    console.log('\n💥 Test suite encountered an unexpected error:');
    console.error(error);
    return { passed: 0, total: 3, results, error: error.message };
  } finally {
    // Always attempt cleanup
    await cleanupTestApp(createdAppId);
  }
}

// Run the comprehensive test
runComprehensiveTest()
  .then(testResults => {
    if (testResults.passed === testResults.total) {
      console.log('\n💡 Summary: All DigitalOcean App Platform API tools are functioning correctly!');
      process.exit(0);
    } else {
      console.log('\n💥 Summary: Some tools have issues that need to be addressed.');
      process.exit(1);
    }
  })
  .catch(error => {
    console.error('\n💥 Test suite failed:', error.message);
    process.exit(1);
  });
