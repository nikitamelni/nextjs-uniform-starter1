import contentstack from "contentstack";
import "dotenv/config";
import algoliasearch from "algoliasearch";

const csClient = contentstack.Stack({
  api_key: process.env.CONTENTSTACK_API_KEY,
  delivery_token: process.env.CONTENTSTACK_DELIVERY_TOKEN,
  environment: process.env.CONTENTSTACK_ENVIRONMENT,
  region: contentstack.Region.US,
});

const algoliaClient = algoliasearch(
  process.env.ALGOLIA_APPLICATION_ID,
  process.env.ALGOLIA_API_KEY
);

const getAllBlogsPages = async () => {
  const result = await csClient
    .ContentType("blog_post")
    .Query()
    .includeReference("author")
    .only(["title", "author", "body"])
    .only("author", ["title"])
    .toJSON()
    .find();

  // TODO: here you may need to convert the "body" into plain text if it's an RTE field. storing JSON or HTML in index isn't a good idea

  // somehow my reply is always withing multiple arrays
  let blogs = result[0];
  blogs = blogs.map((b) => {
    return {
      objectID: b.uid,
      title: b.title,
      // you will need make the URL that corresponds to your blog resolving logic. this is just an example
      url: "/blog-prefix/" + b.title,
      // adding the type to make it easier to distinguish the blog page vs other content pages
      type: "blog"
    };
  });
  return blogs;
};

console.info("Index build started...");

Promise.all([getAllBlogsPages()]).then((blogs) => {
  // console.log("blogs: ", JSON.stringify(blogs[0], null, 2));
  console.info("✅ Data successfully fetched");
  const index = algoliaClient.initIndex("uti-test-cs");
  index
    .setSettings({
      // this helps us use a single index, but search within just the blog pages
      attributesForFaceting: ["type"],
    })
    .then(() => {
      index
        .replaceAllObjects(blogs[0], { safe: true })
        .then(({ objectIDs }) => {
          console.log(objectIDs);
          console.info(
            `✅ Algolia index successfully updated with ${objectIDs.length} objects`
          );
        })
        .catch((e) => console.log(e));
    });
});
