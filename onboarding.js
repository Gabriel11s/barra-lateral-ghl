/* =============================================
   blamq ONBOARDING WIDGET v1
   Floating button, slide-out panel, Driver.js tours
   ============================================= */
(function() {
  'use strict';

  /* ── Config ── */
  var SUPABASE_URL = 'https://tbziahcpkrfiksqhuhpe.supabase.co';
  var SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRiemlhaGNwa3JmaWtzcWh1aHBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2MDIyOTAsImV4cCI6MjA3NzE3ODI5MH0.17eqja9Gab-K757ZGy5WvDvVngXzDGvFV1WSlirwJX4';
  var API_BASE = SUPABASE_URL + '/rest/v1/onboarding_progress';
  var WIDGET_BASE = 'https://dist-iota-one-53.vercel.app';

  /* ── i18n ── */
  var T = {
    pt: {
      title: 'Configuração Inicial',
      subtitle: 'Complete os passos para configurar',
      configSection: 'CONFIGURAÇÃO',
      overviewSection: 'TOUR DA PLATAFORMA',
      stepsOf: 'de',
      stepsCompleted: 'concluídos',
      finish: 'Finalizar Onboarding',
      congrats: 'Parabéns!',
      congratsText: 'Você completou toda a configuração inicial. Sua conta está pronta para uso!',
      dismissBtn: 'Começar a usar',
      next: 'Próximo',
      prev: 'Anterior',
      done: 'Entendi',
      steps: {
        profile_setup: {
          title: 'Perfil da Empresa',
          desc: 'Configure nome, telefone e endereço',
          tour: [
            { title: 'Perfil da Empresa', description: 'Aqui você configura as informações básicas da sua empresa como nome, telefone, endereço e logotipo. Preencha todos os campos para que seus clientes possam identificar sua empresa.' }
          ]
        },
        add_users: {
          title: 'Adicionar Equipe',
          desc: 'Convide membros da sua equipe',
          tour: [
            { title: 'Sua Equipe', description: 'Adicione membros da sua equipe para que possam acessar a plataforma e gerenciar atendimentos. Clique em "Add Employee" para convidar alguém.' }
          ]
        },
        working_hours: {
          title: 'Configurar Calendário',
          desc: 'Defina horários e disponibilidade',
          tour: [
            { title: 'Calendários', description: 'Configure seus calendários, horários de disponibilidade e preferências de agendamento. Isso permite que seus clientes marquem reuniões com você.' }
          ]
        },
        connect_whatsapp: {
          title: 'Conectar WhatsApp',
          desc: 'Configure a integração do WhatsApp',
          tour: [
            { title: 'WhatsApp', description: 'Conecte seu WhatsApp para receber e enviar mensagens diretamente pela plataforma. Siga as instruções na tela para vincular seu número.' }
          ]
        },
        connect_integrations: {
          title: 'Conectar Integrações',
          desc: 'Google, Zoom e outras integrações',
          tour: [
            { title: 'Integrações', description: 'Conecte suas ferramentas favoritas como Google Calendar, Gmail, Zoom e muito mais. Isso permite sincronizar dados automaticamente.' }
          ]
        },
        dashboard_tour: {
          title: 'Painel Principal',
          desc: 'Visão geral das métricas',
          tour: [
            { title: 'Dashboard', description: 'Este é seu painel principal. Aqui você vê as métricas mais importantes do seu negócio — leads, conversas, agendamentos e muito mais, tudo em tempo real.' }
          ]
        },
        conversations_tour: {
          title: 'Conversas',
          desc: 'Central de mensagens',
          tour: [
            { title: 'Central de Conversas', description: 'Gerencie todas as suas conversas com clientes em um só lugar. E-mail, SMS, WhatsApp, Instagram e mais — tudo unificado aqui.' }
          ]
        },
        contacts_tour: {
          title: 'Contatos',
          desc: 'Gerencie seus contatos',
          tour: [
            { title: 'Seus Contatos', description: 'Veja e gerencie todos os seus contatos e leads. Use Smart Lists para criar segmentos inteligentes e filtrar sua base de dados.' }
          ]
        },
        opportunities_tour: {
          title: 'Oportunidades',
          desc: 'Pipeline de vendas',
          tour: [
            { title: 'Pipeline de Vendas', description: 'Gerencie seu pipeline de vendas visualmente. Arraste oportunidades entre as etapas para acompanhar o progresso de cada negociação.' }
          ]
        },
        automation_tour: {
          title: 'Automação',
          desc: 'Workflows automáticos',
          tour: [
            { title: 'Automação', description: 'Crie fluxos de trabalho automáticos para tarefas repetitivas. Envie e-mails, SMS, atualize contatos e muito mais — tudo automaticamente.' }
          ]
        }
      }
    },
    en: {
      title: 'Initial Setup',
      subtitle: 'Complete the steps to set up your account',
      configSection: 'CONFIGURATION',
      overviewSection: 'PLATFORM TOUR',
      stepsOf: 'of',
      stepsCompleted: 'completed',
      finish: 'Finish Onboarding',
      congrats: 'Congratulations!',
      congratsText: 'You\'ve completed the initial setup. Your account is ready to use!',
      dismissBtn: 'Start using',
      next: 'Next',
      prev: 'Previous',
      done: 'Got it',
      steps: {
        profile_setup: {
          title: 'Business Profile',
          desc: 'Set up name, phone and address',
          tour: [{ title: 'Business Profile', description: 'Configure your business information including name, phone, address and logo. Fill in all fields so your clients can identify your business.' }]
        },
        add_users: {
          title: 'Add Team Members',
          desc: 'Invite your team members',
          tour: [{ title: 'Your Team', description: 'Add team members so they can access the platform and manage customer interactions. Click "Add Employee" to invite someone.' }]
        },
        working_hours: {
          title: 'Set Up Calendar',
          desc: 'Configure hours and availability',
          tour: [{ title: 'Calendars', description: 'Set up your calendars, availability hours and scheduling preferences. This allows your clients to book meetings with you.' }]
        },
        connect_whatsapp: {
          title: 'Connect WhatsApp',
          desc: 'Set up WhatsApp integration',
          tour: [{ title: 'WhatsApp', description: 'Connect your WhatsApp to send and receive messages directly from the platform. Follow the on-screen instructions to link your number.' }]
        },
        connect_integrations: {
          title: 'Connect Integrations',
          desc: 'Google, Zoom and other integrations',
          tour: [{ title: 'Integrations', description: 'Connect your favorite tools like Google Calendar, Gmail, Zoom and more. This enables automatic data synchronization.' }]
        },
        dashboard_tour: {
          title: 'Dashboard',
          desc: 'Key metrics overview',
          tour: [{ title: 'Dashboard', description: 'This is your main dashboard. See your most important business metrics — leads, conversations, bookings and more, all in real time.' }]
        },
        conversations_tour: {
          title: 'Conversations',
          desc: 'Message center',
          tour: [{ title: 'Conversation Center', description: 'Manage all your customer conversations in one place. Email, SMS, WhatsApp, Instagram and more — all unified here.' }]
        },
        contacts_tour: {
          title: 'Contacts',
          desc: 'Manage your contacts',
          tour: [{ title: 'Your Contacts', description: 'View and manage all your contacts and leads. Use Smart Lists to create intelligent segments and filter your database.' }]
        },
        opportunities_tour: {
          title: 'Opportunities',
          desc: 'Sales pipeline',
          tour: [{ title: 'Sales Pipeline', description: 'Manage your sales pipeline visually. Drag opportunities between stages to track the progress of each deal.' }]
        },
        automation_tour: {
          title: 'Automation',
          desc: 'Automated workflows',
          tour: [{ title: 'Automation', description: 'Create automated workflows for repetitive tasks. Send emails, SMS, update contacts and more — all automatically.' }]
        }
      }
    }
  };

  /* ── Steps definition ── */
  var CONFIG_STEPS = [
    { id: 'profile_setup', icon: 'fas fa-building', path: '/settings/company' },
    { id: 'add_users', icon: 'fas fa-users', path: '/settings/staff/team' },
    { id: 'working_hours', icon: 'fas fa-clock', path: '/settings/calendars' },
    { id: 'connect_whatsapp', icon: 'fab fa-whatsapp', path: '/settings/phone-system' },
    { id: 'connect_integrations', icon: 'fas fa-plug', path: '/settings/lc-integrations' }
  ];

  var OVERVIEW_STEPS = [
    { id: 'dashboard_tour', icon: 'fas fa-chart-line', path: '/dashboard' },
    { id: 'conversations_tour', icon: 'fas fa-comments', path: '/conversations' },
    { id: 'contacts_tour', icon: 'fas fa-address-book', path: '/contacts' },
    { id: 'opportunities_tour', icon: 'fas fa-trophy', path: '/opportunities/pipeline' },
    { id: 'automation_tour', icon: 'fas fa-bolt', path: '/automation/workflows' }
  ];

  var ALL_STEPS = CONFIG_STEPS.concat(OVERVIEW_STEPS);
  var TOTAL_STEPS = ALL_STEPS.length;

  /* ── State ── */
  var state = {
    locationId: null,
    show: false,
    panelOpen: false,
    steps: {},
    lang: 'pt',
    driverLoaded: false,
    celebrating: false
  };

  /* ── Helpers ── */
  function getLocationId() {
    var m = window.location.pathname.match(/\/v2\/location\/([^\/]+)/);
    return m ? m[1] : null;
  }

  function getBasePath() {
    var m = window.location.pathname.match(/\/v2\/location\/[^\/]+/);
    return m ? m[0] : '';
  }

  function t(key) {
    var lang = T[state.lang] || T.pt;
    return lang[key] || key;
  }

  function tStep(stepId) {
    var lang = T[state.lang] || T.pt;
    return lang.steps[stepId] || { title: stepId, desc: '', tour: [] };
  }

  function completedCount() {
    var count = 0;
    ALL_STEPS.forEach(function(s) { if (state.steps[s.id]) count++; });
    return count;
  }

  function allDone() {
    return ALL_STEPS.every(function(s) { return state.steps[s.id]; });
  }

  function detectLang() {
    var lang = (navigator.language || 'pt').substring(0, 2).toLowerCase();
    return lang === 'en' ? 'en' : 'pt';
  }

  /* ── Supabase REST ── */
  function supaFetch(method, query, body) {
    var url = API_BASE + (query || '');
    var headers = {
      'apikey': SUPABASE_KEY,
      'Authorization': 'Bearer ' + SUPABASE_KEY,
      'Content-Type': 'application/json'
    };
    if (method === 'PATCH') headers['Prefer'] = 'return=representation';
    var opts = { method: method, headers: headers };
    if (body) opts.body = JSON.stringify(body);
    return fetch(url, opts)
      .then(function(r) { return r.json(); })
      .catch(function() { return null; });
  }

  /* ── Load status ── */
  function loadStatus() {
    var locId = getLocationId();
    if (!locId) return;
    state.locationId = locId;

    supaFetch('GET', '?location_id=eq.' + locId + '&select=*').then(function(data) {
      if (!data || !Array.isArray(data) || data.length === 0) {
        state.show = false;
        return;
      }
      var row = data[0];
      if (row.completed_at) {
        state.show = false;
        return;
      }
      state.show = true;
      state.lang = row.lang || detectLang();
      state.steps = {
        profile_setup: !!row.profile_setup,
        add_users: !!row.add_users,
        working_hours: !!row.working_hours,
        connect_whatsapp: !!row.connect_whatsapp,
        connect_integrations: !!row.connect_integrations,
        dashboard_tour: !!row.dashboard_tour,
        conversations_tour: !!row.conversations_tour,
        contacts_tour: !!row.contacts_tour,
        opportunities_tour: !!row.opportunities_tour,
        automation_tour: !!row.automation_tour
      };
      renderWidget();
    });
  }

  /* ── Save step ── */
  function saveStep(stepId) {
    var update = { updated_at: new Date().toISOString() };
    update[stepId] = true;
    supaFetch('PATCH', '?location_id=eq.' + state.locationId, update);
    state.steps[stepId] = true;
    renderWidget();
  }

  /* ── Mark completed ── */
  function markCompleted() {
    supaFetch('PATCH', '?location_id=eq.' + state.locationId, {
      completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }).then(function() {
      state.show = false;
      cleanup();
    });
  }

  function cleanup() {
    ['blamq-onboarding-btn', 'blamq-onboarding-panel', 'blamq-onboarding-overlay'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) el.remove();
    });
  }

  /* ── Navigate via Vue Router ── */
  function navigateTo(path) {
    var base = getBasePath();
    var fullPath = base + path;
    try {
      var app = document.getElementById('app');
      if (app && app.__vue_app__) {
        var router = app.__vue_app__.config.globalProperties.$router;
        if (router) { router.push(fullPath); return; }
      }
      if (app && app.__vue__ && app.__vue__.$router) {
        app.__vue__.$router.push(fullPath); return;
      }
    } catch (e) {}
    window.location.assign(fullPath);
  }

  /* ── Driver.js ── */
  function loadDriverJS(cb) {
    if (state.driverLoaded && window.driver) { cb(); return; }
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/driver.js@1.3.1/dist/driver.css';
    document.head.appendChild(link);

    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/driver.js@1.3.1/dist/driver.js.iife.js';
    script.onload = function() { state.driverLoaded = true; cb(); };
    script.onerror = function() {
      /* Fallback: mark step done without tour */
      cb();
    };
    document.head.appendChild(script);
  }

  function startStep(stepDef) {
    closePanel();
    navigateTo(stepDef.path);

    loadDriverJS(function() {
      /* Wait for page to render */
      setTimeout(function() {
        var stepInfo = tStep(stepDef.id);
        var tourSteps = stepInfo.tour || [];

        if (!window.driver || tourSteps.length === 0) {
          saveStep(stepDef.id);
          return;
        }

        var driverSteps = tourSteps.map(function(ts) {
          return {
            popover: {
              title: ts.title,
              description: ts.description
            }
          };
        });

        var driverObj = window.driver.js.driver({
          showProgress: driverSteps.length > 1,
          showButtons: ['next', 'previous', 'close'],
          nextBtnText: t('next'),
          prevBtnText: t('prev'),
          doneBtnText: t('done'),
          popoverClass: 'blamq-driver-popover',
          overlayColor: 'rgba(0, 0, 0, 0.6)',
          steps: driverSteps,
          onDestroyed: function() {
            saveStep(stepDef.id);
          }
        });

        driverObj.drive();
      }, 1800);
    });
  }

  /* ── Render ── */
  function renderWidget() {
    if (!state.show) return;
    var completed = completedCount();
    var remaining = TOTAL_STEPS - completed;

    /* Floating button */
    var btn = document.getElementById('blamq-onboarding-btn');
    if (!btn) {
      btn = document.createElement('button');
      btn.id = 'blamq-onboarding-btn';
      btn.addEventListener('click', togglePanel);
      document.body.appendChild(btn);
    }
    btn.className = 'blamq-onboarding-btn' + (remaining > 0 ? ' pulse' : '');
    btn.innerHTML = '<i class="fas fa-rocket"></i>' +
      (remaining > 0 ? '<span class="blamq-onboarding-badge">' + remaining + '</span>' : '');

    /* Overlay */
    var overlay = document.getElementById('blamq-onboarding-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'blamq-onboarding-overlay';
      overlay.className = 'blamq-onboarding-overlay';
      overlay.addEventListener('click', closePanel);
      document.body.appendChild(overlay);
    }

    /* Panel */
    var panel = document.getElementById('blamq-onboarding-panel');
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'blamq-onboarding-panel';
      panel.className = 'blamq-onboarding-panel';
      document.body.appendChild(panel);
    }
    if (state.panelOpen) panel.classList.add('open');

    renderPanelContent(panel, completed);
  }

  function renderPanelContent(panel, completed) {
    var html = '';
    var pct = Math.round((completed / TOTAL_STEPS) * 100);

    /* Check if all done — show celebration */
    if (allDone() && !state.celebrating) {
      state.celebrating = true;
    }

    /* Header */
    html += '<div class="blamq-onboarding-header">';
    html += '<div><h2>' + t('title') + '</h2>';
    html += '<div class="blamq-onboarding-header-sub">' + t('subtitle') + '</div></div>';
    html += '<button class="blamq-onboarding-close" id="blamq-ob-close"><i class="fas fa-times"></i></button>';
    html += '</div>';

    /* Progress */
    html += '<div class="blamq-onboarding-progress">';
    html += '<div class="blamq-onboarding-progress-text">' + completed + ' ' + t('stepsOf') + ' ' + TOTAL_STEPS + ' ' + t('stepsCompleted') + '</div>';
    html += '<div class="blamq-onboarding-progress-bar"><div class="blamq-onboarding-progress-fill" style="width:' + pct + '%"></div></div>';
    html += '</div>';

    if (state.celebrating) {
      /* Celebration view */
      html += '<div class="blamq-onboarding-celebration">';
      html += '<div class="blamq-onboarding-celebration-icon">&#127881;</div>';
      html += '<h3>' + t('congrats') + '</h3>';
      html += '<p>' + t('congratsText') + '</p>';
      html += '</div>';
      html += '<div class="blamq-onboarding-footer">';
      html += '<button class="blamq-onboarding-finish-btn" id="blamq-ob-finish">' + t('dismissBtn') + '</button>';
      html += '</div>';
    } else {
      /* Steps list */
      html += '<div class="blamq-onboarding-steps">';

      /* Config section */
      html += '<div class="blamq-onboarding-section">';
      html += '<div class="blamq-onboarding-section-title">' + t('configSection') + '</div>';
      CONFIG_STEPS.forEach(function(step) { html += renderStepItem(step); });
      html += '</div>';

      /* Overview section */
      html += '<div class="blamq-onboarding-section">';
      html += '<div class="blamq-onboarding-section-title">' + t('overviewSection') + '</div>';
      OVERVIEW_STEPS.forEach(function(step) { html += renderStepItem(step); });
      html += '</div>';

      html += '</div>';

      /* Finish button (only when all done, but not celebrating yet — shouldn't happen, but safety) */
      if (allDone()) {
        html += '<div class="blamq-onboarding-footer">';
        html += '<button class="blamq-onboarding-finish-btn" id="blamq-ob-finish">' + t('finish') + '</button>';
        html += '</div>';
      }
    }

    panel.innerHTML = html;
    bindPanelEvents();
  }

  function renderStepItem(step) {
    var info = tStep(step.id);
    var done = state.steps[step.id];
    var cls = 'blamq-onboarding-step' + (done ? ' completed' : '');
    var html = '<div class="' + cls + '" id="blamq-step-' + step.id + '">';
    html += '<div class="blamq-onboarding-step-icon"><i class="' + step.icon + '"></i></div>';
    html += '<div class="blamq-onboarding-step-content">';
    html += '<div class="blamq-onboarding-step-title">' + info.title + '</div>';
    html += '<div class="blamq-onboarding-step-desc">' + info.desc + '</div>';
    html += '</div>';
    html += '<div class="blamq-onboarding-step-status">';
    if (done) {
      html += '<div class="blamq-onboarding-check done"><i class="fas fa-check"></i></div>';
    } else {
      html += '<div class="blamq-onboarding-check pending"></div>';
    }
    html += '</div></div>';
    return html;
  }

  function bindPanelEvents() {
    var closeBtn = document.getElementById('blamq-ob-close');
    if (closeBtn) closeBtn.addEventListener('click', closePanel);

    var finishBtn = document.getElementById('blamq-ob-finish');
    if (finishBtn) finishBtn.addEventListener('click', markCompleted);

    ALL_STEPS.forEach(function(step) {
      var el = document.getElementById('blamq-step-' + step.id);
      if (el && !state.steps[step.id]) {
        el.addEventListener('click', function() { startStep(step); });
      }
    });
  }

  /* ── Panel toggle ── */
  function togglePanel() {
    if (state.panelOpen) closePanel();
    else openPanel();
  }

  function openPanel() {
    state.panelOpen = true;
    var panel = document.getElementById('blamq-onboarding-panel');
    var overlay = document.getElementById('blamq-onboarding-overlay');
    if (panel) { renderPanelContent(panel, completedCount()); panel.classList.add('open'); }
    if (overlay) overlay.classList.add('visible');
  }

  function closePanel() {
    state.panelOpen = false;
    var panel = document.getElementById('blamq-onboarding-panel');
    var overlay = document.getElementById('blamq-onboarding-overlay');
    if (panel) panel.classList.remove('open');
    if (overlay) overlay.classList.remove('visible');
  }

  /* ── Init ── */
  function init() {
    /* Load widget CSS */
    var css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = WIDGET_BASE + '/blamq-onboarding.css?v=1';
    document.head.appendChild(css);

    /* Wait for GHL to fully load */
    setTimeout(loadStatus, 2500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
