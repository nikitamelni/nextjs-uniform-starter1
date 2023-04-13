import {
  enhance,
  EnhancerBuilder,
  RootComponentInstance,
} from "@uniformdev/canvas";
import { GetStaticPropsContext } from "next";
import contentstack from 'contentstack';
import {
  createContentstackQueryEnhancer,
  createContentstackEnhancer,
  CANVAS_CONTENTSTACK_QUERY_PARAMETER_TYPES,
  CANVAS_CONTENTSTACK_PARAMETER_TYPES
} from '@uniformdev/canvas-contentstack';

// TODO: to enable contentful enhancers:
//import { CANVAS_CONTENTFUL_PARAMETER_TYPES } from "@uniformdev/canvas-contentful";

// import getContentfulEnhancer from "./contentful";

export default async function runEnhancers(
  composition: any,
  context: GetStaticPropsContext,
) {
  const csClient = contentstack.Stack({
    api_key: process.env.CONTENTSTACK_API_KEY,
    delivery_token: process.env.CONTENTSTACK_DELIVERY_TOKEN,
    environment: process.env.CONTENTSTACK_ENVIRONMENT,
    region: contentstack.Region.US,
  });

  const { preview, params } = context || {};

  let itemsPerPage = 2;
  let itemsToSkip = parseInt(params?.pagenumber) * itemsPerPage;
  const queryEnhancer = createContentstackQueryEnhancer({
    client: csClient,
    addEntryQueryOptions: ({ query }) => {
      return query.skip(itemsToSkip ?? 0).includeReference(["author"])
    }
  });

  const entryEnhancer = createContentstackEnhancer({ client: csClient });

  //TODO: register your CMS specific enhancers here
  // see docs: https://docs.uniform.app/canvas/tutorials/enhancers
  await enhance({
    composition,
    enhancers: new EnhancerBuilder()
      .component(
        'blogList',
        (blogList) =>
          blogList
            .parameterType(
              CANVAS_CONTENTSTACK_QUERY_PARAMETER_TYPES,
              queryEnhancer
            )
      )
      .parameterType(
        CANVAS_CONTENTSTACK_PARAMETER_TYPES,
        entryEnhancer
      )
    ,
    context: {},
  });

  // if you want to see the composition with enhanced values i.e. component data with data from CMS
  // console.log('====compostion====== : ' + JSON.stringify(composition));

  return composition;
}
