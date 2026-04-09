/**
 * spark.js — Spark Wonder Design System JS
 * Include after spark.css in any tool's <head>.
 *
 * Usage:
 *   <script src="http://spark-core.ai/assets/spark.js"></script>
 *   <script src="https://ui.spark-core.ai/spark.js"></script>
 *
 * Tool accent — set on <html>:
 *   <html data-tool-accent="#3b82f6">
 *
 * Theme toggle button:
 *   <button onclick="sparkToggleTheme()">Toggle theme</button>
 */

(function () {
  'use strict';

  var STORAGE_KEY = 'spark-theme';

  // ── theme ────────────────────────────────────────────────────────────────────

  function applyTheme(mode) {
    if (mode === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    // dispatch event so tools can react (e.g. update button label)
    document.dispatchEvent(new CustomEvent('spark-theme-change', { detail: { theme: mode } }));
  }

  function toggleTheme() {
    var current = document.documentElement.getAttribute('data-theme');
    var next = current === 'light' ? 'dark' : 'light';
    try { localStorage.setItem(STORAGE_KEY, next); } catch (e) { /* private browsing */ }
    applyTheme(next);
  }

  function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { /* ignore */ }
    applyTheme(saved || 'dark');
  }

  // ── tool accent ──────────────────────────────────────────────────────────────

  function initToolAccent() {
    var accent = document.documentElement.getAttribute('data-tool-accent');
    if (!accent) return;

    // set the CSS variable
    document.documentElement.style.setProperty('--tool-accent', accent);

    // derive a subtle bg: accent at 12% opacity over dark / 8% over light
    // We use the colour as-is with CSS alpha trick via a data attribute —
    // the simplest approach is to set a translucent version as the bg variable.
    // We parse the hex and build rgba.
    var rgb = hexToRgb(accent);
    if (rgb) {
      var bg = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',0.12)';
      document.documentElement.style.setProperty('--tool-accent-bg', bg);
    }
  }

  function hexToRgb(hex) {
    var clean = hex.replace('#', '');
    if (clean.length === 3) {
      clean = clean[0]+clean[0] + clean[1]+clean[1] + clean[2]+clean[2];
    }
    if (clean.length !== 6) return null;
    return {
      r: parseInt(clean.slice(0, 2), 16),
      g: parseInt(clean.slice(2, 4), 16),
      b: parseInt(clean.slice(4, 6), 16),
    };
  }

  // ── init on DOM ready ────────────────────────────────────────────────────────

  function init() {
    initTheme();
    initToolAccent();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ── public API ───────────────────────────────────────────────────────────────

  window.sparkToggleTheme = toggleTheme;
  window.sparkApplyTheme  = applyTheme;

})();
