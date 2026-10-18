import { useMemo, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/* Data: [emoji, search keywords]. Extend freely, or swap for the full */
/* set from `emojibase-data` if you need every emoji.                  */
/* ------------------------------------------------------------------ */
type EmojiEntry = [string, string];

const CATEGORIES: { id: string; icon: string; label: string; emojis: EmojiEntry[] }[] = [
  {
    id: "smileys",
    icon: "😀",
    label: "Smileys",
    emojis: [
      ["😀", "grin happy"], ["😃", "smile happy"], ["😄", "smile laugh"], ["😁", "beam grin"],
      ["😆", "laugh squint"], ["😅", "sweat smile"], ["🤣", "rofl laugh"], ["😂", "joy tears laugh"],
      ["🙂", "slight smile"], ["🙃", "upside down"], ["😉", "wink"], ["😊", "blush smile"],
      ["😇", "angel halo"], ["🥰", "love hearts face"], ["😍", "heart eyes love"], ["🤩", "star struck wow"],
      ["😘", "kiss"], ["😋", "yum tasty"], ["😛", "tongue"], ["😜", "wink tongue crazy"],
      ["🤪", "zany crazy"], ["🤗", "hug"], ["🤔", "thinking hmm"], ["🤨", "raised eyebrow"],
      ["😐", "neutral"], ["😑", "expressionless"], ["😶", "no mouth silent"], ["🙄", "eye roll"],
      ["😏", "smirk"], ["😒", "unamused"], ["😬", "grimace"], ["😌", "relieved calm"],
      ["😔", "sad pensive"], ["😴", "sleep zzz"], ["🤤", "drool"], ["😷", "mask sick"],
      ["🤒", "thermometer sick"], ["🤕", "bandage hurt"], ["🤢", "nauseous sick"], ["🥵", "hot"],
      ["🥶", "cold freezing"], ["🥴", "woozy"], ["😵", "dizzy"], ["🤯", "mind blown"],
      ["🤠", "cowboy"], ["🥳", "party celebrate"], ["😎", "cool sunglasses"], ["🤓", "nerd"],
      ["😕", "confused"], ["😟", "worried"], ["😮", "surprised open mouth"], ["😲", "astonished"],
      ["😳", "flushed"], ["🥺", "pleading puppy"], ["😢", "cry sad"], ["😭", "sob crying"],
      ["😱", "scream fear"], ["😖", "confounded"], ["😞", "disappointed"], ["😤", "triumph huff"],
      ["😡", "angry mad"], ["🤬", "cursing swear"], ["😈", "devil smile"], ["💀", "skull dead"],
      ["💩", "poop"], ["🤡", "clown"], ["👻", "ghost"], ["👽", "alien"], ["🤖", "robot"],
    ],
  },
  {
    id: "people",
    icon: "👍",
    label: "People",
    emojis: [
      ["👍", "thumbs up like yes"], ["👎", "thumbs down dislike no"], ["👌", "ok perfect"],
      ["✌️", "peace victory"], ["🤞", "fingers crossed luck"], ["🤟", "love you"],
      ["🤘", "rock on"], ["🤙", "call me"], ["👈", "point left"], ["👉", "point right"],
      ["👆", "point up"], ["👇", "point down"], ["☝️", "index up"], ["✋", "raised hand stop"],
      ["🖐️", "hand fingers"], ["🖖", "vulcan"], ["👋", "wave hello bye"], ["🤝", "handshake deal"],
      ["👏", "clap applause"], ["🙌", "raised hands hooray"], ["👐", "open hands"],
      ["🙏", "pray thanks please"], ["💪", "muscle strong"], ["✍️", "writing"],
      ["🤳", "selfie"], ["🧠", "brain"], ["👀", "eyes look"], ["👁️", "eye"],
      ["👅", "tongue"], ["👄", "mouth lips"], ["👶", "baby"], ["🧒", "child"],
      ["👦", "boy"], ["👧", "girl"], ["🧑", "person"], ["👨", "man"], ["👩", "woman"],
      ["🧓", "older person"], ["👮", "police"], ["🧑‍💻", "technologist developer coder"],
      ["🧑‍🎨", "artist"], ["🧑‍🍳", "cook chef"], ["🦸", "superhero"], ["🧙", "mage wizard"],
      ["🧚", "fairy"], ["🧜", "mermaid"], ["🏃", "running"], ["💃", "dance"], ["🕺", "dance man"],
    ],
  },
  {
    id: "nature",
    icon: "🌿",
    label: "Nature",
    emojis: [
      ["🐶", "dog puppy"], ["🐱", "cat kitten"], ["🐭", "mouse"], ["🐹", "hamster"],
      ["🐰", "rabbit bunny"], ["🦊", "fox"], ["🐻", "bear"], ["🐼", "panda"],
      ["🐨", "koala"], ["🐯", "tiger"], ["🦁", "lion"], ["🐮", "cow"], ["🐷", "pig"],
      ["🐸", "frog"], ["🐵", "monkey"], ["🙈", "see no evil monkey"], ["🐔", "chicken"],
      ["🐧", "penguin"], ["🐦", "bird"], ["🦆", "duck"], ["🦅", "eagle"], ["🦉", "owl"],
      ["🦇", "bat"], ["🐺", "wolf"], ["🐴", "horse"], ["🦄", "unicorn"], ["🐝", "bee"],
      ["🦋", "butterfly"], ["🐌", "snail"], ["🐞", "ladybug"], ["🐢", "turtle"], ["🐍", "snake"],
      ["🐙", "octopus"], ["🐬", "dolphin"], ["🐳", "whale"], ["🦈", "shark"], ["🐘", "elephant"],
      ["🐪", "camel"], ["🦒", "giraffe"], ["🌵", "cactus"], ["🌲", "tree evergreen"],
      ["🌳", "tree"], ["🌴", "palm tree"], ["🌱", "seedling sprout"], ["🌿", "herb leaf"],
      ["🍀", "clover luck"], ["🍁", "maple leaf autumn"], ["🌸", "cherry blossom"],
      ["🌹", "rose"], ["🌻", "sunflower"], ["🌷", "tulip"], ["🌞", "sun face"],
      ["🌙", "moon"], ["⭐", "star"], ["🌟", "glowing star"], ["⚡", "lightning zap"],
      ["🔥", "fire hot lit"], ["🌈", "rainbow"], ["☁️", "cloud"], ["🌧️", "rain"],
      ["❄️", "snowflake"], ["💧", "droplet water"], ["🌊", "wave ocean"],
    ],
  },
  {
    id: "food",
    icon: "🍔",
    label: "Food",
    emojis: [
      ["🍏", "green apple"], ["🍎", "apple red"], ["🍐", "pear"], ["🍊", "orange tangerine"],
      ["🍋", "lemon"], ["🍌", "banana"], ["🍉", "watermelon"], ["🍇", "grapes"],
      ["🍓", "strawberry"], ["🫐", "blueberries"], ["🍒", "cherries"], ["🍑", "peach"],
      ["🥭", "mango"], ["🍍", "pineapple"], ["🥥", "coconut"], ["🥝", "kiwi"],
      ["🍅", "tomato"], ["🥑", "avocado"], ["🥕", "carrot"], ["🌽", "corn"],
      ["🥔", "potato"], ["🍞", "bread"], ["🥐", "croissant"], ["🧀", "cheese"],
      ["🥚", "egg"], ["🥓", "bacon"], ["🍔", "burger hamburger"], ["🍟", "fries"],
      ["🍕", "pizza"], ["🌭", "hot dog"], ["🥪", "sandwich"], ["🌮", "taco"],
      ["🌯", "burrito"], ["🍝", "pasta spaghetti"], ["🍜", "ramen noodles"], ["🍣", "sushi"],
      ["🍤", "shrimp"], ["🍚", "rice"], ["🍩", "donut"], ["🍪", "cookie"],
      ["🎂", "birthday cake"], ["🍰", "cake slice"], ["🍫", "chocolate"], ["🍬", "candy"],
      ["🍦", "ice cream"], ["🍿", "popcorn"], ["☕", "coffee tea hot"], ["🍵", "tea"],
      ["🥤", "soda cup"], ["🍺", "beer"], ["🍷", "wine"], ["🥂", "cheers toast"], ["🍹", "cocktail"],
    ],
  },
  {
    id: "activity",
    icon: "⚽",
    label: "Activity",
    emojis: [
      ["⚽", "soccer football"], ["🏀", "basketball"], ["🏈", "american football"],
      ["⚾", "baseball"], ["🎾", "tennis"], ["🏐", "volleyball"], ["🏓", "ping pong"],
      ["🥊", "boxing glove"], ["🥋", "martial arts"], ["⛳", "golf"], ["🏹", "archery"],
      ["🎣", "fishing"], ["🎮", "video game controller"], ["🕹️", "joystick"],
      ["🎲", "dice game"], ["🧩", "puzzle"], ["♟️", "chess"], ["🎯", "target bullseye"],
      ["🎳", "bowling"], ["🎨", "art palette paint"], ["🎭", "theater masks"],
      ["🎬", "movie clapper"], ["🎤", "microphone sing"], ["🎧", "headphones music"],
      ["🎸", "guitar"], ["🎹", "piano keyboard"], ["🥁", "drum"], ["🎺", "trumpet"],
      ["🎻", "violin"], ["🏆", "trophy winner"], ["🥇", "gold medal first"],
      ["🥈", "silver medal"], ["🥉", "bronze medal"], ["🏅", "medal"], ["🎉", "party popper tada"],
      ["🎊", "confetti"], ["🎈", "balloon"], ["🎁", "gift present"], ["🎀", "ribbon bow"],
    ],
  },
  {
    id: "travel",
    icon: "🚀",
    label: "Travel",
    emojis: [
      ["🚗", "car"], ["🚕", "taxi"], ["🚌", "bus"], ["🏎️", "race car"], ["🚓", "police car"],
      ["🚑", "ambulance"], ["🚒", "fire truck"], ["🚚", "truck delivery"], ["🚜", "tractor"],
      ["🏍️", "motorcycle"], ["🚲", "bicycle bike"], ["🛴", "scooter"], ["🚂", "train"],
      ["🚄", "bullet train"], ["✈️", "airplane plane flight"], ["🛫", "takeoff"],
      ["🛬", "landing"], ["🚁", "helicopter"], ["🚀", "rocket launch"], ["🛸", "ufo"],
      ["⛵", "sailboat"], ["🚢", "ship"], ["⚓", "anchor"], ["🗺️", "world map"],
      ["🧭", "compass"], ["🏔️", "mountain snow"], ["⛰️", "mountain"], ["🏖️", "beach"],
      ["🏝️", "island"], ["🏕️", "camping"], ["🏠", "house home"], ["🏢", "office building"],
      ["🏥", "hospital"], ["🏫", "school"], ["🕌", "mosque"], ["⛪", "church"],
      ["🗽", "statue of liberty"], ["🗼", "tokyo tower"], ["🎡", "ferris wheel"],
      ["🌍", "earth africa europe"], ["🌎", "earth americas"], ["🌏", "earth asia"],
    ],
  },
  {
    id: "objects",
    icon: "💡",
    label: "Objects",
    emojis: [
      ["⌚", "watch"], ["📱", "phone mobile"], ["💻", "laptop computer"], ["⌨️", "keyboard"],
      ["🖥️", "desktop computer"], ["🖨️", "printer"], ["🖱️", "mouse computer"],
      ["💾", "floppy save disk"], ["📷", "camera"], ["📹", "video camera"], ["📺", "tv"],
      ["📻", "radio"], ["⏰", "alarm clock"], ["⏳", "hourglass"], ["🔋", "battery"],
      ["🔌", "plug"], ["💡", "idea light bulb"], ["🔦", "flashlight"], ["🕯️", "candle"],
      ["💰", "money bag"], ["💵", "dollar cash"], ["💳", "credit card"], ["💎", "gem diamond"],
      ["🔧", "wrench tool"], ["🔨", "hammer"], ["⚙️", "gear settings"], ["🧰", "toolbox"],
      ["🔑", "key"], ["🔒", "lock"], ["🔓", "unlock"], ["🛡️", "shield"], ["🔍", "search magnifier"],
      ["📚", "books"], ["📖", "open book"], ["📝", "memo note write"], ["✏️", "pencil"],
      ["📌", "pin"], ["📎", "paperclip"], ["✂️", "scissors"], ["🗑️", "trash bin delete"],
      ["📦", "package box"], ["✉️", "envelope mail"], ["📅", "calendar date"], ["📊", "bar chart"],
      ["📈", "chart up growth"], ["📉", "chart down"], ["🔔", "bell notification"],
      ["🎵", "music note"], ["🛒", "shopping cart"], ["🧪", "test tube"], ["💊", "pill"],
    ],
  },
  {
    id: "symbols",
    icon: "❤️",
    label: "Symbols",
    emojis: [
      ["❤️", "red heart love"], ["🧡", "orange heart"], ["💛", "yellow heart"],
      ["💚", "green heart"], ["💙", "blue heart"], ["💜", "purple heart"], ["🖤", "black heart"],
      ["🤍", "white heart"], ["💔", "broken heart"], ["💕", "two hearts"], ["💖", "sparkling heart"],
      ["💯", "hundred perfect"], ["💢", "anger"], ["💥", "boom collision"], ["💫", "dizzy star"],
      ["💦", "sweat splash"], ["✨", "sparkles"], ["✅", "check done yes"], ["❌", "cross no"],
      ["❓", "question"], ["❗", "exclamation"], ["⚠️", "warning"], ["🚫", "prohibited"],
      ["⛔", "no entry"], ["♻️", "recycle"], ["➕", "plus add"], ["➖", "minus"],
      ["✔️", "check mark"], ["➡️", "right arrow"], ["⬅️", "left arrow"], ["⬆️", "up arrow"],
      ["⬇️", "down arrow"], ["🔄", "refresh reload"], ["🔴", "red circle"], ["🟠", "orange circle"],
      ["🟡", "yellow circle"], ["🟢", "green circle"], ["🔵", "blue circle"], ["🟣", "purple circle"],
      ["⚫", "black circle"], ["⚪", "white circle"], ["🏁", "finish flag"], ["🚩", "red flag"],
    ],
  },
];

const RECENT_KEY = "emoji-picker:recent";
const MAX_RECENT = 16;

function loadRecent(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.slice(0, MAX_RECENT) : [];
  } catch {
    return [];
  }
}

function saveRecent(list: string[]) {
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(list));
  } catch {
    /* storage unavailable: ignore */
  }
}

/* ------------------------------------------------------------------ */
/* Cell: بره EmojiPicker عشان React ما يعملهاش unmount/mount كل render */
/* ------------------------------------------------------------------ */
function Cell({
  entry,
  onPick,
  onHover,
}: {
  entry: EmojiEntry;
  onPick: (emoji: string) => void;
  onHover: (entry: EmojiEntry | null) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onPick(entry[0])}
      onMouseEnter={() => onHover(entry)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(entry)}
      aria-label={entry[1].split(" ")[0]}
      className="flex h-9 w-9 items-center justify-center rounded-lg text-2xl leading-none transition-colors hover:bg-black/10 focus-visible:bg-black/10 focus-visible:outline-2 focus-visible:outline-blue-500 dark:hover:bg-white/15 dark:focus-visible:bg-white/15"
    >
      {entry[0]}
    </button>
  );
}

/* ------------------------------------------------------------------ */

export interface EmojiPickerProps {
  /** Called with the chosen emoji character. */
  onSelect: (emoji: string) => void;
  /** Close the surrounding popover after picking. */
  onClose?: () => void;
  /** Extra classes for the outer wrapper. */
  className?: string;
}

export default function EmojiPicker({ onSelect, onClose, className = "" }: EmojiPickerProps) {
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState<string[]>(loadRecent);
  const [active, setActive] = useState<string>(CATEGORIES[0].id);
  const [hovered, setHovered] = useState<EmojiEntry | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const isJumping = useRef(false);

  const pick = (emoji: string) => {
    const next = [emoji, ...recent.filter((e) => e !== emoji)].slice(0, MAX_RECENT);
    setRecent(next);
    saveRecent(next);
    onSelect(emoji);
    onClose?.();
  };

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    const all = CATEGORIES.flatMap((c) => c.emojis);
    return all.filter(([, kw]) => kw.includes(q));
  }, [query]);

  // Scroll جوه الـ container بس، من غير ما الصفحة تتحرك
  const jumpTo = (id: string) => {
    setActive(id);
    const root = scrollRef.current;
    const el = sectionRefs.current[id];
    if (!root || !el) return;

    const top =
      el.getBoundingClientRect().top -
      root.getBoundingClientRect().top +
      root.scrollTop;

    isJumping.current = true;
    root.scrollTo({ top, behavior: "smooth" });
    window.setTimeout(() => {
      isJumping.current = false;
    }, 600);
  };

  // Highlight the tab of the section currently in view.
  const onScroll = () => {
    const root = scrollRef.current;
    if (!root || results || isJumping.current) return;
    const top = root.getBoundingClientRect().top;
    let current = CATEGORIES[0].id;
    for (const c of CATEGORIES) {
      const el = sectionRefs.current[c.id];
      if (el && el.getBoundingClientRect().top - top <= 24) current = c.id;
    }
    setActive(current);
  };

  return (
    <div
      className={`flex w-88 max-w-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white text-neutral-900 shadow-xl dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-100 ${className}`}
    >
      {/* Search */}
      <div className="p-2 pb-1">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search emoji"
          aria-label="Search emoji"
          className="w-full rounded-lg bg-black/5 px-3 py-2 text-sm outline-none placeholder:text-neutral-500 focus:ring-2 focus:ring-blue-500 dark:bg-white/10"
        />
      </div>

      {/* Category tabs */}
      {!results && (
        <div className="flex justify-between px-2" role="tablist" aria-label="Emoji categories">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={active === c.id}
              aria-label={c.label}
              title={c.label}
              onClick={() => jumpTo(c.id)}
              className={`flex-1 border-b-2 py-1.5 text-lg transition-colors ${
                active === c.id
                  ? "border-blue-500"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              {c.icon}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="relative h-64 overflow-y-auto px-2 pb-2"
      >
        {results ? (
          results.length ? (
            <div className="grid grid-cols-8 pt-2">
              {results.map((e, i) => (
                <Cell key={`${e[0]}-${i}`} entry={e} onPick={pick} onHover={setHovered} />
              ))}
            </div>
          ) : (
            <p className="pt-10 text-center text-sm text-neutral-500">
              No emoji match “{query}”.
            </p>
          )
        ) : (
          <>
            {recent.length > 0 && (
              <section>
                <h3 className="sticky top-0 bg-white py-1.5 text-xs font-medium text-neutral-500 dark:bg-neutral-900">
                  Recently used
                </h3>
                <div className="grid grid-cols-8">
                  {recent.map((e) => (
                    <Cell
                      key={`r-${e}`}
                      entry={[e, "recent"]}
                      onPick={pick}
                      onHover={setHovered}
                    />
                  ))}
                </div>
              </section>
            )}
            {CATEGORIES.map((c) => (
              <section
                key={c.id}
                ref={(el) => {
                  sectionRefs.current[c.id] = el;
                }}
              >
                <h3 className="sticky top-0 bg-white py-1.5 text-xs font-medium text-neutral-500 dark:bg-neutral-900">
                  {c.label}
                </h3>
                <div className="grid grid-cols-8">
                  {c.emojis.map((e) => (
                    <Cell key={e[0]} entry={e} onPick={pick} onHover={setHovered} />
                  ))}
                </div>
              </section>
            ))}
          </>
        )}
      </div>

      {/* Preview bar */}
      <div className="flex h-10 items-center gap-2 border-t border-black/10 px-3 text-sm dark:border-white/10">
        {hovered ? (
          <>
            <span className="text-xl">{hovered[0]}</span>
            <span className="truncate text-neutral-500">
              {hovered[1].split(" ").join(", ")}
            </span>
          </>
        ) : (
          <span className="text-neutral-500">Pick an emoji</span>
        )}
      </div>
    </div>
  );
}