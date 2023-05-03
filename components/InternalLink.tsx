import Link from "next/link";
import {
  registerUniformComponent,
  ComponentProps,
} from "@uniformdev/canvas-react";

type LinkProps = ComponentProps<{
  link: { path?: string },
  title: string;
}>;

export default function InternalLink({ link, title }: LinkProps) {

  const url = link?.path?.length ? link?.path : "#";

  // render link using Next.js Link Component
  return (
    <Link href={url}>
      {title}
    </Link>
  );
}

registerUniformComponent({
  type: "internalLink",
  component: InternalLink,
});