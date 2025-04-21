document.addEventListener('DOMContentLoaded', function() {
  // Form navigation between steps
  const steps = document.querySelectorAll('.form-step');
  const stepIndicators = document.querySelectorAll('.step');
  
  // Show first step by default
  showStep(1);
  
  // Next step buttons
  document.querySelectorAll('.next-step').forEach(button => {
    button.addEventListener('click', function() {
      const currentStep = this.closest('.form-step');
      const nextStepNum = parseInt(this.dataset.next);
      
      if (validateStep(currentStep.id)) {
        showStep(nextStepNum);
      }
    });
  });
  
  // Previous step buttons
  document.querySelectorAll('.prev-step').forEach(button => {
    button.addEventListener('click', function() {
      const prevStepNum = parseInt(this.dataset.prev);
      showStep(prevStepNum);
    });
  });
  
  
  // OTP input auto-focus
  const otpInputs = document.querySelectorAll('.otp-input');
  otpInputs.forEach((input, index) => {
    input.addEventListener('input', function() {
      if (this.value.length === 1 && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      }
    });
    
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Backspace' && this.value.length === 0 && index > 0) {
        otpInputs[index - 1].focus();
      }
    });
  });
  
  // Toggle password visibility
  document.querySelectorAll('.toggle-password').forEach(icon => {
    icon.addEventListener('click', function() {
      const input = this.previousElementSibling;
      const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
      input.setAttribute('type', type);
      this.classList.toggle('fa-eye-slash');
    });
  });
  
  // Password strength indicator
  const passwordInput = document.getElementById('password');
  const strengthBars = document.querySelectorAll('.strength-bar');
  
  if (passwordInput) {
    passwordInput.addEventListener('input', function() {
      const strength = calculatePasswordStrength(this.value);
      updateStrengthIndicator(strength);
    });
  }
  
  // Resend OTP functionality
  const resendOtpBtn = document.getElementById('resend-otp');
  if (resendOtpBtn) {
    resendOtpBtn.addEventListener('click', function(e) {
      e.preventDefault();
      startResendTimer();
      alert('A new verification code has been sent to your email.');
    });
  }
  
  // Start the initial resend timer
  startResendTimer();
  
  // Functions
  function showStep(stepNum) {
    // Hide all steps
    steps.forEach(step => step.classList.remove('active'));
    
    // Show current step
    document.getElementById(`step-${stepNum}`).classList.add('active');
    
    // Update progress indicators
    stepIndicators.forEach(indicator => {
      indicator.classList.remove('active');
      if (parseInt(indicator.dataset.step) <= stepNum) {
        indicator.classList.add('active');
      }
    });
    
    // Scroll to top of form
    document.querySelector('.signup-form').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  
  function validateStep(stepId) {
    if (stepId === 'step-1') {
      // Validate basic info form
      const requiredFields = document.querySelectorAll('#step-1 [required]');
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = 'var(--error)';
          isValid = false;
        } else {
          field.style.borderColor = '';
        }
      });
      
      // Check password match
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirm-password').value;
      
      if (password !== confirmPassword) {
        document.getElementById('confirm-password').style.borderColor = 'var(--error)';
        alert('Passwords do not match!');
        isValid = false;
      }
      
      // Check terms checkbox
      if (!document.getElementById('terms').checked) {
        alert('You must agree to the Terms of Service and Privacy Policy');
        isValid = false;
      }
      
      return isValid;
    }
    
    if (stepId === 'step-2') {
      // Validate OTP
      const otpValues = Array.from(document.querySelectorAll('.otp-input')).map(input => input.value);
      
      if (otpValues.some(value => !value)) {
        alert('Please enter the complete verification code');
        return false;
      }
      
      // In a real app, you would verify the OTP with your backend here
      return true;
    }
    
    return true;
  }
  
  function calculatePasswordStrength(password) {
    let strength = 0;
    
    // Length check
    if (password.length > 7) strength++;
    if (password.length > 11) strength++;
    
    // Character type checks
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    return Math.min(strength, 3); // Max strength of 3 for our 3 bars
  }
  
  function updateStrengthIndicator(strength) {
    const strengthText = document.querySelector('.strength-text');
    
    strengthBars.forEach((bar, index) => {
      if (index < strength) {
        bar.style.backgroundColor = 
          strength === 1 ? 'var(--error)' : 
          strength === 2 ? '#ff9800' : 'var(--success)';
      } else {
        bar.style.backgroundColor = 'var(--gray-medium)';
      }
    });
    
    strengthText.textContent = 
      strength === 0 ? 'Weak' : 
      strength === 1 ? 'Fair' : 
      strength === 2 ? 'Good' : 'Strong';
    
    strengthText.style.color = 
      strength === 0 ? 'var(--error)' : 
      strength === 1 ? '#ff9800' : 'var(--success)';
  }
  
  function startResendTimer() {
    const resendLink = document.getElementById('resend-otp');
    let seconds = 30;
    
    resendLink.style.pointerEvents = 'none';
    resendLink.style.color = 'var(--text-light)';
    
    const timerInterval = setInterval(() => {
      resendLink.parentElement.innerHTML = 
        `Didn't receive code? <a href="#" id="resend-otp">Resend</a> (${seconds}s)`;
      
      const newResendLink = document.getElementById('resend-otp');
      newResendLink.style.pointerEvents = 'none';
      newResendLink.style.color = 'var(--text-light)';
      
      newResendLink.addEventListener('click', function(e) {
        e.preventDefault();
        startResendTimer();
        alert('A new verification code has been sent to your email.');
      });
      
      seconds--;
      
      if (seconds < 0) {
        clearInterval(timerInterval);
        resendLink.parentElement.innerHTML = 
          `Didn't receive code? <a href="#" id="resend-otp">Resend</a>`;
        
        const finalResendLink = document.getElementById('resend-otp');
        finalResendLink.style.pointerEvents = 'auto';
        finalResendLink.style.color = 'var(--primary)';
        
        finalResendLink.addEventListener('click', function(e) {
          e.preventDefault();
          startResendTimer();
          alert('A new verification code has been sent to your email.');
        });
      }
    }, 1000);
  }
  
});