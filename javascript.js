const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

let currentStep = 'address';

function nextStep(step) {
    document.querySelectorAll('.checkout-accordion').forEach(el => el.classList.remove('active'));
    
    if (step === 'payment') {
        document.getElementById('step-payment').classList.add('active');
        document.getElementById('step-address').classList.add('completed');
        currentStep = 'payment';
    } else if (step === 'confirm') {
        document.getElementById('step-payment').classList.add('completed');
        document.getElementById('step-confirm').classList.add('active');
        currentStep = 'confirm';
        
        setTimeout(() => {
            document.getElementById('pay-btn').scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    }
}

function editStep(step) {
    document.querySelectorAll('.checkout-accordion').forEach(el => {
        el.classList.remove('active');
        el.classList.remove('completed');
    });

    if (step === 'address') {
        document.getElementById('step-address').classList.add('active');
        currentStep = 'address';
    } else if (step === 'payment') {
        document.getElementById('step-payment').classList.add('active');
        document.getElementById('step-address').classList.add('completed');
        currentStep = 'payment';
    } else if (step === 'confirm') {
        document.getElementById('step-confirm').classList.add('active');
        document.getElementById('step-payment').classList.add('completed');
        document.getElementById('step-address').classList.add('completed');
        currentStep = 'confirm';
    }
}

function validatePaymentAndNext() {
    const cvvInput = document.getElementById('cvv-input');
    const cvvGroup = document.getElementById('cvv-group');
    
    if (cvvInput.value.trim() === '') {
        cvvGroup.classList.remove('invalid');
        void cvvGroup.offsetWidth;
        cvvGroup.classList.add('invalid');
    } else {
        cvvGroup.classList.remove('invalid');
        nextStep('confirm');
    }
}

function resetDemo() {
    document.querySelectorAll('.checkout-accordion').forEach(el => {
        el.classList.remove('active');
        el.classList.remove('completed');
    });

    const cvvInput = document.getElementById('cvv-input');
    const cvvGroup = document.getElementById('cvv-group');
    if (cvvInput) cvvInput.value = '';
    if (cvvGroup) cvvGroup.classList.remove('invalid');

    const payBtn = document.getElementById('pay-btn');
    if (payBtn) {
        payBtn.innerHTML = 'Finalizar Pedido';
        payBtn.style.backgroundColor = '';
        payBtn.style.opacity = '1';
        payBtn.style.pointerEvents = 'auto';
    }

    document.getElementById('step-address').classList.add('active');
    currentStep = 'address';
}

const payBtn = document.getElementById('pay-btn');
if (payBtn) {
    payBtn.addEventListener('click', function() {
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';
        this.style.opacity = '0.8';
        this.style.pointerEvents = 'none';

        setTimeout(() => {
            this.innerHTML = 'Pedido Finalizado!';
            this.style.backgroundColor = '#2ecc71';
            this.style.opacity = '1';
            
            setTimeout(() => {
                location.reload();
            }, 3000);
        }, 2000);
    });
}


function wfNavigate(screenId) {
    const screens = document.querySelectorAll('.wf-screen');
    const targetScreen = document.getElementById(screenId);

    if (!targetScreen) return;

    screens.forEach(s => s.classList.remove('active'));
    targetScreen.classList.add('active');

    if (screenId === 'wf-processing') {
        const loading = document.getElementById('wf-status-loading');
        const error = document.getElementById('wf-status-error');
        
        loading.style.display = 'flex';
        error.style.display = 'none';

        setTimeout(() => {
            loading.style.display = 'none';
            error.style.display = 'flex';
        }, 2000); 
    }
}
