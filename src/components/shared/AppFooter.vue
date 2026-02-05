<template>
  <!-- Desktop Footer -->
  <footer
    class="footer-desktop-web d-none d-lg-flex bg-white shadow-sm rounded-5 px-5"
  >
    <div class="container-fluid d-flex align-items-center px-0">
      <div class="d-flex align-items-center justify-content-between w-100 g-4">
        <!-- Logo Section -->
        <div>
          <div class="logo-section d-flex align-items-center">
            <img
              src="/public/logo.png"
              class="footer-logo me-3"
              alt="Nemovník Logo"
              style="width: 28px; height: 50px; object-fit: cover"
            />
            <span class="footer-brand-name fw-semibold fs-5 text-dark"
              >Nemovník</span
            >
          </div>
        </div>

        <!-- Copyright Section -->
        <div>
          <div
            class="copyright-section border border-light rounded-pill px-4 py-2 d-flex align-items-center"
          >
            <span class="copyright-text text-secondary fs-6 fw-light me-2">
              © 2026 all rights reserved
            </span>
            <span class="company-name text-secondary fs-6 fw-semibold">
              Nemovnik, s.r.o.
            </span>
          </div>
        </div>

        <!-- Footer Links -->
        <div>
          <div class="footer-links d-flex align-items-center gap-3">
            <a
              href="#"
              class="footer-link bg-light rounded-3 px-3 py-2 text-decoration-none"
            >
              <span class="link-text fw-semibold fs-6 text-dark"
                >Terms of Service</span
              >
            </a>
            <a
              href="#"
              class="footer-link bg-light rounded-3 px-3 py-2 text-decoration-none"
            >
              <span class="link-text fw-semibold fs-6 text-dark"
                >Privacy Policy</span
              >
            </a>
            <a
              href="#"
              class="footer-link bg-light rounded-3 px-3 py-2 text-decoration-none"
            >
              <span class="link-text fw-semibold fs-6 text-dark">Security</span>
            </a>
            <a
              href="#"
              class="footer-link bg-light rounded-3 px-3 py-2 text-decoration-none"
            >
              <span class="link-text fw-semibold fs-6 text-dark"
                >Contact Support</span
              >
            </a>
          </div>
        </div>

        <!-- Social Media Links -->
        <div>
          <div class="social-media-links d-flex align-items-center gap-3">
            <button class="social-button bg-light rounded-3 p-2 border-0">
              <i class="fab fa-facebook-f text-dark"></i>
            </button>
            <button class="social-button bg-light rounded-3 p-2 border-0">
              <i class="fab fa-twitter text-dark"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </footer>

  <!-- Mobile Footer -->
  <footer
    class="footer-mobile-web d-lg-none bg-white shadow-sm rounded-5 py-4 px-3 mb-3"
  >
    <div class="container-fluid px-0">
      <!-- Logo and Social Media Row -->
      <div class="row align-items-center justify-content-between mb-4">
        <div class="col-auto">
          <div class="logo-section d-flex align-items-center">
            <img
              src="/public/logo.png"
              class="footer-logo me-2"
              alt="Nemovník Logo"
              style="width: 24px; height: 40px; object-fit: cover"
            />
            <span class="footer-brand-name fw-semibold fs-6 text-dark"
              >Nemovník</span
            >
          </div>
        </div>
        <div class="col-auto">
          <div class="social-media-links d-flex align-items-center gap-2">
            <button class="social-button bg-light rounded-3 p-2 border-0">
              <i class="fab fa-facebook-f text-dark"></i>
            </button>
            <button class="social-button bg-light rounded-3 p-2 border-0">
              <i class="fab fa-twitter text-dark"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Footer Links Grid -->
      <div class="row g-2 mb-3">
        <div class="col-6">
          <a
            href="#"
            class="footer-link-mobile bg-light rounded-3 p-2 text-center d-block text-decoration-none"
          >
            <span class="link-text fw-semibold fs-6 text-dark"
              >Terms of Service</span
            >
          </a>
        </div>
        <div class="col-6">
          <a
            href="#"
            class="footer-link-mobile bg-light rounded-3 p-2 text-center d-block text-decoration-none"
          >
            <span class="link-text fw-semibold fs-6 text-dark"
              >Privacy Policy</span
            >
          </a>
        </div>
        <div class="col-6">
          <a
            href="#"
            class="footer-link-mobile bg-light rounded-3 p-2 text-center d-block text-decoration-none"
          >
            <span class="link-text fw-semibold fs-6 text-dark">Security</span>
          </a>
        </div>
        <div class="col-6">
          <a
            href="#"
            class="footer-link-mobile bg-light rounded-3 p-2 text-center d-block text-decoration-none"
          >
            <span class="link-text fw-semibold fs-6 text-dark"
              >Contact Support</span
            >
          </a>
        </div>
      </div>

      <!-- Copyright Section -->
      <div class="row">
        <div class="col-12">
          <div
            class="copyright-section-mobile border border-light rounded-pill px-3 py-2 text-center"
          >
            <span class="copyright-text text-secondary fs-6 fw-light">
              © 2026 all rights reserved
            </span>
            <span class="company-name text-secondary fs-6 fw-semibold ms-1">
              Nemovnik, s.r.o.
            </span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup></script>

<style scoped>
/* Shared Styles */
.footer-desktop-web,
.footer-mobile-web {
  margin: 16px 16px 0 16px;

  box-shadow: 0px 5px 15px 0px rgba(223, 222, 203, 0.7) !important;
}

.rounded-5 {
  border-radius: 20px !important;
}

.bg-light {
  background-color: #f7f6f2 !important;
}

.border-light {
  border-color: #f5f4ee !important;
}

.text-dark {
  color: #202020 !important;
}

.text-secondary {
  color: #707070 !important;
}

/* Desktop Footer Specific */
.footer-desktop-web {
  height: 80px;
}

.footer-brand-name {
  color: #33454c;
  line-height: 20px;
}

.footer-link {
  height: 40px;
  transition: all 0.2s ease;
}

.footer-link:hover {
  background-color: #efeee6 !important;
}

.link-text {
  color: #202020;
  line-height: 100%;
}

.social-button {
  width: 40px;
  height: 40px;
  transition: all 0.2s ease;
}

.social-button:hover {
  background-color: #efeee6 !important;
  transform: translateY(-2px);
}

/* Mobile Footer Specific */
.footer-mobile-web {
  min-height: auto;
}

.footer-link-mobile {
  height: 40px;
  transition: all 0.2s ease;
}

.footer-link-mobile:hover {
  background-color: #efeee6 !important;
}

.copyright-section-mobile {
  border-width: 1.5px !important;
}

/* Responsive Adjustments */
@media (max-width: 1200px) {
  .footer-desktop-web {
    padding: 20px 24px !important;
  }

  .footer-links {
    gap: 12px;
  }

  .footer-link {
    padding: 0.5rem 0.75rem !important;
  }

  .link-text {
    font-size: 13px !important;
  }
}

@media (max-width: 992px) {
  .footer-desktop-web {
    padding: 16px 20px !important;
  }

  .footer-brand-name {
    font-size: 16px !important;
  }

  .copyright-text,
  .company-name {
    font-size: 13px !important;
  }

  .footer-links {
    gap: 8px;
  }

  .footer-link {
    padding: 0.375rem 0.625rem !important;
  }
}

@media (max-width: 768px) {
  .footer-mobile-web {
    padding: 16px !important;
  }

  .footer-brand-name {
    font-size: 14px !important;
  }

  .link-text {
    font-size: 12px !important;
  }

  .copyright-text,
  .company-name {
    font-size: 12px !important;
  }

  .footer-link-mobile {
    padding: 0.5rem !important;
  }
}

@media (max-width: 576px) {
  .footer-mobile-web {
    padding: 12px !important;
  }

  .footer-logo {
    width: 20px !important;
    height: 35px !important;
  }

  .footer-brand-name {
    font-size: 13px !important;
  }

  .link-text {
    font-size: 11px !important;
  }

  .social-button {
    width: 36px;
    height: 36px;
  }
}
</style>
