/**
 * E-Mind Platform - Dynamic Template & Component Loader
 * Loads HTML partials into slots and initializes application modules.
 */
(function () {
  const components = [
    { slot: '#slot-auth', file: 'components/auth.html' },
    { slot: '#slot-sidebars', file: 'components/sidebars.html' },
    { slot: '#slot-header', file: 'components/header.html' },
    { slot: '#slot-dashboard', file: 'components/dashboard.html' },
    { slot: '#slot-contracts', file: 'components/contracts.html' },
    { slot: '#slot-projects', file: 'components/projects.html' },
    { slot: '#slot-admin-views', file: 'components/admin-views.html' },
    { slot: '#slot-modals', file: 'components/modals.html' }
  ];

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve();
      script.onerror = (err) => reject(new Error('Failed to load script: ' + src));
      document.body.appendChild(script);
    });
  }

  async function loadAllTemplates() {
    try {
      const fetches = components.map(async ({ slot, file }) => {
        const res = await fetch(file);
        if (!res.ok) {
          throw new Error(`Failed to load ${file} (${res.status} ${res.statusText})`);
        }
        const html = await res.text();
        const target = document.querySelector(slot);
        if (target) {
          target.outerHTML = html;
        } else {
          console.warn(`Slot target "${slot}" not found for ${file}`);
        }
      });

      await Promise.all(fetches);

      // Load scripts in correct dependency order
      await loadScript('js/contracts-data.js');
      await loadScript('js/app.js');
      await loadScript('js/admin-dashboard.js');

      window.dispatchEvent(new CustomEvent('components:loaded'));
      console.log('✅ All components and scripts loaded successfully.');
    } catch (err) {
      console.error('❌ Template loading error:', err);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAllTemplates);
  } else {
    loadAllTemplates();
  }
})();
