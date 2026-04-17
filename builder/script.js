let templateCache = {
    html: "",
    css: "",
    script: ""
};

let links = [
    { type: "linkedin", label: "in/falhilaly", url: "https://www.linkedin.com/in/falhilaly/" },
    { type: "email", label: "Fahilaly@gmail.com", url: "mailto:Fahilaly@gmail.com" }
];

const availableTypes = ['linkedin', 'github', 'twitter', 'instagram', 'youtube', 'phone', 'email', 'globe', 'whatsapp', 'telegram', 'tiktok', 'custom'];

// Fetch the base template files once when the builder loads
async function loadBaseTemplate() {
    try {
        const [htmlRes, cssRes, scriptRes] = await Promise.all([
            fetch('../index.html'),
            fetch('../style.css'),
            fetch('../script.js')
        ]);
        templateCache.html = await htmlRes.text();
        templateCache.css = await cssRes.text();
        templateCache.script = await scriptRes.text();
        updatePreview();
    } catch (e) {
        console.error("Failed to load template files. Are you running a local server?", e);
    }
}

function renderLinks() {
    const container = document.getElementById('links-container');
    container.innerHTML = '';
    
    links.forEach((link, idx) => {
        const row = document.createElement('div');
        row.className = 'link-item';
        
        // Type Selector
        let options = availableTypes.map(t => `<option value="${t}" ${t === link.type ? 'selected' : ''}>${t}</option>`).join('');
        
        row.innerHTML = `
            <button class="remove-link" onclick="removeLink(${idx})">×</button>
            <div class="link-row">
                <select onchange="updateLink(${idx}, 'type', this.value)" style="flex:1;">
                    ${options}
                </select>
                <input type="text" placeholder="Label (e.g. @username)" value="${link.label}" onchange="updateLink(${idx}, 'label', this.value)" style="flex:2; margin-bottom:0;">
            </div>
            <div class="link-row">
                <input type="text" placeholder="URL (e.g. https://...)" value="${link.url}" onchange="updateLink(${idx}, 'url', this.value)" style="width:100%; margin-bottom:0;">
            </div>
        `;
        container.appendChild(row);
    });
}

window.updateLink = function(idx, field, val) {
    links[idx][field] = val;
    updatePreview();
};

window.removeLink = function(idx) {
    links.splice(idx, 1);
    renderLinks();
    updatePreview();
};

document.getElementById('btn-add-link').addEventListener('click', () => {
    links.push({ type: 'globe', label: 'My Website', url: 'https://' });
    renderLinks();
    updatePreview();
});

// Build the JS Config Object
function generateConfig() {
    return {
        name: {
            first: document.getElementById('in-first').value,
            last: document.getElementById('in-last').value
        },
        role: document.getElementById('in-role').value,
        tagline: document.getElementById('in-tagline').value,
        monogram: document.getElementById('in-monogram').value,
        theme: document.getElementById('in-theme').value,
        links: links,
        // Default placeholders for the generated code
        qrUrl: "", 
        cvUrl: "",
        vcfUrl: "",
        backTitle: "SCAN FOR DIGITAL CARD",
        backSubtitle: "Contact & CV",
        tiltOnHover: true,
        showFlipHint: true,
        flipHintText: "Tap anywhere to flip"
    };
}

function getConfigFileString(configObj) {
    return `var CARD_CONFIG = ${JSON.stringify(configObj, null, 2)};`;
}

// Update the iframe with a live version
function updatePreview() {
    if (!templateCache.html) return;
    
    let configObj = generateConfig();
    
    // Strip external CSS/JS links from original HTML and inject them inline for the srcdoc
    let modifiedHtml = templateCache.html
        .replace('<link rel="stylesheet" href="style.css">', `<style>${templateCache.css}</style>`)
        .replace('<script src="config.js"><\/script>', `<script>${getConfigFileString(configObj)}<\/script>`)
        .replace('<script src="script.js"><\/script>', `<script>${templateCache.script} <\/script>`);

    const frame = document.getElementById('preview-frame');
    frame.srcdoc = modifiedHtml;
}

// Handle real-time typing
['in-first', 'in-last', 'in-role', 'in-tagline', 'in-monogram', 'in-theme'].forEach(id => {
    document.getElementById(id).addEventListener('input', updatePreview);
});

// ZIP Generation
document.getElementById('btn-export').addEventListener('click', async () => {
    const zip = new JSZip();
    const configObj = generateConfig();
    
    // Create folder structure
    const folder = zip.folder("my-digital-card");
    
    // Add files
    folder.file("index.html", templateCache.html);
    folder.file("style.css", templateCache.css);
    folder.file("script.js", templateCache.script);
    folder.file("config.js", getConfigFileString(configObj));
    
    // Add a basic README
    folder.file("README.md", `# My Digital Business Card\n\nGenerated with Digital Card Builder.\n\nTo deploy, push these files to a GitHub repository and turn on GitHub Pages!`);
    
    // Generate and download
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "digital-card.zip");
});

// Init
renderLinks();
loadBaseTemplate();
