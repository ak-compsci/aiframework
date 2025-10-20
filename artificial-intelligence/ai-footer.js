// Generic Contact Footer Widget
// --- CONFIGURATION ---
// Edit these values to customize the contact footer for your section:
var contactFooterConfig = {
	// Section title
	title: 'Artificial Intelligence in K-12 Education',
	// Contact information items
	contacts: [
		{ 
			label: 'Contact', 
			value: 'Anthony White', 
			url: null,
			icon: '\u{1F464}',
			active: true 
		},
		{ 
			label: 'Email', 
			value: 'anthony.white@alaska.gov', 
			url: 'mailto:anthony.white@alaska.gov',
			icon: '\u2709',
			active: true 
		},
		{ 
			label: 'Phone', 
			value: '(907) 269-8938', 
			url: 'tel:+19072698938',
			icon: '\u260E',
			active: true 
		}
	],
	// Optional: Only show footer on these path substrings (leave empty to always show)
	showOnPaths: []
};

// --- GENERIC WIDGET CODE ---
document.addEventListener('DOMContentLoaded', function() {
	// If showOnPaths is set, only show footer if current path matches
	var show = true;
	if (Array.isArray(contactFooterConfig.showOnPaths) && contactFooterConfig.showOnPaths.length > 0) {
		show = contactFooterConfig.showOnPaths.some(function(path) {
			return window.location.pathname.includes(path);
		});
	}
	if (!show) return;

	// Build contact items HTML
	var contactItemsHTML = contactFooterConfig.contacts.map(function(contact) {
		if (contact.active) {
			if (contact.url) {
				return `
					<div class="contact-item enhanced-contact-btn">
						<a href="${contact.url}" class="contact-link">
							<span class="contact-icon">${contact.icon}</span>
							<div class="contact-content">
								<div class="contact-label">${contact.label}</div>
								<div class="contact-value">${contact.value}</div>
							</div>
							<span class="ripple"></span>
						</a>
					</div>
				`;
			} else {
				return `
					<div class="contact-item">
						<div class="contact-static">
							<span class="contact-icon">${contact.icon}</span>
							<div class="contact-content">
								<div class="contact-label">${contact.label}</div>
								<div class="contact-value">${contact.value}</div>
							</div>
						</div>
					</div>
				`;
			}
		} else {
			return `
				<div class="contact-item disabled">
					<div class="contact-static">
						<span class="contact-icon">${contact.icon}</span>
						<div class="contact-content">
							<div class="contact-label">${contact.label}</div>
							<div class="contact-value">${contact.value}</div>
						</div>
					</div>
				</div>
			`;
		}
	}).join('');

	// Build additional links HTML
	var linksHTML = '';
	if (contactFooterConfig.links && contactFooterConfig.links.length > 0) {
		var linkItemsHTML = contactFooterConfig.links.map(function(link) {
			if (link.active && link.url) {
				return `<a href="${link.url}" class="footer-link enhanced-nav-btn">${link.label}<span class="ripple"></span></a>`;
			} else {
				return `<span class="footer-link disabled enhanced-nav-btn">${link.label}</span>`;
			}
		}).join('');

		linksHTML = `
			<div class="footer-links-section">
				<div class="footer-links">
					${linkItemsHTML}
				</div>
			</div>
		`;
	}

	// Build the contact footer HTML
	var footerHTML = `
<footer class="generic-contact-footer" style="margin: 40px 0 20px 0; padding: 0;">
	<div class="contact-footer-container" style="background: #f0f7ff; border: 1px solid #b3b3b3; overflow: hidden;">
		<div class="contact-header" style="background: #e6f3ff; padding: 16px 20px; border-bottom: 1px solid #d0d0d0;">
			<h3 style="margin: 0; color: #2d5a87; font-size: 18px; font-weight: 700;">${contactFooterConfig.title}</h3>
		</div>
		<div class="contact-content-area" style="padding: 20px;">
			<div class="contact-grid">
				${contactItemsHTML}
			</div>
		</div>
		${linksHTML}
	</div>
</footer>
	`;

	// Only inject the style tag once
	if (!document.getElementById('officeofeducationadvocacy-contact-style')) {
		var style = document.createElement('style');
		style.id = 'officeofeducationadvocacy-contact-style';
		style.textContent = `
			.generic-contact-footer {
				width: 100%;
				margin-top: 40px;
			}
			.contact-grid {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
				gap: 16px;
			}
			.contact-item {
				background: #ffffff;
				border: 1px solid #e0e0e0;
				overflow: hidden;
				transition: transform 0.13s cubic-bezier(.4,2,.6,1), box-shadow 0.2s;
			}
			.contact-item.enhanced-contact-btn {
				position: relative;
				cursor: pointer;
			}
			.contact-item.enhanced-contact-btn:hover {
				background: #3f78a7;
				border-color: #2d5a87;
			}
			.contact-item.enhanced-contact-btn:hover .contact-label {
				color: #ffffff;
			}
			.contact-item.enhanced-contact-btn:hover .contact-value {
				color: #ffffff;
			}
			.contact-item.enhanced-contact-btn:active {
				transform: translateY(0) scale(0.98);
			}
			.contact-item.disabled {
				background: #f9f9f9;
				color: #888;
				cursor: not-allowed;
			}
			.contact-link, .contact-static {
				display: flex;
				align-items: center;
				padding: 16px;
				text-decoration: none;
				color: inherit;
				position: relative;
				overflow: hidden;
			}
			.contact-link:hover {
				text-decoration: none;
			}
			.contact-icon {
				font-size: 24px;
				margin-right: 12px;
				flex-shrink: 0;
			}
			.contact-content {
				flex: 1;
			}
			.contact-label {
				font-weight: 700;
				font-size: 14px;
				color: #2d5a87;
				margin-bottom: 4px;
			}
			.contact-value {
				font-size: 14px;
				color: #333;
				line-height: 1.4;
			}
			.footer-links-section {
				background: #e6f3ff;
				border-top: 1px solid #d0d0d0;
				padding: 16px 20px;
			}
			.footer-links {
				display: flex;
				flex-wrap: wrap;
				gap: 0;
				justify-content: center;
				border: 1px solid #b3b3b3;
				overflow: hidden;
				background: #f0f7ff;
			}
			.footer-link {
				position: relative;
				overflow: hidden;
				border-radius: 0;
				margin: 0;
				background: #f0f7ff;
				color: inherit;
				font-weight: 700;
				font-size: 13px;
				padding: 8px 16px;
				border: 1px solid transparent;
				outline: none;
				transition: transform 0.13s cubic-bezier(.4,2,.6,1), box-shadow 0.2s, background 0.2s, color 0.2s;
				cursor: pointer;
				display: inline-block;
				text-align: center;
				text-decoration: underline;
				letter-spacing: 0.01em;
				z-index: 1;
				flex: 1;
				min-width: 120px;
			}
			.footer-link:active {
				transform: scale(0.97);
				box-shadow: 0 1px 4px rgba(0,0,0,0.10);
			}
			.footer-link:not(.disabled):hover {
				background: #3f78a7;
				color: #ffffff;
				box-shadow: 0 4px 16px rgba(0,102,204,0.10);
				text-decoration: none;
				border: 1px solid #2d5a87;
			}
			.footer-link:not(.disabled):focus {
				outline: 2px solid #0066cc;
				outline-offset: 2px;
			}
			.footer-link.disabled {
				background: #f0f7ff !important;
				color: #888 !important;
				cursor: not-allowed;
				box-shadow: none;
			}
			.ripple {
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
			@media (max-width: 768px) {
				.contact-grid {
					grid-template-columns: 1fr;
				}
				.footer-links {
					flex-direction: column;
					gap: 0;
				}
				.footer-link {
					flex: none;
					border-bottom: 1px solid #d0d0d0;
					text-align: left;
				}
				.footer-link:last-child {
					border-bottom: none;
				}
			}
			@media (max-width: 500px) {
				.contact-content-area {
					padding: 16px !important;
				}
				.contact-header {
					padding: 12px 16px !important;
				}
				.footer-links-section {
					padding: 12px 16px !important;
				}
				.contact-link, .contact-static {
					padding: 12px !important;
				}
				.contact-icon {
					font-size: 20px !important;
					margin-right: 10px !important;
				}
				.contact-label {
					font-size: 13px !important;
				}
				.contact-value {
					font-size: 13px !important;
				}
			}
		`;
		document.head.appendChild(style);
	}

	// Add ripple effect to contact buttons and footer links
	document.addEventListener('click', function(e) {
		var target = e.target.closest('.enhanced-contact-btn .contact-link, .footer-link:not(.disabled)');
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

	// Insert the footer in the designated container or at the end of the body
	var targetContainer = document.getElementById('artificial-intelligence-contact');
	if (targetContainer) {
		targetContainer.innerHTML = footerHTML;
	} else {
		document.body.insertAdjacentHTML('beforeend', footerHTML);
	}
});