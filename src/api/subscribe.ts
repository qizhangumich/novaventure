export interface SubscribeResponse {
  success?: boolean;
  error?: string;
}

export async function subscribe(email: string): Promise<SubscribeResponse> {
  try {
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const data = await response.json();
      return { error: data.error || 'Failed to subscribe' };
    }

    return { success: true };
  } catch (error) {
    console.error('Subscription error:', error);
    return { error: 'Network error' };
  }
} 