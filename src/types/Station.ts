export type RadioType = {
  genres: [string];
  id: string;
  name: string;
  slug: string;
  order: number;
  countryCode: string;
  langCode: string;
  img: string;
  votes: {
    up: number;
    down: number;
  };
  streams: [
    {
      url: string;
      type: string;
    },
  ];
  address?: string;
  description?: string;
  mail: string;
  slogan?: string;
  tel: string;
  twitter: string;
  web: string;
  continentCode: string;
  cityId: string;
  regionId: string;
  whatsapp: string;
  city?: {
    name: string;
  };
};
