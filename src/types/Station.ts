export type ProgramType = {
  from: number;
  to: number;
  name: string;
};

export type ProgrammingType = {
  0: ProgramType[];
  1: ProgramType[];
  2: ProgramType[];
  3: ProgramType[];
  4: ProgramType[];
  5: ProgramType[];
  6: ProgramType[];
};

export type RadioType = {
  genres: [string];
  id: string;
  name: string;
  slug: string;
  order: number;
  countryCode: string;
  langCode: string;
  img: string;
  programming: ProgrammingType;
  votes: {
    up: number;
    down: number;
  };
  streams: [
    {
      url: string;
      type: 'hls' | 'default' | 'dash' | 'smoothstreaming' | undefined;
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
  region?: { name: string };
};
