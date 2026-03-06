import { Directive, ElementRef, Input, OnInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private observer: IntersectionObserver | null = null;

  @Input() revealDelay = 0;
  @Input() revealDuration = 700;
  @Input() revealDirection: 'up' | 'down' | 'left' | 'right' | 'scale' = 'up';

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const el = this.el.nativeElement as HTMLElement;
    el.style.opacity = '0';
    el.style.transition = `opacity ${this.revealDuration}ms ease-out, transform ${this.revealDuration}ms ease-out`;
    el.style.transitionDelay = `${this.revealDelay}ms`;

    const translateMap: Record<string, string> = {
      up: 'translateY(40px)',
      down: 'translateY(-40px)',
      left: 'translateX(40px)',
      right: 'translateX(-40px)',
      scale: 'scale(0.92)'
    };
    el.style.transform = translateMap[this.revealDirection] || 'translateY(40px)';

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0) translateX(0) scale(1)';
            this.observer?.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    this.observer.observe(el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
