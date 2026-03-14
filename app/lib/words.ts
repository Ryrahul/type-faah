export type WordMode = "normal" | "mixed" | "hindi" | "punjabi" | "nepali" | "english";

export const commonWords = [
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "I",
  "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
  "this", "but", "his", "by", "from", "they", "we", "say", "her", "she",
  "or", "an", "will", "my", "one", "all", "would", "there", "their", "what",
  "so", "up", "out", "if", "about", "who", "get", "which", "go", "me",
  "when", "make", "can", "like", "time", "no", "just", "him", "know", "take",
  "people", "into", "year", "your", "good", "some", "could", "them", "see",
  "other", "than", "then", "now", "look", "only", "come", "its", "over",
  "think", "also", "back", "after", "use", "two", "how", "our", "work",
  "first", "well", "way", "even", "new", "want", "because", "any", "these",
  "give", "day", "most", "us", "great", "between", "need", "large", "under",
  "never", "each", "right", "high", "really", "last", "long", "story",
  "small", "turn", "end", "play", "hand", "part", "run", "begin", "seem",
  "help", "show", "hear", "city", "keep", "point", "home", "read", "group",
  "thought", "went", "few", "move", "live", "night", "open", "sure", "thing",
  "change", "line", "hard", "start", "might", "place", "close", "light",
  "head", "stand", "own", "page", "letter", "mother", "answer", "found",
  "still", "learn", "should", "world", "house", "where", "set", "off",
  "same", "old", "while", "mean", "does", "let", "three", "air", "put",
  "much", "earth", "too", "got", "name", "find", "land", "every", "through",
  "study", "food", "near", "tree", "life", "paper", "state", "eye", "never",
  "school", "river", "room", "did", "boy", "once", "animal", "book", "car",
  "main", "enough", "plain", "girl", "usual", "young", "ready", "above",
  "ever", "red", "list", "though", "feel", "talk", "bird", "soon", "body",
  "dog", "family", "leave", "song", "stop", "walk", "few", "next", "side",
  "white", "sea", "began", "grow", "mountain", "cut", "real", "almost",
  "face", "watch", "far", "build", "many", "kind", "must", "tell", "door",
  "color", "number", "water", "power", "hour", "word", "fire", "south",
  "problem", "piece", "told", "knew", "pass", "since", "top", "whole",
  "king", "space", "street", "yet", "fish", "idea", "north", "ago",
  "write", "music", "war", "reach", "rest", "field", "game", "best",
  "dark", "class", "wind", "question", "mark", "boat", "country",
  "map", "half", "rock", "order", "ground", "table", "form", "system",
  "love", "better", "money", "simple", "voice", "road", "rain", "rule",
  "able", "star", "across", "early", "hold", "west", "fast", "deep",
  "sleep", "cover", "often", "along", "done", "travel", "center", "plant",
  "measure", "product", "black", "short", "behind", "warm", "common",
  "strong", "special", "mind", "bring", "explain", "dry", "clear",
  "pattern", "complete", "shall", "shape", "cold", "plan", "drive",
  "true", "pull", "sun", "note", "check", "area", "verb", "fly",
  "fall", "lead", "cry", "machine", "record", "stood", "contain", "front",
  "teach", "ocean", "wood", "green", "certain", "happy", "morning",
  "summer", "winter", "ball", "figure", "wonder", "develop", "boat",
  "language", "busy", "garden", "practice", "perhaps", "final",
  "island", "million", "picture", "sentence", "interest", "produce",
  "surface", "against", "remember", "toward", "course", "believe",
  "beautiful", "program", "minute", "finger", "natural", "hundred"
];

// ═══════════════════════════════════════
// HINDI GAALIS
// ═══════════════════════════════════════
const hindiWords = [
  // Tier 1 - most aggressive, highest frequency
  "chutiya", "madarchod", "behenchod", "bhosdike", "gaandu",
  "lauda", "lund", "chut", "bhosda", "gaand", "randi",
  "raand", "gandu", "lavde", "chodu", "jhaatu",
  "chutiya", "madarchod", "behenchod", "bhosdike",
  // Correct aggressive combos
  "gaandfaad", "gaandmara", "gaandchatna", "gaandtod",
  "lundchoos", "chutmaraa", "bhosdapappu", "laudelele",
  "chutkelund", "bhosdiwaale", "lundfakeer", "gaanduchakkar",
  // Heavy insults
  "harami", "kameena", "saala", "kutte", "gadhe",
  "haraamzaade", "haraamzaadi", "haramkhor",
  "randibaaz", "randikhana", "randirona", "randwabaaz",
  "chinalbaaz", "chinal", "tharki", "bhadwa",
  "dalal", "bikau", "chamcha", "tattisoch",
  // Identity attacks
  "chakka", "hijda", "hijada", "kinnar", "meetha",
  "chhakka", "laundebaaz", "gandu", "gudda",
  // Body related
  "lauda", "lund", "chut", "bhosda", "gaand",
  "jhaant", "tatti", "chutad", "phuddi", "phuddu",
  // Common gaalis
  "bakchod", "kamina", "badtameez", "laudu",
  "jhatu", "lodu", "chutiyapa", "chutiyagiri",
  "bewakoof", "pagal", "chapri", "jhandu",
  "nalayak", "nikamma", "fattu", "phattu",
  // Compound gaalis
  "madarchod", "behenchod", "bhenchod", "maderchod",
  "bhosdike", "bhosdiwale", "chutmarike",
  "laudebaaz", "lodebaaz", "raandbaaz",
  "bhosadpappu", "laudiya", "lavdya",
  // Insults
  "ullu", "gadha", "suar", "kutiya", "kutte",
  "langoor", "bandar", "bhikari", "keeda", "makoda",
  "kachra", "tuchha", "neech", "zaleel", "galiz",
  "dhonghi", "pakhandhi", "ghatiya", "wahiyat",
  "bakwas", "bekaar", "nikammi", "lafanga",
  // Rage expressions
  "teremaaki", "terimaachud", "maakabhosda",
  "baapkalauda", "maakichut", "behenkichut",
  "gaandfaaddunga", "lundtoddunga", "bhosdatorh",
  "chutiyakaatna", "gaandmaraana", "laudepelele",
  // Situational
  "bevda", "sharaabi", "charsi", "nashebaaz",
  "tapori", "chirkut", "lukkha", "loafer",
  "gundaa", "badmaash", "lafangaa", "awaara",
  "dhakkan", "panauti", "duffer", "chamcha",
  "saali", "kamini", "saand", "bhains",
  "taklu", "motu", "langda", "bigda",
  // Fun compound gaalis
  "chutpaglu", "lundtopa", "bhosadchod",
  "gaandulala", "laudalassan", "chutkulund",
  "bhosdabandhar", "tattufakeer", "jhantumama",
  "gaandchor", "lundpakoda", "chutputra",
  "bhosdacharya", "laudawala", "gaandumal",
  "chutbandhar", "tattulal", "jhantudas",
];

// ═══════════════════════════════════════
// PUNJABI GAALIS
// ═══════════════════════════════════════
const punjabiWords = [
  "penchod", "bhainchod", "terimaaki", "maachod", "laudeya",
  "gashti", "kanjri", "khotey", "tattey", "kanjar",
  "fuddi", "fuddiyan", "kuttiya", "gadheya", "sooar",
  "painchoda", "maadarchoda", "bhaindiputtara", "tuttpaineya",
  "ghanta", "kutti", "kuttey", "haraamda", "gandia",
  "ghaseeta", "chootad", "ulludepatthe", "vella", "nikhattu",
  "chhapri", "haramdi", "chootni", "phuddu",
  "paaji", "badmaashi", "lulli", "khota", "kutteyda",
  "bhaindiyan", "gandasa", "tattiyaan", "buddhu",
  "lassanpatti", "guddi", "pendu", "jatt",
  "kudiyan", "chootiya", "bhainsdiputtara",
  "gaddhekitauli", "mundey", "bharvaad",
  "giddha", "chhittar", "tuttiya", "phittey",
  "phitteymunh", "udaari", "saddgaya",
  "vaddiyan", "langotiya", "puttardiyan",
  "saaliyan", "randva", "haramzaadi",
  "gaandvich", "fuddikhol", "tattebaj",
  "khotadimaa", "sooardiaulad", "bhaindaputtar",
  "kanjardimaa", "gashtidikuri", "laudeyadiaal",
  "gandiyamunda", "nikhattupaaji", "vellaputtar",
  "chhapridimaa", "penchoda", "bhainchoda",
  "kuttekhasmanu", "sooarkiaulad", "gadheyadinasal",
  "terimaapenchod", "teripenchod",
];

// ═══════════════════════════════════════
// NEPALI GAALIS (popular / aggressive)
// ═══════════════════════════════════════
const nepaliWords = [
  // Heavy hitters - most common
  "muji", "lado", "puti", "machikne", "randi",
  "chikne", "bhalu", "kukur", "gadha", "boka",
  "sungur", "haguwa", "chhada", "mula", "guu", "twake", "radi",
  // Top aggressive
  "muji", "machikne", "lado", "puti", "randi",
  "randiko", "machikne", "chikne", "bhalu",
  // Direct insults
  "pakhe", "khate", "dhoti", "gobre", "dalle",
  "kale", "geda", "fuchche", "tapke", "jatho",
  // Rage combos
  "randikochoro", "randikochori", "machiknemuji",
  "kukurchoro", "gadhachoro", "bhedachoro",
  "bokakochoro", "sungurkochoro", "bhalukouchoro", "radikochoro", "radikochori",
  // Character attacks
  "sala", "kamina", "badmas", "chor", "thag",
  "luchha", "lafanga", "dalal", "bikau", "chamcha",
  "nachune", "lutho", "ganjedi", "twake",
  // Body / vulgar
  "lado", "puti", "geda", "jatho", "giddhi",
  "tunto", "guu", "mut", "ladkokokapal", "putikobhutla", "kando", "gula", "gulo",
  // Animal insults
  "kukur", "sungur", "boka", "gadha", "bhalu",
  "gidar", "syaal", "biralo", "bandar", "ullu",
  "sarpa", "chheparo", "bhaisi",
  // Intensifiers
  "muji", "lado", "puti", "randi", "machikne",
  "chikne", "haguwa", "mula", "chhada", "radi", "gula", "gulo",
  // Popular phrases as single words
  "bajiya", "dhatteri", "machikne", "hattpakhe",
  "mujilado", "putimachikne", "randibhalu",
  "gedakha", "jhantomuji", "ladoboka",
  "kukurboka", "gadhapakhe", "bhedagobre",
];

// ═══════════════════════════════════════
// ENGLISH CURSE WORDS
// ═══════════════════════════════════════
const englishWords = [
  "fuck", "shit", "damn", "ass", "bitch", "bastard", "crap", "dick",
  "piss", "hell", "douche", "moron", "idiot", "dumbass", "jackass",
  "asshole", "bullshit", "motherfucker", "fucker", "shithead",
  "dipshit", "dickhead", "cunt", "twat", "wanker", "prick",
  "scumbag", "douchebag", "nutjob", "bonehead", "nitwit", "dimwit",
  "halfwit", "blockhead", "knucklehead", "schmuck", "putz",
  "jerk", "loser", "clown", "fool", "buffoon", "dunce",
  "bloody", "bugger", "bollocks", "tosser", "pillock", "plonker",
  "muppet", "numpty", "bellend", "git", "sod", "arse",
  "whore", "slut", "skank", "tramp", "hag", "sleaze",
  "turd", "fuckwit", "shitbag", "cocksucker", "cumstain",
  "fuckface", "shitshow", "clusterfuck", "shitstorm", "dirtbag",
  "wankstain", "gobshite", "twatwaffle", "asswipe", "shitgibbon",
  "fuckstick", "thundercunt", "cockwomble", "pissweasel",
  "arsemonger", "shitlord", "dickweed", "bumblefuck",
  "ratfuck", "crapweasel", "shitstain", "fuckknuckle",
  "douchecanoe", "assbucket", "shitbird", "fuckbucket",
  "wtf", "lmao", "stfu", "gtfo", "smh", "bruh", "fml",
  "yolo", "noob", "trash", "toxic", "salty", "tryhard",
  "rage", "tilt", "copium", "ratio", "cringe", "boomer",
  "malding", "kekw", "pepega", "dogshit", "braindead",
  "ggez", "diffed", "gapped", "washed", "hardstuck",
];

// All curse words combined for mixed mode
const allCurseWords = [...hindiWords, ...punjabiWords, ...nepaliWords, ...englishWords];

// Rage bait subset for mixed mode priority
const rageBait = [
  "raand", "gandu", "chakka", "hijda", "randi",
  "chutiya", "madarchod", "behenchod", "bhosdike",
  "lauda", "lund", "chut", "bhosda", "gaand",
  "kutiya", "suar", "haraamzaade", "raandbaaz",
  "chutmarike", "bhosdiwale", "laudebaaz", "gaandfaad",
  "chhakka", "hijada", "kinnar", "meetha",
  "randikhana", "chinalbaaz", "tharki", "bhadwa",
  "gaandfaaddunga", "lundtoddunga", "maakichut",
  "behenkichut", "teremaaki", "maakabhosda",
  "gaandmara", "gaandtod", "lundchoos",
  "penchod", "bhainchod", "maachod", "painchoda",
  "fuddi", "phuddu", "tattey", "muji", "machikne", "lado",
  "fuck", "motherfucker", "cocksucker", "cunt", "asshole",
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateWords(count: number, mode: WordMode = "normal"): string[] {
  const words: string[] = [];

  for (let i = 0; i < count; i++) {
    switch (mode) {
      case "normal":
        words.push(pick(commonWords));
        break;
      case "hindi":
        words.push(pick(hindiWords));
        break;
      case "punjabi":
        words.push(pick(punjabiWords));
        break;
      case "nepali":
        words.push(pick(nepaliWords));
        break;
      case "english":
        words.push(pick(englishWords));
        break;
      case "mixed": {
        const r = Math.random();
        if (r < 0.35) words.push(pick(rageBait));
        else if (r < 0.60) words.push(pick(hindiWords));
        else if (r < 0.75) words.push(pick(punjabiWords));
        else if (r < 0.85) words.push(pick(nepaliWords));
        else words.push(pick(englishWords));
        break;
      }
    }
  }
  return words;
}
