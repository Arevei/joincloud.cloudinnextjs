# Legacy Website Content

Archived versions of the JoinCloud marketing site before the DeepTech / Personal Cloud Network repositioning (July 2026).

| File | Description |
|------|-------------|
| `page-creator-beta.tsx` | Original homepage — creator-focused "Stop Uploading. Start Creating." positioning with beta waitlist, upload calculator, and creative workflow sections |
| `layout-creator-beta.tsx` | Original SEO metadata — file-sharing focused titles and descriptions |

The live site uses the updated content in `app/page.tsx` and `app/layout.tsx`.

To restore a legacy section, copy the relevant component from `page-creator-beta.tsx` or set its flag to `true` in `SECTION_VISIBILITY` inside `app/page.tsx`.
