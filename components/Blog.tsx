type BlogType = {
    title: string,
    url?: string,
    author: string,
    date: string,
    body: string,
    relatedPost: string,
};

export default function Blog(blog: BlogType) {
    return (
        <>
            <h2>{blog.title}</h2>
            <div>
                author: {blog.author} <br />
                date: {blog.date} <br />
                relatedPost: {blog.relatedPost}
            </div>
        </>
    );
}
