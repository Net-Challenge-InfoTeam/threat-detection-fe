type Coordinates = {
  longitude: number;
  latitude: number;
};

const parsePoint = (pointStr: string): Coordinates | null => {
  const match = pointStr.match(/POINT\((\d+\.\d+) (\d+\.\d+)\)/);

  if (match) {
    const [, latitude, longitude] = match;
    return {
      longitude: parseFloat(longitude),
      latitude: parseFloat(latitude),
    };
  } else {
    return null;
  }
};

export default parsePoint;
