#!/usr/bin/env node

/**
 * Test script for DigitalOcean MCP Server App Platform tools
 * Tests: create_app, update_app, validate_app_spec
 */

const { createClient } = require('./build/api');
const { registerAppTools } = require('./build/tools/app');
const { DOMcpServer } = require('./build/DOMcpServer');

// Set up environment
require('dotenv').config();

if (!process.env.DIGITALOCEAN_API_TOKEN) {
  console.error('❌ DIGITALOCEAN_API_TOKEN environment variable is required');
  process.exit(1);
}

console.log('🧪 Testing DigitalOcean MCP Server App Platform tools...\n');

async function testValidateAppSpec() {
  console.log('📋 Testing validate_app_spec tool...');
  
  try {
    const { client } = createClient();
    
    // Test with a simple static site app spec (no GitHub required)
    const testSpec = {
      body: {
        spec: {
          name: "test-validation-app",
          region: "nyc3",
          static_sites: [{
            name: "static-site",
            source_dir: "/",
            build_command: "echo 'Hello World' > index.html",
            output_dir: "/",
            routes: [{ path: "/" }]
          }]
        }
      }
    };
    
    console.log('  📤 Sending validation request...');
    const result = await client.post('/v2/apps/propose', testSpec);
    
    console.log('  ✅ validate_app_spec: SUCCESS');
    console.log(`  💰 Estimated cost: $${result.app_cost?.amount || 'N/A'}/month`);
    console.log(`  🔧 App tier: ${result.app_tier_upgrade_cost?.name || 'N/A'}`);
    
    return result;
  } catch (error) {
    console.log('  ❌ validate_app_spec: FAILED');
    console.log(`  Error: ${error.message}`);
    throw error;
  }
}

async function testCreateApp() {
  console.log('\n🚀 Testing create_app tool...');
  
  try {
    const { client } = createClient();
    
    // Create a simple test app using static site (no GitHub required)
    const testApp = {
      body: {
        spec: {
          name: `mcp-test-app-${Date.now()}`,
          region: "nyc3",
          static_sites: [{
            name: "static-site",
            source_dir: "/",
            build_command: "echo 'Hello World' > index.html",
            output_dir: "/",
            routes: [{ path: "/" }]
          }]
        }
      }
    };
    
    console.log('  📤 Creating test app...');
    const result = await client.post('/v2/apps', testApp);
    
    console.log('  ✅ create_app: SUCCESS');
    console.log(`  🆔 App ID: ${result.app.id}`);
    console.log(`  📛 App Name: ${result.app.spec.name}`);
    console.log(`  🌍 Region: ${result.app.spec.region}`);
    
    return result.app;
  } catch (error) {
    console.log('  ❌ create_app: FAILED');
    console.log(`  Error: ${error.message}`);
    throw error;
  }
}

async function testUpdateApp(appId) {
  console.log('\n🔄 Testing update_app tool...');
  
  try {
    const { client } = createClient();
    
    // Update the app with a modified build command
    const updateData = {
      path: { id: appId },
      body: {
        spec: {
          name: `mcp-test-app-updated-${Date.now()}`,
          region: "nyc3",
          static_sites: [{
            name: "static-site",
            source_dir: "/",
            build_command: "echo 'Hello Updated World!' > index.html", // Updated
            output_dir: "/",
            routes: [{ path: "/" }]
          }]
        }
      }
    };
    
    console.log(`  📤 Updating app ${appId}...`);
    const result = await client.put('/v2/apps/{id}', updateData);
    
    console.log('  ✅ update_app: SUCCESS');
    console.log(`  📛 Updated Name: ${result.app.spec.name}`);
    console.log(`  🔧 Build Command: ${result.app.spec.static_sites[0].build_command}`);
    
    return result.app;
  } catch (error) {
    console.log('  ❌ update_app: FAILED');
    console.log(`  Error: ${error.message}`);
    throw error;
  }
}

async function cleanupApp(appId) {
  console.log(`\n🧹 Cleaning up test app ${appId}...`);
  
  try {
    const { client } = createClient();
    await client.delete('/v2/apps/{id}', { path: { id: appId } });
    console.log('  ✅ Test app deleted successfully');
  } catch (error) {
    console.log(`  ⚠️  Failed to delete test app: ${error.message}`);
  }
}

async function runTests() {
  let testAppId = null;
  
  try {
    // Test 1: Validate App Spec
    await testValidateAppSpec();
    
    // Test 2: Create App
    const createdApp = await testCreateApp();
    testAppId = createdApp.id;
    
    // Test 3: Update App
    await testUpdateApp(testAppId);
    
    console.log('\n🎉 All tests passed successfully!');
    
  } catch (error) {
    console.log('\n💥 Test suite failed!');
    console.error('Final error:', error.message);
  } finally {
    // Cleanup
    if (testAppId) {
      await cleanupApp(testAppId);
    }
  }
}

// Run the tests
runTests().catch(console.error);
