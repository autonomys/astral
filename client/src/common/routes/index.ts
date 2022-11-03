// TODO: Update routes for forum and docs
export const EXTERNAL_ROUTES = {
  subspace: "https://subspace.network/",
  forum: "https://subspace.network/",
  docs: "https://subspace.network/",
};

export const INTERNAL_ROUTES = {
  home: "/",
  blocks: {
    id: {
      path: ":blockId",
      page: (blockId: string): string => `/blocks/${blockId}`,
    },
    list: "blocks",
  },
  extrinsics: {
    id: {
      path: ":extrinsicId",
      page: (extrinsicId: string): string => `/extrinsics/${extrinsicId}`,
    },
    list: "extrinsics",
  },
};
