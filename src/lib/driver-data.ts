export interface DriverStaticData {
  imageUrl: string;
}

const CDN =
  "https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/v1740000001/common/f1/2026";

// 2026 season driver headshots from the official F1 media CDN
export const DRIVER_DATA: Record<string, DriverStaticData> = {
  max_verstappen: {
    imageUrl: `${CDN}/redbullracing/maxver01/2026redbullracingmaxver01right.webp`,
  },
  perez: {
    imageUrl: `${CDN}/cadillac/serper01/2026cadillacserper01right.webp`,
  },
  hamilton: {
    imageUrl: `${CDN}/ferrari/lewham01/2026ferrarilewham01right.webp`,
  },
  leclerc: {
    imageUrl: `${CDN}/ferrari/chalec01/2026ferrarichalec01right.webp`,
  },
  norris: {
    imageUrl: `${CDN}/mclaren/lannor01/2026mclarenlannor01right.webp`,
  },
  piastri: {
    imageUrl: `${CDN}/mclaren/oscpia01/2026mclarenoscpia01right.webp`,
  },
  russell: {
    imageUrl: `${CDN}/mercedes/georus01/2026mercedesgeorus01right.webp`,
  },
  antonelli: {
    imageUrl: `${CDN}/mercedes/andant01/2026mercedesandant01right.webp`,
  },
  alonso: {
    imageUrl: `${CDN}/astonmartin/feralo01/2026astonmartinferalo01right.webp`,
  },
  stroll: {
    imageUrl: `${CDN}/astonmartin/lanstr01/2026astonmartinlanstr01right.webp`,
  },
  gasly: {
    imageUrl: `${CDN}/alpine/piegas01/2026alpinepiegas01right.webp`,
  },
  tsunoda: {
    imageUrl: `${CDN}/racingbulls/yuktsu01/2026racingbullsyuktsu01right.webp`,
  },
  lawson: {
    imageUrl: `${CDN}/racingbulls/lialaw01/2026racingbullslialaw01right.webp`,
  },
  bottas: {
    imageUrl: `${CDN}/cadillac/valbot01/2026cadillacvalbot01right.webp`,
  },
  bearman: {
    imageUrl: `${CDN}/haasf1team/olibea01/2026haasf1teamolibea01right.webp`,
  },
  hulkenberg: {
    imageUrl: `${CDN}/audi/nichul01/2026audinichul01right.webp`,
  },
  ocon: {
    imageUrl: `${CDN}/haasf1team/estoco01/2026haasf1teamestoco01right.webp`,
  },
  albon: {
    imageUrl: `${CDN}/williams/alealb01/2026williamsalealb01right.webp`,
  },
  sainz: {
    imageUrl: `${CDN}/williams/carsai01/2026williamscarsai01right.webp`,
  },
  colapinto: {
    imageUrl: `${CDN}/alpine/fracol01/2026alpinefracol01right.webp`,
  },
  hadjar: {
    imageUrl: `${CDN}/redbullracing/isahad01/2026redbullracingisahad01right.webp`,
  },
  bortoleto: {
    imageUrl: `${CDN}/audi/gabbor01/2026audigabbor01right.webp`,
  },
  arvid_lindblad: {
    imageUrl: `${CDN}/racingbulls/arvlin01/2026racingbullsarvlin01right.webp`,
  },
  doohan: {
    imageUrl: `${CDN}/alpine/jacdoo01/2026alpinejacdoo01right.webp`,
  },
};
