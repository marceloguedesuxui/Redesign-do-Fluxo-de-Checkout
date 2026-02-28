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

window.addEventListener('scroll', () => {
    const smartphone = document.querySelector('.smartphone');
    if (smartphone) {
        const scrolled = window.pageYOffset;
        smartphone.style.transform = `rotateY(${-15 + scrolled * 0.02}deg) rotateX(${10 + scrolled * 0.01}deg) translateY(${scrolled * -0.05}px)`;
    }
});
