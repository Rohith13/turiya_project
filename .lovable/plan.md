

## Plan: Replace QR Cards with Chaaiya Widget on Support Page

### What changes
1. **Remove** the QR card section (PhonePe/PayPal images and their imports) from `src/pages/Support.tsx`
2. **Add** the Chaaiya widget by loading the external script (`https://chaaiya.lovable.app/widget.js`) via a `useEffect` hook with `data-username="rohith"`, `data-color="#E85D26"`, `data-position="right"`, `data-label="☕ Buy me a chai"`
3. **Keep** all existing copy (headline, philosophy text, "Every small gesture..." line, ambient orb) exactly as-is

### Technical approach
- Use `useEffect` in `Support.tsx` to dynamically create and append the `<script>` tag to `document.body` on mount, with cleanup on unmount
- Remove the `phonePeQR` and `payPalQR` imports and the entire QR cards `div`
- The widget will render itself as a floating button (positioned by the script) — the page layout stays clean

### Files modified
- `src/pages/Support.tsx` — remove QR section, add Chaaiya widget script loader

