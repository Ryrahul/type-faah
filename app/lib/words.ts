export type WordMode = "normal" | "curse";

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

export const curseWords = [
  // English profanity
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
  // Hindi gaalis (romanized) - comprehensive
  "chutiya", "madarchod", "behenchod", "bhosdike", "gaandu",
  "harami", "kameena", "saala", "kutte", "gadhe",
  "ullu", "bewakoof", "pagal", "chapri", "jhandu",
  "tatti", "gandu", "chodu", "lavde", "bhosdi",
  "randi", "haramkhor", "nalayak", "nikamma", "gadha",
  "bakchod", "chirkut", "fattu", "lukkha", "lafanga",
  "tapori", "ghatiya", "bekaar", "wahiyat", "bakwas",
  "chutiyon", "kamina", "badtameez", "zaleel", "neech",
  "gandmasti", "bhenchod", "laudu", "jhatu", "chakka",
  "panauti", "duffer", "lodu", "bhadwa", "raand",
  "tharki", "chamcha", "gulel", "dhakkan", "phattu",
  "chutiyapa", "gaandphat", "bhosadpappu", "laudiya",
  "jhaant", "chutad", "gaandmein", "maderchod",
  "behen", "saali", "kutiya", "suar", "janwar",
  "haraami", "harkati", "gandagi", "gandphat",
  "charsi", "nashebaaz", "taklu", "motu", "langda",
  "langoor", "bandar", "suarki", "bhikari", "chhakka",
  "hijda", "tuchha", "gira", "kachra", "keeda",
  "makoda", "cockroach", "chuhaa", "gadhedh", "dhonghi",
  "pakhandhi", "bikau", "dalal", "tattisoch", "galiz",
  "gandu", "bhenchod", "madarchod", "chutmarike",
  "bhosdiwale", "lodebaaz", "chutiyagiri", "randibaaz",
  "haraamzaade", "kamini", "saand", "bhains", "bakri",
  "chutmaari", "gaandphati", "lauda", "lund", "chut",
  "bhosda", "gaand", "jhaatu", "phuddu", "phuddi",
  "chinal", "besharmi", "haramipana", "badmaash",
  "gundaa", "lafangaa", "loafer", "awaara", "bigda",
  "nikammi", "nalayaki", "bevda", "sharaabi", "nashebaazi",
  // Punjabi gaalis (romanized)
  "kutti", "kuttey", "haramdi", "chootni", "penchod",
  "bhainchod", "terimaaki", "maachod", "laudeya",
  "gashti", "kanjri", "khotey", "tattey", "phuddu",
  "gandia", "ghaseeta", "haraamda", "kanjar",
  "paaji", "badmaashi", "lulli", "fuddi", "fuddiyan",
  "kuttiya", "khota", "gadheya", "sooar", "kutteyda",
  "bhaindiyan", "gandasa", "chootad", "ulludepatthe",
  "tatti", "tattiyaan", "buddhu", "vella", "nikhattu",
  "painchoda", "maadarchoda", "bhaindiputtara",
  "tuttpaineya", "ghanta", "lassanpatti", "chhapri",
  // Nepali gaalis (romanized)
  "muji", "lado", "puti", "machikne", "randi",
  "kukur", "gadha", "sungur", "boka", "lado",
  "mukhiya", "haguwa", "charpi", "jhyamma",
  "bokaa", "randiko", "machikney", "pakhe",
  "khate", "dhoti", "bhedaa", "gadhaa", "sungurko",
  "mujibhai", "latokhopey", "khaatey", "gaijaatre",
  "jhantuko", "laaduko", "putiko", "randikochhoro",
  "murkha", "aalchi", "kaamchor", "biraalaa",
  "gadheroo", "chhyaproo", "jhantunath", "laadunath",
  "bhaalu", "himaalko", "saalaa", "kukurko",
  "machha", "randibaaz", "mutubhai", "gidarko",
  // Internet slang / gaming rage
  "wtf", "lmao", "stfu", "gtfo", "smh", "bruh", "fml",
  "yolo", "noob", "trash", "toxic", "salty", "tryhard",
  "rage", "tilt", "copium", "ratio", "cringe", "boomer",
  "malding", "kekw", "pepega", "dogshit", "braindead",
  "ggez", "diffed", "gapped", "washed", "hardstuck",
];

// Hindi + Punjabi words get 3x weight in curse mode
const hindiPunjabi = [
  // Core Hindi gaalis (high frequency)
  "chutiya", "madarchod", "behenchod", "bhosdike", "gaandu",
  "harami", "kameena", "saala", "kutte", "gadhe",
  "bewakoof", "pagal", "chapri", "jhandu", "tatti",
  "gandu", "chodu", "lavde", "randi", "haramkhor",
  "nalayak", "bakchod", "kamina", "badtameez", "laudu",
  "jhatu", "lodu", "bhadwa", "tharki", "chutiyapa",
  "jhaant", "chutad", "maderchod", "kutiya", "suar",
  "haraami", "charsi", "langoor", "bandar", "bhikari",
  "keeda", "dalal", "bhosdiwale", "chutiyagiri", "randibaaz",
  "haraamzaade", "lauda", "lund", "chut", "bhosda",
  "gaand", "jhaatu", "chinal", "badmaash", "gundaa",
  "bevda", "sharaabi", "bakwas", "wahiyat", "ghatiya",
  "nikamma", "fattu", "dhakkan", "panauti", "gandagi",
  // Core Punjabi gaalis (high frequency)
  "penchod", "bhainchod", "terimaaki", "maachod", "laudeya",
  "gashti", "kanjri", "khotey", "tattey", "kanjar",
  "fuddi", "kuttiya", "gadheya", "sooar", "painchoda",
  "maadarchoda", "bhaindiputtara", "tuttpaineya", "ghanta",
  "kutti", "kuttey", "haraamda", "gandia", "ghaseeta",
  "chootad", "ulludepatthe", "vella", "nikhattu", "chhapri",
];

export function generateWords(count: number, mode: WordMode = "normal"): string[] {
  if (mode === "normal") {
    const words: string[] = [];
    for (let i = 0; i < count; i++) {
      words.push(commonWords[Math.floor(Math.random() * commonWords.length)]);
    }
    return words;
  }

  // Curse mode: 65% Hindi/Punjabi, 35% full pool (English/Nepali/slang)
  const words: string[] = [];
  for (let i = 0; i < count; i++) {
    if (Math.random() < 0.65) {
      words.push(hindiPunjabi[Math.floor(Math.random() * hindiPunjabi.length)]);
    } else {
      words.push(curseWords[Math.floor(Math.random() * curseWords.length)]);
    }
  }
  return words;
}
