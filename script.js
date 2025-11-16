const app = document.getElementById('app');

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('trim-btn')) {
        const button = e.target;
        const messageType = button.dataset.messageType;
        const value = button.dataset.value;

        console.log(`clicked on ${messageType}`);

        app.contentWindow.postMessage({
            type: messageType,
            value: value
        }, '*');
    }
});




let componentCounter = 0;
let currentWall = 'front';

// Wall selection (updated to show both doors and windows for selected wall)
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('wall-select-btn')) {
        const button = e.target;
        const wall = button.dataset.wall;

        // Update wall selection
        document.querySelectorAll('.wall-select-btn').forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');

        // Show/hide wall sections for BOTH doors and windows
        document.querySelectorAll('.wall-component-section').forEach(section => {
            section.style.display = 'none';
        });

        // Show doors and windows for selected wall
        document.querySelectorAll(`.wall-component-section[data-wall="${wall}"]`).forEach(section => {
            section.style.display = 'block';
        });

        currentWall = wall;
        console.log(`Selected wall: ${wall}`);

        app.contentWindow.postMessage({
            type: 'WALL_SELECT',
            wall: wall
        }, '*');
    }

    // Add component (door or window) to specific wall
    if (e.target.classList.contains('add-component-btn')) {
        const button = e.target;
        const wall = button.dataset.wall;
        const componentType = button.dataset.type; // 'door' or 'window'
        addComponent(wall, componentType);
    }
});

// Updated addComponent function to handle both doors and windows
function addComponent(wall = 'front', componentType = 'door', specificType = '') {
    componentCounter++;
    const componentId = `${componentType}-${componentCounter}`;

    // Define options based on component type
    let optionsHTML = '';

    if (componentType === 'door') {
        optionsHTML = `
        <option value="Single_Glazed_Door">Single Glazed Door</option>
        <option value="Single_Solid_Door">Single Solid Door</option>
        <option value="Single_Transom_Door">Single Transom Door</option>
        <option value="Single_Door_With_Side_Panel">Single Door (with side panel)</option>

        <option value="Double_Door_4ft">4ft Double Door</option>
        <option value="Transom_Double_Door_4ft">4ft Transom Double Door</option>

        <option value="Double_Door_5ft">5ft Double Door</option>
        <option value="Transom_Double_Door_5ft">5ft Transom Double Door</option>

        <option value="Patio_Sliders_2_4m">2.4M Patio Doors (Sliders)</option>
        <option value="Patio_Sliders_3m">3M Patio Doors (Sliders)</option>
        <option value="Patio_Sliders_3_6m">3.6M Patio Doors (Sliders)</option>

        <option value="BiFold_3m">3M Bi-Fold Doors</option>
        <option value="BiFold_4m">4M Bi-Fold Doors</option>
        <option value="BiFold_5m">5M Bi-Fold Doors</option>

        <option value="Transom_BiFold_3m">3M Transom Bi-Fold Doors</option>
        <option value="Transom_BiFold_4m">4M Transom Bi-Fold Doors</option>
        <option value="Transom_BiFold_5m">5M Transom Bi-Fold Doors</option>
    `;
    }
    else if (componentType === 'window') {
        optionsHTML = `
        <option value="T1_Window">T1 Window</option>
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
          <input type="range" class="component-pos" data-id="${componentId}" data-wall="${wall}" data-type="${componentType}" value="0" min="-7.5" max="7.5" step="0.25">
        </div>
      </div>
    </div>
  `;

    // Add to the specific wall and type components list
    document.querySelector(`.components-list[data-wall="${wall}"][data-type="${componentType}"]`).insertAdjacentHTML('beforeend', componentHTML);
    attachComponentEvents(componentId, wall, componentType);

    // Send message to PlayCanvas
    const defaultType = componentType === 'door' ? 'Double_Doors_4ft' : 'Window_Medium';
    app.contentWindow.postMessage({
        type: 'COMPONENT_ADD',
        componentId: componentId,
        componentType: componentType, // 'door' or 'window'
        specificType: defaultType, // specific door/window type
        position: 0,
        wall: wall
    }, '*');
}

// Update attachComponentEvents to include component type
function attachComponentEvents(componentId, wall, componentType) {
    const component = document.querySelector(`[data-id="${componentId}"]`);
    if (!component) return;

    // Type change
    component.querySelector('.component-type').addEventListener('change', function () {
        const specificType = this.value;
        console.log(`Component ${componentId} (${componentType}) on wall ${wall} type changed to:`, specificType);

        app.contentWindow.postMessage({
            type: 'COMPONENT_TYPE_CHANGE',
            componentId: componentId,
            componentType: componentType,
            specificType: specificType,
            wall: wall
        }, '*');
    });

    // Position change
    component.querySelector('.component-pos').addEventListener('input', function () {
        const position = parseFloat(this.value);
        console.log(`Component ${componentId} (${componentType}) on wall ${wall} position:`, position);

        app.contentWindow.postMessage({
            type: 'COMPONENT_POSITION_CHANGE',
            componentId: componentId,
            componentType: componentType,
            position: position,
            wall: wall
        }, '*');
    });

    // Remove button
    component.querySelector('.remove-btn').addEventListener('click', function () {
        componentCounter--;
        app.contentWindow.postMessage({
            type: 'COMPONENT_REMOVE',
            componentId: componentId,
            componentType: componentType,
            wall: wall
        }, '*');

        component.remove();
    });
}

// Initialize the first door component
document.addEventListener('DOMContentLoaded', function () {
    const firstDoor = document.querySelector('.component-item[data-id="door-0"]');
    if (firstDoor) {
        const wall = firstDoor.dataset.wall;
        const type = firstDoor.dataset.type;
        attachComponentEvents('door-0', wall, type);
        componentCounter = 1;
    }
});









// Initialize add button
document.getElementById('add-door-component')?.addEventListener('click', () => {
    componentCounter <= 3 ? addDoorComponent() : alert("Maximum of 5 door components reached.");
});

// Attach events to existing components on load
document.querySelectorAll('.component-item').forEach(component => {
    const componentId = component.dataset.id;
    if (componentId) {
        attachComponentEvents(componentId);
    }
});



document.querySelectorAll('.section-header').forEach(header => {
    header.addEventListener('click', () => header.parentElement.classList.toggle('open'));
});

const widthEl = document.getElementById('width');
const depthEl = document.getElementById('depth');

function updateWidth() {
    const w = parseFloat(widthEl.value);
    const width = document.getElementById('width');
    console.log("Width", width.value);
    app.contentWindow.postMessage({
        type: 'WIDTH_UPDATE',
        width: w
    }, '*');
}

function updateDepth() {
    const d = parseFloat(depthEl.value);
    const depth = document.getElementById('depth');
    console.log("Depth", depth.value);
    app.contentWindow.postMessage({
        type: 'DEPTH_UPDATE',
        depth: d
    }, '*');
}

widthEl.addEventListener('change', updateWidth);
depthEl.addEventListener('change', updateDepth);


document.querySelectorAll('.tile-grid .tile').forEach(tile => {
    tile.addEventListener('click', () => {
        const grid = tile.parentElement;
        grid.querySelectorAll('.tile').forEach(t => t.classList.remove('active'));
        tile.classList.add('active');
    });
});

document.querySelectorAll('.v-list .v-list-item').forEach(item => {
    item.addEventListener('click', () => {
        const list = item.parentElement;
        list.querySelectorAll('.v-list-item').forEach(i => i.classList.remove('selected'));
        item.classList.add('selected');

        const container = list.closest('.list-container');
        if (container) container.dataset.selected = item.dataset.value || '';

        console.log('Selected item:', item.dataset.value);
    });
});


// Initialize the first door component on page load
// document.addEventListener('DOMContentLoaded', function () {
//     const firstDoor = document.querySelector('.component-item[data-id="door-0"]');
//     if (firstDoor) {
//         attachComponentEvents('door-0');
//         componentCounter = 1; // Set counter to 1 since we already have one door
//     }
// });

