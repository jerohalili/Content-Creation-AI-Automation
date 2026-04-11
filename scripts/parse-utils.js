/**
 * LLaMA 3.1 Preamble & JSON Extractor
 * Strips "Here is the post:" and other meta-commentary
 */
function parseLlamaResponse(rawText) {
    // 1. Clean non-breaking spaces
    let clean = rawText.replace(/[\u00A0\u1680\u180e\u2000-\u200a\u2028\u2029\u202f\u205f\u3000]/g, " ");

    // 2. Locate JSON boundaries
    const start = clean.indexOf('{');
    const end = clean.lastIndexOf('}');

    if (start === -1 || end === -1) throw new Error('No JSON found');

    return JSON.parse(clean.substring(start, end + 1));
}