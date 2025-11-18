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
        '5M_Bi-Fold_Doors',
        '3M_Transom_Bi-Fold_Doors',
        '4M_Transom_Bi-Fold_Doors',
        '5M_Transom_Bi-Fold_Doors'
    ]
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

// Get requirement message based on dimension type
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

// Get required size for a door based on dimension type
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

// Enhanced addComponent function with wall-specific availability
function addComponent(wall = 'front', componentType = 'door') {
    componentCounter++;
    const componentId = `${componentType}-${componentCounter}`;

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
            const selectedAttr = (option.value === '4ft_Double_Door' && isAllowed) ? 'selected' : '';

            return `<option value="${option.value}" ${disabledAttr} ${styleAttr} ${titleAttr} ${selectedAttr}>${option.text}</option>`;
        }).join('');

    } else if (componentType === 'window') {
        // Window options remain unchanged
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

    // Rest of the component HTML (same as before)
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
          <input type="range" class="component-pos" data-id="${componentId}" data-wall="${wall}" data-type="${componentType}" value="0" min="-500" max="500" step="1">
        </div>
      </div>
    </div>
  `;

    // Add to the specific wall and type components list
    document.querySelector(`.components-list[data-wall="${wall}"][data-type="${componentType}"]`).insertAdjacentHTML('beforeend', componentHTML);

    // Send message to PlayCanvas
    const defaultType = componentType === 'door' ? '4ft_Double_Door' : 'T1_Window';
    app.contentWindow.postMessage({
        type: 'COMPONENT_ADD',
        componentId: componentId,
        componentType: componentType,
        specificType: defaultType,
        position: 0,
        wall: wall
    }, '*');

    console.log(`Added ${componentType} ${componentId} to ${wall} wall`);
}

// Keep the helper functions (findBestAlternative, getDoorDisplayName, showNotification) from previous code

// Initialize on load
document.addEventListener('DOMContentLoaded', function () {
    currentBuildingWidth = parseFloat(widthEl.value);
    currentBuildingDepth = parseFloat(depthEl.value);

    // Initialize all walls
    updateDoorAvailabilityForWalls(['front', 'back'], 'width');
    updateDoorAvailabilityForWalls(['left', 'right'], 'depth');

    const frontWallBtn = document.querySelector('.wall-select-btn[data-wall="front"]');
    if (frontWallBtn) {
        frontWallBtn.classList.add('selected');
    }
});

// Update your existing event listeners
widthEl.addEventListener('change', updateWidth);
depthEl.addEventListener('change', updateDepth);