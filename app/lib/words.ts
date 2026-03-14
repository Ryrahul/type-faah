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
  "gandmasti", "besharmi", "haramipana", "nalayaki", "lafanga",
  "raand", "chakka", "hijda", "hijada", "kinnar",
  "meetha", "randikhana", "chinalbaaz", "laudebaaz",
  "gaandphat", "chhakka", "chutmarike", "raandbaaz",
  "lavdya", "jhantke", "gaandfat", "chutadbaaz",
  "laudiya", "bhosadpappu", "tattisoch",
  "ullu", "gadha", "bhosdi", "chutiyon",
  "tatti", "lodu", "panauti", "duffer",
  "chamcha", "gulel", "dhakkan", "phattu",
  "behen", "saali", "janwar", "harkati",
  "langda", "taklu", "motu", "suarki",
  "tuchha", "gira", "kachra", "makoda",
  "chuhaa", "gadhedh", "dhonghi", "pakhandhi",
  "bikau", "galiz", "kamini", "saand",
  "bhains", "bakri", "chutmaari", "gaandphati",
  "phuddu", "phuddi", "nikammi", "bigda",
  "awaara", "loafer", "lafangaa", "gundaa",
  "nashebaaz", "nashebaazi", "tapori", "chirkut",
  "lukkha", "bekaar", "zaleel", "neech",
  "gandphat", "gandagi", "tattiyaan",
  "gaandmein", "bhenchod", "lodebaaz",
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
// NEPALI GAALIS
// ═══════════════════════════════════════
const nepaliWords = [
  "muji", "lado", "puti", "machikne", "randi",
  "kukur", "gadha", "sungur", "boka", "machikney",
  "mukhiya", "haguwa", "charpi", "jhyamma",
  "bokaa", "randiko", "pakhe", "khate",
  "dhoti", "bhedaa", "gadhaa", "sungurko",
  "mujibhai", "latokhopey", "khaatey", "gaijaatre",
  "jhantuko", "laaduko", "putiko", "randikochhoro",
  "murkha", "aalchi", "kaamchor", "biraalaa",
  "gadheroo", "chhyaproo", "jhantunath", "laadunath",
  "bhaalu", "himaalko", "saalaa", "kukurko",
  "machha", "randibaaz", "mutubhai", "gidarko",
  "mujikobaan", "ladokhane", "putimarne",
  "machiknekoban", "kukurjasto",
  "gadhajasto", "sungurjasto", "bokajasto",
  "randikocheli", "randikochhora",
  "mujikonaati", "ladokotukra",
  "haguwamanxe", "charpimakhune",
  "bhedabuddi", "gadhabuddi", "sungurbuddi",
  "pakheko", "khateko", "dhotiko",
  "jhantubhai", "laadubhai", "putibhai",
  "chhyapro", "gadheruko", "biraalko",
  "sungurkomukh", "bokakokaan", "kukurkopuchchar",
  "gadhakokaan", "bhedakokhutta", "gidarkomukh",
  "mujimuji", "ladolado", "putiputi",
  "machiknemachikne", "randikorandi",
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
  "chutmarike", "bhosdiwale", "laudebaaz", "gaandphat",
  "chhakka", "hijada", "kinnar", "meetha",
  "randikhana", "chinalbaaz", "tharki", "bhadwa",
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
