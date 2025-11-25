// close_ui button functionality
const closeBtn = document.getElementById('close_ui');
closeBtn.addEventListener('click', () => {
    const gardenUI = document.querySelector('.garden-ui');
    if (gardenUI.style.display === 'none') {
        gardenUI.style.display = 'block';
        closeBtn.textContent = '😑';
    }
    else {
        gardenUI.style.display = 'none';
        closeBtn.textContent = '👀';
    }
});


const app = document.getElementById('app');

// Main event delegation for all UI interactions
document.addEventListener('click', (e) => {
    // Handle trim buttons (cladding, colors, etc.)
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

    // Handle wall selection
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
        const componentType = button.dataset.type;
        addComponent(wall, componentType);
    }

    // Handle section toggles
    if (e.target.classList.contains('section-header') || e.target.closest('.section-header')) {
        const header = e.target.classList.contains('section-header') ? e.target : e.target.closest('.section-header');
        header.parentElement.classList.toggle('open');
    }
});

// Handle dynamic inputs
document.addEventListener('change', (e) => {
    // Handle component type changes
    if (e.target.classList.contains('component-type')) {
        const select = e.target;
        const componentId = select.dataset.id;
        const wall = select.dataset.wall;
        const componentType = select.dataset.type;
        const specificType = select.value;

        console.log(`Component ${componentId} (${componentType}) on wall ${wall} type changed to:`, specificType);

        app.contentWindow.postMessage({
            type: 'COMPONENT_TYPE_CHANGE',
            componentId: componentId,
            componentType: componentType,
            specificType: specificType,
            wall: wall
        }, '*');
    }
});

// Handle slider inputs
document.addEventListener('input', (e) => {
    // Handle position sliders
    if (e.target.classList.contains('component-pos')) {
        const slider = e.target;
        const componentId = slider.dataset.id;
        const wall = slider.dataset.wall;
        const componentType = slider.dataset.type;
        const position = parseFloat(slider.value);

        console.log(`Component ${componentId} (${componentType}) on wall ${wall} position:`, position);

        app.contentWindow.postMessage({
            type: 'COMPONENT_POSITION_CHANGE',
            componentId: componentId,
            componentType: componentType,
            position: position,
            wall: wall
        }, '*');
    }
});

// Component management
let componentCounter = 0;

// Add component function for both doors and windows
function addComponent(wall = 'front', componentType = 'door') {
    componentCounter++;
    const componentId = `${componentType}-${componentCounter}`;

    // Define options based on component type
    let optionsHTML = '';

    if (componentType === 'door') {
        optionsHTML = `
            <option value="Single_Glazed_Door">Single Glazed Door</option>
            <option value="Single_Solid_Door">Single Solid Door</option>
            <option value="Single_Transom_Door">Single Transom Door</option>
            <option value="Single_Door_with_side_panel">Single Door (with side panel)</option>

            <option value="4ft_Double_Door" selected>4ft Double Door</option>
            <option value="4ft_Transom_Double_Door">4ft Transom Double Door</option>

            <option value="5ft_Double_Door">5ft Double Door</option>
            <option value="5ft_Transom_Double_Door">5ft Transom Double Door</option>

            <option value="2_4M_Patio_Doors_Sliders">2.4M Patio Doors (Sliders)</option>
            <option value="3M_Patio_Doors_Sliders">3M Patio Doors (Sliders)</option>
            <option value="3_6M_Patio_Doors_Sliders">3.6M Patio Doors (Sliders)</option>

            <option value="3M_Bi-Fold_Doors">3M Bi-Fold Doors</option>
            <option value="4M_Bi-Fold_Doors">4M Bi-Fold Doors</option>
            <option value="5M_Bi-Fold_Doors">5M Bi-Fold Doors</option>

            <option value="3M_Transom_Bi-Fold_Doors">3M Transom Bi-Fold Doors</option>
            <option value="4M_Transom_Bi-Fold_Doors">4M Transom Bi-Fold Doors</option>
            <option value="5M_Transom_Bi-Fold_Doors">5M Transom Bi-Fold Doors</option>
        `;
    } else if (componentType === 'window') {
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
          <input type="range" class="component-pos" data-id="${componentId}" data-wall="${wall}" data-type="${componentType}" value="150" min="-500" max="800" step="1">
        </div>
      </div>
    </div>
  `;

    // Add to the specific wall and type components list
    document.querySelector(`.components-list[data-wall="${wall}"][data-type="${componentType}"]`).insertAdjacentHTML('beforeend', componentHTML);

    // Set default selection
    const defaultType = componentType === 'door' ? '4ft_Double_Door' : 'T1_Window';
    const newComponent = document.querySelector(`[data-id="${componentId}"]`);
    newComponent.querySelector('.component-type').value = defaultType;

    // Send message to PlayCanvas
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

// Handle remove buttons dynamically
document.addEventListener('click', (e) => {
    if (e.target.closest('.remove-btn')) {
        const button = e.target.closest('.remove-btn');
        const componentId = button.dataset.id;
        const wall = button.dataset.wall;
        const componentType = button.dataset.type;
        const component = document.querySelector(`[data-id="${componentId}"]`);

        if (component) {
            componentCounter--;
            app.contentWindow.postMessage({
                type: 'COMPONENT_REMOVE',
                componentId: componentId,
                componentType: componentType,
                wall: wall
            }, '*');

            component.remove();
            console.log(`Removed ${componentType} ${componentId} from ${wall} wall`);
        }
    }
});

// REMOVED: Default door initialization - no automatic doors

// Initialize wall selection to front
document.addEventListener('DOMContentLoaded', function () {
    const frontWallBtn = document.querySelector('.wall-select-btn[data-wall="front"]');
    if (frontWallBtn) {
        frontWallBtn.classList.add('selected');
    }
    console.log('Doors & Windows ready - no default components');
});

// Keep original working size code
const widthEl = document.getElementById('width');
const depthEl = document.getElementById('depth');

function updateWidth() {
    const w = parseFloat(widthEl.value);
    console.log("Width", widthEl.value);
    app.contentWindow.postMessage({
        type: 'WIDTH_UPDATE',
        width: w
    }, '*');
}

function updateDepth() {
    const d = parseFloat(depthEl.value);
    console.log("Depth", depthEl.value);
    app.contentWindow.postMessage({
        type: 'DEPTH_UPDATE',
        depth: d
    }, '*');
}

widthEl.addEventListener('change', updateWidth);
depthEl.addEventListener('change', updateDepth);


let dnw = document.getElementById('dnw');

dnw.addEventListener('click', () => {
    let sizeList = document.getElementsByClassName('size_section');
    for (let el of sizeList) {
        el.style.display = 'none';
    }

    let dwList = document.getElementsByClassName('door_window_section');
    for (let el of dwList) {
        el.style.display = 'block';
    }
});

let adjust_size = document.getElementById('adjust_size');

adjust_size.addEventListener('click', () => {
    let sizeList = document.getElementsByClassName('size_section');
    for (let el of sizeList) {
        el.style.display = 'block';
    }

    let dwList = document.getElementsByClassName('door_window_section');
    for (let el of dwList) {
        el.style.display = 'none';
    }

    // Reset all doors and windows
    resetAllDoorsAndWindows();
});

// Function to reset all doors and windows
function resetAllDoorsAndWindows() {
    console.log('🔄 Resetting all doors and windows...');

    // Get all component items (doors and windows)
    const allComponents = document.querySelectorAll('.component-item');

    // Remove each component from UI and send removal message to PlayCanvas
    allComponents.forEach(component => {
        const componentId = component.getAttribute('data-id');
        const componentType = component.getAttribute('data-type');
        const wall = component.getAttribute('data-wall');

        // Send removal message to PlayCanvas
        if (app && app.contentWindow) {
            app.contentWindow.postMessage({
                type: 'COMPONENT_REMOVE',
                componentId: componentId,
                componentType: componentType,
                wall: wall
            }, '*');
        }

        console.log(`🗑️ Removed ${componentType} ${componentId} from ${wall} wall`);
    });

    // Clear all components lists
    const componentsLists = document.querySelectorAll('.components-list');
    componentsLists.forEach(list => {
        list.innerHTML = '';
    });

    // Reset component counter
    componentCounter = 0;

    // Show notification
    showNotification('All doors and windows have been reset', 'info');
}
