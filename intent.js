function detectIntent(text) {
    const lower = text.toLowerCase();
    
    const orderKeywords = ['order', 'shipped', 'shipping', 'where is', 'track', 'delivery', 'package'];
    const returnKeywords = ['return', 'refund', 'send back', 'money back', 'exchange'];
    
    if (orderKeywords.some(k => lower.includes(k))) return 'order_status';
    if (returnKeywords.some(k => lower.includes(k))) return 'returns';
    
    return 'unknown';
}