<template>
  <div
    class="login-container d-flex justify-content-center align-items-center min-vh-100"
  >
    <div class="login-card">
      <!-- Logo Section -->
      <div class="logo-section mb-4">
        <div class="d-flex align-items-center justify-content-center mb-3">
          <img src="/logo.png" class="login-logo" alt="Nemovník Logo" />
          <span class="brand-name ms-1 fw-semibold fs-4">Nemovník</span>
        </div>
        <div class="tagline-container">
          <span class="tagline text-muted fs-6"
            >The right place for your properties</span
          >
        </div>
      </div>

      <!-- Login Form -->
      <div class="form-section">
        <h2 class="login-title mb-4 text-center fw-semibold">Welcome Back</h2>

        <form @submit.prevent="handleLogin" class="login-form">
          <div class="mb-3">
            <label class="form-label fw-medium text-dark mb-2">
              Email Address
            </label>
            <div class="input-group">
              <span class="input-group-text bg-light border-end-0">
                <i class="fa-solid fa-envelope text-muted"></i>
              </span>
              <input
                v-model="email"
                type="email"
                class="form-control border-start-0"
                placeholder="Enter your email"
                required
                :disabled="loading"
              />
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label fw-medium text-dark mb-2">
              Password
            </label>
            <div class="input-group">
              <span class="input-group-text bg-light border-end-0">
                <i class="fa-solid fa-lock text-muted"></i>
              </span>
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                class="form-control border-start-0"
                placeholder="Enter your password"
                required
                :disabled="loading"
              />
              <button
                type="button"
                class="input-group-text bg-light border-start-0"
                @click="showPassword = !showPassword"
                :disabled="loading"
              >
                <i
                  :class="
                    showPassword
                      ? 'fa-solid fa-eye-slash text-muted'
                      : 'fa-solid fa-eye text-muted'
                  "
                ></i>
              </button>
            </div>
          </div>

          <button
            type="submit"
            class="btn w-100 login-btn"
            :class="{ loading: loading }"
            :disabled="loading"
          >
            <span v-if="!loading">
              <i class="fa-solid fa-right-to-bracket me-2"></i>
              Sign In
            </span>
            <span v-else>
              <div class="spinner-border spinner-border-sm me-2" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              Signing In...
            </span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { showError, showSuccess } from "@/utils/toast";

// Form data
const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const showPassword = ref(false);

// UI state
const loading = ref(false);

const router = useRouter();
const auth = useAuthStore();

async function handleLogin() {
  loading.value = true;

  try {
    // Simulate API delay for demo
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await auth.login(email.value, password.value);
    showSuccess("Login successful!");
    router.push("/properties");
  } catch (err) {
    showError("Invalid email or password. Please try again.");
  } finally {
    loading.value = false;
  }
}

function handleForgotPassword() {
  console.log("Forgot password clicked");
  // Implement forgot password logic
}

function handleSignup() {
  console.log("Sign up clicked");
  router.push("/register");
}
</script>

<style scoped>
.login-container {
  background: #f7f6f2;
  min-height: 100vh;
  padding: 20px;
}

.login-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0px 10px 30px rgba(223, 222, 203, 0.4);
  width: 100%;
  max-width: 500px;
  padding: 50px;
  border: 1px solid #f5f4ee;
}

.logo-section {
  text-align: center;
}

.login-logo {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.brand-name {
  color: #33454c;
}

.tagline {
  color: #707070;
  font-weight: 300;
}

.login-title {
  color: #33454c;
  font-size: 28px;
}

/* Form Inputs */
.input-group-text {
  background: #f7f6f2 !important;
  border: 1px solid #f5f4ee;
  color: #c6c1ae;
}

.form-control {
  border: 1px solid #f5f4ee;
  background: white;
  color: #202020;
  padding: 12px;
  height: 45px;
}

.form-control:focus {
  border-color: #1c8089;
  box-shadow: 0 0 0 0.2rem rgba(28, 128, 137, 0.15);
}

.form-control:disabled {
  background-color: #f7f6f2;
  cursor: not-allowed;
}

/* Login Button - Matching your theme */
.login-btn {
  background: #1c8089 !important;
  border: none !important;
  color: white !important;
  font-weight: 600;
  padding: 14px;
  font-size: 16px;
  border-radius: 12px;
  transition: all 0.2s ease;
}

.login-btn:hover:not(:disabled) {
  background: #156c74 !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(28, 128, 137, 0.3);
}

.login-btn:active:not(:disabled) {
  transform: translateY(0);
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Social Buttons */
.social-btn {
  border: 1px solid #f5f4ee;
  background: white;
  color: #33454c;
  padding: 12px;
  border-radius: 12px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.social-btn:hover:not(:disabled) {
  border-color: #dfddc9;
  background: #f7f6f2;
}

.social-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Divider */
.divider {
  position: relative;
  text-align: center;
}

.divider::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #f5f4ee;
  z-index: 1;
}

.divider span {
  position: relative;
  z-index: 2;
  background: white;
  padding: 0 15px;
}

/* Links */
.text-primary {
  color: #1c8089 !important;
}

a.text-primary:hover {
  color: #156c74 !important;
}

/* Alert */
.alert-danger {
  background: #fff5f5;
  border: 1px solid #fed7d7;
  color: #c53030;
  border-radius: 8px;
}

/* Responsive */
@media (max-width: 768px) {
  .login-card {
    padding: 40px 30px;
    margin: 20px;
  }

  .social-login {
    flex-direction: column;
  }
}

@media (max-width: 576px) {
  .login-card {
    padding: 30px 20px;
  }

  .login-title {
    font-size: 24px;
  }
}
</style>
