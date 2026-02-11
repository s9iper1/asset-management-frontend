<template>
  <nav
    class="horizontal-nav-bar-desktop-web navbar navbar-expand-lg bg-white shadow-sm mb-3"
    :class="{ sticky: isScrolled }"
  >
    <div class="container-fluid px-4">
      <!-- Logo Section -->
      <div class="d-flex align-items-center flex-grow-1">
        <div
          class="logo d-flex align-items-center me-3"
          @click="router.push('/')"
        >
          <img
            src="/logo.png"
            class="image-39"
            alt="Logo"
            style="width: 28px; height: 50px; object-fit: cover"
          />
          <span class="nemovn-k ms-3 fw-semibold fs-5 text-dark">Nemovník</span>
        </div>

        <div
          class="tagline border border-light rounded-pill px-3 py-2 d-none d-xl-flex"
        >
          <span
            class="the-right-place-for-your-properties text-secondary fs-6 fw-light"
          >
            The right place for your properties
          </span>
        </div>
      </div>

      <!-- Desktop Actions Section -->
      <div class="actions d-none d-lg-flex align-items-center gap-3">
        <!-- Notifications -->
        <div
          class="select d-flex align-items-center bg-light rounded-3 px-3 py-2 gap-2 position-relative"
          @click="toggleDropdown('notifications')"
        >
          <span class="notifications fw-semibold fs-6 text-dark"
            >Notifications</span
          >
          <div
            class="counter rounded-circle d-flex align-items-center justify-content-center"
          >
            <span class="text-white fw-semibold" style="font-size: 9px"
              >23</span
            >
          </div>
          <button class="btn menu-icon-btn">
            <i class="fa-solid fa-angle-down"></i>
          </button>
        </div>

        <!-- Help -->
        <div
          class="select d-flex align-items-center bg-light rounded-3 px-3 py-2 gap-2 position-relative"
          @click="toggleDropdown('help')"
        >
          <span class="notifications fw-semibold fs-6 text-dark">Help</span>
          <button class="btn menu-icon-btn">
            <i class="fa-solid fa-angle-down"></i>
          </button>
        </div>

        <!-- Language -->
        <div
          class="select d-flex align-items-center bg-light rounded-3 px-3 py-2 gap-2 position-relative"
          @click="toggleDropdown('language')"
        >
          <span class="notifications fw-semibold fs-6 text-dark">English</span>
          <button class="btn menu-icon-btn">
            <i class="fa-solid fa-angle-down"></i>
          </button>
        </div>

        <!-- Offline Mode -->
        <div
          class="select d-flex align-items-center bg-light rounded-3 px-3 py-2 gap-2 position-relative"
          @click="toggleDropdown('offline')"
        >
          <span class="notifications fw-semibold fs-6 text-dark"
            >Offline mode</span
          >
          <button class="btn menu-icon-btn">
            <i class="fa-solid fa-angle-down"></i>
          </button>
        </div>

        <!-- User Profile with Dropdown -->
        <div class="position-relative">
          <div
            class="select d-flex align-items-center bg-light rounded-3 px-3 py-2 gap-2"
            @click="toggleDropdown('user')"
          >
            <span class="notifications fw-semibold fs-6 text-dark">{{
              authStore.getLoginUserInfo.name
            }}</span>
            <button class="btn menu-icon-btn">
              <i class="fa-solid fa-angle-down"></i>
            </button>
          </div>

          <!-- User Dropdown Menu for Desktop -->
          <div
            v-if="activeDropdown === 'user'"
            class="dropdown-menu-custom show"
            @click.stop
          >
            <a
              href="#"
              class="dropdown-item-custom"
              @click="handleAccountSettings"
            >
              <!-- <i class="fa-solid fa-user me-2"></i> -->
              Account Settings
            </a>
            <a href="#" class="dropdown-item-custom" @click="handleBilling">
              <!-- <i class="fa-solid fa-credit-card me-2"></i> -->
              Billing & Subscription
            </a>
            <a href="#" class="dropdown-item-custom" @click="handleProfile">
              <!-- <i class="fa-solid fa-id-card me-2"></i> -->
              My Profile
            </a>
            <a href="#" class="dropdown-item-custom" @click="handleActivityLog">
              <!-- <i class="fa-solid fa-clock me-2"></i> -->
              Activity Log
            </a>
            <a
              href="#"
              class="dropdown-item-custom logout-item fw-semibold"
              @click="handleLogout"
            >
              Logout
            </a>
          </div>
        </div>
      </div>

      <!-- Mobile Menu Toggle Button -->
      <button
        class="mobile-menu-toggle d-lg-none"
        @click="toggleMobileMenu"
        :class="{ active: isMobileMenuOpen }"
      >
        <span class="menu-text me-2">Menu</span>
        <i class="fa-solid fa-angle-down"></i>
      </button>
    </div>

    <!-- Mobile Menu Overlay -->
    <transition name="fade">
      <div
        v-if="isMobileMenuOpen"
        class="mobile-menu-overlay"
        @click="closeMobileMenu"
      ></div>
    </transition>

    <!-- Mobile Menu Sidebar -->
    <transition name="slide">
      <div v-if="isMobileMenuOpen" class="mobile-menu-sidebar">
        <!-- <div class="mobile-menu-header">
          <div class="d-flex align-items-center">
            <img
              src="/logo.png"
              alt="Logo"
              style="width: 24px; height: 40px; object-fit: cover"
            />
            <span class="nemovn-k ms-2 fw-semibold fs-6 text-dark"
              >Nemovník</span
            >
          </div>
          <button class="mobile-menu-toggle active" @click="closeMobileMenu">
            <span class="menu-text me-2">Menu</span>
            <i class="fa-solid fa-angle-down"></i>
          </button>
        </div> -->

        <div class="mobile-menu-content">
          <!-- Notifications -->
          <div class="mobile-menu-item" @click="handleNotifications">
            <span class="mobile-menu-item-text">Notifications</span>
            <div class="d-flex align-items-center gap-2">
              <div
                class="counter rounded-circle d-flex align-items-center justify-content-center"
              >
                <span class="text-white fw-semibold" style="font-size: 9px"
                  >23</span
                >
              </div>
              <i class="fa-solid fa-angle-right mobile-arrow"></i>
            </div>
          </div>

          <!-- Help -->
          <div class="mobile-menu-item" @click="handleHelp">
            <span class="mobile-menu-item-text">Help</span>
            <i class="fa-solid fa-angle-right mobile-arrow"></i>
          </div>

          <!-- Language -->
          <div class="mobile-menu-item" @click="handleLanguage">
            <span class="mobile-menu-item-text">English</span>
            <i class="fa-solid fa-angle-right mobile-arrow"></i>
          </div>

          <!-- Offline Mode -->
          <div class="mobile-menu-item" @click="handleOfflineMode">
            <span class="mobile-menu-item-text">Offline mode</span>
            <i class="fa-solid fa-angle-right mobile-arrow"></i>
          </div>

          <!-- User Section -->
          <div class="mobile-menu-item user-item" @click="toggleUserSubmenu">
            <span class="mobile-menu-item-text">{{
              authStore.getLoginUserInfo.name
            }}</span>
            <i
              class="fa-solid mobile-arrow"
              :class="isUserSubmenuOpen ? 'fa-angle-down' : 'fa-angle-right'"
            ></i>
          </div>

          <!-- User Submenu -->
          <transition name="submenu">
            <div v-if="isUserSubmenuOpen" class="mobile-submenu">
              <a
                href="#"
                class="mobile-submenu-item"
                @click="handleAccountSettings"
              >
                Account Settings
              </a>
              <a href="#" class="mobile-submenu-item" @click="handleBilling">
                Billing & Subscription
              </a>
              <a href="#" class="mobile-submenu-item" @click="handleProfile">
                My Profile
              </a>
              <a
                href="#"
                class="mobile-submenu-item"
                @click="handleActivityLog"
              >
                Activity Log
              </a>
              <a
                href="#"
                class="mobile-submenu-item logout-submenu-item fw-semibold"
                @click="handleLogout"
              >
                Logout
              </a>
            </div>
          </transition>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import router from "../router";
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();

// Reactive variables
const isMobileMenuOpen = ref(false);
const isUserSubmenuOpen = ref(false);
const activeDropdown = ref(null);
const isScrolled = ref(false);

// Methods
const handleScroll = () => {
  isScrolled.value = window.scrollY > 10;
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  if (!isMobileMenuOpen.value) {
    isUserSubmenuOpen.value = false;
  }
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
  isUserSubmenuOpen.value = false;
};

const toggleUserSubmenu = () => {
  isUserSubmenuOpen.value = !isUserSubmenuOpen.value;
};

const toggleDropdown = (dropdown) => {
  if (activeDropdown.value === dropdown) {
    activeDropdown.value = null;
  } else {
    activeDropdown.value = dropdown;
  }
};

const handleNotifications = () => {
  console.log("Notifications clicked");
  closeMobileMenu();
};

const handleHelp = () => {
  console.log("Help clicked");
  closeMobileMenu();
};

const handleLanguage = () => {
  console.log("Language clicked");
  closeMobileMenu();
};

const handleOfflineMode = () => {
  console.log("Offline mode clicked");
  closeMobileMenu();
};

const handleAccountSettings = () => {
  console.log("Account Settings clicked");
  closeMobileMenu();
  activeDropdown.value = null;
};

const handleBilling = () => {
  console.log("Billing clicked");
  closeMobileMenu();
  activeDropdown.value = null;
};

const handleProfile = () => {
  console.log("Profile clicked");
  closeMobileMenu();
  activeDropdown.value = null;
};

const handleActivityLog = () => {
  console.log("Activity Log clicked");
  closeMobileMenu();
  activeDropdown.value = null;
};

const handleLogout = () => {
  console.log("Logout clicked");
  closeMobileMenu();
  activeDropdown.value = null;

  authStore.logout();
};

// Event handler for closing dropdowns when clicking outside
const handleOutsideClick = (e) => {
  if (
    !e.target.closest(".select") &&
    !e.target.closest(".dropdown-menu-custom")
  ) {
    activeDropdown.value = null;
  }
};

// Lifecycle hooks
onMounted(() => {
  document.addEventListener("click", handleOutsideClick);
  window.addEventListener("scroll", handleScroll);
  // Initialize scroll state
  handleScroll();
});

onUnmounted(() => {
  document.removeEventListener("click", handleOutsideClick);
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.horizontal-nav-bar-desktop-web {
  border-radius: 20px;
  height: 75px;
  box-shadow: 0px 5px 15px 0px rgba(223, 222, 203, 0.7);
}

.logo {
  cursor: pointer;
  width: 131.17px;
  height: 50px;
}

.menu-icon-btn {
  padding: 4px 8px;
  background-color: #eae8de;
  color: #c6c1ae;
  border-radius: 6px;
  border: none;
  font-size: 12px;
}

.menu-icon-btn:hover {
  background-color: #dfddc9;
}

.nemovn-k {
  color: #33454c;
  line-height: 20px;
}

.tagline {
  border-color: #f5f4ee;
  padding: 10px;
}

.the-right-place-for-your-properties {
  color: #707070;
  line-height: 20px;
}

.select {
  background: #f7f6f2 !important;
  height: 40px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.select:hover {
  background: #efeee6 !important;
}

.notifications {
  color: var(--colortext-color, #202020);
  line-height: 100%;
}

.counter {
  background: #1c8089 !important;
  width: 15px;
  height: 15px;
  font-size: 9px;
}

/* Desktop Dropdown Menu */
.dropdown-menu-custom {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
  padding: 8px;
  min-width: 220px;
  z-index: 1000;
  animation: dropdownFadeIn 0.2s ease;
}

@keyframes dropdownFadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-item-custom {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  color: #202020;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.2s ease;
  font-size: 14px;
  font-weight: 500;
}

.dropdown-item-custom:hover {
  background-color: #f7f6f2;
  color: #202020;
}

.dropdown-item-custom i {
  color: #707070;
  font-size: 14px;
}

.dropdown-item-custom.logout-item {
  margin-top: 4px;
  border-top: 1px solid #f5f4ee;
  padding-top: 12px;
}

.dropdown-item-custom.logout-item:hover {
  background-color: #f7f6f2;
}

/* Mobile Menu Toggle Button */
.mobile-menu-toggle {
  background: #f7f6f2;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  color: #202020;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.2s ease;
}

.mobile-menu-toggle:hover {
  background: #efeee6;
}

.mobile-menu-toggle.active {
  background: #eae8de;
}

.mobile-menu-toggle i {
  color: #c6c1ae;
  font-size: 12px;
  transition: transform 0.3s ease;
}

.mobile-menu-toggle.active i {
  transform: rotate(180deg);
}

.menu-text {
  font-size: 14px;
}

/* Mobile Menu Overlay */
/* .mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
} */

/* Mobile Menu Sidebar */
.mobile-menu-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 280px;
  height: 100vh;
  background: #ffffff;
  z-index: 1000;
  box-shadow: -5px 0 20px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
}

.mobile-menu-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 16px;
  border-bottom: 1px solid #f5f4ee;
}

.mobile-menu-content {
  padding: 16px 0;
}

.mobile-menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-bottom: 1px solid #f5f4ee;
}

.mobile-menu-item:hover {
  background-color: #f7f6f2;
}

.mobile-menu-item.user-item {
  background-color: #fffef8;
}

.mobile-menu-item-text {
  color: #202020;
  font-weight: 500;
  font-size: 14px;
}

.mobile-arrow {
  color: #c6c1ae;
  font-size: 12px;
  transition: transform 0.3s ease;
}

/* Mobile Submenu */
.mobile-submenu {
  /* background-color: #f7f6f2; */
  padding: 8px 0;
  border-bottom: 1px solid #f5f4ee;
}

.mobile-submenu-item {
  display: block;
  padding: 12px 20px 12px 40px;
  color: #202020;
  /* color: #1c8089; */
  text-decoration: none;
  font-size: 14px;
  /* font-weight: 500; */
  transition: background-color 0.2s ease;
}

.mobile-submenu-item:hover {
  background-color: #efeee6;
  color: #1c8089;
}

.mobile-submenu-item.logout-submenu-item:hover {
  background-color: #efeee6;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

.submenu-enter-active,
.submenu-leave-active {
  transition: all 0.3s ease;
}

.submenu-enter-from,
.submenu-leave-to {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
}

.submenu-enter-to,
.submenu-leave-from {
  max-height: 300px;
  opacity: 1;
}

/* Responsive adjustments */
@media (max-width: 1200px) {
  .actions {
    gap: 8px;
  }

  .select {
    padding: 0px 8px;
  }

  .notifications {
    font-size: 13px;
  }
}

@media (max-width: 992px) {
  .horizontal-nav-bar-desktop-web {
    height: 65px;
  }

  .tagline {
    display: none !important;
  }
}

@media (max-width: 768px) {
  .horizontal-nav-bar-desktop-web {
    margin: 0 8px;
    top: 8px;
  }

  .container-fluid {
    padding-left: 8px;
    padding-right: 8px;
  }

  .logo {
    width: auto;
  }

  .nemovn-k {
    font-size: 16px;
  }

  .mobile-menu-sidebar {
    width: 250px;
  }
}

@media (max-width: 576px) {
  .horizontal-nav-bar-desktop-web {
    height: 60px;
  }

  .logo {
    height: 40px;
  }

  .image-39 {
    height: 40px;
    width: 24px;
  }

  .nemovn-k {
    font-size: 14px;
  }

  .mobile-menu-sidebar {
    width: 240px;
  }
}
.horizontal-nav-bar-desktop-web {
  position: -webkit-sticky; /* For Safari */
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
  will-change: transform;
}

/* Add shadow and slight background change when scrolled */
.horizontal-nav-bar-desktop-web.sticky {
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
}

/* Ensure mobile menu overlay is positioned correctly */
/* .mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
} */

.mobile-menu-sidebar {
  position: fixed;
  top: 120px;
  left: 50%;
  transform: translate(-50%, -5%);
  width: 100%;
  /* max-width: 400px; */
  height: 85vh;
  max-height: 700px;
  background: #ffffff;
  z-index: 1001;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  overflow-y: auto;
}

/* Fix for Bootstrap navbar */
.navbar {
  position: sticky !important;
}

/* Optional: Add subtle animation when becoming sticky */
@keyframes navSlideDown {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

.horizontal-nav-bar-desktop-web.sticky {
  animation: navSlideDown 0.3s ease;
}

/* Adjust for mobile responsiveness */
@media (max-width: 992px) {
  .horizontal-nav-bar-desktop-web {
    position: sticky;
    top: 0;
  }

  /* Ensure content below nav isn't hidden */
  body {
    padding-top: 65px; /* Adjust based on your nav height */
  }
}

@media (max-width: 768px) {
  body {
    padding-top: 60px; /* Adjust for smaller nav height on mobile */
  }
}
</style>
