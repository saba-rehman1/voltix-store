import type { BlogPost } from "@/types";

const avatar = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&background=2563EB&color=fff&bold=true&size=100`;

const bimg = (id: string) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=1600&auto=format&fit=crop`;

export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    slug: "choosing-your-next-flagship-laptop-2026",
    title: "Choosing Your Next Flagship Laptop in 2026",
    excerpt:
      "Chip architecture, display tech and battery chemistry have all changed in the last 18 months. Here's what actually matters when you're spending premium money.",
    content: [
      "The laptop market in 2026 looks nothing like it did even two years ago. Unified-memory architectures, on-device AI acceleration and OLED-everywhere have shifted the value calculus for anyone shopping in the premium tier.",
      "Start with your workload, not the spec sheet. Video editors and 3D artists should prioritize sustained GPU performance and thermal headroom over peak clock speeds — a machine that throttles after ten minutes isn't actually faster than one that holds its boost clock.",
      "Battery life claims are increasingly workload-dependent. A laptop rated for 20 hours of video playback might deliver 6-8 hours of compiling code or rendering video. Look for reviews that test your specific use case.",
      "Display quality has become the biggest differentiator in the premium segment. Mini-LED and OLED panels with wide color gamuts and high peak brightness are now expected at the $1,500+ price point — don't settle for a standard IPS panel if you're paying flagship prices.",
      "Finally, consider the ecosystem. A laptop that plays well with your phone, tablet and smart watch will save you friction every single day, and that compounds over years of ownership.",
    ],
    image: bimg("1517336714731-489689fd1ca8"),
    author: "Sasha Reyes",
    authorAvatar: avatar("Sasha Reyes"),
    date: "2026-07-15",
    readTime: "6 min read",
    category: "Buying Guides",
  },
  {
    id: "b2",
    slug: "anc-headphones-explained",
    title: "How Active Noise Cancellation Actually Works",
    excerpt:
      "From feedforward microphones to adaptive DSP tuning — a look under the hood of the technology that makes your commute silent.",
    content: [
      "Active noise cancellation uses microphones to sample ambient sound, then generates an inverted sound wave in real time to cancel it out before it reaches your eardrum. It sounds simple; the engineering is anything but.",
      "Modern flagship headphones use both feedforward mics (facing outward, sampling the environment before sound reaches your ear) and feedback mics (facing inward, correcting for leaks and fit), processed through dedicated silicon that can react in microseconds.",
      "Adaptive ANC takes this further, continuously adjusting cancellation strength based on your environment — dialing up on a plane, easing off in a quiet office so you don't feel a strange pressure sensation in your ears.",
      "The tradeoff is battery and latency. More aggressive processing draws more power and can introduce a barely perceptible delay, which is why the best implementations balance cancellation depth against audio fidelity rather than maximizing silence at any cost.",
    ],
    image: bimg("1505740420928-5e560c06d30e"),
    author: "Priya Natarajan",
    authorAvatar: avatar("Priya Natarajan"),
    date: "2026-07-02",
    readTime: "5 min read",
    category: "Deep Dives",
  },
  {
    id: "b3",
    slug: "smartwatch-battery-myths",
    title: "5 Smartwatch Battery Life Myths, Debunked",
    excerpt:
      "Always-on display isn't the villain you think it is, and GPS isn't always the biggest drain. We break down what really eats your battery.",
    content: [
      "Myth 1: Always-on display is always the biggest drain. In reality, modern LTPO panels drop refresh rates so low in AOD mode that the display often isn't the top power consumer — background app refresh and cellular radios frequently draw more.",
      "Myth 2: Turning off all sensors saves meaningful battery. Most health sensors sample in short bursts and sip power; the bigger drains are usually screen brightness and network connectivity.",
      "Myth 3: GPS always kills your battery in a single workout. Dual-frequency GPS is more accurate but not necessarily more power-hungry than older single-band chips, thanks to efficiency gains in newer silicon.",
      "Myth 4: Cellular models always have dramatically worse battery than Bluetooth-only. The gap has narrowed significantly as eSIM radios have become more efficient, though it's still a real consideration for all-day wear.",
      "Myth 5: Battery health degrades the same for everyone. Charging habits, temperature exposure and even how often you fully discharge the battery all meaningfully change long-term capacity retention.",
    ],
    image: bimg("1523275335684-37898b6baf30"),
    author: "Marcus Cole",
    authorAvatar: avatar("Marcus Cole"),
    date: "2026-06-20",
    readTime: "4 min read",
    category: "Explainers",
  },
  {
    id: "b4",
    slug: "future-of-mobile-photography",
    title: "The Future of Mobile Photography Is Computational",
    excerpt:
      "Sensor size still matters, but the real battleground for flagship cameras in 2026 is what happens after the shutter closes.",
    content: [
      "For years, the smartphone camera race was measured in megapixels and sensor size. That race has plateaued — the real differentiation now happens in silicon, in the milliseconds after you press the shutter.",
      "Multi-frame fusion captures a burst of exposures at different settings and merges them algorithmically, extracting more dynamic range and detail than any single exposure could capture on a sensor this small.",
      "On-device machine learning models now handle everything from semantic segmentation (recognizing sky, skin, foliage and adjusting each differently) to real-time subject tracking for video, tasks that would have required a workstation GPU a decade ago.",
      "The next frontier is generative-assisted editing — tools that can extend a frame, remove distractions, or relight a scene convincingly, blurring the line between capture and creation. How brands label and disclose that assistance will shape user trust for years to come.",
    ],
    image: bimg("1511707171634-5f897ff02aa9"),
    author: "Sasha Reyes",
    authorAvatar: avatar("Sasha Reyes"),
    date: "2026-06-05",
    readTime: "7 min read",
    category: "Deep Dives",
  },
  {
    id: "b5",
    slug: "building-the-perfect-desk-setup",
    title: "Building the Perfect Desk Setup on Any Budget",
    excerpt:
      "You don't need a $5,000 battle station to work comfortably and efficiently. Here's where to spend and where to save.",
    content: [
      "The single highest-impact purchase for most people isn't the monitor or the keyboard — it's a chair that actually supports your spine for eight hours a day. Everything else is secondary to sitting comfortably.",
      "For peripherals, spend on the mouse before the keyboard if you have to choose. You touch it constantly during the workday, and a precise sensor with a comfortable shape reduces fatigue more than most people expect.",
      "Cable management is not vanity — a tangled mess of cords is a genuine source of daily friction. A single well-placed charging dock or cable tray pays for itself in reduced annoyance within a week.",
      "Finally, lighting matters more than most setups account for. A cool-temperature desk lamp positioned to avoid screen glare will do more for your focus and eye comfort than another display ever will.",
    ],
    image: bimg("1591370874773-6702e8f12fd8"),
    author: "Marcus Cole",
    authorAvatar: avatar("Marcus Cole"),
    date: "2026-05-22",
    readTime: "5 min read",
    category: "Lifestyle",
  },
  {
    id: "b6",
    slug: "gaming-handhelds-vs-consoles",
    title: "Gaming Handhelds vs. Consoles: What's Right for You?",
    excerpt:
      "Handheld PCs have matured fast. We compare the real tradeoffs against a traditional console setup.",
    content: [
      "Handheld gaming PCs now offer genuine access to your entire existing library — Steam, Game Pass, and more — without the walled garden of console-exclusive storefronts. That flexibility is the single biggest draw for PC gamers who want portability.",
      "Consoles still win on plug-and-play simplicity and optimized, guaranteed performance. Developers target console hardware specifically, so you're less likely to hit the settings-tweaking rabbit hole that PC and handheld gaming can involve.",
      "Battery life remains the handheld's Achilles' heel for demanding AAA titles — expect 1.5 to 3 hours in the most graphically intensive games, versus a console that's only limited by your wall outlet.",
      "If you split time between a TV setup and gaming on the go, a handheld that docks to an external display gives you genuine flexibility that a console alone can't match — at a real cost in up-front price and occasional driver quirks.",
    ],
    image: bimg("1486401899868-0e435ed85128"),
    author: "Priya Natarajan",
    authorAvatar: avatar("Priya Natarajan"),
    date: "2026-05-10",
    readTime: "6 min read",
    category: "Buying Guides",
  },
];

export const getBlogPost = (slug: string) =>
  blogPosts.find((b) => b.slug === slug);
