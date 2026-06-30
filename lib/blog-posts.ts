export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: BlogSection[];
  author: string;
  authorTitle: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  category: string;
  tags: string[];
  metaDescription: string;
  ogTitle: string;
  faqs: { question: string; answer: string }[];
}

export interface BlogSection {
  type: "h2" | "h3" | "p" | "ul" | "ol" | "blockquote" | "steps";
  heading?: string;
  text?: string;
  items?: string[];
  steps?: { title: string; description: string }[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "what-is-joincloud-personal-cloud-on-your-device",
    title: "What Is JoinCloud? The Personal Cloud That Lives on Your Device",
    excerpt:
      "Most cloud storage uploads your files to someone else's server. JoinCloud takes a different approach — your files never leave your device. Here's how it works and why it matters.",
    author: "JoinCloud Team",
    authorTitle: "Product & Engineering",
    publishedAt: "2025-03-10",
    updatedAt: "2025-03-10",
    readingTime: 5,
    category: "Product",
    tags: ["personal cloud", "file sharing", "privacy", "local storage"],
    metaDescription:
      "JoinCloud turns your own device into a personal cloud. Share files globally without uploading to third-party servers. Learn how JoinCloud works and why it's different.",
    ogTitle: "What Is JoinCloud? Personal Cloud Storage Explained",
    faqs: [
      {
        question: "What is JoinCloud?",
        answer:
          "JoinCloud is a personal cloud application that lets you share files directly from your own device — no third-party cloud storage required. Your files stay on your computer and are shared via secure, temporary links.",
      },
      {
        question: "Is JoinCloud free to use?",
        answer:
          "JoinCloud offers a free tier during its early access phase. Paid plans with extended features are planned for the future.",
      },
      {
        question: "Does JoinCloud upload my files to the internet?",
        answer:
          "No. JoinCloud never uploads your files to any external server. Files remain on your local device and are only accessible through links you explicitly create and control.",
      },
      {
        question: "What operating systems does JoinCloud support?",
        answer:
          "JoinCloud currently supports Windows and macOS. Linux support is on the roadmap.",
      },
    ],
    content: [
      {
        type: "p",
        text: "Every time you use Google Drive, Dropbox, or iCloud, your files travel to a data center owned by a corporation. You're trusting a third party with your photos, documents, and sensitive data. JoinCloud was built to eliminate that dependency entirely.",
      },
      {
        type: "h2",
        heading: "How JoinCloud Works",
        text: "JoinCloud runs as a lightweight application on your Windows or macOS device. When you want to share a file, JoinCloud generates a secure, shareable link that points directly to your machine — not to a server somewhere in Virginia or Dublin.",
      },
      {
        type: "p",
        text: "The recipient clicks the link and downloads the file straight from your device, in real time. There's no intermediary. No storage costs. No upload waiting time. No data retention policy to worry about.",
      },
      {
        type: "h2",
        heading: "Why Traditional Cloud Storage Has Hidden Costs",
        text: "Cloud storage services seem free — until they're not. Here's what most people don't think about:",
      },
      {
        type: "ul",
        items: [
          "Your data is stored on servers you don't control and can't audit",
          "Free tiers are limited and designed to push you toward paid plans",
          "Upload speeds are bottlenecked, especially for large files",
          "Data breaches at cloud providers expose your files",
          "Subscriptions are recurring — the cost compounds over years",
        ],
      },
      {
        type: "h2",
        heading: "What Makes JoinCloud Different",
        text: "JoinCloud's architecture is fundamentally different from conventional cloud storage:",
      },
      {
        type: "ul",
        items: [
          "Files never leave your device unless you share them explicitly",
          "No storage limits — your hard drive is your cloud",
          "No recurring subscription for core sharing features",
          "Links can be revoked instantly by closing the app",
          "Works over local networks for zero-latency local sharing",
        ],
      },
      {
        type: "h2",
        heading: "Who Is JoinCloud For?",
        text: "JoinCloud is built for anyone who values control over their files:",
      },
      {
        type: "ul",
        items: [
          "Developers sharing builds and assets with teammates",
          "Designers transferring large creative files without compression",
          "Photographers and videographers moving RAW files locally",
          "Businesses that need to share internal documents without cloud exposure",
          "Anyone who wants to stop paying for cloud storage they don't fully trust",
        ],
      },
      {
        type: "blockquote",
        text: "Your cloud should be yours. JoinCloud gives you the simplicity of cloud sharing with the privacy of local storage.",
      },
      {
        type: "h2",
        heading: "Getting Started with JoinCloud",
      },
      {
        type: "steps",
        steps: [
          {
            title: "Download JoinCloud",
            description:
              "Install the JoinCloud desktop application on your Windows or macOS machine.",
          },
          {
            title: "Select a File",
            description:
              "Open JoinCloud, browse to any file on your device, and select it for sharing.",
          },
          {
            title: "Generate a Link",
            description:
              "JoinCloud creates a secure, shareable link in seconds. No upload required.",
          },
          {
            title: "Share the Link",
            description:
              "Send the link via email, chat, or any messaging platform. The recipient downloads directly from your device.",
          },
          {
            title: "Revoke Anytime",
            description:
              "Stop sharing instantly by closing JoinCloud or revoking the link from the dashboard.",
          },
        ],
      },
    ],
  },
  {
    slug: "how-to-share-large-files-without-cloud-storage-2025",
    title: "How to Share Large Files Without Cloud Storage in 2025",
    excerpt:
      "Sharing files over 1GB is painful with most cloud services. Upload limits, compression, and storage quotas get in the way. Here are the best methods to share large files without cloud storage.",
    author: "JoinCloud Team",
    authorTitle: "Product & Engineering",
    publishedAt: "2025-03-17",
    updatedAt: "2025-03-17",
    readingTime: 7,
    category: "How-To",
    tags: [
      "large file sharing",
      "file transfer",
      "no cloud",
      "peer to peer",
      "local network",
    ],
    metaDescription:
      "Learn how to share large files without cloud storage in 2025. Explore peer-to-peer transfer, local network sharing, and direct device links using tools like JoinCloud.",
    ogTitle: "How to Share Large Files Without Cloud Storage (2025 Guide)",
    faqs: [
      {
        question: "How can I share large files without cloud storage?",
        answer:
          "You can share large files without cloud storage using peer-to-peer tools, local network apps, or device-to-device sharing software like JoinCloud, which streams files directly from your device via a shareable link.",
      },
      {
        question: "What is the fastest way to transfer large files locally?",
        answer:
          "The fastest way to transfer large files locally is via a wired LAN connection using a direct sharing tool. JoinCloud supports local network transfers that can reach gigabit speeds depending on your hardware.",
      },
      {
        question: "Can I share files over 10GB without uploading them?",
        answer:
          "Yes. With JoinCloud, files of any size can be shared without uploading to a server. The recipient downloads directly from your machine, so the only limit is your internet connection speed.",
      },
      {
        question: "Is peer-to-peer file sharing safe?",
        answer:
          "Peer-to-peer sharing via tools like JoinCloud is safe because it doesn't rely on public P2P networks. JoinCloud generates unique, controlled links — only people with the link can access your file.",
      },
    ],
    content: [
      {
        type: "p",
        text: "If you've ever tried to send a 4K video, a full design project, or a software build via email or Google Drive, you've hit the wall. File size limits, upload queues, compression artifacts, and storage quotas make large file sharing a frustrating experience.",
      },
      {
        type: "p",
        text: "In 2025, there are better options. Here's a practical breakdown of how to share large files without relying on traditional cloud storage.",
      },
      {
        type: "h2",
        heading: "Method 1: Use a Device-to-Device Sharing App",
        text: "Apps like JoinCloud let you share files directly from your device via a link — no upload required. The file streams from your machine to the recipient in real time.",
      },
      {
        type: "ul",
        items: [
          "No file size limits (constrained only by your device storage)",
          "No upload time — the link is ready instantly",
          "Files stay on your device until the link is revoked",
          "Works over both LAN and internet connections",
        ],
      },
      {
        type: "h2",
        heading: "Method 2: Transfer Over a Local Network",
        text: "If both devices are on the same Wi-Fi or wired network, local transfer is the fastest method available — often 10x faster than internet-based uploads.",
      },
      {
        type: "ul",
        items: [
          "SMB/Windows File Sharing for Windows-to-Windows transfers",
          "AirDrop for Apple device transfers (macOS/iOS)",
          "JoinCloud for cross-platform local network sharing with a simple link",
          "SFTP for technical users who need scripted transfers",
        ],
      },
      {
        type: "h2",
        heading: "Method 3: Use a Portable Drive",
        text: "For extremely large files (100GB+) or transfers where internet is unavailable, a USB-C SSD is still the most reliable method:",
      },
      {
        type: "ul",
        items: [
          "USB 3.2 Gen 2 drives can transfer at 1–2 GB/s",
          "No internet dependency or bandwidth concerns",
          "Useful for video production workflows and server migrations",
        ],
      },
      {
        type: "h2",
        heading: "Method 4: Self-Hosted File Transfer Servers",
        text: "For teams and developers, running your own file server gives full control:",
      },
      {
        type: "ul",
        items: [
          "Nextcloud — open-source, self-hosted cloud platform",
          "FileSender — browser-based large file transfer (originally for academia)",
          "Samba — built into Linux and macOS for LAN file sharing",
          "NGINX file server — minimal setup, fast delivery",
        ],
      },
      {
        type: "h2",
        heading: "Method Comparison: Which Should You Use?",
        text: "Here's a quick comparison to help you decide:",
      },
      {
        type: "ul",
        items: [
          "JoinCloud — Best for: instant sharing without upload, any file size, cross-platform",
          "Local network transfer — Best for: same-location devices, maximum speed",
          "Portable SSD — Best for: very large files, no internet available",
          "Self-hosted server — Best for: teams, repeated transfers, full IT control",
        ],
      },
      {
        type: "h2",
        heading: "How to Share a Large File with JoinCloud",
      },
      {
        type: "steps",
        steps: [
          {
            title: "Install JoinCloud",
            description: "Download and install JoinCloud on your Windows or macOS device.",
          },
          {
            title: "Open the App and Select Your File",
            description:
              "Launch JoinCloud and browse to the large file you want to share — video, archive, folder, or any format.",
          },
          {
            title: "Copy the Generated Link",
            description:
              "JoinCloud instantly generates a shareable link. No upload happens — the link points directly to your device.",
          },
          {
            title: "Send the Link to Your Recipient",
            description:
              "Share the link via any channel. The recipient's browser downloads directly from your machine at full speed.",
          },
          {
            title: "Revoke the Link When Done",
            description:
              "Once the transfer is complete, revoke the link or close the app. The file is no longer accessible remotely.",
          },
        ],
      },
      {
        type: "blockquote",
        text: "The fastest file transfer is one that never involves a third party. JoinCloud removes the middleman entirely.",
      },
    ],
  },
  {
    slug: "joincloud-vs-google-drive-vs-dropbox-comparison",
    title: "JoinCloud vs Google Drive vs Dropbox: Which Should You Use?",
    excerpt:
      "Choosing between cloud storage options isn't just about price. Privacy, speed, and control matter too. Here's how JoinCloud compares to Google Drive and Dropbox across the metrics that actually affect your workflow.",
    author: "JoinCloud Team",
    authorTitle: "Product & Engineering",
    publishedAt: "2025-03-24",
    updatedAt: "2025-03-24",
    readingTime: 6,
    category: "Comparison",
    tags: [
      "cloud storage comparison",
      "google drive alternative",
      "dropbox alternative",
      "file sharing",
      "privacy",
    ],
    metaDescription:
      "Compare JoinCloud vs Google Drive vs Dropbox. Understand the differences in privacy, pricing, file size limits, and control to choose the right file sharing tool for you.",
    ogTitle: "JoinCloud vs Google Drive vs Dropbox: Full Comparison 2025",
    faqs: [
      {
        question: "What is the main difference between JoinCloud and Google Drive?",
        answer:
          "Google Drive stores your files on Google's servers, whereas JoinCloud keeps files on your own device and streams them directly to recipients via a secure link. JoinCloud requires no storage quota and no subscription for basic sharing.",
      },
      {
        question: "Is JoinCloud better than Dropbox for large files?",
        answer:
          "For large file transfers, JoinCloud has a significant advantage: there are no upload limits and no waiting for files to sync to a server. Files are shared directly from your device, making the link available instantly regardless of file size.",
      },
      {
        question: "Does JoinCloud work without an internet connection?",
        answer:
          "JoinCloud works on local networks without internet access. For remote sharing, an internet connection is required so recipients outside your network can access the link.",
      },
      {
        question: "Which cloud storage is best for privacy?",
        answer:
          "JoinCloud offers the strongest privacy guarantee because files never leave your device unless you share them explicitly. Google Drive and Dropbox store files on their servers and are subject to their respective data policies and legal requests.",
      },
    ],
    content: [
      {
        type: "p",
        text: "Google Drive and Dropbox have dominated cloud storage for over a decade. They're reliable, widely supported, and deeply integrated into productivity workflows. But they also come with trade-offs that many users are only now starting to question: privacy concerns, rising subscription costs, and file size limitations.",
      },
      {
        type: "p",
        text: "JoinCloud takes a different architectural approach. Instead of uploading your files to a server, it turns your own device into the source. Here's how the three compare across the dimensions that matter most.",
      },
      {
        type: "h2",
        heading: "Privacy and Data Ownership",
        text: "This is where the fundamental difference lies:",
      },
      {
        type: "ul",
        items: [
          "Google Drive: Files are stored on Google's infrastructure. Google's privacy policy allows use of metadata and non-encrypted content for product improvement. Files are subject to government legal requests.",
          "Dropbox: Files are stored on Dropbox's servers. Dropbox has faced past security incidents including credential leaks. Files can be accessed by Dropbox staff under certain conditions.",
          "JoinCloud: Files never leave your device. No server stores your content. Only recipients with your explicit link can access files, and access can be revoked instantly.",
        ],
      },
      {
        type: "h2",
        heading: "File Size Limits",
        text: "Large file sharing is where cloud services consistently fall short:",
      },
      {
        type: "ul",
        items: [
          "Google Drive: Individual file upload limit of 5TB, but practical performance degrades significantly above a few gigabytes",
          "Dropbox: No formal upload limit on desktop sync, but transfer sizes depend on plan tier and bandwidth throttling applies",
          "JoinCloud: No upload size limit. The only constraint is your local storage and connection speed. Multi-GB files are ready to share in seconds.",
        ],
      },
      {
        type: "h2",
        heading: "Speed: Upload vs. Direct Stream",
        text: "The architecture difference directly impacts speed:",
      },
      {
        type: "ul",
        items: [
          "Google Drive and Dropbox require a full upload before a file is shareable. A 10GB file on a 100 Mbps connection takes ~14 minutes to upload.",
          "JoinCloud generates a link instantly. The recipient downloads at whatever speed your connection allows — no pre-upload needed.",
          "On a local network, JoinCloud transfers can reach gigabit speeds, orders of magnitude faster than any cloud service.",
        ],
      },
      {
        type: "h2",
        heading: "Pricing",
        text: "Cloud storage costs add up over time:",
      },
      {
        type: "ul",
        items: [
          "Google Drive: Free up to 15GB (shared with Gmail). Google One plans start at $1.99/month for 100GB.",
          "Dropbox: Free tier offers only 2GB. Paid plans start at $11.99/month per user.",
          "JoinCloud: Free tier available during early access. Core sharing features require no subscription — your device is your storage.",
        ],
      },
      {
        type: "h2",
        heading: "Collaboration Features",
        text: "Traditional cloud services win on collaboration tooling:",
      },
      {
        type: "ul",
        items: [
          "Google Drive: Deep integration with Google Docs, Sheets, Slides — real-time collaborative editing",
          "Dropbox: Paper for docs, integrations with Slack, Zoom, and 300+ third-party apps",
          "JoinCloud: Focused on file sharing and transfer, not document editing. Best paired with your existing collaboration tools.",
        ],
      },
      {
        type: "h2",
        heading: "When to Use Each Service",
        text: "The right tool depends on your use case:",
      },
      {
        type: "ul",
        items: [
          "Use Google Drive if: you live in the Google ecosystem, need real-time document collaboration, and are comfortable with Google's data policies",
          "Use Dropbox if: you need reliable sync across many devices and deep third-party integrations matter to your workflow",
          "Use JoinCloud if: you're sharing large files, privacy is a priority, you want instant sharing without upload delays, or you want to stop paying for storage you already own",
        ],
      },
      {
        type: "blockquote",
        text: "JoinCloud isn't trying to replace Google Drive. It's for the moments when you don't want to hand your files to anyone else.",
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
