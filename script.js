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



// Add door component functionality
let componentCounter = 0;



function addDoorComponent(type = 'Double_Doors_4ft') {
    componentCounter++;
    const componentId = `door-${componentCounter}`;

    const componentHTML = `
    <div class="component-item" data-id="${componentId}">
      <div class="item-controls">
        <div class="control-group type-control-group">
          <select class="component-type" data-id="${componentId}">
            <option value="Single_Door">Single Door</option>
            <option value="Double_Doors_5ft">5' Double Doors</option>
            <option value="Patio_Sliders_2.4m">Patio Slider 2.4m</option>
            <option value="Patio_Sliders_3m">Patio Slider 3m</option>
            <option value="Patio_Sliders_3.6m">Patio Slider 3.6m</option>
            <option value="BiFold_3m">BiFold 3m</option>
            <option value="BiFold_4m">BiFold 4m</option>
            <option value="Double_Doors_4ft" selected>4' Double Doors</option>
          </select>
          <button class="btn danger remove-btn" data-id="${componentId}">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="16" height="16">
              <path d="M296 432h16a8 8 0 0 0 8-8V152a8 8 0 0 0-8-8h-16a8 8 0 0 0-8 8v272a8 8 0 0 0 8 8zm-160 0h16a8 8 0 0 0 8-8V152a8 8 0 0 0-8-8h-16a8 8 0 0 0-8 8v272a8 8 0 0 0 8 8zM440 64H336l-33.6-44.8A48 48 0 0 0 264 0h-80a48 48 0 0 0-38.4 19.2L112 64H8a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h24v368a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V96h24a8 8 0 0 0 8-8V72a8 8 0 0 0-8-8zM171.2 38.4A16.1 16.1 0 0 1 184 32h80a16.1 16.1 0 0 1 12.8 6.4L296 64H152zM384 464a16 16 0 0 1-16 16H80a16 16 0 0 1-16-16V96h320zm-168-32h16a8 8 0 0 0 8-8V152a8 8 0 0 0-8-8h-16a8 8 0 0 0-8 8v272a8 8 0 0 0 8 8z"></path>
            </svg>
          </button>
        </div>
        <div class="control-group">
          <label>Position:</label>
          <input type="range" class="component-pos" data-id="${componentId}" value="0" min="-7.5" max="7.5" step="0.25">
        </div>
      </div>
    </div>
  `;

    document.querySelector('.components-list').insertAdjacentHTML('beforeend', componentHTML);
    attachComponentEvents(componentId);
}

function attachComponentEvents(componentId) {
    const component = document.querySelector(`[data-id="${componentId}"]`);

    // Type change
    component.querySelector('.component-type').addEventListener('change', function () {
        const type = this.value;
        console.log(`Component ${componentId} type changed to:`, type);

        app.contentWindow.postMessage({
            type: 'DOOR_COMPONENT_TYPE',
            componentId: componentId,
            doorType: type
        }, '*');
    });

    // Position change
    component.querySelector('.component-pos').addEventListener('input', function () {
        const position = parseFloat(this.value);
        console.log(`Component ${componentId} position:`, position);

        app.contentWindow.postMessage({
            type: 'DOOR_COMPONENT_POSITION',
            componentId: componentId,
            position: position
        }, '*');
    });

    // Remove button
    component.querySelector('.remove-btn').addEventListener('click', function () {
        componentCounter--;
        app.contentWindow.postMessage({
            type: 'DOOR_COMPONENT_REMOVE',
            componentId: componentId
        }, '*');

        component.remove();
    });
}

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
document.addEventListener('DOMContentLoaded', function() {
    const firstDoor = document.querySelector('.component-item[data-id="door-0"]');
    if (firstDoor) {
        attachComponentEvents('door-0');
        componentCounter = 1; // Set counter to 1 since we already have one door
    }
});