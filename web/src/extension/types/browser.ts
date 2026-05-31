export type TBrowserContextMenuMessage = {
  action: string;
  payload: {
    itemId: string | number;
    text: string;
    sourceUrl: string;
    pageTitle: string;
    timestamp: string;
    targetUrl: string;
  };
};
