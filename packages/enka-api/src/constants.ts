export const urls = {
  data: (uid: string) => `https://enka.network/u/${uid}/__data.json`,
  image: (iconName: string) => `https://enka.network/ui/${iconName}.png`,
} as const;
