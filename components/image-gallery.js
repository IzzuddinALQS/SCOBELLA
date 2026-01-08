class ImageGallery extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        .gallery {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1rem;
          padding: 1rem 0;
        }
        
        .gallery-item {
          border-radius: 0.5rem;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }
        .gallery-item:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
        }
.gallery-item img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          display: block;
        }
        
        .modal {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          z-index: 1000;
          justify-content: center;
          align-items: center;
        }
        
        .modal-content {
          max-width: 90%;
          max-height: 90%;
        }
        .modal-content img {
          max-width: 100%;
          max-height: 80vh;
          border-radius: 0.5rem;
          animation: zoomIn 0.3s ease;
        }
        
        @keyframes zoomIn {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
.close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          color: white;
          font-size: 2rem;
          cursor: pointer;
          background: rgba(0, 0, 0, 0.5);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        @media (max-width: 768px) {
          .gallery {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          }
          
          .gallery-item img {
            height: 150px;
          }
        }
      </style>
      <div class="gallery">
        <div class="gallery-item">
          <img src="https://huggingface.co/spaces/IzzuddinALQS/fruit-leather-delight/resolve/main/images/scobella.jpeg" alt="Scobella Fruit Leather">
        </div>
        <div class="gallery-item">
          <img src="https://huggingface.co/spaces/IzzuddinALQS/fruit-leather-delight/resolve/main/images/scbl.jpeg" alt="Scoby Fruit Leather">
        </div>
        <div class="gallery-item">
          <img src="https://huggingface.co/spaces/IzzuddinALQS/fruit-leather-delight/resolve/main/images/scblaa.jpeg" alt="Scoby Leather Close-up">
        </div>
        <div class="gallery-item">
          <img src="https://huggingface.co/spaces/IzzuddinALQS/fruit-leather-delight/resolve/main/images/scobella.jpeg" alt="Produk 4">
        </div>
        <div class="gallery-item">
          <img src="https://huggingface.co/spaces/IzzuddinALQS/fruit-leather-delight/resolve/main/images/scbl.jpeg" alt="Produk 5">
        </div>
        <div class="gallery-item">
          <img src="https://huggingface.co/spaces/IzzuddinALQS/fruit-leather-delight/resolve/main/images/scblaa.jpeg" alt="Produk 6">
        </div>
      </div>
<div class="modal">
        <span class="close">&times;</span>
        <div class="modal-content">
          <img src="" alt="Full size image">
        </div>
      </div>
    `;

    this.setupEventListeners();
  }

  setupEventListeners() {
    const modal = this.shadowRoot.querySelector(".modal");
    const modalImg = this.shadowRoot.querySelector(".modal-content img");
    const closeBtn = this.shadowRoot.querySelector(".close");
    const galleryItems = this.shadowRoot.querySelectorAll(".gallery-item");

    galleryItems.forEach((item) => {
      item.addEventListener("click", () => {
        const imgSrc = item.querySelector("img").src;
        modalImg.src = imgSrc;
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
      });
    });

    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  }
}

customElements.define("image-gallery", ImageGallery);
