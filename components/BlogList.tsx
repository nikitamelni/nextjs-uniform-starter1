import {
  registerUniformComponent,
  ComponentProps,
} from "@uniformdev/canvas-react";
import Link from 'next/link'

type AuthorType = { 
  title: string,
  uid: string
};

type BlogType = {
  title: string,
  url?: string,
  author?: AuthorType[],
};

type BlogProps = ComponentProps<{
  blogs: BlogType[],
  blogFilterByAuthor?: AuthorType
}>;

function filterBlogsByAuthor(blogs: BlogType[], blogFilterByAuthor): BlogType[] {
  if (blogFilterByAuthor){
    return blogs.filter(b => b.author.some(a => a.uid == blogFilterByAuthor.uid));
  }else{
    return blogs;
  }
  
}

const BlogList: React.FC<BlogProps> = ({ blogs, blogFilterByAuthor }: BlogProps) => {
  let numberOfPages = 3;
  blogs = filterBlogsByAuthor(blogs, blogFilterByAuthor);
  return (
    <div>
      <p>{blogFilterByAuthor?.uid}</p>
      {blogs?.map((blog, index) => {
        return (
          <>
            <h2>{blog?.title}</h2>
            {blog?.author?.map((author: AuthorType, index) => {
              return (<h4>{author?.title}</h4>)
            })}
          </>
        );
      })}
      <div>
        <h3>Pages:</h3>
        <ul>{[...Array(numberOfPages)].map((e, i) => {
          return <li key={i + 2}>
            <Link href={{ pathname: '/blog/' + (i + 2) }}>{i + 2}</Link>
          </li>
        })}</ul>
      </div>
    </div>
  )
}

registerUniformComponent({
  type: "blogList",
  component: BlogList,
});

export default BlogList;