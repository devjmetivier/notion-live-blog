import { GetStaticProps, InferGetStaticPropsType } from "next";
import * as React from "react";
import { useQuery } from "react-query";
import { Loader } from "../components/Loader";
import nodeFetch from "node-fetch";
import { notion } from "../notion";

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

export const getStaticProps: GetStaticProps = async () => {
  const pageServerData = await notion.pages.retrieve({ page_id: pageId });
  const blockServerData = await notion.blocks.children.list({
    block_id: pageId,
  });

  return {
    props: {
      pageServerData,
      blockServerData,
    },
    revalidate: 60000,
  };
};

export default function Index({
  pageServerData,
  blockServerData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
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
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/devjmetivier/notion-live-blog"
            >
              here
            </a>
          </p>

          <p>
            "How's it work?" - Next.js (with api routes), react-query, Notion.
            That's about it ¯\_(ツ)_/¯
          </p>

          <p>"ISR?" - Yup! Every 60s</p>

          <p>
            "How often does it refetch?" - About every 10s (you'll see a little
            spinner in the bottom right)
          </p>

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

        {renderPage(pageData || pageServerData)}
        {renderBlocks(blockData || blockServerData)}
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
