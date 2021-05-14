import * as React from "react";
import { useQuery } from "react-query";
import { Loader } from "../components/Loader";

// pages are also blocks
const pageId = "ebd5ecb1132b49b9add3f5f8013d4bfa";

const renderPage = (data: any) => {
  const pageTitle = data.properties.title.title[0].text.content;

  return <h1>{pageTitle}</h1>;
};

const renderBlocks = (data: any) => {
  const content = data.results;

  return (
    <>
      {content.map((block: any) => {
        if (!block.paragraph.text.length) return null;

        return <p>{block.paragraph.text[0].text.content}</p>;
      })}
    </>
  );
};

export default function Index() {
  const { data: pageData, isFetching: pageDateFetching } = useQuery(
    "page",
    () => fetch(`/api/pages/${pageId}`).then((res) => res.json()),
    {
      refetchInterval: 10000,
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: false,
    }
  );

  const { data: blockData, isFetching: blockDateFetching } = useQuery(
    "block",
    () => fetch(`/api/blocks/${pageId}`).then((res) => res.json()),
    {
      refetchInterval: 10000,
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <>
      <div style={{ margin: "40px auto", padding: "0 16px", maxWidth: 800 }}>
        <details>
          <summary>FAQ</summary>

          <p>
            "How do I test it?" -{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.notion.so/devjmetivier/Notion-Live-Blog-ebd5ecb1132b49b9add3f5f8013d4bfa"
            >
              Write stuff here
            </a>{" "}
            😃
          </p>

          <p>
            "Where's the code?" -{" "}
            <a target="_blank" rel="noopener noreferrer" href="#here">
              here
            </a>
          </p>

          <p>
            "How's it work?" - Next.js (with api routes), react-query, Notion.
            That's about it ¯\_(ツ)_/¯
          </p>

          <p>
            "ISR?" - No, but you could! Super easy I might come back and do that
          </p>

          <p>"How often does it refetch?" - About every 10s</p>

          <p>
            "People are writing naughty things! 😠" -{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/devjmetivier"
            >
              @ me please
            </a>{" "}
            🤦‍♂️
          </p>
        </details>

        {pageData && renderPage(pageData)}
        {blockData && renderBlocks(blockData)}
      </div>

      <div
        style={{
          display: "inline",
          position: "absolute",
          bottom: 16,
          right: 16,
        }}
      >
        {pageDateFetching ? <Loader /> : blockDateFetching ? <Loader /> : null}
      </div>
    </>
  );
}
