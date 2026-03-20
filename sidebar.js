/* =============================================
   blamq SIDEBAR JS v4
   Folders, expandable sub-items, SPA-aware
   ============================================= */
(function() {
  'use strict';

  /* ── Config ── */
  var OTHER_TOOLS_IDS = [
    'sb_email-marketing', 'sb_payments', 'sb_sites',
    'sb_memberships', 'sb_app-media', 'sb_reputation',
    'sb_app-marketplace', 'sb_location-mobile-app'
  ];

  var SUB_ITEMS = {
    'sb_opportunities': [
      { label: 'Pipeline', path: '/opportunities/pipeline' },
      { label: 'List View', path: '/opportunities/list' },
    ],
    'sb_contacts': [
      { label: 'Smart Lists', path: '/contacts/smart_list/All' },
      { label: 'Bulk Actions', path: '/contacts/bulk/actions' },
    ],
    'sb_calendars': [
      { label: 'Calendar View', path: '/calendars/view' },
      { label: 'Appointments', path: '/calendars/appointments' },
      { label: 'Settings', path: '/settings/calendars' },
    ],
    'sb_email-marketing': [
      { label: 'Social Planner', path: '/marketing/social-planner' },
      { label: 'Email Marketing', path: '/marketing/emails' },
    ],
    'sb_payments': [
      { label: 'Invoices', path: '/payments/invoices' },
      { label: 'Products', path: '/payments/products' },
      { label: 'Orders', path: '/payments/orders' },
    ],
    'sb_sites': [
      { label: 'Funnels', path: '/funnels-websites/funnels' },
      { label: 'Websites', path: '/funnels-websites/websites' },
    ],
    'sb_automation': [
      { label: 'Workflows', path: '/automation/workflows' },
    ],
    'sb_reporting': [
      { label: 'Reports', path: '/reporting/reports' },
      { label: 'Attribution', path: '/reporting/attribution' },
    ],
  };

  var folderOpen = false;
  var expandedMenus = {};

  /* ── Helpers ── */
  function getBasePath() {
    var m = window.location.pathname.match(/\/v2\/location\/[^\/]+/);
    return m ? m[0] : '';
  }

  function esc(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

  /* ── Detect settings page ── */
  function isSettingsPage() {
    return window.location.pathname.indexOf('/settings/') !== -1;
  }

  /* ── Settings: collapsible sections ── */
  var settingsState = { 'OTHER SETTINGS': true }; /* OTHER SETTINGS collapsed by default */
  var settingsApplied = false;

  function applySettingsCollapse() {
    if (!isSettingsPage()) { settingsApplied = false; return; }
    var sidebar = document.getElementById('sidebar-v2');
    if (!sidebar) return;

    /* Settings uses hl_nav-header-without-footer, not hl_nav-header */
    var navContainer = sidebar.querySelector('.hl_nav-header-without-footer') || sidebar.querySelector('.hl_nav-header');
    if (!navContainer) return;

    /* Find all section dividers */
    var dividers = navContainer.querySelectorAll('.divider');
    if (dividers.length === 0) return;
    if (settingsApplied) return;

    dividers.forEach(function(divider) {
      var span = divider.querySelector('span.uppercase');
      if (!span || divider.querySelector('.blamq-section-chevron')) return;
      var name = span.textContent.replace(/[\s\u00A0]+/g, ' ').trim();
      if (!name) return;

      var isCollapsed = settingsState[name] === true;

      /* Add chevron SVG */
      var chev = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      chev.setAttribute('class', 'blamq-section-chevron' + (isCollapsed ? ' collapsed' : ''));
      chev.setAttribute('viewBox', '0 0 24 24');
      chev.setAttribute('fill', 'none');
      chev.setAttribute('stroke', 'currentColor');
      chev.setAttribute('stroke-width', '2.5');
      chev.innerHTML = '<polyline points="6 9 12 15 18 9"/>';
      span.appendChild(chev);

      divider.classList.add('blamq-section-toggle');

      /* Get sibling items until next divider */
      var siblings = [];
      var next = divider.nextElementSibling;
      while (next && !next.classList.contains('divider')) {
        siblings.push(next);
        next = next.nextElementSibling;
      }

      /* Move Integrations into Business Services if this is Business Services */
      if (name === 'BUSINESS SERVICES') {
        var intEl = document.getElementById('sb_common.sidebar.lcIntegrations');
        if (intEl && siblings.indexOf(intEl) === -1) {
          /* Insert before the next divider */
          var lastSibling = siblings[siblings.length - 1];
          if (lastSibling && lastSibling.nextSibling) {
            lastSibling.parentNode.insertBefore(intEl, lastSibling.nextSibling);
          }
          siblings.push(intEl);
        }
      }

      /* Apply initial collapsed state */
      if (isCollapsed) {
        siblings.forEach(function(s) { s.classList.add('blamq-section-hidden'); });
      }

      /* Click handler */
      divider.addEventListener('click', function(e) {
        e.stopPropagation();
        var c = divider.querySelector('.blamq-section-chevron');
        var hidden = siblings[0] && siblings[0].classList.contains('blamq-section-hidden');
        siblings.forEach(function(s) {
          if (hidden) s.classList.remove('blamq-section-hidden');
          else s.classList.add('blamq-section-hidden');
        });
        if (hidden) { c.classList.remove('collapsed'); settingsState[name] = false; }
        else { c.classList.add('collapsed'); settingsState[name] = true; }
      });
    });

    settingsApplied = true;

    /* Hide blamq items that shouldn't show on settings */
    var tpl = document.getElementById('blamq-templates');
    if (tpl) tpl.style.display = 'none';
    sidebar.querySelectorAll('.blamq-folder-toggle, .blamq-folder-body').forEach(function(el) {
      el.style.display = 'none';
    });
  }

  /* ── Main ── */
  function applyblamq() {
    var sidebar = document.getElementById('sidebar-v2');
    if (!sidebar) return;
    /* On settings page, apply collapsible sections instead */
    if (isSettingsPage()) {
      applySettingsCollapse();
      return;
    }

    var nav = sidebar.querySelector('.hl_nav-header nav');
    if (!nav || nav.querySelectorAll('a').length < 3) return;
    /* Reset settings flag when leaving settings */
    settingsApplied = false;

    /* Clean previous injections */
    sidebar.querySelectorAll('[data-blamq]').forEach(function(el) {
      if (el.classList.contains('blamq-folder-body')) {
        while (el.firstChild) nav.appendChild(el.firstChild);
      }
      el.remove();
    });

    var base = getBasePath();

    /* ── Inject Templates link ── */
    if (!document.getElementById('blamq-templates')) {
      var tpl = document.createElement('a');
      tpl.id = 'blamq-templates';
      tpl.href = base + '/conversations/templates?tab=folders&page=1&size=20';
      tpl.setAttribute('data-blamq', '1');
      tpl.className = 'w-full group px-3 flex items-center justify-start lg:justify-start xl:justify-start text-sm font-medium rounded-md cursor-pointer py-2 md:py-2';
      tpl.innerHTML = '<span class="h-5 w-5 mr-2 lg:mr-2 xl:mr-2" style="display:inline-flex;align-items:center;justify-content:center;"><i class="fas fa-file-alt" style="font-size:15px"></i></span><span class="hl_text-overflow sm:hidden md:hidden nav-title lg:block xl:block">Templates</span>';
      /* Only active if on templates page */
      if (window.location.pathname.match(/\/conversations\/templates(\/|$)/)) {
        tpl.classList.add('blamq-active');
        /* Remove active from Conversations since we're on templates sub-page */
        var convEl = document.getElementById('sb_conversations');
        if (convEl) {
          convEl.classList.remove('active', 'exact-active');
        }
      }
      tpl.addEventListener('click', function(e) {
        e.preventDefault();
        /* Mark as active immediately */
        tpl.classList.add('blamq-active');
        var convEl = document.getElementById('sb_conversations');
        if (convEl) convEl.classList.remove('active', 'exact-active');
        /* Navigate */
        try {
          var app = document.getElementById('app');
          if (app && app.__vue_app__) {
            var router = app.__vue_app__.config.globalProperties.$router;
            if (router) { router.push(base + '/conversations/templates?tab=folders&page=1&size=20'); return; }
          }
          if (app && app.__vue__ && app.__vue__.$router) {
            app.__vue__.$router.push(base + '/conversations/templates?tab=folders&page=1&size=20'); return;
          }
        } catch(err) {}
        window.location.assign(base + '/conversations/templates?tab=folders&page=1&size=20');
      });
      nav.appendChild(tpl);
    }

    /* ── Inject "Other Tools" folder ── */
    var toggle = document.createElement('div');
    toggle.className = 'blamq-folder-toggle';
    toggle.setAttribute('data-blamq', '1');
    toggle.style.order = '20';
    toggle.innerHTML = '<svg class="blamq-folder-chevron' + (folderOpen ? ' open' : '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg><span class="blamq-folder-label">Other Tools</span>';

    var body = document.createElement('div');
    body.className = 'blamq-folder-body' + (folderOpen ? '' : ' collapsed');
    body.setAttribute('data-blamq', '1');
    body.style.order = '21';

    toggle.addEventListener('click', function() {
      folderOpen = !folderOpen;
      var chev = toggle.querySelector('.blamq-folder-chevron');
      if (folderOpen) { body.classList.remove('collapsed'); chev.classList.add('open'); }
      else { body.classList.add('collapsed'); chev.classList.remove('open'); }
    });

    nav.appendChild(toggle);

    OTHER_TOOLS_IDS.forEach(function(id) {
      var el = document.getElementById(id);
      if (el) body.appendChild(el);
    });

    nav.appendChild(body);

    /* ── Inject expandable sub-items ── */
    Object.keys(SUB_ITEMS).forEach(function(parentId) {
      var parentEl = document.getElementById(parentId);
      if (!parentEl) return;

      var subs = SUB_ITEMS[parentId];
      var isOpen = !!expandedMenus[parentId];

      /* Add expand button inside the <a> */
      var existing = parentEl.querySelector('.blamq-expand-btn');
      if (!existing) {
        var btn = document.createElement('button');
        btn.className = 'blamq-expand-btn' + (isOpen ? ' open' : '');
        btn.setAttribute('data-blamq', '1');
        btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>';
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          expandedMenus[parentId] = !expandedMenus[parentId];
          var submenu = parentEl.nextElementSibling;
          if (submenu && submenu.classList.contains('blamq-submenu')) {
            if (expandedMenus[parentId]) { submenu.classList.remove('collapsed'); btn.classList.add('open'); }
            else { submenu.classList.add('collapsed'); btn.classList.remove('open'); }
          }
        });
        parentEl.style.position = 'relative';
        parentEl.appendChild(btn);
      }

      /* Create submenu div right after the parent <a> */
      var subId = 'blamq-sub-' + parentId;
      var existingSub = document.getElementById(subId);
      if (existingSub) existingSub.remove();

      var submenu = document.createElement('div');
      submenu.id = subId;
      submenu.className = 'blamq-submenu' + (isOpen ? '' : ' collapsed');
      submenu.setAttribute('data-blamq', '1');
      submenu.style.order = parentEl.style.order || getComputedStyle(parentEl).order;

      var currentPath = window.location.pathname;

      subs.forEach(function(sub) {
        var a = document.createElement('a');
        a.href = base + sub.path;
        a.textContent = sub.label;
        if (currentPath.indexOf(sub.path) !== -1) a.classList.add('blamq-sub-active');
        a.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          /* Navigate via GHL's Vue Router by finding the app's router instance */
          var fullPath = base + sub.path;
          try {
            /* Try Vue Router push via the app instance */
            var app = document.getElementById('app');
            if (app && app.__vue_app__) {
              var router = app.__vue_app__.config.globalProperties.$router;
              if (router) {
                router.push(fullPath);
                return;
              }
            }
            /* Fallback: try __vue__ on app */
            if (app && app.__vue__ && app.__vue__.$router) {
              app.__vue__.$router.push(fullPath);
              return;
            }
          } catch(err) {}
          /* Last fallback: soft navigation via location assign (still better than href) */
          window.location.assign(fullPath);
        });
        submenu.appendChild(a);
      });

      /* Insert after parent */
      if (parentEl.nextSibling) {
        parentEl.parentNode.insertBefore(submenu, parentEl.nextSibling);
      } else {
        parentEl.parentNode.appendChild(submenu);
      }
    });
  }

  /* ── Persistent observer — watches for nav changes and re-applies ── */
  var lastApplied = 0;

  function checkAndApply() {
    var now = Date.now();
    if (now - lastApplied < 500) return; /* debounce */

    /* Settings page — check if sections need collapsing */
    if (isSettingsPage()) {
      if (!settingsApplied) {
        lastApplied = now;
        applySettingsCollapse();
      }
      /* Always hide blamq items on settings */
      var tpl = document.getElementById('blamq-templates');
      if (tpl) tpl.style.display = 'none';
      document.querySelectorAll('.blamq-folder-toggle, .blamq-folder-body, .blamq-submenu').forEach(function(el) {
        el.style.display = 'none';
      });
      return;
    }

    var nav = document.querySelector('#sidebar-v2 .hl_nav-header nav');
    if (!nav || nav.querySelectorAll('a').length < 5) return;
    /* Check if our folder is missing (GHL re-rendered) */
    var hasFolder = nav.querySelector('[data-blamq]');
    if (!hasFolder) {
      lastApplied = now;
      applyblamq();
    }
    /* Sync Templates active state */
    syncTemplatesActive();
    /* Hide "Send a Review Request" from Quick Actions */
    hideReviewRequest();
  }

  function hideReviewRequest() {
    /* Handled by CSS: #quick-send-review-v2 { display: none } */
  }

  function syncTemplatesActive() {
    var tpl = document.getElementById('blamq-templates');
    if (!tpl) return;
    var onTemplates = window.location.pathname.match(/\/conversations\/templates(\/|$)/);
    if (onTemplates) {
      tpl.classList.add('blamq-active');
      var convEl = document.getElementById('sb_conversations');
      if (convEl) convEl.classList.remove('active', 'exact-active');
    } else {
      tpl.classList.remove('blamq-active');
    }
  }

  /* Persistent poll every 1.5s — catches ALL re-renders including Settings back */
  setInterval(checkAndApply, 1500);

  /* Also watch DOM mutations for faster response */
  var obs = new MutationObserver(function() { checkAndApply(); });
  obs.observe(document.body, { childList: true, subtree: true });

  /* Route change backup */
  window.addEventListener('routeChangeEvent', function() {
    setTimeout(checkAndApply, 300);
    setTimeout(checkAndApply, 800);
    setTimeout(checkAndApply, 2000);
  });

  /* Initial */
  setTimeout(checkAndApply, 500);

  /* ── Load Onboarding Widget ── */
  var obScript = document.createElement('script');
  obScript.src = 'https://dist-iota-one-53.vercel.app/blamq-onboarding.js?v=1';
  document.head.appendChild(obScript);

})();
