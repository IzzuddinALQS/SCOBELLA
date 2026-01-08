class ProductCard extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    const name = this.getAttribute("name") || "Fruit Leather";
    const description =
      this.getAttribute("description") || "Delicious fruit leather snack";
    const price = this.getAttribute("price") || "Rp 25.000";
    const image =
      this.getAttribute("image") ||
      "https://huggingface.co/spaces/IzzuddinALQS/fruit-leather-delight/resolve/main/images/scobella.jpeg";
    this.shadowRoot.innerHTML = `
<style>
        .card {
          background: #fff;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          max-width: 100%;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          height: 100%;
cursor: pointer;
        }
        .card:hover {
          transform: translateY(-10px);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        .image-container {
          height: 20rem;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
perspective: 1000px;
          cursor: zoom-in;
        }
        
        .image-wrapper {
          position: relative;
          width: 80%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.5s ease;
        }
        
        .image-container img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: transform 0.3s ease;
          backface-visibility: hidden;
        }
        
        .card:hover .image-wrapper {
          transform: rotateY(10deg) rotateX(5deg);
        }
        
        .card:hover .image-container img {
          transform: scale(1.05);
        }
.content {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          text-align: center;
        }
        
        .title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #7e22ce;
        }
        
        .description {
          color: #6b7280;
          margin-bottom: 1rem;
          flex-grow: 1;
        }
        
        .price {
          font-weight: 700;
          font-size: 1.5rem;
          color: #7e22ce;
          margin-bottom: 1rem;
          display: block;
        }
        
        .button {
          width: 100%;
          background: #7e22ce;
          color: white;
          border: none;
          padding: 0.75rem;
          border-radius: 9999px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .button:hover {
          background: #6d28d9;
          transform: scale(1.05);
        }
        
        .modal {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.9);
          z-index: 1000;
          justify-content: center;
          align-items: center;
        }
        
        .modal-content {
          position: relative;
          max-width: 90%;
          max-height: 90%;
        }
        
        .modal-content img {
          max-width: 100%;
          max-height: 80vh;
          border-radius: 0.5rem;
          animation: zoomIn 0.3s ease;
          cursor: zoom-out;
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
          z-index: 1001;
        }
        
        .zoom-controls {
          position: absolute;
          bottom: 1rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 1rem;
          z-index: 1001;
        }
        
        .zoom-btn {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          font-size: 1.5rem;
          cursor: pointer;
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .zoom-btn:hover {
          background: rgba(255, 255, 255, 0.3);
        }
</style>
      <div class="card">
        <div class="image-container">
          <div class="image-wrapper">
            <img src="${image}" alt="${name}">
          </div>
        </div>
        <div class="content">
          <h3 class="title">${name}</h3>
          <p class="description">${description}</p>
          <span class="price">${price}</span>
          <button class="button">Beli Sekarang</button>
        </div>
      </div>
      
      <div class="modal">
        <span class="close">&times;</span>
        <div class="modal-content">
          <img src="${image}" alt="${name}">
        </div>
        <div class="zoom-controls">
          <button class="zoom-btn" id="zoomOut">-</button>
          <button class="zoom-btn" id="zoomIn">+</button>
        </div>
      </div>
`;

    this.setupModal();
  }

  setupModal() {
    const modal = this.shadowRoot.querySelector(".modal");
    const modalImg = this.shadowRoot.querySelector(".modal-content img");
    const closeBtn = this.shadowRoot.querySelector(".close");
    const imageContainer = this.shadowRoot.querySelector(".image-container");
    const zoomInBtn = this.shadowRoot.getElementById("zoomIn");
    const zoomOutBtn = this.shadowRoot.getElementById("zoomOut");

    let scale = 1;
    const scaleFactor = 0.2;

    imageContainer.addEventListener("click", () => {
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
    });

    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
      scale = 1;
      modalImg.style.transform = `scale(${scale})`;
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
        scale = 1;
        modalImg.style.transform = `scale(${scale})`;
      }
    });

    zoomInBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      scale += scaleFactor;
      modalImg.style.transform = `scale(${scale})`;
    });

    zoomOutBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (scale > scaleFactor) {
        scale -= scaleFactor;
        modalImg.style.transform = `scale(${scale})`;
      }
    });

    // Reset scale when modal is closed
    modal.addEventListener("transitionend", () => {
      if (modal.style.display === "none") {
        scale = 1;
        modalImg.style.transform = `scale(${scale})`;
      }
    });
  }
}

customElements.define("product-card", ProductCard);
