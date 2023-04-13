import Link from "next/link";
import {
    registerUniformComponent,
    ComponentProps,
  } from "@uniformdev/canvas-react";

type LinkProps = ComponentProps<{
    title: string;
    path?: string;
  }>;

export default function InternalLink({ path, title }: LinkProps) {

  const url = path?.length ? path : "#";

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