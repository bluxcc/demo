const API_URL = (
  import.meta.env.VITE_BLUX_API_URL || 'https://api.blux.cc'
).replace(/\/+$/, '');

export type DemoAppearanceResult = {
  id: string;
  url: string;
  short_url: string;
};

const isDemoAppearanceResult = (
  value: unknown,
): value is DemoAppearanceResult => {
  if (!value || typeof value !== 'object') return false;
  const result = value as Record<string, unknown>;
  return (
    typeof result.id === 'string' &&
    typeof result.url === 'string' &&
    typeof result.short_url === 'string'
  );
};

const parseResult = (body: unknown): DemoAppearanceResult | null => {
  if (!body || typeof body !== 'object') return null;
  const result = (body as { result?: unknown }).result;
  return isDemoAppearanceResult(result) ? result : null;
};

export const createDemoAppearance = async (
  url: string,
): Promise<DemoAppearanceResult> => {
  const response = await fetch(`${API_URL}/demos`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    throw new Error('Failed to create demo appearance');
  }

  const result = parseResult(await response.json());
  if (!result) {
    throw new Error('Invalid demo appearance response');
  }

  return result;
};

export const fetchDemoAppearance = async (
  id: string,
): Promise<DemoAppearanceResult | null> => {
  const response = await fetch(`${API_URL}/demos/${encodeURIComponent(id)}`, {
    headers: { Accept: 'application/json' },
  });

  if (response.status === 404 || response.status === 400) {
    return null;
  }

  if (!response.ok) {
    throw new Error('Failed to resolve demo appearance');
  }

  return parseResult(await response.json());
};
