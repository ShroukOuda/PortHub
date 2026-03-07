import { Directive, ElementRef, Input, NgZone, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: 'form:not(.no-mouse-follow), input:not(.no-mouse-follow), textarea:not(.no-mouse-follow), select:not(.no-mouse-follow), button:not(.no-mouse-follow), .form-group:not(.no-mouse-follow), mat-form-field:not(.no-mouse-follow)',
  standalone: true
})
export class MouseFollowDirective implements OnInit, OnDestroy {
  @Input() intensity = 0.04;

  private el: HTMLElement;
  private handleMouseMove: ((e: MouseEvent) => void) | null = null;
  private handleMouseLeave: (() => void) | null = null;
  private supportsHover = false;

  constructor(private elRef: ElementRef<HTMLElement>, private ngZone: NgZone) {
    this.el = this.elRef.nativeElement;
  }

  ngOnInit(): void {
    // Only apply on devices that support hover (no touch-only)
    this.supportsHover = window.matchMedia('(hover: hover)').matches;
    if (!this.supportsHover) return;

    this.ngZone.runOutsideAngular(() => {
      this.el.style.transition = 'transform 0.25s ease-out';
      this.el.style.willChange = 'transform';

      this.handleMouseMove = (e: MouseEvent) => {
        const rect = this.el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const offsetX = (e.clientX - centerX) * this.intensity;
        const offsetY = (e.clientY - centerY) * this.intensity;

        // Clamp translation to max 8px and rotation to max 2deg
        const tx = Math.max(-8, Math.min(8, offsetX));
        const ty = Math.max(-8, Math.min(8, offsetY));
        const rx = Math.max(-2, Math.min(2, -offsetY * 0.15));
        const ry = Math.max(-2, Math.min(2, offsetX * 0.15));

        this.el.style.transform = `translate(${tx}px, ${ty}px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      };

      this.handleMouseLeave = () => {
        this.el.style.transform = 'translate(0, 0) rotateX(0) rotateY(0)';
      };

      this.el.addEventListener('mousemove', this.handleMouseMove, { passive: true });
      this.el.addEventListener('mouseleave', this.handleMouseLeave, { passive: true });
    });
  }

  ngOnDestroy(): void {
    if (this.handleMouseMove) {
      this.el.removeEventListener('mousemove', this.handleMouseMove);
    }
    if (this.handleMouseLeave) {
      this.el.removeEventListener('mouseleave', this.handleMouseLeave);
    }
    this.el.style.transform = '';
    this.el.style.transition = '';
    this.el.style.willChange = '';
  }
}
