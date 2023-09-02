const fetchJsonData = async <T>(src: string) => {
  try {
    const response = await fetch(src); // JSON 파일의 URL
    if (!response.ok) {
      throw new Error(
        `Failed to fetch: ${response.status} ${response.statusText}`,
      );
    }
    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching model image data: ${error}`);
    return []; // 또는 적절한 기본값 또는 null을 반환
  }
};

export default fetchJsonData;
