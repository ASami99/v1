// Ensure componentCounter exists (safety check)
if (typeof componentCounter === 'undefined') {
    let componentCounter = 0;
}

// Door availability rules based on width (for Front & Back walls)
const DOOR_AVAILABILITY_WIDTH_RULES = {
    // 8-10ft: Only single doors (no patio, no bi-fold)
    '8-10': [
        'Single_Glazed_Door',
        'Single_Solid_Door',
        'Single_Transom_Door',
        'Single_Door_with_side_panel',
        '4ft_Double_Door',
        '4ft_Transom_Double_Door',
        '5ft_Double_Door',
        '5ft_Transom_Double_Door'
    ],

    // 12ft: Unlock 2.4M Patio doors
    '12': [
        'Single_Glazed_Door',
        'Single_Solid_Door',
        'Single_Transom_Door',
        'Single_Door_with_side_panel',
        '4ft_Double_Door',
        '4ft_Transom_Double_Door',
        '5ft_Double_Door',
        '5ft_Transom_Double_Door',
        '2_4M_Patio_Doors_Sliders'  // 2.4M unlocked
    ],

    // 14ft: Unlock 3M Patio doors
    '14': [
        'Single_Glazed_Door',
        'Single_Solid_Door',
        'Single_Transom_Door',
        'Single_Door_with_side_panel',
        '4ft_Double_Door',
        '4ft_Transom_Double_Door',
        '5ft_Double_Door',
        '5ft_Transom_Double_Door',
        '2_4M_Patio_Doors_Sliders',
        '3M_Patio_Doors_Sliders'  // 3M unlocked
    ],

    // 16ft+: Everything unlocked
    '16+': [
        'Single_Glazed_Door',
        'Single_Solid_Door',
        'Single_Transom_Door',
        'Single_Door_with_side_panel',
        '4ft_Double_Door',
        '4ft_Transom_Double_Door',
        '5ft_Double_Door',
        '5ft_Transom_Double_Door',
        '2_4M_Patio_Doors_Sliders',
        '3M_Patio_Doors_Sliders',
        '3_6M_Patio_Doors_Sliders',
        '3M_Bi-Fold_Doors',
        '4M_Bi-Fold_Doors',
        '5M_Bi-Fold_Doors',
        '3M_Transom_Bi-Fold_Doors',
        '4M_Transom_Bi-Fold_Doors',
        '5M_Transom_Bi-Fold_Doors'
    ]
};

// Door availability rules based on depth (for Left & Right walls)
const DOOR_AVAILABILITY_DEPTH_RULES = {
    // Up to 8ft: Single doors + 4ft/5ft Double doors
    '6-8': [
        'Single_Glazed_Door',
        'Single_Solid_Door',
        'Single_Transom_Door',
        'Single_Door_with_side_panel',
        '4ft_Double_Door',
        '4ft_Transom_Double_Door',
        '5ft_Double_Door',
        '5ft_Transom_Double_Door'
    ],

    // 10ft: Unlock 2.4M & 3M Patio doors
    '10': [
        'Single_Glazed_Door',
        'Single_Solid_Door',
        'Single_Transom_Door',
        'Single_Door_with_side_panel',
        '4ft_Double_Door',
        '4ft_Transom_Double_Door',
        '5ft_Double_Door',
        '5ft_Transom_Double_Door',
        '2_4M_Patio_Doors_Sliders',
        '3M_Patio_Doors_Sliders'  // 3M unlocked
    ],

    // 12ft+: Everything unlocked
    '12+': [
        'Single_Glazed_Door',
        'Single_Solid_Door',
        'Single_Transom_Door',
        'Single_Door_with_side_panel',
        '4ft_Double_Door',
        '4ft_Transom_Double_Door',
        '5ft_Double_Door',
        '5ft_Transom_Double_Door',
        '2_4M_Patio_Doors_Sliders',
        '3M_Patio_Doors_Sliders',
        '3_6M_Patio_Doors_Sliders',
        '3M_Bi-Fold_Doors',
        '4M_Bi-Fold_Doors',
        // '5M_Bi-Fold_Doors',
        '3M_Transom_Bi-Fold_Doors',
        '4M_Transom_Bi-Fold_Doors',
        // '5M_Transom_Bi-Fold_Doors'
    ]
};

// Window availability rules based on selected doors
const WINDOW_AVAILABILITY_RULES = {
    // Front & Back walls
    'width': {
        // Up to 18ft width: Windows locked when 3M+ doors are selected
        '3M': {
            lockedDoors: ['3M_Patio_Doors_Sliders', '3_6M_Patio_Doors_Sliders', '3M_Bi-Fold_Doors', '4M_Bi-Fold_Doors', '5M_Bi-Fold_Doors', '3M_Transom_Bi-Fold_Doors', '4M_Transom_Bi-Fold_Doors', '5M_Transom_Bi-Fold_Doors'],
            maxWidth: 18,
            message: 'Windows locked: 3M+ doors selected at width ≤18ft'
        },
        // At 20ft width: Windows locked when 3.6M+ doors are selected
        '3.6M': {
            lockedDoors: ['3_6M_Patio_Doors_Sliders', '4M_Bi-Fold_Doors', '5M_Bi-Fold_Doors', '4M_Transom_Bi-Fold_Doors', '5M_Transom_Bi-Fold_Doors'],
            maxWidth: 20,
            message: 'Windows locked: 3.6M+ doors selected at width ≤20ft'
        },
        // From 22ft width: All windows unlocked
        'unlocked': {
            minWidth: 22,
            message: 'All windows unlocked at width ≥22ft'
        }
    },

    // Left & Right walls
    'depth': {
        // At 10ft depth: Windows locked when 2.4M+ doors are selected
        '2.4M': {
            lockedDoors: ['2_4M_Patio_Doors_Sliders', '3M_Patio_Doors_Sliders', '3_6M_Patio_Doors_Sliders', '3M_Bi-Fold_Doors', '4M_Bi-Fold_Doors', '5M_Bi-Fold_Doors', '3M_Transom_Bi-Fold_Doors', '4M_Transom_Bi-Fold_Doors', '5M_Transom_Bi-Fold_Doors'],
            maxDepth: 10,
            message: 'Windows locked: 2.4M+ doors selected at depth ≤10ft'
        },
        // At 12ft depth: Windows locked when 3M+ doors are selected
        '3M': {
            lockedDoors: ['3M_Patio_Doors_Sliders', '3_6M_Patio_Doors_Sliders', '3M_Bi-Fold_Doors', '4M_Bi-Fold_Doors', '5M_Bi-Fold_Doors', '3M_Transom_Bi-Fold_Doors', '4M_Transom_Bi-Fold_Doors', '5M_Transom_Bi-Fold_Doors'],
            maxDepth: 12,
            message: 'Windows locked: 3M+ doors selected at depth ≤12ft'
        },
        // At 14ft depth: Windows locked when 5M doors are selected
        '5M': {
            lockedDoors: ['5M_Bi-Fold_Doors', '5M_Transom_Bi-Fold_Doors'],
            maxDepth: 14,
            message: 'Windows locked: 5M doors selected at depth ≤14ft'
        },
        // Above 14ft depth: All windows unlocked
        'unlocked': {
            minDepth: 14,
            message: 'All windows unlocked at depth >14ft'
        }
    }
};

// Track current dimensions
let currentBuildingWidth = 16; // Default
let currentBuildingDepth = 10; // Default

// Enhanced updateWidth function
function updateWidth() {
    const w = parseFloat(widthEl.value);
    currentBuildingWidth = w;
    console.log(`🔄 Width updated to: ${w}ft`);

    // Update door availability for FRONT & BACK walls
    updateDoorAvailabilityForWalls(['front', 'back'], 'width');

    // Update window availability based on doors
    updateWindowAvailabilityForWalls(['front', 'back'], 'width');

    app.contentWindow.postMessage({
        type: 'WIDTH_UPDATE',
        width: w
    }, '*');
}

// Enhanced updateDepth function
function updateDepth() {
    const d = parseFloat(depthEl.value);
    currentBuildingDepth = d;
    console.log(`🔄 Depth updated to: ${d}ft`);

    // Update door availability for LEFT & RIGHT walls
    updateDoorAvailabilityForWalls(['left', 'right'], 'depth');

    // Update window availability based on doors
    updateWindowAvailabilityForWalls(['left', 'right'], 'depth');

    app.contentWindow.postMessage({
        type: 'DEPTH_UPDATE',
        depth: d
    }, '*');
}

// Get allowed doors based on wall type and dimension
function getAllowedDoors(wallType, dimensionType) {
    if (dimensionType === 'width') {
        // Front & Back walls use width rules
        if (currentBuildingWidth >= 16) {
            return DOOR_AVAILABILITY_WIDTH_RULES['16+'];
        } else if (currentBuildingWidth === 14) {
            return DOOR_AVAILABILITY_WIDTH_RULES['14'];
        } else if (currentBuildingWidth === 12) {
            return DOOR_AVAILABILITY_WIDTH_RULES['12'];
        } else {
            return DOOR_AVAILABILITY_WIDTH_RULES['8-10'];
        }
    } else {
        // Left & Right walls use depth rules
        if (currentBuildingDepth >= 12) {
            return DOOR_AVAILABILITY_DEPTH_RULES['12+'];
        } else if (currentBuildingDepth === 10) {
            return DOOR_AVAILABILITY_DEPTH_RULES['10'];
        } else {
            return DOOR_AVAILABILITY_DEPTH_RULES['6-8'];
        }
    }
}

// Check if windows should be locked based on selected doors and dimensions
function shouldLockWindows(wall, dimensionType) {
    const rules = WINDOW_AVAILABILITY_RULES[dimensionType];
    const currentDimension = dimensionType === 'width' ? currentBuildingWidth : currentBuildingDepth;

    // Get all selected doors on this wall
    const wallDoorSelects = document.querySelectorAll(`select.component-type[data-type="door"][data-wall="${wall}"]`);
    const selectedDoors = Array.from(wallDoorSelects).map(select => select.value);

    // Check each rule
    for (const [ruleName, rule] of Object.entries(rules)) {
        if (ruleName === 'unlocked') {
            if (currentDimension >= rule.minWidth) {
                return { locked: false, message: rule.message };
            }
            continue;
        }

        if (currentDimension <= rule.maxWidth || currentDimension <= rule.maxDepth) {
            const hasLockedDoor = selectedDoors.some(door => rule.lockedDoors.includes(door));
            if (hasLockedDoor) {
                return { locked: true, message: rule.message };
            }
        }
    }

    return { locked: false, message: 'Windows available' };
}

// Update door availability for specific walls
function updateDoorAvailabilityForWalls(walls, dimensionType) {
    walls.forEach(wall => {
        const allowedDoors = getAllowedDoors(wall, dimensionType);
        const wallDoorSelects = document.querySelectorAll(`select.component-type[data-type="door"][data-wall="${wall}"]`);

        console.log(`🎯 ${dimensionType.toUpperCase()} ${currentBuildingWidth}ft/${currentBuildingDepth}ft - ${wall} wall allowed doors:`, allowedDoors);

        wallDoorSelects.forEach(select => {
            const currentValue = select.value;

            // Update each option
            Array.from(select.options).forEach(option => {
                const isAllowed = allowedDoors.includes(option.value);
                option.disabled = !isAllowed;

                // Add visual indicator
                if (!isAllowed) {
                    option.style.color = '#ccc';
                    option.title = getRequirementMessage(option.value, dimensionType);
                } else {
                    option.style.color = '';
                    option.title = '';
                }
            });

            // If current selection is no longer allowed, find best alternative
            if (!allowedDoors.includes(currentValue)) {
                const bestAlternative = findBestAlternative(currentValue, allowedDoors);
                if (bestAlternative) {
                    select.value = bestAlternative;
                    console.log(`🔄 Auto-changed ${wall} wall door from ${currentValue} to ${bestAlternative}`);

                    // Trigger change event to update PlayCanvas
                    select.dispatchEvent(new Event('change', { bubbles: true }));

                    // Show notification
                    showNotification(
                        `${wall.charAt(0).toUpperCase() + wall.slice(1)} wall: Door changed to ${getDoorDisplayName(bestAlternative)}`,
                        'warning'
                    );
                }
            }
        });
    });
}

// Update window availability based on selected doors
function updateWindowAvailabilityForWalls(walls, dimensionType) {
    walls.forEach(wall => {
        const windowLockStatus = shouldLockWindows(wall, dimensionType);
        const wallWindowSections = document.querySelectorAll(`.wall-component-section[data-wall="${wall}"][data-type="window"]`);

        wallWindowSections.forEach(section => {
            const addButton = section.querySelector('.add-component-btn');
            const componentsList = section.querySelector('.components-list');
            const existingWindows = componentsList.querySelectorAll('.component-item');

            if (windowLockStatus.locked) {
                // Disable add button
                addButton.disabled = true;
                addButton.title = windowLockStatus.message;
                addButton.style.opacity = '0.5';
                addButton.style.cursor = 'not-allowed';

                // Remove existing windows
                existingWindows.forEach(window => {
                    const componentId = window.getAttribute('data-id');

                    // Send removal message to PlayCanvas
                    if (app && app.contentWindow) {
                        app.contentWindow.postMessage({
                            type: 'COMPONENT_REMOVE',
                            componentId: componentId,
                            componentType: 'window',
                            wall: wall
                        }, '*');
                    }

                    window.remove();
                    console.log(`🗑️ Removed window ${componentId} from ${wall} wall: ${windowLockStatus.message}`);
                });

                // Show notification if windows were removed
                if (existingWindows.length > 0) {
                    showNotification(`${wall.charAt(0).toUpperCase() + wall.slice(1)} wall: ${windowLockStatus.message}`, 'warning');
                }
            } else {
                // Enable add button
                addButton.disabled = false;
                addButton.title = '';
                addButton.style.opacity = '';
                addButton.style.cursor = '';
            }
        });
    });
}

// Enhanced addComponent function with DYNAMIC SLIDER RANGES
function addComponent(wall = 'front', componentType = 'door') {
    componentCounter++;
    const componentId = `${componentType}-${componentCounter}`;

    // Calculate position BEFORE creating HTML
    const defaultType = componentType === 'door' ? 'Single_Glazed_Door' : 'T1_Window';
    const calculatedPosition = findNextAvailablePosition(wall, getDoorWidthRequirement(defaultType));

    // Define options based on component type with wall-specific availability
    let optionsHTML = '';

    // Determine which dimension rules to use
    const dimensionType = (wall === 'front' || wall === 'back') ? 'width' : 'depth';
    const allowedDoors = getAllowedDoors(wall, dimensionType);

    if (componentType === 'door') {
        const doorOptions = [
            { value: "Single_Glazed_Door", text: "Single Glazed Door" },
            { value: "Single_Solid_Door", text: "Single Solid Door" },
            { value: "Single_Transom_Door", text: "Single Transom Door" },
            { value: "Single_Door_with_side_panel", text: "Single Door (with side panel)" },
            { value: "4ft_Double_Door", text: "4ft Double Door" },
            { value: "4ft_Transom_Double_Door", text: "4ft Transom Double Door" },
            { value: "5ft_Double_Door", text: "5ft Double Door" },
            { value: "5ft_Transom_Double_Door", text: "5ft Transom Double Door" },
            { value: "2_4M_Patio_Doors_Sliders", text: "2.4M Patio Doors (Sliders)" },
            { value: "3M_Patio_Doors_Sliders", text: "3M Patio Doors (Sliders)" },
            { value: "3_6M_Patio_Doors_Sliders", text: "3.6M Patio Doors (Sliders)" },
            { value: "3M_Bi-Fold_Doors", text: "3M Bi-Fold Doors" },
            { value: "4M_Bi-Fold_Doors", text: "4M Bi-Fold Doors" },
            { value: "5M_Bi-Fold_Doors", text: "5M Bi-Fold Doors" },
            { value: "3M_Transom_Bi-Fold_Doors", text: "3M Transom Bi-Fold Doors" },
            { value: "4M_Transom_Bi-Fold_Doors", text: "4M Transom Bi-Fold Doors" },
            { value: "5M_Transom_Bi-Fold_Doors", text: "5M Transom Bi-Fold Doors" }
        ];

        optionsHTML = doorOptions.map(option => {
            const isAllowed = allowedDoors.includes(option.value);
            const disabledAttr = isAllowed ? '' : 'disabled';
            const styleAttr = isAllowed ? '' : 'style="color: #ccc"';
            const titleAttr = isAllowed ? '' : `title="${getRequirementMessage(option.value, dimensionType)}"`;
            const selectedAttr = (option.value === 'Single_Solid_Door' && isAllowed) ? 'selected' : '';

            return `<option value="${option.value}" ${disabledAttr} ${styleAttr} ${titleAttr} ${selectedAttr}>${option.text}</option>`;
        }).join('');

    } else if (componentType === 'window') {
        // Check if windows are allowed on this wall
        const windowLockStatus = shouldLockWindows(wall, dimensionType);
        if (windowLockStatus.locked) {
            showNotification(`Cannot add window: ${windowLockStatus.message}`, 'error');
            return; // Don't add window if locked
        }

        // Window options
        optionsHTML = `
            <option value="T1_Window" selected>T1 Window</option>
            <option value="A1_Transom_Window">A1 Transom Window</option>
            <option value="T1_LEA_Window">T1 LEA Window</option>
            <option value="A1_LEA_Transom">A1 LEA Transom</option>
            <option value="T2_Window">T2 Window</option>
            <option value="A2_Transom_Window">A2 Transom Window</option>
            <option value="T2_LEA_Window">T2 LEA Window</option>
            <option value="A2_LEA_Transom_Window">A2 LEA Transom Window</option>
            <option value="T3_LEA_Window">T3 LEA Window</option>
            <option value="T8_Window">T8 Window</option>
            <option value="T8_LEA_Window">T8 LEA Window</option>
            <option value="T8_Full_Opening_Window">T8 Full Opening Window</option>
            <option value="T10_Window">T10 Window</option>
            <option value="T10_LEA_Window">T10 LEA Window</option>
            <option value="A10_Transom_Window">A10 Transom Window</option>
            <option value="A10_LEA_Transom_Window">A10 LEA Transom Window</option>
            <option value="T12_Window">T12 Window</option>
            <option value="T12_LEA_Window">T12 LEA Window</option>
            <option value="T12_Full_Opening_Window">T12 Full Opening Window</option>
            <option value="Top_Hopper_Window">Top Hopper Window</option>
            <option value="T15_Window">T15 Window</option>
            <option value="T15_LEA_Window">T15 LEA Window</option>
            <option value="A15_Transom_Window">A15 Transom Window</option>
            <option value="A15_LEA_Transom_Window">A15 LEA Transom Window</option>
        `;
    }

    // 🎯 DYNAMIC RANGE CALCULATION
    const doorWidth = getDoorWidthRequirement(defaultType) * 50;
    const dynamicRange = calculateDynamicRange(wall, componentId, calculatedPosition, doorWidth);

    // 🎯 USE DYNAMIC RANGE IN THE HTML TEMPLATE
    const componentHTML = `
    <div class="component-item" data-id="${componentId}" data-wall="${wall}" data-type="${componentType}">
      <div class="item-controls">
        <div class="control-group type-control-group">
          <select class="component-type" data-id="${componentId}" data-wall="${wall}" data-type="${componentType}">
            ${optionsHTML}
          </select>
          <button class="btn danger remove-btn" data-id="${componentId}" data-wall="${wall}" data-type="${componentType}">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="16" height="16">
              <path d="M296 432h16a8 8 0 0 0 8-8V152a8 8 0 0 0-8-8h-16a8 8 0 0 0-8 8v272a8 8 0 0 0 8 8zm-160 0h16a8 8 0 0 0 8-8V152a8 8 0 0 0-8-8h-16a8 8 0 0 0-8 8v272a8 8 0 0 0 8 8zM440 64H336l-33.6-44.8A48 48 0 0 0 264 0h-80a48 48 0 0 0-38.4 19.2L112 64H8a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h24v368a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V96h24a8 8 0 0 0 8-8V72a8 8 0 0 0-8-8zM171.2 38.4A16.1 16.1 0 0 1 184 32h80a16.1 16.1 0 0 1 12.8 6.4L296 64H152zM384 464a16 16 0 0 1-16 16H80a16 16 0 0 1-16-16V96h320zm-168-32h16a8 8 0 0 0 8-8V152a8 8 0 0 0-8-8h-16a8 8 0 0 0-8 8v272a8 8 0 0 0 8 8z"></path>
            </svg>
          </button>
        </div>
        <div class="control-group">
          <label>Position:</label>
          
          <input type="range" class="component-pos" data-id="${componentId}" data-wall="${wall}" data-type="${componentType}" 
                 value="${calculatedPosition}" 
                 min="${dynamicRange.min}" 
                 max="${dynamicRange.max}" 
                 step="1">
        </div>
      </div>
    </div>
  `;

    // Add to the specific wall and type components list
    document.querySelector(`.components-list[data-wall="${wall}"][data-type="${componentType}"]`).insertAdjacentHTML('beforeend', componentHTML);

    // 🎯 UPDATE ALL DOOR RANGES AFTER ADDING NEW DOOR
    if (componentType === 'door') {
        updateAllDoorRanges(wall);
    }

    // Send message to PlayCanvas with the calculated position
    app.contentWindow.postMessage({
        type: 'COMPONENT_ADD',
        componentId: componentId,
        componentType: componentType,
        specificType: defaultType,
        position: calculatedPosition,
        wall: wall
    }, '*');

    console.log(`Added ${componentType} ${componentId} to ${wall} wall at position ${calculatedPosition} (range: ${dynamicRange.min}-${dynamicRange.max})`);

    // Update window availability when a door is added/changed
    if (componentType === 'door') {
        const dimensionType = (wall === 'front' || wall === 'back') ? 'width' : 'depth';
        updateWindowAvailabilityForWalls([wall], dimensionType);
    }
}

// Add event listener for door changes to update window availability
document.addEventListener('change', function (e) {
    if (e.target.classList.contains('component-type') && e.target.getAttribute('data-type') === 'door') {
        const wall = e.target.getAttribute('data-wall');
        const dimensionType = (wall === 'front' || wall === 'back') ? 'width' : 'depth';
        updateWindowAvailabilityForWalls([wall], dimensionType);
    }
});


// Helper functions
function findBestAlternative(currentDoor, allowedDoors) {
    // Priority list for fallback doors (most preferred first)
    const priorityDoors = [
        'Single_Solid_Door',
        'Single_Glazed_Door',
        'Single_Transom_Door',
        'Single_Door_with_side_panel',
        '4ft_Double_Door',
        '4ft_Transom_Double_Door',
        '5ft_Double_Door',
        '5ft_Transom_Double_Door',
        '2_4M_Patio_Doors_Sliders',
        '3M_Patio_Doors_Sliders'
    ];

    // Try to find a door with similar characteristics first
    for (const door of priorityDoors) {
        if (allowedDoors.includes(door)) {
            return door;
        }
    }

    // If no priority door is available, return the first allowed door
    return allowedDoors.length > 0 ? allowedDoors[0] : null;
}

function getDoorDisplayName(doorType) {
    const nameMap = {
        'Single_Glazed_Door': 'Single Glazed Door',
        'Single_Solid_Door': 'Single Solid Door',
        'Single_Transom_Door': 'Single Transom Door',
        'Single_Door_with_side_panel': 'Single Door with Side Panel',
        '4ft_Double_Door': '4ft Double Door',
        '4ft_Transom_Double_Door': '4ft Transom Double Door',
        '5ft_Double_Door': '5ft Double Door',
        '5ft_Transom_Double_Door': '5ft Transom Double Door',
        '2_4M_Patio_Doors_Sliders': '2.4M Patio Doors',
        '3M_Patio_Doors_Sliders': '3M Patio Doors',
        '3_6M_Patio_Doors_Sliders': '3.6M Patio Doors',
        '3M_Bi-Fold_Doors': '3M Bi-Fold Doors',
        '4M_Bi-Fold_Doors': '4M Bi-Fold Doors',
        '5M_Bi-Fold_Doors': '5M Bi-Fold Doors',
        '3M_Transom_Bi-Fold_Doors': '3M Transom Bi-Fold Doors',
        '4M_Transom_Bi-Fold_Doors': '4M Transom Bi-Fold Doors',
        '5M_Transom_Bi-Fold_Doors': '5M Transom Bi-Fold Doors'
    };

    return nameMap[doorType] || doorType;
}


function getRequirementMessage(doorType, dimensionType) {
    const requiredSize = getRequiredSize(doorType, dimensionType);
    const dimensionName = dimensionType === 'width' ? 'width' : 'depth';

    if (doorType.includes('Bi-Fold') || doorType.includes('3_6M')) {
        return `Requires ${dimensionName} ${requiredSize}+ ft`;
    }
    if (doorType.includes('3M_Patio') || doorType.includes('3M_Bi-Fold')) {
        return `Requires ${dimensionName} ${requiredSize}+ ft`;
    }
    if (doorType.includes('2_4M_Patio')) {
        return `Requires ${dimensionName} ${requiredSize}+ ft`;
    }
    return `Requires ${dimensionName} ${requiredSize}+ ft`;
}

function getRequiredSize(doorType, dimensionType) {
    if (dimensionType === 'width') {
        // Width requirements
        if (doorType.includes('Bi-Fold') || doorType.includes('3_6M')) return 16;
        if (doorType.includes('3M_Patio') || doorType.includes('3M_Bi-Fold')) return 14;
        if (doorType.includes('2_4M_Patio')) return 12;
        return 8;
    } else {
        // Depth requirements
        if (doorType.includes('Bi-Fold') || doorType.includes('3_6M')) return 12;
        if (doorType.includes('3M_Patio') || doorType.includes('3M_Bi-Fold')) return 10;
        if (doorType.includes('2_4M_Patio')) return 10;
        return 6;
    }
}


// Utility function to check if a door is a large door type
function isLargeDoor(doorType) {
    const largeDoors = [
        '2_4M_Patio_Doors_Sliders',
        '3M_Patio_Doors_Sliders',
        '3_6M_Patio_Doors_Sliders',
        '3M_Bi-Fold_Doors',
        '4M_Bi-Fold_Doors',
        '5M_Bi-Fold_Doors',
        '3M_Transom_Bi-Fold_Doors',
        '4M_Transom_Bi-Fold_Doors',
        '5M_Transom_Bi-Fold_Doors'
    ];
    return largeDoors.includes(doorType);
}

function getDoorWidthRequirement(doorType) {
    const widthRequirements = {
        'Single_Glazed_Door': 3,
        'Single_Solid_Door': 3,
        'Single_Transom_Door': 3,
        'Single_Door_with_side_panel': 4,
        '4ft_Double_Door': 4,
        '4ft_Transom_Double_Door': 4,
        '5ft_Double_Door': 5,
        '5ft_Transom_Double_Door': 5,
        '2_4M_Patio_Doors_Sliders': 8, // 2.4M ≈ 8ft
        '3M_Patio_Doors_Sliders': 10,  // 3M ≈ 10ft
        '3_6M_Patio_Doors_Sliders': 12, // 3.6M ≈ 12ft
        '3M_Bi-Fold_Doors': 10,
        '4M_Bi-Fold_Doors': 13, // 4M ≈ 13ft
        '5M_Bi-Fold_Doors': 16, // 5M ≈ 16ft
        '3M_Transom_Bi-Fold_Doors': 10,
        '4M_Transom_Bi-Fold_Doors': 13,
        '5M_Transom_Bi-Fold_Doors': 16
    };

    return widthRequirements[doorType] || 3; // Default to 3ft if not found
}


// Initialize on load
document.addEventListener('DOMContentLoaded', function () {
    currentBuildingWidth = parseFloat(widthEl.value);
    currentBuildingDepth = parseFloat(depthEl.value);

    // Initialize all walls
    updateDoorAvailabilityForWalls(['front', 'back'], 'width');
    updateDoorAvailabilityForWalls(['left', 'right'], 'depth');
    updateWindowAvailabilityForWalls(['front', 'back'], 'width');
    updateWindowAvailabilityForWalls(['left', 'right'], 'depth');

    const frontWallBtn = document.querySelector('.wall-select-btn[data-wall="front"]');
    if (frontWallBtn) {
        frontWallBtn.classList.add('selected');
    }
});

// Update your existing event listeners
widthEl.addEventListener('change', updateWidth);
depthEl.addEventListener('change', updateDepth);


function getDoorsOnWall(wallId) {
    const doors = [];
    const doorElements = document.querySelectorAll(`.component-item[data-type="door"][data-wall="${wallId}"]`);

    doorElements.forEach(doorEl => {
        const slider = doorEl.querySelector('.component-pos');
        const select = doorEl.querySelector('.component-type');

        if (slider && select) {
            doors.push({
                id: doorEl.getAttribute('data-id'),
                position: parseFloat(slider.value),
                width: getDoorWidthRequirement(select.value) * 50 // Convert to pixels
            });
        }
    });

    return doors;
}


// When positioning a door, check against other doors on the same wall
function canPlaceDoor(wallId, newPosition, doorWidth, doorIdToIgnore = null) {
    const existingDoors = getDoorsOnWall(wallId);
    const buffer = 10; // 10px minimum gap

    for (const door of existingDoors) {
        if (door.id === doorIdToIgnore) continue;

        const doorLeft = door.position - (door.width / 2);
        const doorRight = door.position + (door.width / 2);
        const newLeft = newPosition - (doorWidth / 2);
        const newRight = newPosition + (doorWidth / 2);

        // Check for overlap
        if (newLeft < doorRight + buffer && newRight > doorLeft - buffer) {
            return false; // Overlap detected
        }
    }
    return true;
}

function findNextAvailablePosition(wallId, doorWidthFeet) {
    const existingDoors = Array.from(document.querySelectorAll(`.component-item[data-type="door"][data-wall="${wallId}"]`));

    if (existingDoors.length === 0) {
        return 400; // Center for first door
    }

    const doorWidthPixels = doorWidthFeet * 50;
    const buffer = 100;
    const maxPosition = 800;
    const minPosition = -500;
    const totalWallSpace = maxPosition - minPosition;

    // Get all current positions
    const positions = existingDoors.map(door => {
        const slider = door.querySelector('.component-pos');
        return slider ? parseFloat(slider.value) : 0;
    }).sort((a, b) => a - b);

    // Strategy 1: Try to find gap between existing doors
    for (let i = 0; i < positions.length - 1; i++) {
        const gap = positions[i + 1] - positions[i];
        const requiredSpace = doorWidthPixels + buffer;

        if (gap > requiredSpace * 1.5) {
            // Found a gap big enough - place in the middle
            const gapCenter = positions[i] + (gap / 2);
            console.log(`🎯 Placing door in gap between ${positions[i]} and ${positions[i + 1]}`);
            return gapCenter;
        }
    }

    // Strategy 2: Place after the last door
    const lastPosition = positions[positions.length - 1];
    let suggestedPosition = lastPosition + doorWidthPixels + buffer;

    // If we're running out of space, try placing before the first door
    if (suggestedPosition > maxPosition - doorWidthPixels) {
        const firstPosition = positions[0];
        suggestedPosition = firstPosition - doorWidthPixels - buffer;

        if (suggestedPosition >= minPosition + doorWidthPixels / 2) {
            console.log(`🎯 Placing door before first door at ${suggestedPosition}`);
            return Math.max(suggestedPosition, minPosition + doorWidthPixels / 2);
        }
    }

    // Strategy 3: Even distribution across wall
    const totalDoors = existingDoors.length + 1;
    const spacing = totalWallSpace / totalDoors;
    const evenlySpacedPosition = minPosition + (spacing * totalDoors) - (spacing / 2);

    console.log(`🎯 Even distribution: ${evenlySpacedPosition} (${totalDoors} doors)`);
    return Math.min(Math.max(evenlySpacedPosition, minPosition + doorWidthPixels / 2), maxPosition - doorWidthPixels / 2);
}







// Calculate dynamic min/max range for a door slider
function calculateDynamicRange(wallId, doorId, currentPosition, doorWidth) {
    const existingDoors = getDoorsOnWall(wallId);
    
    // Filter out the current door and sort by position
    const otherDoors = existingDoors
        .filter(door => door.id !== doorId)
        .sort((a, b) => a.position - b.position);

    let minLimit = -500;
    let maxLimit = 800;

    // Find the closest door to the left and right
    const leftDoors = otherDoors.filter(door => door.position < currentPosition);
    const rightDoors = otherDoors.filter(door => door.position > currentPosition);

    // Calculate min limit (right edge of nearest left door + buffer)
    if (leftDoors.length > 0) {
        const nearestLeft = leftDoors[leftDoors.length - 1];
        const leftDoorRightEdge = nearestLeft.position + (nearestLeft.width / 2);
        minLimit = leftDoorRightEdge + (doorWidth / 2) + 10;
    }

    // Calculate max limit (left edge of nearest right door - buffer)
    if (rightDoors.length > 0) {
        const nearestRight = rightDoors[0];
        const rightDoorLeftEdge = nearestRight.position - (nearestRight.width / 2);
        maxLimit = rightDoorLeftEdge - (doorWidth / 2) - 10;
    }

    // Ensure limits are reasonable
    minLimit = Math.max(-500, Math.min(minLimit, 790));
    maxLimit = Math.min(800, Math.max(maxLimit, -490));

    // If limits are invalid (min > max), use calculated position as both
    if (minLimit > maxLimit) {
        minLimit = currentPosition - 10;
        maxLimit = currentPosition + 10;
    }

    return { min: Math.round(minLimit), max: Math.round(maxLimit) };
}


// Update ALL door ranges on a wall when any door moves
function updateAllDoorRanges(wallId) {
    const doorElements = document.querySelectorAll(`.component-item[data-type="door"][data-wall="${wallId}"]`);
    
    doorElements.forEach(doorEl => {
        const slider = doorEl.querySelector('.component-pos');
        const select = doorEl.querySelector('.component-type');
        const componentId = doorEl.getAttribute('data-id');
        const currentPosition = parseFloat(slider.value);
        
        if (slider && select) {
            const doorType = select.value;
            const doorWidth = getDoorWidthRequirement(doorType) * 50;
            const newRange = calculateDynamicRange(wallId, componentId, currentPosition, doorWidth);
            
            // Update the slider attributes
            slider.min = newRange.min;
            slider.max = newRange.max;
            
            // Ensure current position is within new range
            if (currentPosition < newRange.min) {
                slider.value = newRange.min;
                console.log(`🔄 Adjusted ${componentId} position from ${currentPosition} to ${newRange.min}`);
            } else if (currentPosition > newRange.max) {
                slider.value = newRange.max;
                console.log(`🔄 Adjusted ${componentId} position from ${currentPosition} to ${newRange.max}`);
            }
            
            console.log(`🎯 ${componentId} range: ${newRange.min}-${newRange.max}, position: ${slider.value}`);
        }
    });
}



// Handle slider inputs WITH DYNAMIC RANGE UPDATES
document.addEventListener('input', (e) => {
    if (e.target.classList.contains('component-pos')) {
        const slider = e.target;
        const componentId = slider.dataset.id;
        const wall = slider.dataset.wall;
        const componentType = slider.dataset.type;
        const position = parseFloat(slider.value);

        console.log(`Component ${componentId} (${componentType}) on wall ${wall} position:`, position);

        // 🎯 UPDATE ALL DOOR RANGES WHEN ANY DOOR MOVES
        if (componentType === 'door') {
            updateAllDoorRanges(wall);
        }

        app.contentWindow.postMessage({
            type: 'COMPONENT_POSITION_CHANGE',
            componentId: componentId,
            componentType: componentType,
            position: position,
            wall: wall
        }, '*');
    }
});