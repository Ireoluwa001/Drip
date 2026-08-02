// landing -> signup / login -> app flow
var landingScreen = document.getElementById('landingScreen');
var loginScreen = document.getElementById('loginScreen');
var signupScreen = document.getElementById('signupScreen');
var appShell = document.getElementById('appShell');

function hideAllAuthScreens() {
  landingScreen.style.display = 'none';
  loginScreen.style.display = 'none';
  signupScreen.style.display = 'none';
  appShell.style.display = 'none';
}

function showLanding() {
  hideAllAuthScreens();
  landingScreen.style.display = 'flex';
}

function showLogin() {
  hideAllAuthScreens();
  loginScreen.style.display = 'flex';
}

function showSignup() {
  hideAllAuthScreens();
  signupScreen.style.display = 'flex';
}

function showApp() {
  hideAllAuthScreens();
  appShell.style.display = 'grid';
}

document.getElementById('getStartedBtn').addEventListener('click', showSignup);
document.getElementById('landingLoginBtn').addEventListener('click', showLogin);
document.getElementById('loginBackBtn').addEventListener('click', showLanding);
document.getElementById('signupBackBtn').addEventListener('click', showLanding);
document.getElementById('signupLink').addEventListener('click', showSignup);
document.getElementById('loginLink').addEventListener('click', showLogin);

document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();
  showApp();
});

document.getElementById('signupForm').addEventListener('submit', function (e) {
  e.preventDefault();
  showApp();
});

// simple reusable toast
function showToast(message) {
  var toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(function () {
    toast.classList.remove('show');
  }, 2600);
}

// switch between page sections
var navItems = document.querySelectorAll('.nav-item');
var navLinks = document.querySelectorAll('.nav-link');
var sections = document.querySelectorAll('.page-section');

function showSection(target) {
  for (var i = 0; i < sections.length; i++) {
    sections[i].classList.toggle('active', sections[i].id === target);
  }
  for (var j = 0; j < navItems.length; j++) {
    navItems[j].classList.toggle('active', navItems[j].getAttribute('data-target') === target);
  }
  var sidebar = document.getElementById('sidebar');
  sidebar.classList.remove('open');
  window.scrollTo(0, 0);
}

for (var i = 0; i < navItems.length; i++) {
  navItems[i].addEventListener('click', function () {
    showSection(this.getAttribute('data-target'));
  });
}

for (var i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener('click', function () {
    showSection(this.getAttribute('data-target'));
  });
}

// mobile sidebar toggle
var menuToggle = document.getElementById('menuToggle');
var sidebar = document.getElementById('sidebar');
if (menuToggle) {
  menuToggle.addEventListener('click', function () {
    sidebar.classList.toggle('open');
  });
}

// savings challenges: add buttons
var addButtons = document.querySelectorAll('.add-btn');
for (var i = 0; i < addButtons.length; i++) {
  addButtons[i].addEventListener('click', function () {
    var card = this.closest('.card');
    var fill = card.querySelector('.progress-fill');
    var currentWidth = parseInt(fill.style.width) || 0;
    var newWidth = Math.min(currentWidth + 10, 100);
    fill.style.width = newWidth + '%';
    showToast('Added to your goal');
  });
}

// savings challenges: join buttons
var joinButtons = document.querySelectorAll('.join-btn');
for (var j = 0; j < joinButtons.length; j++) {
  joinButtons[j].addEventListener('click', function () {
    this.textContent = 'Joined';
    this.classList.remove('btn-ghost');
    this.classList.add('btn-primary');
    showToast('You joined the challenge');
  });
}

// group savings: contribute buttons
var contributeButtons = document.querySelectorAll('.contribute-btn');
for (var i = 0; i < contributeButtons.length; i++) {
  contributeButtons[i].addEventListener('click', function () {
    var card = this.closest('.card');
    var fill = card.querySelector('.progress-fill');
    var currentWidth = parseInt(fill.style.width) || 0;
    var newWidth = Math.min(currentWidth + 8, 100);
    fill.style.width = newWidth + '%';
    showToast('Contribution added to the group');
  });
}

// group savings: create group form
var groupForm = document.getElementById('groupForm');
if (groupForm) {
  groupForm.addEventListener('submit', function (e) {
    e.preventDefault();
    showToast('Group created — invites sent');
    groupForm.reset();
  });
}

// marketplace: filter deals by tab
var tabButtons = document.querySelectorAll('.tab-btn');
var dealCards = document.querySelectorAll('.deal-card');
for (var i = 0; i < tabButtons.length; i++) {
  tabButtons[i].addEventListener('click', function () {
    for (var j = 0; j < tabButtons.length; j++) {
      tabButtons[j].classList.remove('active');
    }
    this.classList.add('active');
    var filter = this.getAttribute('data-filter');
    for (var k = 0; k < dealCards.length; k++) {
      var category = dealCards[k].getAttribute('data-category');
      dealCards[k].style.display = (filter === 'all' || filter === category) ? 'block' : 'none';
    }
  });
}

// marketplace: claim deal buttons
var claimButtons = document.querySelectorAll('.claim-btn');
for (var m = 0; m < claimButtons.length; m++) {
  claimButtons[m].addEventListener('click', function () {
    this.textContent = 'Claimed';
    this.classList.remove('btn-ghost');
    this.classList.add('btn-primary');
    showToast('Deal claimed — check your wallet');
  });
}

// investments: invest form
var investForm = document.getElementById('investForm');
var portfolioValueEl = document.getElementById('portfolioValue');
var portfolioValue = 18900;
if (investForm) {
  investForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var amount = parseInt(document.getElementById('investAmount').value) || 0;
    portfolioValue += amount;
    if (portfolioValueEl) {
      portfolioValueEl.textContent = '₦' + portfolioValue.toLocaleString();
    }
    showToast('₦' + amount.toLocaleString() + ' invested successfully');
    investForm.reset();
  });
}

// financial education: start lesson buttons
var startButtons = document.querySelectorAll('.start-btn');
for (var i = 0; i < startButtons.length; i++) {
  startButtons[i].addEventListener('click', function () {
    var card = this.closest('.lesson-card');
    var badge = card.querySelector('.badge');
    badge.textContent = 'Completed';
    badge.classList.remove('badge-muted');
    badge.classList.add('badge-lime');
    this.remove();
    showToast('Lesson complete — nice work');
  });
}

// referrals: copy code
var copyBtn = document.getElementById('copyBtn');
if (copyBtn) {
  copyBtn.addEventListener('click', function () {
    var code = document.getElementById('refCode').textContent;
    navigator.clipboard.writeText(code).then(function () {
      showToast('Referral code copied');
    }).catch(function () {
      showToast('Code: ' + code);
    });
  });
}

// referrals: invite form
var inviteForm = document.getElementById('inviteForm');
if (inviteForm) {
  inviteForm.addEventListener('submit', function (e) {
    e.preventDefault();
    showToast('Invite sent');
    inviteForm.reset();
  });
}

// ===== PROFILE PAGE =====

var editProfileBtn  = document.getElementById('editProfileBtn');
var cancelEditBtn   = document.getElementById('cancelEditBtn');
var profileViewCard = document.getElementById('profileViewCard');
var profileEditCard = document.getElementById('profileEditCard');
var profileForm     = document.getElementById('profileForm');

if (editProfileBtn) {
  editProfileBtn.addEventListener('click', function () {
    profileViewCard.style.display = 'none';
    profileEditCard.style.display = 'block';
    editProfileBtn.style.display  = 'none';
  });
}

if (cancelEditBtn) {
  cancelEditBtn.addEventListener('click', function () {
    profileViewCard.style.display = 'block';
    profileEditCard.style.display = 'none';
    editProfileBtn.style.display  = '';
  });
}

if (profileForm) {
  profileForm.addEventListener('submit', function (e) {
    e.preventDefault();
    profileViewCard.style.display = 'block';
    profileEditCard.style.display = 'none';
    editProfileBtn.style.display  = '';
    showToast('Profile updated');
  });
}