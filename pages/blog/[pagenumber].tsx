import PageComposition from "@/components/PageComposition";
import { getCompositionsForNavigation } from "@/uniformlib/canvasClient";
import { GetStaticPropsContext } from "next";
import {
  CanvasClient
} from "@uniformdev/canvas";
import runEnhancers from "@/uniformlib/enhancers";

export async function getStaticProps(context: GetStaticPropsContext) {
  const canvasClient = new CanvasClient({
    apiKey: process.env.UNIFORM_API_KEY,
    projectId: process.env.UNIFORM_PROJECT_ID,
  });

  const { composition } = await canvasClient.getCompositionByNodePath({
    projectMapId: process.env.UNIFORM_PROJECTMAP_ID,
    projectMapNodePath: "/blog",
  });
  
  const { preview = false } = context || {};
  const navLinks = await getCompositionsForNavigation(preview);

  await runEnhancers(composition, context);

  return {
    props: {
      data: composition,
      preview: Boolean(preview),
    }, 
  }
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { pagenumber: '2' } }, 
      { params: { pagenumber: '3' } },
      { params: { pagenumber: '4' } },
    ],
    fallback: false, // can also be true or 'blocking'
  }
}

export default PageComposition;

