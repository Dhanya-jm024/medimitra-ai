# 🖨️ How to Export MediMitra AI Pitch Deck to PDF / PowerPoint

### Option 1: Export Interactive HTML to PDF (Chrome)
1. Open [docs/pitch-deck/index.html](index.html) in Google Chrome.
2. Press `Cmd + P` (Mac) or `Ctrl + P` (Windows).
3. Set **Destination**: *Save as PDF*.
4. Set **Layout**: *Landscape*.
5. Enable **Background graphics**.
6. Click **Save**.

### Option 2: Convert Markdown to Slides (Marp / Pandoc)
```bash
# Install Marp CLI
npm install -g @marp-team/marp-cli

# Export Markdown to PDF
marp --pdf docs/pitch-deck/PITCH_DECK.md -o docs/pitch-deck/pitch-deck.pdf
```
