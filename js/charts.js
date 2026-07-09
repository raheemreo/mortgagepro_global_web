// js/charts.js — SVG/Canvas chart rendering, no external library
// REO TECH | MortgagePro Global v2.1 | June 2026

'use strict';

// Draw a donut chart showing principal vs interest breakdown
function drawPieChart(canvasId, principal, interest) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || !canvas.getContext) return;

  const ctx = canvas.getContext('2d');
  const W = canvas.offsetWidth || 280;
  const H = 200;
  canvas.width = W * window.devicePixelRatio;
  canvas.height = H * window.devicePixelRatio;
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

  const cx = W / 2;
  const cy = H / 2;
  const r = Math.min(cx, cy) - 20;
  const innerR = r * 0.58;
  const total = principal + interest;
  const principalAngle = (principal / total) * 2 * Math.PI;
  const interestAngle = (interest / total) * 2 * Math.PI;

  // Principal arc (green-ish)
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + principalAngle);
  ctx.arc(cx, cy, innerR, -Math.PI / 2 + principalAngle, -Math.PI / 2, true);
  ctx.closePath();
  ctx.fillStyle = 'rgba(110, 231, 183, 0.9)';
  ctx.fill();

  // Interest arc (red-ish)
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.arc(cx, cy, r, -Math.PI / 2 + principalAngle, -Math.PI / 2 + principalAngle + interestAngle);
  ctx.arc(cx, cy, innerR, -Math.PI / 2 + principalAngle + interestAngle, -Math.PI / 2 + principalAngle, true);
  ctx.closePath();
  ctx.fillStyle = 'rgba(252, 165, 165, 0.9)';
  ctx.fill();

  // Center label
  const pct = Math.round(principal / total * 100);
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `bold ${Math.round(r * 0.32)}px sans-serif`;
  ctx.fillText(`${pct}%`, cx, cy - 10);
  ctx.font = `${Math.round(r * 0.16)}px Arial`;
  ctx.fillStyle = 'rgba(255,255,255,0.75)';
  ctx.fillText('Principal', cx, cy + 14);

  // Legend
  const legendY = H - 16;
  ctx.font = '11px Arial';
  ctx.fillStyle = 'rgba(110,231,183,0.9)';
  ctx.fillRect(cx - 80, legendY - 6, 12, 12);
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  ctx.textAlign = 'left';
  ctx.fillText('Principal', cx - 64, legendY + 0.5);

  ctx.fillStyle = 'rgba(252,165,165,0.9)';
  ctx.fillRect(cx + 10, legendY - 6, 12, 12);
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  ctx.fillText('Interest', cx + 26, legendY + 0.5);
}

// Expose globally
window.drawPieChart = drawPieChart;
