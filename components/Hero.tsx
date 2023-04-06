import {
  registerUniformComponent,
  ComponentProps,
} from "@uniformdev/canvas-react";

type HeroProps = ComponentProps<{
  heroDatasource: {
    title: string;
    message?: string;
  },
  title: string,
  message?: string,
}>;

const Hero: React.FC<HeroProps> = ({ heroDatasource, title, message }: HeroProps) => (
  <div>
    <h1 className="title">{heroDatasource?.title}</h1>
    <div
      className="description"
      dangerouslySetInnerHTML={{ __html: heroDatasource?.message }}
    />
  </div>
);

registerUniformComponent({
  type: "hero",
  component: Hero,
});

export default Hero;
