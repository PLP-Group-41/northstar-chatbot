function detectIntent(text) {
    const lower = text.toLowerCase();

    const orderKeywords = [
        'order', 'shipped', 'shipping', 'where is', 'where\'s',
        'track', 'tracking', 'delivery', 'package', 'parcel',
        'when will', 'has it left', 'status', 'arriving',
        'shipment', 'dispatch', 'out for delivery', 'coming'
    ];

    const returnKeywords = [
        'return', 'refund', 'send back', 'money back', 'exchange',
        'send it back', 'i want to return', 'how do i return',
        'can i return', 'return policy'
    ];

    const stockKeywords = [
        'stock', 'available', 'in stock', 'back in stock',
        'size', 'do you have', 'when will you have', 'restock'
    ];

    if (orderKeywords.some(k => lower.includes(k))) return 'order_status';
    if (returnKeywords.some(k => lower.includes(k))) return 'returns';
    if (stockKeywords.some(k => lower.includes(k))) return 'stock';

    return 'unknown';
}