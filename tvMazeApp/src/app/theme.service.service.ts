import { Injectable, OnInit, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isNightMode = true;
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.renderer.addClass(document.body, 'night-mode');
  }

  toggleMode(): void {
    this.isNightMode = !this.isNightMode;
    if (this.isNightMode) {
      this.renderer.addClass(document.body, 'night-mode');
    } else {
      this.renderer.removeClass(document.body, 'night-mode');
    }
  }

  getMode(): boolean {
    return this.isNightMode;
  }
}
