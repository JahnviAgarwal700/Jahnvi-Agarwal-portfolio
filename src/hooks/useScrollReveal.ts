import { useEffect } from 'react';

/**
 * useScrollReveal Hook
 * 
 * Cinematic Scroll Reveal Engine for Jhanvi Agarwal Portfolio.
 * Implements fluid spring-like deceleration curves, subtle scale + opacity transitions,
 * and automated batch/cascading stagger so elements naturally rise into place as the user scrolls.
 */
export const useScrollReveal = () => {
  useEffect(() => {
    // 1. Accessibility: If user prefers reduced motion, reveal everything immediately
    const prefersReducedMotion =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      document.querySelectorAll('.reveal-on-scroll, [data-reveal]').forEach((el) => {
        el.classList.add('is-revealed');
      });
      return;
    }

    // 2. Automated Stagger assignment for grouped containers
    const setupGroupStaggers = () => {
      const groups = document.querySelectorAll('[data-reveal-group]');
      groups.forEach((group) => {
        const items = group.querySelectorAll('.reveal-on-scroll, [data-reveal]');
        items.forEach((item, idx) => {
          const htmlItem = item as HTMLElement;
          if (!htmlItem.style.getPropertyValue('--stagger-index')) {
            htmlItem.style.setProperty('--stagger-index', `${idx}`);
          }
        });
      });
    };

    setupGroupStaggers();

    // 3. Batch Stagger IntersectionObserver Engine
    // When multiple items intersect simultaneously (e.g. a grid row),
    // they cascade with a rhythmic, continuous 80ms interval.
    let pendingEntries: IntersectionObserverEntry[] = [];
    let batchFrame: number | null = null;

    const processBatch = () => {
      if (pendingEntries.length === 0) return;

      // Sort pending entries primarily by vertical document position, then horizontal
      const entriesToProcess = [...pendingEntries].sort((a, b) => {
        const rectA = a.target.getBoundingClientRect();
        const rectB = b.target.getBoundingClientRect();
        if (Math.abs(rectA.top - rectB.top) > 20) {
          return rectA.top - rectB.top;
        }
        return rectA.left - rectB.left;
      });

      pendingEntries = [];
      batchFrame = null;

      entriesToProcess.forEach((entry, batchIdx) => {
        const target = entry.target as HTMLElement;
        if (target.classList.contains('is-revealed')) return;

        // If no explicit inline delay or group index is set, apply batch index delay
        if (!target.style.transitionDelay && !target.style.getPropertyValue('--stagger-index')) {
          const staggerDelay = Math.min(batchIdx * 85, 340); // Cap at 340ms to keep feeling responsive
          target.style.transitionDelay = `${staggerDelay}ms`;
        }

        target.classList.add('is-revealed');
      });
    };

    const observerCallback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          pendingEntries.push(entry);
          observer.unobserve(entry.target);
        }
      });

      if (pendingEntries.length > 0 && batchFrame === null) {
        batchFrame = requestAnimationFrame(processBatch);
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px 0px -6% 0px', // Trigger slightly before element reaches bottom 6%
      threshold: 0.06,
    });

    // 4. Initial viewport scan: elements already above or in the viewport glide in smoothly
    const allRevealElements = document.querySelectorAll('.reveal-on-scroll, [data-reveal]');
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    const aboveFoldElements: HTMLElement[] = [];

    allRevealElements.forEach((el) => {
      const htmlEl = el as HTMLElement;
      const rect = htmlEl.getBoundingClientRect();

      // Check if element is already in initial view
      if (rect.top < viewportHeight * 0.94 && rect.bottom > 0) {
        aboveFoldElements.push(htmlEl);
      } else {
        observer.observe(htmlEl);
      }
    });

    // Stagger initial above-fold elements with gentle entry
    aboveFoldElements.forEach((el, idx) => {
      if (!el.style.transitionDelay && !el.style.getPropertyValue('--stagger-index')) {
        el.style.transitionDelay = `${Math.min(idx * 70, 350)}ms`;
      }
      // Small timeout to allow paint before triggering CSS transition
      setTimeout(() => {
        el.classList.add('is-revealed');
      }, 50);
    });

    // 5. Cleanup
    return () => {
      if (batchFrame !== null) {
        cancelAnimationFrame(batchFrame);
      }
      observer.disconnect();
    };
  }, []);
};

export default useScrollReveal;
