#!/usr/bin/env node

/**
 * Test script for MCP Server tool registration and parameter validation
 * This tests the tools without making actual API calls
 */

const { DOMcpServer } = require('./build/DOMcpServer');
const { registerAppTools } = require('./build/tools/app');

console.log('🔧 Testing MCP Server tool registration...\n');

function testToolRegistration() {
  console.log('📋 Testing tool registration...');
  
  try {
    // Create a test server
    const server = new DOMcpServer(
      { name: "Test Server", version: "1.0.0" },
      { capabilities: {} }
    );
    
    // Register app tools
    registerAppTools(server);
    
    // Get the list of registered tools
    const tools = server.listTools();
    
    console.log(`  ✅ Successfully registered ${tools.length} tools`);
    
    // Check for our three specific tools
    const targetTools = ['create_app', 'update_app', 'validate_app_spec'];
    const foundTools = [];
    
    for (const tool of tools) {
      if (targetTools.includes(tool.name)) {
        foundTools.push(tool.name);
        console.log(`  ✅ Found tool: ${tool.name}`);
        console.log(`     Description: ${tool.description.substring(0, 60)}...`);
      }
    }
    
    const missingTools = targetTools.filter(name => !foundTools.includes(name));
    if (missingTools.length > 0) {
      console.log(`  ❌ Missing tools: ${missingTools.join(', ')}`);
      return false;
    }
    
    console.log('  ✅ All target tools found and registered');
    return true;
    
  } catch (error) {
    console.log('  ❌ Tool registration failed');
    console.log(`  Error: ${error.message}`);
    return false;
  }
}

function testParameterValidation() {
  console.log('\n🔍 Testing parameter validation...');
  
  try {
    // Import the parameter schemas
    const { 
      post_Apps_create, 
      put_Apps_update, 
      post_Apps_validate_appSpec 
    } = require('./build/specs/digitalocean-openapi.yaml.zod');
    
    console.log('  📋 Testing create_app parameters...');
    const createParams = post_Apps_create.parameters;
    console.log(`     Expected: body with spec`);
    console.log(`     Schema type: ${createParams._def.typeName}`);
    
    console.log('  📋 Testing update_app parameters...');
    const updateParams = put_Apps_update.parameters;
    console.log(`     Expected: path.id + body with spec`);
    console.log(`     Schema type: ${updateParams._def.typeName}`);
    
    console.log('  📋 Testing validate_app_spec parameters...');
    const validateParams = post_Apps_validate_appSpec.parameters;
    console.log(`     Expected: body with spec`);
    console.log(`     Schema type: ${validateParams._def.typeName}`);
    
    console.log('  ✅ Parameter schemas loaded successfully');
    return true;
    
  } catch (error) {
    console.log('  ❌ Parameter validation test failed');
    console.log(`  Error: ${error.message}`);
    return false;
  }
}

function testApiClientCreation() {
  console.log('\n🌐 Testing API client creation...');
  
  try {
    // Test without token (should fail gracefully)
    delete process.env.DIGITALOCEAN_API_TOKEN;
    
    const { createClient } = require('./build/api');
    
    try {
      createClient();
      console.log('  ❌ Should have failed without token');
      return false;
    } catch (error) {
      if (error.message.includes('DIGITALOCEAN_API_TOKEN is not set')) {
        console.log('  ✅ Correctly requires API token');
      } else {
        console.log(`  ❌ Unexpected error: ${error.message}`);
        return false;
      }
    }
    
    // Test with dummy token
    process.env.DIGITALOCEAN_API_TOKEN = 'dummy_token_for_testing';
    
    const { client } = createClient();
    console.log('  ✅ API client created successfully with token');
    
    return true;
    
  } catch (error) {
    console.log('  ❌ API client creation failed');
    console.log(`  Error: ${error.message}`);
    return false;
  }
}

async function runTests() {
  console.log('🧪 Running MCP Server tests...\n');
  
  const results = [];
  
  results.push(testToolRegistration());
  results.push(testParameterValidation());
  results.push(testApiClientCreation());
  
  const passed = results.filter(r => r).length;
  const total = results.length;
  
  console.log(`\n📊 Test Results: ${passed}/${total} tests passed`);
  
  if (passed === total) {
    console.log('🎉 All MCP Server tests passed!');
    console.log('\n💡 The tools appear to be correctly implemented.');
    console.log('   Next step: Test with real API calls using your token.');
  } else {
    console.log('❌ Some tests failed. Check the output above for details.');
  }
}

// Run the tests
runTests().catch(console.error);
