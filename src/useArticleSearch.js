import { useEffect, useState, useRef } from "react";
import axios from "axios";
import formatDistance from "date-fns/formatDistance";
import { zhHK } from "date-fns/locale";

let listPath;

export default function useArticleSearch(pageNumber, list, query) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [articles, setArticles] = useState([]);
  const [hasMore, setHasMore] = useState(false); // hasMore: check if API still has data to fetch
  const nextPage = useRef("");

  if (list === "latest") {
    listPath = "category/0";
  }
  else if (list === "hot") {
    listPath = "hot";
  }

  // when changing search query => clear original result
  useEffect(() => {
    nextPage.current = ""; // fetch from the latest list again
    setArticles([]); // clear up all fetched data
  }, [query]);

  // for fetching list and filtering useful result
  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: `https://web-data.api.hk01.com/v2/feed/${listPath}`,
      params: { offset: nextPage.current, bucketId: "00000" },
      cancelToken: new axios.CancelToken((c) => (cancel = c)), // for cancel request
    })
      .then((res) => {
        console.log(res.data);
        nextPage.current = res.data.nextOffset;
        setArticles((prevArticles) => {
          return [
            ...prevArticles,
            ...res.data.items
              .filter((item) => {
                if (query !== "") {
                  return (
                    item.data.title.includes(query) ||
                    item.data.zone.publishName.includes(query) ||
                    item.data.mainCategory.includes(query)
                  );
                }
                return true;
              })
              .map((item) => {
                const pt = new Date(item.data.publishTime * 1000);
                const now = new Date();
                const timeDistance = formatDistance(pt, now, {
                  addSuffix: true,
                  locale: zhHK
                  // locale setting: https://github.com/date-fns/date-fns/blob/main/docs/i18nContributionGuide.md#choosing-a-directory-name-for-a-locale
                });
                return {
                  title: item.data.title,
                  zoneName: item.data.zone.publishName,
                  channelName: item.data.mainCategory,
                  image: item.data.mainImage.cdnUrl,
                  href: item.data.canonicalUrl,
                  publishTime: timeDistance,
                };
              }),
          ];
        });
        setHasMore(res.data.items.length > 0); // has more data
        setLoading(false); // indicate finishing to load data
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          return; // will not perform any action if it is axios cancel error
        }
        setError(true);
      });
    return () => cancel();
  }, [pageNumber, query]);

  return { loading, error, articles, hasMore };
}