// HERRERA & CAMPO — Temporada de Oro
// Product catalog with hardcoded inventory and sold-out sizes.
// In production, this would come from the Shopify Storefront API.
//
// IMPORTANT: Artlist asset URLs are CloudFront-signed. Without the
// ?Expires=&Key-Pair-Id=&Signature= query params, the CDN returns
// HTTP 403 and the asset fails to load. If the browser stops loading
// assets, re-fetch fresh signed URLs via `list_generations` and
// paste them in here.

export type Size = string;

export interface Product {
  id: string;
  name: string;
  price: number; // MXN
  caption: string;
  sizes: Size[];
  soldOutSizes: Size[];
  /** Single-image asset URL used as the card still and hover-spin poster. */
  stillUrl: string;
  /** Generation ID for the Spin video — used as input for I2V hover-spin. */
  spinGenerationId: string | null;
  /** Direct video URL once generated. Populated post-pipeline. */
  spinVideoUrl: string | null;
}

export const soldOutSizes = {
  'bota-vaquera': ['23', '24'],
  'camisa-charra': [],
  'sarape-poncho': [],
  'cinturon-piteado': [],
  'sombrero-jalisco': [],
} as const;

export const products: Product[] = [
  {
    id: 'bota-vaquera',
    name: 'Bota Vaquera Cuadra',
    price: 4200,
    caption: 'Cuadra-style · hechura a mano · 6 meses de uso al día',
    sizes: ['22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32'],
    soldOutSizes: [...soldOutSizes['bota-vaquera']],
    stillUrl:
      'https://cms-toolkit-artifacts.artlist.io/content/-t-e-x-t_-t-o_-i-m-a-g-e-v1/media__5/image-53b851f9-cf77-4d28-b913-bf827cc909f3.png?Expires=2101523008&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=LndWjL8Jfkvf2cMNS15CZltN7fUbNWxAhXaESFxJ0AGlKHyTbvlxvpCjeTtJUVADRpyVc~dAMuss3fJ9tkAoyAwNT1WNu~H5pzT-rc8RVMEDUtC-SGwdNVWuxhr2zxyW8Yr5NpufFGKokiAREJX7IpISPtGhy62sp5tCEzPqVK0~L~EI4B3qlOD-llyPOaAG0YYBUvfV6-VRfdxgZf3jzyEx4YH1eMYJa1cBtFBdzExC7n4BJF5e12B8SEhzFic6eEYz8UdfLpvKCaoMuV4ZOZo5IugKiWFhWgiiCoHWpQL-hQIvvyDAwOfclpjvTpjWlmH~xH9C-HXNa9ItZYgOow__',
    spinGenerationId: '019fdf9c-7966-7003-bf5a-b24d0e1ac9e6',
    spinVideoUrl:
      'https://cms-toolkit-artifacts.artlist.io/content/-e-x-t-e-r-n-a-l_-i-m-a-g-e_-t-o_-v-i-d-e-o-v1/media__1/-e-x-t-e-r-n-a-l_-i-m-a-g-e_-t-o_-v-i-d-e-o-bca74ee5-b8ee-478e-8113-b944a268cab8.mp4?Expires=2101523188&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=hYgoYx-ae7NQs8sljjJZZAdOmnz5SDveOXwcmE2OCR2XqzTBlBSvpEodzyYOyHrYoW82axkSmbQ9K1rz9uQm1Mcc-3KeG5M42ICKYJvevtQE0iecQAIi41168bWqwjlpDdzZ0AI2~dW31svdvfxuVjAiuBZW6Jm8vjmgrnpI3585AhwlJKKYI43Xu8tTKU937aaDVCsppGydp0dfLkKwmNjsGI90LpxhxHpD3OSfITEeVawwTJnWYoa-tC6GiSphRCgs982J13Sujntx6~Xj7npi9sqWNcImzrRpaz19QDqjuFbvPf66-MBUSiEamffPwWtHcTthe5hG3YKVcU9pcg__',
  },
  {
    id: 'camisa-charra',
    name: 'Camisa Charra de Botonadura',
    price: 2800,
    caption: 'Algodón ivory · bordado a mano en pecho y puños',
    sizes: ['CH', 'M', 'G', 'XG'],
    soldOutSizes: [...soldOutSizes['camisa-charra']],
    stillUrl:
      'https://cms-toolkit-artifacts.artlist.io/content/-t-e-x-t_-t-o_-i-m-a-g-e-v1/media__1/image-8adc6786-2cb8-46aa-8d7e-863fce973fde.png?Expires=2101523009&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=ky-84j3VdgdUdVIVPNzygfm7U8bbG3KIM8t3iC9-QoGepSIjp4rrdP3fIoDxSH2LY3sXcrBDblwCSw3Lo4dUL6c~vra9cn0M66D59RgCkpMwCOAoupvYUViTg0XPvpO~DOznTX~dh5vfpK638byqIhFmpqkz2VpQclCBhGWG2c--V2yzAHIRYeabkzOvtTgU0jtAkNQSXKDo1Upj0hJA3gXYkejwrhsjPi4yrkj0u6tKq4nAOJiV-icldUeOSNPQia3PjBJW2z3zFUsjgbpdzN7zivAJz3Bt6wmD5VPTJqhEzEJVRESrrq-rVCx5QA1LTcqCwKBkkqMZfWDDkJyiHw__',
    spinGenerationId: '019fdf9c-7936-7e56-b486-a8ce5f07e8ca',
    spinVideoUrl:
      'https://cms-toolkit-artifacts.artlist.io/content/-e-x-t-e-r-n-a-l_-i-m-a-g-e_-t-o_-v-i-d-e-o-v1/media__4/-e-x-t-e-r-n-a-l_-i-m-a-g-e_-t-o_-v-i-d-e-o-eee8dd24-54b5-4b50-94f6-2fe67934748e.mp4?Expires=2101523217&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=TYKJ~MPJwhNr3YpsE92EPoPfd5265DL4lC7fokLoO4yXe8CkxA4YddPkKkbAzmDC1hfGdNcEM1NWuijVEEJF7FBp7WB3vUiH6fJwnri8OiKKJOnEhgx9-FnnWw4pDHLxHBKFXYdE1Shr5BlWT0-1mNO2Sh-Ts2k8hWNwVv4rVbw07E2yn6n0LyTrbNnrKw7LATNGUG2Bnq8lD9kLcWgbC6mwt3yplhAw0esqzVA5jcBR-YREI96h5QEnof2Y~SzH8ciZV6IE3OrZskmpHbk5fQQB1nI2tE4rj-0Qp5GfCS6biPSXO-GSXXWbLdirJnoLZYXFAZPdvVub7Y2rVNpY7A__',
  },
  {
    id: 'sarape-poncho',
    name: 'Sarape-Poncho Sunburst',
    price: 3600,
    caption: 'Lana pesada · jacquard tejido en telar de pedal',
    sizes: ['único'],
    soldOutSizes: [...soldOutSizes['sarape-poncho']],
    stillUrl:
      'https://cms-toolkit-artifacts.artlist.io/content/-t-e-x-t_-t-o_-i-m-a-g-e-v1/media__5/image-cfc2fdc9-c9ce-48e1-a565-3e634c96208b.png?Expires=2101523008&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=vUnTs69dFF23frbXLsGbx~rRlodSIVRhyQHO~Bx3iNAhJkkM3oNz8CP5o~PlGcMWF2xjErIXKwz0pxPcrVHdcy7U4PrTcIPazM7aSjCOf~~nIODgpOPyGlj~rkPqfAGfx0hqiCA6Y-~v~tbXWnmqtbT5TxwmPzoO-ZD4mWTrbA0PCWR2I0tEpw6DDjAg3ZaVSevFJEJHNm0yLclFiJTiG2Uw3xUuyazCLV2d2SHOFph5YLUoPC6K3mEA5-hl8qFmdxXMXv7AshhFD0-pMWnbms2poBUM0nOS13fILQJSZHy8JIqZhENtPPAfddOflqDptSlptAVOb-qMV8jx3~222g__',
    spinGenerationId: '019fdf9c-795b-75ed-88d8-55af594536dd',
    spinVideoUrl:
      'https://cms-toolkit-artifacts.artlist.io/content/-e-x-t-e-r-n-a-l_-i-m-a-g-e_-t-o_-v-i-d-e-o-v1/media__4/-e-x-t-e-r-n-a-l_-i-m-a-g-e_-t-o_-v-i-d-e-o-6c623ba3-7874-40da-93bb-fdb5ea2c87a2.mp4?Expires=2101523217&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=Il-58gqLiDlUUMT1v~TZOdDwRVvgdhIMMqRwc67EDNSTvMcutH5E8s-rrXQll~TvHIXHjwypLARV-hzBcvT~WZvvj2DBAE6Ms3us1N8ofPjnlHlp4-sfFWpwvrEeT5Dk7R0Ll8t5cMGaHvTdcwJYfOZ3cIrJpsyuiJ5m5Z0VyjB0CZGcH7BrorHsI-hz~RKaMiUjr2NFlrrs7TQFHoRHm9kM3EsXBnktUJYsmLLLT9OkvjTAJo47hJKDBBWAQnfN0zLCtXINC3kRoxJtJUrgtJ-LVEiyvTVl1Bzi11~cbKOh7b2OYv9Z8avS7k0~l3py3IMcK6dPm5Q6FuhDTjIVyQ__',
  },
  {
    id: 'cinturon-piteado',
    name: 'Cinturón Piteado · Hebilla de Plata',
    price: 2200,
    caption: 'Piel vegetable · piteado a mano · plata repujada de Taxco',
    sizes: ['28', '30', '32', '34', '36', '38'],
    soldOutSizes: [...soldOutSizes['cinturon-piteado']],
    stillUrl:
      'https://cms-toolkit-artifacts.artlist.io/content/-t-e-x-t_-t-o_-i-m-a-g-e-v1/media__2/image-7c6c8f98-05e5-4c1b-8303-47db78481b14.png?Expires=2101523009&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=0UsAYO1Yc9gJD~fDneHhQEi2ube90IL4qN6rsF6sA9a0oufLuyLZK3u6pplt8RsfERZFbAiZKlNpaZNbyHUTpLDMdgjt5oVeQaWJPOfcvOXT3AA4WAdE2SY9S~eO4aVVwoujSVjK1xan6JhLQdisvGaMPLeHkBRcRrKMiaKhcwgINbcRUA2R5nBNyPpQ~4t4KZShjXxTewBG2X0FrIsVoJohO4TjSeH0o4Apdqmnk8uYra0NKPfZtV8KD2HwOlmyq9JaZ-pUniLaERJpcg2BCKWjzk1pjGpGlk230dh~p~Qli62JexjXYQC8R0uAWWPNhiLIPDAztbMOEAM1aAJs-Q__',
    spinGenerationId: '019fdf9c-795e-7028-ba2c-eef9f34c0f0f',
    spinVideoUrl:
      'https://cms-toolkit-artifacts.artlist.io/content/-e-x-t-e-r-n-a-l_-i-m-a-g-e_-t-o_-v-i-d-e-o-v1/media__7/-e-x-t-e-r-n-a-l_-i-m-a-g-e_-t-o_-v-i-d-e-o-4b6e9b30-76d0-4a17-bb51-36cce5ed3782.mp4?Expires=2101523217&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=oWbDL0z1-GDzkwcuyk2KYI8wPv2Nwja54dHQCBuWJHC7St7QKNF9Zl4L7VDasIAL2xELi0rZUp7RNYzFd7y1hUdC3EZdTw2-h81-I3XQ4izWjpTsljEqX9ssiXsbHh0WEjk5KGnfRDZjX3NzxYgPAfLt6LBneJANNiQIBSFH79SUGTIi-2LIUynzdxXJitqx1jLCNN0CUOl9oebK8y54dCK9GtFI-e1dNLD1QI5oRaDy3mFSEMnRM32cwkUUcVJZ~QX0YvIpz9WI5EN9CvmU1XIdug23W5shfCJyp1njbeVm~pN6izYvVHQ6DMIc9hqGVNdPtMCwae4QYzI9UB45SA__',
  },
  {
    id: 'sombrero-jalisco',
    name: 'Sombrero de Palma Jalisco',
    price: 1950,
    caption: 'Palma tejida a mano · ala ancha · cinta de gamuza',
    sizes: ['único'],
    soldOutSizes: [...soldOutSizes['sombrero-jalisco']],
    stillUrl:
      'https://cms-toolkit-artifacts.artlist.io/content/-t-e-x-t_-t-o_-i-m-a-g-e-v1/media__3/image-a3b3a12d-1641-4fed-a092-b6d54b483416.png?Expires=2101523008&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=Imj9ggFw3~T2qSUgGNoy6FyR5NKHLH5l8wo9FAw2Nwuw20XnoM4glh8j0QqZcwuXSpz5HQ3npgqe-oqOx4~F-a-SDqFAzizFro1hMdXcAkqPQU18SeNjsSVxRMY33pYjH6DBM9-l2eUYCTiOGFBR2x4mtiY3LwEKh6eOOM8zqvFALfhbpw-eza1v8xxTvqxyTTYEsBXDyHcceaPAnIFWJbug7OzE2U8pOw86f3ZxfInuX6n0tADFWHrjQ9NQlBfMuROku0K4Y~T-vf~xCtyjIk3yQvGVCddICJxu1txpTwE3m-xWnDpTTPL54hTwPsJuaOvaPuFmHqTluLGBDPL-YQ__',
    spinGenerationId: '019fdf9c-7989-7062-8de0-b9bd2f919e1d',
    spinVideoUrl:
      'https://cms-toolkit-artifacts.artlist.io/content/-e-x-t-e-r-n-a-l_-i-m-a-g-e_-t-o_-v-i-d-e-o-v1/media__3/-e-x-t-e-r-n-a-l_-i-m-a-g-e_-t-o_-v-i-d-e-o-6f29d9df-0d25-4a7a-acac-bb22a08f56b4.mp4?Expires=2101523217&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=FVDtoBWCR1cCJnrfS7DTw7bjQhsclbGc0hQX8NupYlXx8xU~GVczW-G--FKQs3qFl9eQSLlY-LHIBTo3LYRugLScwljSWI0xrtuebqtu6E0sfDebicn7DGaOWLQNA7eST8gi0byMnb~eQuNdVf5X4SnOP8V9vdOYdjGdv3LGI4BmgvpFgmdpGvQ~p3hh8-ckJWRbSgwEGEgGlnmOJ50NWlGkfuO9D71c26nAzzeCc5Md6K1w-Vw7R~n-qjouAG7hVq96qSl3ELutc0gualRQyAQuP-Ummi5Nd6GRXrFX0o5Pk~35AIs6XnsM0aS-dyBnMPDzLVNi6nFsKJLmupRVjQ__',
  },
];

// Care products for the CUIDADO section.
export interface CareProduct {
  id: string;
  name: string;
  price: number;
  description: string;
}

export const careProducts: CareProduct[] = [
  {
    id: 'aceite-castor',
    name: 'Aceite de Castor',
    price: 280,
    description: 'Acondicionador para cuero vegetable. Aplicar con gamuza cada 30 días.',
  },
  {
    id: 'shampoo-texana',
    name: 'Shampoo para Texana',
    price: 320,
    description: 'Limpieza profunda para palma y fieltro. PH neutro. Sin solventes.',
  },
  {
    id: 'balsamo-exoticas',
    name: 'Bálsamo para Pieles Exóticas',
    price: 260,
    description: 'Cera de abeja y aceite de coco. Para avestruz, víbora y pitón.',
  },
];

// Asset URLs for the rest of the website (filled in post-pipeline).
// All CloudFront-signed so the CDN returns 200 instead of 403.
export const heroVideoUrl =
  'https://cms-toolkit-artifacts.artlist.io/content/-e-x-t-e-r-n-a-l_-i-m-a-g-e_-t-o_-v-i-d-e-o-v1/media__4/-e-x-t-e-r-n-a-l_-i-m-a-g-e_-t-o_-v-i-d-e-o-168c11da-148a-4401-9af4-d98b1cabb564.mp4?Expires=2101522957&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=tRgFMrk7uJb-kAQIgQ8cwiMNGvLs3fsBLRGpPR0eUJ4U8nYKdlKS0EYewO2IrIQGbKy7xOQ~t9pCEhjHSIpZBgOiUbAX8N00elO5k9N-88Qgmu8RiGyWF~ImTd2taE7XWzpbIvitO5kYQN2LBPNxu3VWl2gj6J1wWewWbG6rB2Vk-8YNStTcGrJDenKGbJ2hho0mQ6E3ib6~64YDUMxcWJQTpSIUMOTuyg6sTLzvLzp-vvfac2wd3MF-BG5w0zS60TDCrEIfuRel3V36rF~4bpv2V~lzZCxMqLnFhxrcVO3OxRm~IqVFYTi0goWw2DPGMLFJPafxTyJvcEqT7SJIqg__';
export const lookbookStillUrl =
  'https://cms-toolkit-artifacts.artlist.io/content/-t-e-x-t_-t-o_-i-m-a-g-e-v1/media__10/image-1f4f93c0-9b41-456d-8d27-f245605b8bbe.png?Expires=2101522874&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=YoCeN-Lqaq4Wl~MrlnEz~1rxqiSfTBlGfk9j8AWENZryaGP68YxumnEt8jd2NOaqNW3mp09dupruG~VpKpinsHwhKCgQlp6J6Qe1uj3tyZ6ZWZTQKzR-huocb8Uf-l~F~2jirYia~rlpaOl4G6qcuEAxnpijxEXQeFT2iNTqmpFSUSUIqYFkUEnvAOaSXE51GkrS0jyE9931I1uGj7Xi8ki7wK6YE-EICdpUd6HARC9e9uUesg229rGFuxe0GDZUADjnmp-MR33P~SYhe3~PLAUl~wV5Gr7ZeLZkdSssGtX29eQ5EvnDFSTqyelGDQPIwbaYTOPKWHDDqapo6a5CIg__';
export const lookbookGenerationId = '019fdf9a-7221-7e81-85ea-194dd2786997';

// Fabric macro video — three-panel split: stitch / embroidery / silver.
export const fabricMacroVideoUrl =
  'https://cms-toolkit-artifacts.artlist.io/content/-e-x-t-e-r-n-a-l_-i-m-a-g-e_-t-o_-v-i-d-e-o-v1/media__7/-e-x-t-e-r-n-a-l_-i-m-a-g-e_-t-o_-v-i-d-e-o-095c89d2-d01f-4d2d-8349-9e704fffd6c2.mp4?Expires=2101523451&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=TeXOng1wTi3jOiH5OppuXxC44UwrO-upEWLwwiYxDgsk42zGhV~u177V0FujBav5FIi-vWc5JqmQi1uG0bZQYDCE8-SwkE8ygRxxFHPjch25kM4PNpL~~AtoD-htzi8djusjie9M04wXU~DpXsd0lnElPWZCkc96gL2MdVfd26-4Vto2Xm5i1z54FU1mQSE8aLE4QGwP6YHGcStOw2VaQuzO8kumMrhzwtF7SiusDHNn4jiWWO54DgKw0gLh3AdXrI9zNYcihj82aR3g-vl1QmR7qqg1WNDCXFpGvzl7LA64Jvs7YQvgEabyB0sP~VxaAUb6eJQ6rPorFvE8ABMTiA__';
export const fabricMacroStillUrl =
  'https://cms-toolkit-artifacts.artlist.io/content/-t-e-x-t_-t-o_-i-m-a-g-e-v1/media__5/image-2c3cab8b-c513-4319-b536-4371e192c55d.png?Expires=2101523268&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=ucajsYL7R6qw6qW616Jy5Y7nXMAzeiWLmYA4x93XDd3BhQtgl3sb3ISjR9T6CyoJBKO4bIVrPWUYf9gdvIld0O-uW0v7giJDFtXm9zc3by5rfzZ~l8fDlVgcTA9gZbEeeoqZrK45n4Vim2zt8pr5I0p-klxmzw8Im3guDzc4l~hqg3OGBsENs7yxzyTSEPI1PqoBexreS-WI3G~ykbZXw6V7UsD9dSB3NuVCImloH-4FIANJqY2AhOOnXlwgQFaFDRmP10ajNWdoBOnwb98E~AezDWYbD85lmDe~gWGaZPrBdN3JHEjo7epXXaeW~T4riXb5qgWT7TcVuXHCvz0pdw__';
export const fabricMacroStillGenerationId = '019fdfa0-708d-7cf1-ad47-44feac2a666b';

// Cuidado — fell back to still because Seedance video exhausted credits.
// Brief explicitly marked this section as OPTIONAL.
export const cuidadoVideoUrl: string | null = null;
export const cuidadoStillUrl =
  'https://cms-toolkit-artifacts.artlist.io/content/-t-e-x-t_-t-o_-i-m-a-g-e-v1/media__4/image-35c82254-4f0e-4c00-a152-6971784b8cd1.png?Expires=2101523266&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=gFQt9Onu1QtMSoTYMIe0buNjG4sdfZfp9-6iLT-XxqwlZIwjhOXoD6-5xNjdMQlLrVE7MWl7yCPCSvUhWhPirtS3RrbZrvqy0RMQXX2GtfELaJHm-siMgKwIgizkQEdHHFB15pj-l23EITJPO4mDnsxjR7cv-HeHEv0vOmG~q1Yo8qB~Updeqi4HztuJuiW1Eb4Vt-mhmOb3MV260C7vfdODI-4c2u7E4FPe62lkmn2~tYcmRvjOVfsgr3m2XsHXNgyRYYd36CGSC7CMlyuUFxvVzik582zisxtVZrWfqKFsNfy1qFGWdu87hRJCLSaIB9o5Xa2~v4RfO~sdn9sP-A__';
export const cuidadoStillGenerationId = '019fdfa0-709e-7f4b-a25a-b6cdbb588f87';
