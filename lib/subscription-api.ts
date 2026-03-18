export interface SubscriptionStatus {
    userId: number;
    username: string | null;
    subscriptionValid: boolean;
    validUntil: string | null;
}

// Subscription verification bypass: treat every API key as valid.
export async function verifySubscription(apiKey: string): Promise<SubscriptionStatus> {
    return {
        userId: 0,
        username: null,
        subscriptionValid: true,
        validUntil: null,
    };
}
