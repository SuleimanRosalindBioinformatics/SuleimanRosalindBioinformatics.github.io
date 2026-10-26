/**
 * SuleimanRosalindBioinformatics - Interactive Bio-Algorithms Studio
 * High-performance client-side implementations of core Rosalind algorithms
 */

const BioStudio = (() => {
  // Codon translation table
  const CODON_TABLE = {
    'UUU': 'F', 'UUC': 'F', 'UUA': 'L', 'UUG': 'L',
    'UCU': 'S', 'UCC': 'S', 'UCA': 'S', 'UCG': 'S',
    'UAU': 'Y', 'UAC': 'Y', 'UAA': 'Stop', 'UAG': 'Stop',
    'UGU': 'C', 'UGC': 'C', 'UGA': 'Stop', 'UGG': 'W',
    'CUU': 'L', 'CUC': 'L', 'CUA': 'L', 'CUG': 'L',
    'CCU': 'P', 'CCC': 'P', 'CCA': 'P', 'CCG': 'P',
    'CAU': 'H', 'CAC': 'H', 'CAA': 'Q', 'CAG': 'Q',
    'CGU': 'R', 'CGC': 'R', 'CGA': 'R', 'CGG': 'R',
    'AUU': 'I', 'AUC': 'I', 'AUA': 'I', 'AUG': 'M',
    'ACU': 'T', 'ACC': 'T', 'ACA': 'T', 'ACG': 'T',
    'AAU': 'N', 'AAC': 'N', 'AAA': 'K', 'AAG': 'K',
    'AGU': 'S', 'AGC': 'S', 'AGA': 'R', 'AGG': 'R',
    'GUU': 'V', 'GUC': 'V', 'GUA': 'V', 'GUG': 'V',
    'GCU': 'A', 'GCC': 'A', 'GCA': 'A', 'GCG': 'A',
    'GAU': 'D', 'GAC': 'D', 'GAA': 'E', 'GAG': 'E',
    'GGU': 'G', 'GGC': 'G', 'GGA': 'G', 'GGG': 'G'
  };

  // 1. Central Dogma
  function runDogma() {
    const raw = document.getElementById('dogma-input').value.toUpperCase().replace(/[^ATCGU]/g, '');
    if (!raw) {
      document.getElementById('dogma-output').innerHTML = '<span style="color:var(--rose-primary)">Please enter a valid nucleotide sequence.</span>';
      return;
    }

    // Transcription
    const rna = raw.replace(/T/g, 'U');
    
    // Reverse complement
    const complement = { 'A': 'T', 'T': 'A', 'C': 'G', 'G': 'C', 'U': 'A' };
    const revComp = raw.split('').reverse().map(b => complement[b] || b).join('');

    // Translation
    let protein = '';
    for (let i = 0; i <= rna.length - 3; i += 3) {
      const codon = rna.substr(i, 3);
      const aa = CODON_TABLE[codon] || '?';
      if (aa === 'Stop') break;
      protein += aa;
    }

    // GC Content
    const g = (raw.match(/G/g) || []).length;
    const c = (raw.match(/C/g) || []).length;
    const gcPct = ((g + c) / raw.length * 100).toFixed(2);

    document.getElementById('dogma-output').innerHTML = `
      <div style="margin-bottom:0.75rem;"><strong>Input Sequence Length:</strong> ${raw.length} bp | <strong>GC Content:</strong> ${gcPct}%</div>
      <div style="margin-bottom:0.75rem;"><strong>Transcribed mRNA (T &rarr; U):</strong><br><code style="color:var(--cyan-primary); word-break:break-all;">${rna}</code></div>
      <div style="margin-bottom:0.75rem;"><strong>Reverse Complement:</strong><br><code style="color:var(--green-primary); word-break:break-all;">${revComp}</code></div>
      <div><strong>Translated Peptide:</strong><br><code style="color:#f59e0b; word-break:break-all;">${protein || 'None / Stop at start'}</code></div>
    `;
  }

  // 2. GC Skew Visualizer
  function runGcSkew() {
    const seq = document.getElementById('skew-input').value.toUpperCase().replace(/[^ATCG]/g, '');
    if (seq.length < 10) {
      document.getElementById('skew-output').innerHTML = '<span style="color:var(--rose-primary)">Please enter at least 10 bp of DNA.</span>';
      return;
    }

    let skew = 0;
    const skewValues = [0];
    let minSkew = 0;
    let minIndices = [];

    for (let i = 0; i < seq.length; i++) {
      if (seq[i] === 'G') skew++;
      else if (seq[i] === 'C') skew--;
      skewValues.push(skew);

      if (skew < minSkew) {
        minSkew = skew;
        minIndices = [i + 1];
      } else if (skew === minSkew) {
        minIndices.push(i + 1);
      }
    }

    // Render SVG Chart
    const w = 600;
    const h = 180;
    const pad = 35;
    const maxVal = Math.max(...skewValues);
    const minVal = Math.min(...skewValues);
    const range = (maxVal - minVal) || 1;

    const points = skewValues.map((val, idx) => {
      const x = pad + (idx / seq.length) * (w - 2 * pad);
      const y = h - pad - ((val - minVal) / range) * (h - 2 * pad);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');

    const svg = `
      <svg viewBox="0 0 ${w} ${h}" style="width:100%; height:auto; background:var(--bg-input); border-radius:8px; border:1px solid var(--bg-card-border);">
        <line x1="${pad}" y1="${h-pad}" x2="${w-pad}" y2="${h-pad}" stroke="var(--bg-card-border)" stroke-width="1.5" />
        <polyline fill="none" stroke="var(--cyan-primary)" stroke-width="2.5" points="${points}" />
        <text x="${pad}" y="${pad - 10}" fill="var(--text-muted)" font-size="11">Max Skew: ${maxVal}</text>
        <text x="${pad}" y="${h - 10}" fill="var(--text-muted)" font-size="11">Min Skew: ${minVal}</text>
        <text x="${w - pad - 120}" y="${h - 10}" fill="var(--text-muted)" font-size="11">Length: ${seq.length} bp</text>
      </svg>
    `;

    document.getElementById('skew-output').innerHTML = `
      <div style="margin-bottom:0.75rem;">${svg}</div>
      <div>
        <strong>Minimum GC Skew Value:</strong> ${minSkew} | 
        <strong>Potential Replication Origin (OriC) Indices:</strong> 
        <code style="color:var(--green-primary);">${minIndices.slice(0, 15).join(', ')}${minIndices.length > 15 ? '...' : ''}</code>
      </div>
    `;
  }

  // 3. Hamming Distance & Point Mutation
  function runHamming() {
    const s1 = document.getElementById('ham-s1').value.toUpperCase().replace(/\s+/g, '');
    const s2 = document.getElementById('ham-s2').value.toUpperCase().replace(/\s+/g, '');

    if (!s1 || !s2 || s1.length !== s2.length) {
      document.getElementById('ham-output').innerHTML = `<span style="color:var(--rose-primary)">Sequences must be non-empty and of equal length (s1: ${s1.length}, s2: ${s2.length}).</span>`;
      return;
    }

    let dist = 0;
    let transitions = 0;
    let transversions = 0;
    const purines = new Set(['A', 'G']);
    const pyrimidines = new Set(['C', 'T']);

    let aligned1 = '';
    let aligned2 = '';

    for (let i = 0; i < s1.length; i++) {
      const c1 = s1[i];
      const c2 = s2[i];
      if (c1 !== c2) {
        dist++;
        const isPurine1 = purines.has(c1);
        const isPurine2 = purines.has(c2);
        if ((isPurine1 && isPurine2) || (pyrimidines.has(c1) && pyrimidines.has(c2))) {
          transitions++;
        } else {
          transversions++;
        }
        aligned1 += `<span style="color:var(--rose-primary); font-weight:bold;">${c1}</span>`;
        aligned2 += `<span style="color:var(--rose-primary); font-weight:bold;">${c2}</span>`;
      } else {
        aligned1 += `<span style="color:var(--cyan-primary);">${c1}</span>`;
        aligned2 += `<span style="color:var(--cyan-primary);">${c2}</span>`;
      }
    }

    const ttRatio = transversions > 0 ? (transitions / transversions).toFixed(4) : 'N/A';

    document.getElementById('ham-output').innerHTML = `
      <div style="margin-bottom:0.75rem;">
        <strong>Hamming Distance d<sub>H</sub>:</strong> <span style="font-size:1.25rem; font-weight:bold; color:var(--rose-primary);">${dist}</span> 
        (${((dist / s1.length) * 100).toFixed(1)}% divergence)
      </div>
      <div style="margin-bottom:0.75rem;">
        <strong>Transitions (Ti):</strong> ${transitions} | <strong>Transversions (Tv):</strong> ${transversions} | <strong>Ti/Tv Ratio:</strong> ${ttRatio}
      </div>
      <div style="font-family:var(--font-mono); overflow-x:auto; padding:0.5rem; background:rgba(0,0,0,0.3); border-radius:6px;">
        s1: ${aligned1}<br>
        s2: ${aligned2}
      </div>
    `;
  }

  // 4. Needleman-Wunsch Alignment
  function runAlignment() {
    const v = document.getElementById('align-s1').value.toUpperCase().replace(/\s+/g, '');
    const w = document.getElementById('align-s2').value.toUpperCase().replace(/\s+/g, '');

    if (v.length > 25 || w.length > 25) {
      document.getElementById('align-output').innerHTML = '<span style="color:var(--rose-primary)">For matrix visualization, sequence length must be &le; 25 bp.</span>';
      return;
    }
    if (!v || !w) {
      document.getElementById('align-output').innerHTML = '<span style="color:var(--rose-primary)">Sequences cannot be empty.</span>';
      return;
    }

    const MATCH = 1;
    const MISMATCH = -1;
    const INDEL = -2;

    const n = v.length;
    const m = w.length;
    const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

    for (let i = 0; i <= n; i++) dp[i][0] = i * INDEL;
    for (let j = 0; j <= m; j++) dp[0][j] = j * INDEL;

    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= m; j++) {
        const scoreMatch = dp[i - 1][j - 1] + (v[i - 1] === w[j - 1] ? MATCH : MISMATCH);
        const scoreDel = dp[i - 1][j] + INDEL;
        const scoreIns = dp[i][j - 1] + INDEL;
        dp[i][j] = Math.max(scoreMatch, scoreDel, scoreIns);
      }
    }

    // Traceback
    let al1 = '';
    let al2 = '';
    let i = n, j = m;
    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && dp[i][j] === dp[i - 1][j - 1] + (v[i - 1] === w[j - 1] ? MATCH : MISMATCH)) {
        al1 = v[i - 1] + al1;
        al2 = w[j - 1] + al2;
        i--; j--;
      } else if (i > 0 && dp[i][j] === dp[i - 1][j] + INDEL) {
        al1 = v[i - 1] + al1;
        al2 = '-' + al2;
        i--;
      } else {
        al1 = '-' + al1;
        al2 = w[j - 1] + al2;
        j--;
      }
    }

    document.getElementById('align-output').innerHTML = `
      <div style="margin-bottom:0.75rem;">
        <strong>Optimal Global Alignment Score:</strong> <span style="color:var(--cyan-primary); font-size:1.15rem; font-weight:bold;">${dp[n][m]}</span>
      </div>
      <div style="font-family:var(--font-mono); margin-bottom:1rem; padding:0.5rem; background:rgba(0,0,0,0.3); border-radius:6px;">
        Seq 1: ${al1}<br>
        Seq 2: ${al2}
      </div>
      <details>
        <summary style="cursor:pointer; color:var(--text-muted); font-size:0.8rem;">View DP Matrix (${n+1}x${m+1})</summary>
        <div style="overflow-x:auto; margin-top:0.5rem; font-size:0.75rem;">
          <table style="border-collapse:collapse; text-align:center;">
            <tr><th></th><th>-</th>${w.split('').map(c => `<th>${c}</th>`).join('')}</tr>
            ${dp.map((row, rIdx) => `
              <tr>
                <th>${rIdx === 0 ? '-' : v[rIdx - 1]}</th>
                ${row.map(cell => `<td style="border:1px solid rgba(148,163,184,0.2); padding:3px 6px;">${cell}</td>`).join('')}
              </tr>
            `).join('')}
          </table>
        </div>
      </details>
    `;
  }

  // 5. Palindrome & Restriction Sites
  function runPalindrome() {
    const raw = document.getElementById('pal-input').value.toUpperCase().replace(/[^ATCG]/g, '');
    if (raw.length < 4) {
      document.getElementById('pal-output').innerHTML = '<span style="color:var(--rose-primary)">Please enter a DNA sequence of at least 4 bp.</span>';
      return;
    }

    const complement = { 'A': 'T', 'T': 'A', 'C': 'G', 'G': 'C' };
    const sites = [];

    for (let i = 0; i < raw.length; i++) {
      for (let len = 4; len <= 12; len += 2) {
        if (i + len > raw.length) break;
        const sub = raw.substr(i, len);
        const revComp = sub.split('').reverse().map(b => complement[b]).join('');
        if (sub === revComp) {
          sites.push({ pos: i + 1, len: len, seq: sub });
        }
      }
    }

    if (sites.length === 0) {
      document.getElementById('pal-output').innerHTML = '<span>No reverse palindromes of length 4-12 found.</span>';
      return;
    }

    const rows = sites.map(s => `<tr><td style="padding:4px 8px;">${s.pos}</td><td style="padding:4px 8px;">${s.len}</td><td style="padding:4px 8px; font-family:var(--font-mono); color:var(--cyan-primary);">${s.seq}</td></tr>`).join('');

    document.getElementById('pal-output').innerHTML = `
      <div style="margin-bottom:0.5rem;"><strong>Found ${sites.length} Restriction Sites:</strong></div>
      <div style="max-height:180px; overflow-y:auto;">
        <table style="width:100%; border-collapse:collapse; font-size:0.85rem; text-align:left;">
          <thead style="border-bottom:1px solid var(--bg-card-border);">
            <tr><th>Position</th><th>Length</th><th>Palindromic Sequence</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    `;
  }

  function init() {
    // Attach event listeners to studio buttons
    const btnDogma = document.getElementById('btn-run-dogma');
    if (btnDogma) btnDogma.addEventListener('click', runDogma);

    const btnSkew = document.getElementById('btn-run-skew');
    if (btnSkew) btnSkew.addEventListener('click', runGcSkew);

    const btnHam = document.getElementById('btn-run-ham');
    if (btnHam) btnHam.addEventListener('click', runHamming);

    const btnAlign = document.getElementById('btn-run-align');
    if (btnAlign) btnAlign.addEventListener('click', runAlignment);

    const btnPal = document.getElementById('btn-run-pal');
    if (btnPal) btnPal.addEventListener('click', runPalindrome);
  }

  return { init, runDogma, runGcSkew, runHamming, runAlignment, runPalindrome };
})();

document.addEventListener('DOMContentLoaded', BioStudio.init);
