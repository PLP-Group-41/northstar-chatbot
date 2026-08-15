function startOrderStatusFlow(addMessage) {
    let step = 'ask_order_number';
    let orderNum = '';

    // ✅ Fix 1: Ask for the order number immediately when flow starts
    addMessage("Sure! Please share your order number and I'll look that up.", 'bot');

    return {
        next: function(userText) {
            const text = userText.trim();
            const lower = text.toLowerCase();

            if (step === 'ask_order_number') {
                orderNum = text.replace(/\D/g, '');

                if (orderNum.length < 3) {
                    addMessage("That doesn't look like a valid order number. Please enter a numeric order ID (e.g., 12345).", 'bot');
                    return this;
                }

                addMessage("Looking that up for you...", 'bot');

                setTimeout(() => {
                    addMessage(`Great! I found order #${orderNum}.`, 'bot');
                    // ✅ Fix 2: Plain text, no markdown asterisks
                    addMessage("📦 Status: Shipped", 'bot');
                    addMessage("🚚 Carrier: FastTrack Logistics", 'bot');
                    addMessage("📅 Estimated delivery: Tomorrow by 6:00 PM", 'bot');
                    addMessage("Would you like the tracking link, or is there something else I can help with?", 'bot');
                }, 800);

                step = 'follow_up';
                return this;
            }

            if (step === 'follow_up') {
                if (lower.includes('track') || lower.includes('link')) {
                    addMessage(`Here is your tracking link: https://track.fasttrack.com/${orderNum}`, 'bot');
                    addMessage("Need anything else?", 'bot');
                    return this;
                }

                if (lower.includes('yes') || lower.includes('help') || lower.includes('else') || lower.includes('another')) {
                    addMessage("Sure! I can help with returns or check stock for another item. What do you need?", 'bot');
                    return null;
                }

                if (lower.includes('no') || lower.includes('good') || lower.includes('that') || lower.includes('fine')) {
                    addMessage("Perfect! If you need anything else, I'm here. Have a great day! 🌟", 'bot');
                    return null;
                }

                addMessage("I can share the tracking link or help with returns. What would you like?", 'bot');
                return this;
            }
        }
    };
}