class WelcomePopup extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10000;
          backdrop-filter: blur(5px);
          animation: fadeIn 0.5s ease-out;
        }
        
        .popup-container {
          background: white;
          border-radius: 20px;
          padding: 2.5rem;
          max-width: 90%;
          width: 500px;
          text-align: center;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          transform: scale(0.9);
          animation: popIn 0.5s 0.2s forwards cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes popIn {
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .logo {
          width: 80px;
          height: 80px;
          margin: 0 auto 1.5rem;
          border-radius: 50%;
          background: linear-gradient(135deg, #7e22ce 0%, #6d28d9 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 2rem;
        }
        
        h2 {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: #7e22ce;
        }
        
        p {
          color: #4b5563;
          line-height: 1.6;
          margin-bottom: 2rem;
          font-size: 1.1rem;
        }
        
        .brand-name {
          font-weight: 700;
          color: #7e22ce;
        }
        
        .brand-purpose {
          font-weight: 600;
          color: #6d28d9;
        }
        
        .btn-start {
          background: linear-gradient(135deg, #7e22ce 0%, #6d28d9 100%);
          color: white;
          border: none;
          padding: 1rem 2rem;
          font-size: 1.1rem;
          font-weight: 600;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px rgba(126, 34, 206, 0.3);
        }
        
        .btn-start:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 15px rgba(126, 34, 206, 0.4);
        }
        
        .btn-start:active {
          transform: translateY(-1px);
        }
        
        .heart {
          color: #ef4444;
          animation: heartbeat 1.5s infinite;
        }
        
        @keyframes heartbeat {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        
        @media (max-width: 640px) {
          .popup-container {
            padding: 1.5rem;
          }
          
          h2 {
            font-size: 1.5rem;
          }
          
          p {
            font-size: 1rem;
          }
        }
      </style>
      
      <div class="popup-overlay">
        <div class="popup-container">
          <div class="logo">
            <span>❤️</span>
          </div>
          <h2>Dibuat dengan Hati, Untuk Kamu. <span class="heart">❤️</span></h2>
          <p>Di <span class="brand-name">SCOBELLA</span>, kami memulai segalanya dari sebuah mimpi untuk <span class="brand-purpose">membuat cemilan sehat tanpa pengawet untuk semua keluarga</span>. Terima kasih sudah mampir dan menjadi bagian dari cerita kami hari ini.</p>
          <button class="btn-start">Ayo Mulai!</button>
        </div>
      </div>
    `;

    // Check if popup has been shown before
    if (!localStorage.getItem("welcomePopupShown")) {
      // Show popup after a short delay
      setTimeout(() => {
        this.showPopup();
      }, 1000);
    }

    this.setupEventListeners();
  }

  showPopup() {
    const overlay = this.shadowRoot.querySelector(".popup-overlay");
    if (overlay) {
      overlay.style.display = "flex";
      document.body.style.overflow = "hidden";
    }
  }

  setupEventListeners() {
    const btnStart = this.shadowRoot.querySelector(".btn-start");
    const overlay = this.shadowRoot.querySelector(".popup-overlay");

    if (btnStart) {
      btnStart.addEventListener("click", () => {
        this.closePopup();
      });
    }

    if (overlay) {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
          this.closePopup();
        }
      });
    }
  }

  closePopup() {
    const overlay = this.shadowRoot.querySelector(".popup-overlay");
    if (overlay) {
      overlay.style.animation = "fadeOut 0.3s ease-out forwards";
      setTimeout(() => {
        overlay.style.display = "none";
        document.body.style.overflow = "auto";
        // Set flag in localStorage so popup doesn't show again
        localStorage.setItem("welcomePopupShown", "true");
      }, 300);
    }
  }
}

customElements.define("welcome-popup", WelcomePopup);
