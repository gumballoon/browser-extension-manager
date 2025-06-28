const herobox = document.querySelector('#herobox')
const nav = document.querySelector('nav');
const logoLettering = document.querySelector('#logo-lettering')
const mode = document.querySelector('#mode');
const moon = document.querySelector('#moon');
const sun = document.querySelector('#sun');
const h1 = document.querySelector('h1');
const allRadio = document.querySelectorAll('.radio')
const allRadioInputs = document.querySelectorAll('input[type="radio"]')
const extensions = document.querySelector('#extensions');

const dataJSON = `[
    {
        "logo": "./assets/images/logo-devlens.svg",
        "name": "DevLens",
        "description": "Quickly inspect page layouts and visualize element boundaries.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-style-spy.svg",
        "name": "StyleSpy",
        "description": "Instantly analyze and copy CSS from any webpage element.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-speed-boost.svg",
        "name": "SpeedBoost",
        "description": "Optimizes browser resource usage to accelerate page loading.",
        "isActive": false
    },
    {
        "logo": "./assets/images/logo-json-wizard.svg",
        "name": "JSONWizard",
        "description": "Formats, validates, and prettifies JSON responses in-browser.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-tab-master-pro.svg",
        "name": "TabMaster Pro",
        "description": "Organizes browser tabs into groups and sessions.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-viewport-buddy.svg",
        "name": "ViewportBuddy",
        "description": "Simulates various screen resolutions directly within the browser.",
        "isActive": false
    },
    {
        "logo": "./assets/images/logo-markup-notes.svg",
        "name": "Markup Notes",
        "description": "Enables annotation and notes directly onto webpages for collaborative debugging.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-grid-guides.svg",
        "name": "GridGuides",
        "description": "Overlay customizable grids and alignment guides on any webpage.",
        "isActive": false
    },
    {
        "logo": "./assets/images/logo-palette-picker.svg",
        "name": "Palette Picker",
        "description": "Instantly extracts color palettes from any webpage.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-link-checker.svg",
        "name": "LinkChecker",
        "description": "Scans and highlights broken links on any page.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-dom-snapshot.svg",
        "name": "DOM Snapshot",
        "description": "Capture and export DOM structures quickly.",
        "isActive": false
    },
    {
        "logo": "./assets/images/logo-console-plus.svg",
        "name": "ConsolePlus",
        "description": "Enhanced developer console with advanced filtering and logging.",
        "isActive": true
    }
]`
const data = JSON.parse(dataJSON);

// to populate the HTML
for (i of data){
    const section = document.createElement('section');
    section.classList.add("border", "px-3", "py-2", "my-3", "mx-auto")
    section.innerHTML = `
    <div class="row">
        <img src=${i.logo} alt=${i.logo.slice[16,-4]} class="img-fluid col-3 px-3 pb-4">

        <div class="col-9 px-0">
            <h2 class="neutral-900 fw-semibold mt-3 fs-4">${i.name}</h2>
            <p class="neutral-700 fw-light">${i.description}</p>
        </div>
    </div>
    <div class="mt-3 mb-2 d-flex justify-content-between">
        <button class="rounded-pill py-1 px-3 border">Remove</button>
                    
        <div class="position-relative align-self-center my-0 rounded-pill switch">
            <input type="checkbox" class="rounded-pill switch-input">
            <span class="switch-circle"></span>
        <div>
    </div>`

    if(i.isActive) section.querySelector('.switch-input').checked = true;

    extensions.appendChild(section)
}

// after populating
const allSections = document.querySelectorAll('section');

// check/uncheck the switch-input when the switch-circle is clicked on
for (section of allSections) {
    const switchInput = section.querySelector('.switch-input');
    const switchCircle = section.querySelector('.switch-circle');
    switchCircle.addEventListener('click', function(){
        switchInput.checked = !switchInput.checked;
    })
}

// Dark move vs. Light mode
mode.addEventListener('click', function(){
    // dark mode
    if (!moon.classList.contains('d-none')){
        moon.classList.add('d-none');
        sun.classList.remove('d-none');
        this.classList.add('dark');
        nav.classList.add('nav-dark');
        logoLettering.setAttribute('fill', 'white');
        document.body.style.backgroundImage = 'linear-gradient(180deg, #040918 0%, #091540 100%)';
        h1.classList.add('neutral-0');
        for (let radio of allRadio){
            radio.classList.add('dark')
            if (radio.classList.contains('selected')){
                radio.classList.remove('selected');
                radio.classList.add('selected-dark')
            }
        }
        for (section of allSections){
            section.classList.add('section-dark')
        }

    // light mode
    } else { 
        moon.classList.remove('d-none');
        sun.classList.add('d-none');
        this.classList.remove('dark');
        nav.classList.remove('nav-dark');
        logoLettering.setAttribute('fill', '#091540');
        document.body.style.backgroundImage = 'linear-gradient(180deg, #EBF2FC 0%, #EEF8F9 100%)'
        h1.classList.remove('neutral-0');
        for (let radio of allRadio){
            radio.classList.remove('dark')
            if (radio.classList.contains('selected-dark')){
                radio.classList.remove('selected-dark');
                radio.classList.add('selected')
            }
        }
        for (section of allSections){
            section.classList.remove('section-dark')
        }
    }
})

// show/hide sections w/ Active vs. Inactive
function showSections(input){
    for (let section of allSections){
        // to reset the display
        section.classList.remove('d-none')
        const switchButton = section.querySelector('.switch')
        if (input.id === 'active' && !switchButton.checked){
            section.classList.add('d-none');
        } else if (input.id === 'inactive' && switchButton.checked){
            section.classList.add('d-none');
        }
    }
}

// selected vs. selected-dark
for (let input of allRadioInputs){
    input.addEventListener('change', function(){
        for (let i of allRadioInputs){
            i.parentElement.classList.remove('selected');
            i.parentElement.classList.remove('selected-dark');
        }

        const parent = this.parentElement;
        if (parent.classList.contains('dark')){
            parent.classList.add('selected-dark');
        } else {
            parent.classList.add('selected');
        }

        showSections(this);
    })
}

// update Active vs. Inactive w/ every Switch change
const allSwitchButtons = document.querySelectorAll('.switch-input');
function getCurrentFilter() {
    for (radioInput of allRadioInputs){
        if(radioInput.checked){
            return radioInput;
        }
    }
}
for (let switchButton of allSwitchButtons){
    switchButton.addEventListener('change', function(){
        showSections(getCurrentFilter());
    })
}

// to remove a section (after hiding it w/ opacity & transition)
for (let section of allSections){
    const remove = section.querySelector('button');
    remove.addEventListener('click', function(){
        section.classList.add('hidden');
        section.addEventListener('transitionend', function(){
            section.remove();
        })
    })
}