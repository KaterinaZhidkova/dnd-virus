const API_BASE = 'http://localhost:8080/api';

export interface RollResponse {
  roll: number;
  action: string;
  description: string;
  videoSrc?: string;
}

export async function rollDice(): Promise<RollResponse> {
  const response = await fetch(`${API_BASE}/roll`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Roll failed: ${response.status}`);
  }

  return response.json();
}