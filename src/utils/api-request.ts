type ApiRequestError = {
  errors: string[];
  success: false;
  staus: number;
};

type ApiRequestSuccess<T> = {
  data: T;
  success: true;
  status: number;
};

export type ApiRequestResponse<T> = ApiRequestError | ApiRequestSuccess<T>;

const apiURL = process.env.API_URL || 'http://localhost:3001';

export async function apiRequest<T>(
  path: string,
  options?: RequestInit,
): Promise<ApiRequestResponse<T>> {
  const url = `${apiURL}${path}`;

  try {
    const response = await fetch(url, options);
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const errors = Array.isArray(data?.message)
        ? data.message
        : [data?.message || 'Erro inesperado'];
      return {
        errors: errors,
        success: false,
        staus: response.status,
      };
    }

    return {
      data: data,
      success: true,
      status: response.status,
    };
  } catch (error) {
    console.error(error);
    return {
      errors: [(error as Error).message || 'Falha ao conectar ao servidor'],
      success: false,
      staus: 500,
    };
  }
}
