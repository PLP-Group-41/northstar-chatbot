function startReturnsFlow(addMessage) {
    let step = 0;

    addMessage("What's the reason for your return?", 'bot');

    return {
        next(text) {
            if (step === 0) {
                addMessage(
                    "Got it. Here's how to return your item: go to Orders > select the item > Request Return. Refunds post within 5-7 business days.",
                    'bot'
                );
                addMessage("Is there anything else I can help with?", 'bot');
                step = 1;
                return this;
            } else {
                addMessage("Thanks, have a great day!", 'bot');
                return null;
            }
        }
    };
}