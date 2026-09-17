/**
 * Jason Dalton — Rhema Bible Church Portfolio Controller
 * Lightweight Vanilla ES6+ Engine
 * WCAG Compliant Keyboard Handlers, Modal Engine, and Interactive Simulators
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initCampaignTabs();
  initCaseModals();
  initReelSimulator();
  initContactForm();
});

/* 1. Accessible Mobile Menu Navigation */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const nav = document.querySelector('.site-nav');

  if (!toggleBtn || !nav) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    nav.classList.toggle('open');
  });

  // Close navigation when any nav link is tapped
  const navLinks = nav.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* 2. Dynamic Campaign Filter Tabs */
function initCampaignTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  const cards = document.querySelectorAll('.campaign-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const targetCategory = tab.id.replace('tab-', '');

      cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (targetCategory === 'all' || cardCategory === targetCategory) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });
}

/* 3. Modal Lightbox System for Case Study Breakdowns */
const caseStudyData = {
  'modal-case-1': {
    title: 'Case 01: "Rooted & Grounded" Sermon Series Promotion',
    platform: 'Instagram Reels, Carousels & Facebook Community',
    adobeWorkflow: 'Adobe Photoshop (3D key art, high-contrast typography, and 4:5 carousels) & Premiere Pro (15-sec teaser trailers with custom speed ramps).',
    hookVariants: [
      'Contrarian: "Most people pray for fruit when God is asking them to check their roots."',
      'Question: "Are your roots deep enough to survive the storm?"',
      'Theological Anchor: "Faith isn\'t an emotion; it\'s an unshakeable anchor in divine authority."'
    ],
    copySnippet: `You don’t determine the strength of a tree during sunny skies—you discover it when the wind blows.\n\nStarting this Sunday at 10:00 AM, Pastor brings a defining series: "Rooted & Grounded." We are diving deep into Ephesians 3:17.\n\n📍 In-Person: Rhema Bible Church | 1025 W Kenosha St\n💻 Online: Rhema.tv & YouTube Live\n⏰ 10:00 AM & 6:00 PM CST`,
    metrics: '142.8K Reach | 7.4% Engagement Rate | 84 Guest Pre-Registrations'
  },
  'modal-case-2': {
    title: 'Case 02: YouTube Livestream Growth & Concurrent Retention',
    platform: 'YouTube Live (@RhemaUSA/streams)',
    adobeWorkflow: 'Photoshop (custom face-forward high-contrast thumbnails, 3-word title art) & Premiere Pro (5-minute countdown broadcast bumper).',
    hookVariants: [
      'Problem-Centric: "How to Stand in Faith When Circumstances Look Impossible"',
      'Direct Outcome: "Unlocking God’s Authority in Your Daily Life"',
      'Urgency: "Don’t Face This Week Without God’s Word"'
    ],
    copySnippet: `Welcome to Rhema Bible Church! Tune in as we dive into God's Word.\n\n🙏 Need Prayer? Call our prayer line or drop your request into the live chat right now.\n📖 Download Sermon Notes: rhema.cc/notes\n⏰ Timestamps:\n0:00 - Pre-Service Countdown\n5:00 - Worship & Praise\n28:00 - Sermon: Walking in Authority`,
    metrics: '+78.3% Concurrent Viewers (1,200 to 2,140) | 8.6% CTR | 27 Min Avg View Duration'
  },
  'modal-case-3': {
    title: 'Case 03: "Called to Serve" Volunteer Appreciation & Recruitment',
    platform: 'Instagram Reels & Stories / Facebook Community',
    adobeWorkflow: 'Premiere Pro (60-second documentary-style video, L-cuts, punch-in zooms, -14 LUFS audio mastering) & Photoshop (volunteer spotlight polaroids).',
    hookVariants: [
      'POV Style: "You see 90 minutes on Sunday. Here’s what happens at 6:30 AM."',
      'Heart Hook: "Ministry doesn\'t just happen on stage—it happens in the control room."',
      'Inspirational: "God called you to be an active builder in His Kingdom."'
    ],
    copySnippet: `Ministry doesn't just happen on stage. It happens in the control room, the parking lot, the nursery, and every hallway in between.\n\nGod called you to be an active part of the harvest. Tap the link in our bio to find your fit this semester!\n\n#ServeAtRhema #KingdomBuilders`,
    metrics: '+73 New Verified Volunteers | 68.2% Reel Completion Rate | 312 Community Shares'
  },
  'modal-case-4': {
    title: 'Case 04: Rhema Fall Festival & Regional Family Outreach',
    platform: 'Facebook Local Geo-Targeted Ads & Event Pages',
    adobeWorkflow: 'Photoshop (1:1 and 9:16 high-contrast location banners) & Premiere Pro (15-second kinetic text hype cuts).',
    hookVariants: [
      'Community Hook: "Looking for a completely FREE, safe, and unforgettable evening for your kids?"',
      'Value Hook: "50+ Trunk-or-Treat Stations, Inflatables & Food Trucks in Broken Arrow!"',
      'Direct Invitation: "Join thousands of families at Rhema Bible Church this Fall!"'
    ],
    copySnippet: `Join thousands of families from across Broken Arrow and Tulsa for a night packed with fun!\n\n✨ 50+ Trunk-or-Treat Stations\n🏰 Giant Inflatables\n🍔 Local Food Trucks\n\n📅 Friday, Oct 31 | 6:00 PM – 9:00 PM\n📍 Rhema Bible Church Grounds\n🎟 100% FREE Admission!`,
    metrics: '385,000 Local Impressions | 4,200 Event Responses | 112 First-Time Guest Follow-ups'
  }
};

function initCaseModals() {
  const modal = document.getElementById('caseModal');
  const modalBody = document.getElementById('modalDynamicContent');
  const closeBtn = document.getElementById('modalCloseBtn');
  const detailButtons = document.querySelectorAll('.btn-card-details');

  if (!modal || !modalBody || !closeBtn) return;

  detailButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalKey = btn.getAttribute('data-modal');
      const data = caseStudyData[modalKey];

      if (!data) return;

      modalBody.innerHTML = `
        <span class="section-kicker">${data.platform}</span>
        <h2 id="modalTitle" style="font-family: var(--font-serif); font-size: 1.8rem; margin: 0.5rem 0 1rem 0;">${data.title}</h2>
        
        <div style="background: var(--navy-deep); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); margin-bottom: 1.5rem;">
          <strong style="color: var(--gold-primary); font-size: 0.85rem; display: block; margin-bottom: 0.25rem;">ADOBE CC WORKFLOW ENGINE:</strong>
          <p style="font-size: 0.9rem; margin: 0; color: var(--text-main);">${data.adobeWorkflow}</p>
        </div>

        <h3 style="font-size: 1.1rem; margin-bottom: 0.5rem;">Strategic Hook Variants:</h3>
        <ul style="list-style: none; margin-bottom: 1.5rem; font-size: 0.9rem;">
          ${data.hookVariants.map(h => `<li style="margin-bottom: 0.4rem; padding-left: 1rem; position: relative;"><span style="position: absolute; left: 0; color: var(--gold-primary);">➔</span> ${h}</li>`).join('')}
        </ul>

        <h3 style="font-size: 1.1rem; margin-bottom: 0.5rem;">Primary Post Copy Execution:</h3>
        <pre style="background: var(--navy-deep); padding: 1.25rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); font-family: var(--font-sans); white-space: pre-wrap; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.5rem;">${data.copySnippet}</pre>

        <div style="background: rgba(212, 175, 55, 0.1); border: 1px solid var(--gold-primary); padding: 1rem; border-radius: var(--radius-sm); text-align: center;">
          <strong style="color: var(--gold-primary); font-family: var(--font-mono); font-size: 0.95rem;">VERIFIED RESULTS: ${data.metrics}</strong>
        </div>
      `;

      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    });
  });

  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* 4. Interactive 9:16 Reel Simulator */
function initReelSimulator() {
  const likeBtn = document.getElementById('simLikeBtn');
  const countSpan = document.getElementById('simLikeCount');
  const waveBtn = document.getElementById('testInteractionBtn');
  const alertEl = document.getElementById('interactionAlert');

  if (likeBtn && countSpan) {
    let liked = false;
    likeBtn.addEventListener('click', () => {
      liked = !liked;
      if (liked) {
        likeBtn.style.color = '#EF4444';
        countSpan.textContent = '4.9k';
      } else {
        likeBtn.style.color = '#FFFFFF';
        countSpan.textContent = '4.8k';
      }
    });
  }

  if (waveBtn && alertEl) {
    waveBtn.addEventListener('click', () => {
      alertEl.textContent = 'Simulating 450+ live shares across Broken Arrow network...';
      waveBtn.disabled = true;
      setTimeout(() => {
        alertEl.textContent = '✓ 68.2% Completion Rate Reached (Algorithm Threshold Unlocked)';
        waveBtn.disabled = false;
      }, 1500);
    });
  }
}

/* 5. Contact Form Validation & Submission Handler */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');

  if (!form || !feedback) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.senderName.value.trim();
    const email = form.senderEmail.value.trim();
    const message = form.senderMessage.value.trim();

    // Validate inputs
    if (!name || !email || !message) {
      feedback.textContent = 'Please complete all fields before sending.';
      feedback.className = 'form-feedback error';
      return;
    }

    // Format the email subject and body
    const subject = encodeURIComponent(`Interview Request from ${name}`);
    const body = encodeURIComponent(`${message}\n\nContact Email: ${email}`);

    // Trigger the native mail client using your email address
    window.location.href = `mailto:jason.nv.dalton@outlook.com?subject=${subject}&body=${body}`;

    // Update the UI to show success
    feedback.textContent = `Thank you, ${name}! Opening your mail client...`;
    feedback.className = 'form-feedback success';
    form.reset();
  });
}
