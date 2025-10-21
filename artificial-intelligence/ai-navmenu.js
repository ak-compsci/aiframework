// Generic Navigation Dropdown Widget
// --- CONFIGURATION ---
// Edit these values to customize the nav for your section:
var navSectionConfig = {
	// List of navigation items (first item is the section homepage link)
	items: [
		{ label: 'AI Home', url: '/artificial-intelligence', active: true },
		{ label: 'District Guidance', url: '/artificial-intelligence/district', active: true },
		{ label: 'Educator Guidance', url: '/artificial-intelligence/educators', active: true },
		{ label: 'Student Guidance', url: '/artificial-intelligence/students', active: true },
		{ label: 'Professional Development', url: '/artificial-intelligence/pd', active: true },
	],
	// Optional: Only show nav on these path substrings (leave empty to always show)
	showOnPaths: []
};

// --- GENERIC WIDGET CODE ---
document.addEventListener('DOMContentLoaded', function() {
	// If showOnPaths is set, only show nav if current path matches
	var show = true;
	if (Array.isArray(navSectionConfig.showOnPaths) && navSectionConfig.showOnPaths.length > 0) {
		show = navSectionConfig.showOnPaths.some(function(path) {
			return window.location.pathname.includes(path);
		});
	}
	if (!show) return;



	// The first item is the section homepage link and label
	var sectionItem = navSectionConfig.items[0] || { label: 'Navigation', url: '/', active: true };
	// Get current page path for comparison
	var currentPath = window.location.pathname;
	
	// All items (including the first) are nav links, except for the current page
	 var navItemsHTML = navSectionConfig.items.map(function(item) {
		 if (item.active && item.url) {
			 // Check if this is the current page
			 var isCurrentPage = false;
			 
			 if (item.url === '/artificial-intelligence') {
				 // For the home page, only match exact paths
				 isCurrentPage = currentPath === '/artificial-intelligence' || currentPath === '/artificial-intelligence/';
			 } else {
				 // For other pages, match exact path or subpaths
				 isCurrentPage = currentPath === item.url || 
					 (currentPath.startsWith(item.url + '/')) ||
					 (item.url.endsWith('/') && currentPath.startsWith(item.url));
			 }
			 
			 if (isCurrentPage) {
				 // Current page - render as non-link with special styling
				 return `<span class="nav-item current-page enhanced-nav-btn">${item.label}</span>`;
			 } else {
				 // Other pages - render as links
				 return `<a href="${item.url}" class="nav-item active enhanced-nav-btn">${item.label}<span class="ripple"></span></a>`;
			 }
		 } else {
			 return `<span class="nav-item disabled enhanced-nav-btn">${item.label}</span>`;
		 }
	 }).join('');

	// Build the navigation HTML and style, then inject them properly
	var navHTML = `
<nav class="generic-nav-widget" style="margin: 20px 0; padding: 0;">
	<div class="generic-nav-container" style="position: relative;">
		<button class="generic-dropdown-btn" style="width: 100%; padding: 12px 16px; background: #ffffff; border: 1px solid #e0e0e0; border-radius: 6px; color: inherit; font-weight: 700; font-size: 14px; cursor: pointer; box-shadow: 0 8px 24px rgba(0,0,0,0.15); display: none; justify-content: space-between; align-items: center;">
			<span>${sectionItem.label}</span>
			<span class="dropdown-arrow" style="transform: rotate(0deg); transition: transform 0.3s ease;">â–¼</span>
		</button>
		<div class="generic-nav-items" style="display: flex; flex-wrap: wrap; gap: 0; justify-content: flex-start; border: 1px solid #b3b3b3; border-radius: 0; overflow: hidden; background: #f0f7ff;">
			${navItemsHTML}
		</div>
	</div>
</nav>
	`;

	// Only inject the style tag once
	if (!document.getElementById('artificial-intelligence-nav-style')) {
		var style = document.createElement('style');
		style.id = 'artificial-intelligence-nav-style';
		style.textContent = `
			.enhanced-nav-btn {
				position: relative;
				overflow: hidden;
				border-radius: 0;
				margin: 0;
				background: #f0f7ff;
				color: inherit;
				font-weight: 700;
				font-size: 15px;
				padding: 10px 16px;
				border: 1px solid transparent;
				outline: none;
				transition: transform 0.13s cubic-bezier(.4,2,.6,1), box-shadow 0.2s, background 0.2s, color 0.2s;
				cursor: pointer;
				display: inline-block;
				text-align: center;
				text-decoration: none;
				letter-spacing: 0.01em;
				z-index: 1;
			}
			.enhanced-nav-btn:active {
				transform: scale(0.97);
				box-shadow: 0 1px 4px rgba(0,0,0,0.10);
			}
			.enhanced-nav-btn.active:hover {
				background: #3f78a7;
				color: #ffffff;
				box-shadow: 0 4px 16px rgba(0,102,204,0.10);
				text-decoration: none;
				border: 1px solid #2d5a87;
			}
			.enhanced-nav-btn.active:focus {
				outline: 2px solid #0066cc;
				outline-offset: 2px;
			}
			.enhanced-nav-btn.disabled {
				background: #f0f7ff !important;
				color: #888 !important;
				cursor: not-allowed;
				box-shadow: none;
			}
			.enhanced-nav-btn.current-page {
				background: #2d5a87 !important;
				color: #ffffff !important;
				cursor: default !important;
				text-decoration: none !important;
				box-shadow: inset 0 2px 4px rgba(0,0,0,0.2) !important;
				border: 1px solid #1a3d5c !important;
			}
			.enhanced-nav-btn.current-page:hover {
				background: #2d5a87 !important;
				color: #ffffff !important;
				transform: none !important;
				box-shadow: inset 0 2px 4px rgba(0,0,0,0.2) !important;
			}
			.enhanced-nav-btn .ripple {
				position: absolute;
				border-radius: 50%;
				transform: scale(0);
				animation: ripple 0.5s linear;
				background: rgba(0,102,204,0.18);
				pointer-events: none;
				z-index: 2;
			}
			@keyframes ripple {
				to {
					transform: scale(2.5);
					opacity: 0;
				}
			}
			@media (min-width: 501px) {
				.generic-dropdown-btn {
					display: none !important;
				}
				.generic-nav-items {
					display: flex !important;
					position: static !important;
					background: #f0f7ff !important;
					border: 1px solid #b3b3b3 !important;
					border-radius: 0 !important;
				}
			}
			@media (max-width: 500px) {
				.generic-dropdown-btn {
					display: flex !important;
				}
				.generic-nav-items {
					display: none !important;
					position: absolute;
					top: 100%;
					left: 0;
					right: 0;
					flex-direction: column;
					background: #f0f7ff;
					border: 1px solid #b3b3b3;
					border-radius: 0;
					z-index: 1000;
					margin-top: 4px;
				}
				.generic-nav-items.show {
					display: flex !important;
				}
				.generic-nav-items .nav-item {
					display: block !important;
					padding: 12px 16px !important;
					border-bottom: 1px solid #f0f0f0 !important;
					flex: none !important;
					text-align: left !important;
					color: inherit !important;
					text-decoration: underline !important;
					font-weight: 700 !important;
					font-size: 13px !important;
				}
				.generic-nav-items .nav-item:hover {
					background: #3f78a7 !important;
					color: #ffffff !important;
				}
				.generic-nav-items .nav-item:last-child {
					border-bottom: none !important;
				}
				.generic-nav-items .nav-item.disabled {
					background: #f9f9f9 !important;
				}
				.generic-nav-items .nav-item.current-page {
					background: #2d5a87 !important;
					color: #ffffff !important;
					cursor: default !important;
					text-decoration: none !important;
				}
				.generic-nav-items .nav-item.current-page:hover {
					background: #2d5a87 !important;
					color: #ffffff !important;
				}
			}
		`;
		document.head.appendChild(style);
	}

	// Add ripple effect to nav buttons (excluding current page)
	document.addEventListener('click', function(e) {
		var target = e.target.closest('.enhanced-nav-btn.active:not(.current-page)');
		if (!target) return;
		var ripple = target.querySelector('.ripple');
		if (!ripple) return;
		ripple.remove();
		var newRipple = document.createElement('span');
		newRipple.className = 'ripple';
		var rect = target.getBoundingClientRect();
		var size = Math.max(rect.width, rect.height);
		newRipple.style.width = newRipple.style.height = size + 'px';
		newRipple.style.left = (e.clientX - rect.left - size/2) + 'px';
		newRipple.style.top = (e.clientY - rect.top - size/2) + 'px';
		target.appendChild(newRipple);
		setTimeout(function() { newRipple.remove(); }, 500);
	}, false);

	// Look for the designated nav container first, then fallback to h1
var targetContainer = document.getElementById('artificial-intelligence-nav');
var insertMethod = 'replace'; // 'replace' for container, 'after' for h1

if (!targetContainer) {
    // Fallback to h1 method if container not found
    targetContainer = document.querySelector('h1');
    insertMethod = 'after';
}

if (targetContainer) {
    if (insertMethod === 'replace') {
        // Insert into the designated container
        targetContainer.innerHTML = navHTML;
    } else {
        // Insert after h1 (original method)
        targetContainer.insertAdjacentHTML('afterend', navHTML);
    }

    // Add dropdown functionality (update the selectors)
    var navContainer = insertMethod === 'replace' ? targetContainer : targetContainer.parentNode;
    var dropdownBtn = navContainer.querySelector('.generic-dropdown-btn');
    var navItems = navContainer.querySelector('.generic-nav-items');
    var dropdownArrow = navContainer.querySelector('.dropdown-arrow');

		function resetDropdownState() {
			navItems.classList.remove('show');
			dropdownArrow.style.transform = 'rotate(0deg)';
		}

		window.addEventListener('resize', function() {
			resetDropdownState();
		});

		dropdownBtn.addEventListener('click', function() {
			var isOpen = navItems.classList.contains('show');
			if (isOpen) {
				resetDropdownState();
			} else {
				navItems.classList.add('show');
				dropdownArrow.style.transform = 'rotate(180deg)';
			}
		});

		document.addEventListener('click', function(event) {
			if (!h1Element.parentNode.querySelector('.generic-nav-container').contains(event.target)) {
				resetDropdownState();
			}
		});

		navItems.addEventListener('click', function(event) {
			if (event.target.classList.contains('active')) {
				resetDropdownState();
			}
		});
	}
});