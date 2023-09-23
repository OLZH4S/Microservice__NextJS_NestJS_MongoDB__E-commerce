export const fetchResource = async <T>(url: string, options: RequestInit = {}): Promise<{ data: T | unknown, response: Response }> => {

    const response = await fetch(url, options);

    if (!response.ok) {
        let errorData: string | null = null;

        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
            const errorJson = await response.json();
            if (errorJson) {
                errorData = errorJson.message;
            }
        } else {
            const errorText = await response.text();
            if (errorText) {
                errorData = errorText;
            }
        }

        return { data: errorData, response };
    }

    const contentType = response.headers.get('Content-Type');

    if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        return { data, response } as { data: T, response: Response };
    } else {
        const data = await response.text();
        return { data, response } as { data: T, response: Response };
    }

};