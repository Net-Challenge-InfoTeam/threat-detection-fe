import axios from "axios";

export const getAddress = async ({
  queryKey,
}: {
  queryKey: [string, { latitude: number; longitude: number }];
}) => {
  const [, { latitude, longitude }] = queryKey;

  const coords = `${longitude},${latitude}`;

  const { data } = await axios.get(
    `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${coords}&orders=roadaddr&output=json`,
    {
      headers: {
        "X-NCP-APIGW-API-KEY-ID": import.meta.env.VITE_NAVER_API_KEY_ID,
        "X-NCP-APIGW-API-KEY": import.meta.env.VITE_NAVER_API_KEY,
      },
    },
  );

  console.log(data);

  const addr =
    data.results[0].region.area1.name +
    data.results[0].region.area2.name +
    data.results[0].region.area3.name +
    data.results[0].region.area4.name +
    data.results[0].land.name;

  return addr;
};
