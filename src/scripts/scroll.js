class Scroll {
  constructor() {
    this._createLenis();
    this._render();
  }

  // first, create lenis then redner lenis
  _createLenis() {
    this.lenis = new Lenis({
      lerp: 0.07,
    });
    this.lenis.stop();
  }

  // Start Lenis after the document is fully loaded
  _onDocumentLoaded() {
    this.lenis.start();
    console.log("lenis has started");
  }

  // after creating lenis, animate scroll
  _render(time) {
    this.lenis.raf(time);
    requestAnimationFrame(this._render.bind(this));
  }
}

window.addEventListener("load", () => {
  console.log("Window was loaded was ran");
  const scroll = new Scroll();
  scroll._onDocumentLoaded(); // Start Lenis animation after the document is fully loaded
  scroll._render(); // Start rendering animation
});
