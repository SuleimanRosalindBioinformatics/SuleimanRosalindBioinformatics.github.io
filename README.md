<div align="center">

<img src="assets/logo.svg" alt="SuleimanRosalindBioinformatics Logo" width="560px" />

# 🌐 SuleimanRosalindBioinformatics Web Portal
### Interactive Computational Biology Intelligence Hub & Algorithms Explorer

[![Website Live](https://img.shields.io/badge/Website-suleimanrosalindbioinformatics.github.io-06B6D4?style=for-the-badge&logo=googlechrome&logoColor=white)](https://suleimanrosalindbioinformatics.github.io/)
[![Organization](https://img.shields.io/badge/GitHub_Org-SuleimanRosalindBioinformatics-10B981?style=for-the-badge&logo=github&logoColor=white)](https://github.com/SuleimanRosalindBioinformatics)
[![Backend Repo](https://img.shields.io/badge/Backend_Repo-SuleimanRosalindBioinformatics-blue?style=for-the-badge&logo=python&logoColor=white)](https://github.com/SuleimanRosalindBioinformatics/SuleimanRosalindBioinformatics)
[![Rosalind Solved](https://img.shields.io/badge/Rosalind_Solved-284%2F284_(100%25)-green.svg?style=for-the-badge&logo=target)](http://rosalind.info/)
[![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg?style=for-the-badge)](LICENSE)

<p align="center">
  <b>The browser-native interactive frontend presentation layer for 284 Rosalind computational biology problems, algorithms studio, and dynamic roadmap.</b>
</p>

[🚀 Visit Live Website](https://suleimanrosalindbioinformatics.github.io/) • [📦 Sibling Backend Repo](https://github.com/SuleimanRosalindBioinformatics/SuleimanRosalindBioinformatics) • [🏢 GitHub Organization](https://github.com/SuleimanRosalindBioinformatics)

---

</div>

## 📌 Portal Overview

**`SuleimanRosalindBioinformatics.github.io`** is the public-facing interactive web application for the **SuleimanRosalindBioinformatics Organization**. It serves as an interactive intelligence hub showcasing optimal solutions to all **284 published computational biology problems** on Rosalind.

### Key Interactive Features

1. **🔍 Master Problems Explorer**:
   - Filter and search through all 284 solved problems across all 5 Rosalind tracks: *Bioinformatics Textbook (BA1–BA11)*, *Bioinformatics Stronghold*, *Algorithmic Heights*, *Bioinformatics Armory*, and *Python Village*.
   - Filter by Difficulty Tier (Beginner, Intermediate, Advanced) and 13 Algorithmic Domains.
   - Interactive modal drawer showing Rosalind ID, problem classification, execution commands, and direct GitHub source code links.

2. **🧬 Live Bio-Algorithms Studio**:
   - **Central Dogma**: In-browser DNA-to-mRNA transcription ($T \to U$), reverse complementation, translation to peptide, and GC content calculation.
   - **GC Skew & OriC Origin of Replication**: Dynamic SVG trajectory visualization of $(G - C) / (G + C)$ identifying replication initiation zones.
   - **Hamming Distance & Point Mutations**: Calculates $d_H(s_1, s_2)$, transitions, transversions, and Ti/Tv ratios with visual base mismatch highlighting.
   - **Needleman-Wunsch Global Alignment**: Real-time dynamic programming alignment matrix computation with traceback and optimal scoring.
   - **Restriction Endonuclease Recognition Sites**: Scans DNA sequences for reverse palindromes of lengths 4–12 bp (Rosalind `REVP`).

3. **🗺️ 3-Tier Curriculum Roadmap**:
   - Pedagogical learning trajectory stratifying problems into Beginner (51), Intermediate (196), and Advanced (37) tiers.

4. **📚 13 Algorithmic Domains**:
   - Theoretical formulations and computational complexities covering Sequence Alignment, Genome Assembly, Hidden Markov Models, Phylogenetics, Mass Spectrometry, and Genome Rearrangements.

---

## 🗂️ Project Structure & Architectural SEO Mapping

```text
SuleimanRosalindBioinformatics.github.io/
├── index.html                  # Master hub with JSON-LD Schema, Open Graph & FAQPage
├── sitemap.xml                 # Search Engine Sitemap covering all 30 core paths & anchors
├── robots.txt                  # Global crawler directives (Googlebot, Bingbot, Slurp, etc.)
├── manifest.json               # Progressive web app metadata with search shortcuts
├── 404.html                    # SEO-friendly error fallback page with quick navigation
├── .nojekyll                   # Bypasses Jekyll processing on GitHub Pages
├── favicon.svg                 # Scalable vector tab icon
├── favicon.png                 # 64x64 raster favicon
├── apple-touch-icon.png        # 180x180 iOS touch icon
├── problems/
│   └── index.html              # Dedicated pre-rendered catalog for all 284 solved problems
├── syntheses/
│   └── index.html              # Dedicated portal for the 9 cross-cutting domain syntheses
├── curriculum/
│   └── index.html              # Dedicated 3-Tier curriculum learning trajectory (51/196/37)
├── domains/
│   └── index.html              # Comprehensive reference guide for all 13 biological domains
├── studio/
│   └── index.html              # Standalone workbench for live in-browser bio-algorithms
├── assets/                     # Brand & social preview assets
│   ├── logo.svg                # Master vector brand logo
│   ├── logo-icon.svg           # High-resolution vector icon
│   ├── logo-emblem.png         # 1024x1024 master emblem (OG & Twitter Image)
│   └── og-image.png            # Optimized 800x800 social share preview
├── css/
│   └── style.css               # Modern design system, glassmorphism, responsive grid
├── js/
│   ├── app.js                  # Master application controller, search & filters, modal
│   └── bio-studio.js           # Live in-browser bioinformatic algorithms
└── data/
    ├── problems.json           # Structured database of all 284 problems
    ├── domains.json            # 13 Algorithmic domain classifications
    └── curriculum.json         # Tiers and tracks summary metrics
```

---

## 💻 Local Development & Preview

To preview the portal locally on your workstation:

```bash
# Navigate to the repository
cd /Users/macbookairm2/Documents/GitHub/SuleimanRosalindBioinformatics.github.io

# Launch a lightweight HTTP server
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your web browser.

---

## 🌐 Connected Ecosystem

| Repository | Role | Direct Link |
| :--- | :--- | :--- |
| **Backend Core & Solutions** | 284 Solved problems, python algorithms, inputs/outputs, and wiki knowledge base | [SuleimanRosalindBioinformatics](https://github.com/SuleimanRosalindBioinformatics/SuleimanRosalindBioinformatics) |
| **Frontend Web Portal** | Interactive website, problems explorer, algorithm studio, and curriculum roadmap (This repo) | [SuleimanRosalindBioinformatics.github.io](https://github.com/SuleimanRosalindBioinformatics/SuleimanRosalindBioinformatics.github.io) |
| **GitHub Organization** | Central administrative organization | [SuleimanRosalindBioinformatics](https://github.com/SuleimanRosalindBioinformatics) |

---

## 📜 License
Distributed under the **MIT License**.

© 2026 **Suleiman Hajizadeh** • [SuleimanRosalindBioinformatics Organization](https://github.com/SuleimanRosalindBioinformatics)
