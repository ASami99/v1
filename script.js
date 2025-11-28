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

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 16px;
        background: ${type === 'warning' ? '#fff3cd' :
            type === 'error' ? '#f8d7da' : '#d1ecf1'};
        border: 1px solid ${type === 'warning' ? '#ffeaa7' :
            type === 'error' ? '#f5c6cb' : '#bee5eb'};
        border-radius: 4px;
        color: ${type === 'warning' ? '#856404' :
            type === 'error' ? '#721c24' : '#0c5460'};
        z-index: 1000;
        max-width: 300px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        font-family: system-ui, -apple-system, sans-serif;
        font-size: 14px;
    `;
    notification.textContent = message;

    // Remove any existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 5000);
}


