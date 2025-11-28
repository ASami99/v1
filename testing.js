// TEST ALL THESE UTILITY FUNCTIONS
function testUtilityFunctions() {
    console.log('=== TESTING UTILITY FUNCTIONS ===');

    const functionsToTest = [
        'isMajorDoorChange',
        'getWindowDisplayName',
        'isLargeDoor',
        'getDoorSizeCategory',
        'validateDoorPlacement',
        'getDoorWidthRequirement',
        'getSelectedDoorsOnWall',
        'wallHasLargeDoors',
        'getTotalDoorWidthOnWall',
        'hasEnoughWallSpace'
    ];

    // Test 1: Check function existence
    console.log('1. FUNCTION EXISTENCE:');
    functionsToTest.forEach(funcName => {
        console.log(`   - ${funcName}:`, typeof window[funcName] === 'function');
    });

    // Test 2: Check if functions are called in event handlers
    console.log('2. USAGE IN EVENT HANDLERS:');

    // Get source of main functions that might use these
    const addComponentSource = addComponent.toString();
    const updateDoorAvailabilitySource = updateDoorAvailabilityForWalls.toString();
    const updateWindowAvailabilitySource = updateWindowAvailabilityForWalls.toString();

    functionsToTest.forEach(funcName => {
        const usedInAddComponent = addComponentSource.includes(funcName);
        const usedInDoorAvailability = updateDoorAvailabilitySource.includes(funcName);
        const usedInWindowAvailability = updateWindowAvailabilitySource.includes(funcName);

        if (usedInAddComponent || usedInDoorAvailability || usedInWindowAvailability) {
            console.log(`   - ${funcName}: USED in main functions`);
        } else {
            console.log(`   - ${funcName}: NOT USED in main functions`);
        }
    });

    // Test 3: Test individual function behavior
    console.log('3. FUNCTION BEHAVIOR TESTS:');

    // Test isMajorDoorChange
    console.log('   - isMajorDoorChange tests:');
    console.log('     Single to Single:', isMajorDoorChange('Single_Solid_Door', 'Single_Glazed_Door'));
    console.log('     Single to Bi-Fold:', isMajorDoorChange('Single_Solid_Door', '3M_Bi-Fold_Doors'));
    console.log('     Same door:', isMajorDoorChange('Single_Solid_Door', 'Single_Solid_Door'));

    // Test isLargeDoor
    console.log('   - isLargeDoor tests:');
    console.log('     Single door:', isLargeDoor('Single_Solid_Door'));
    console.log('     3M Patio:', isLargeDoor('3M_Patio_Doors_Sliders'));

    // Test getDoorWidthRequirement
    console.log('   - getDoorWidthRequirement tests:');
    console.log('     Single door:', getDoorWidthRequirement('Single_Solid_Door'), 'ft');
    console.log('     5M Bi-Fold:', getDoorWidthRequirement('5M_Bi-Fold_Doors'), 'ft');

    // Test validateDoorPlacement
    console.log('   - validateDoorPlacement tests:');
    console.log('     Valid placement:', validateDoorPlacement('front', 'Single_Solid_Door', 200));
    console.log('     Invalid placement:', validateDoorPlacement('front', '5M_Bi-Fold_Doors', 200));

    // Test wall space functions
    console.log('   - Wall space tests:');
    console.log('     Selected doors on front:', getSelectedDoorsOnWall('front'));
    console.log('     Has large doors:', wallHasLargeDoors('front'));
    console.log('     Total door width:', getTotalDoorWidthOnWall('front'), 'ft');
    console.log('     Has enough space:', hasEnoughWallSpace('front', 'door', 3));

    console.log('=== TEST COMPLETE ===');
}

// Run the test
testUtilityFunctions();