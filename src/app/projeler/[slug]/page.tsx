import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui";
import { PageTransition } from "@/components/layout/PageTransition";
import { getProject, projects } from "@/lib/projects";

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projeler/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage(
  props: PageProps<"/projeler/[slug]">
) {
  const { slug } = await props.params;
  const project = getProject(slug);

  if (!project) notFound();

  return (
    <PageTransition>
    <section className="py-section-sm bg-ink" aria-labelledby="project-heading">
      <Container>
        <Link
          href="/hizmetler"
          className="text-xs font-medium uppercase tracking-[0.14em] text-fg-muted hover:text-fg transition-colors"
        >
          ← Hizmetler
        </Link>

        <div className="max-w-3xl mt-8">
          <span className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
            {project.client ?? project.year}
          </span>
          <h1
            id="project-heading"
            className="font-heading text-4xl md:text-6xl font-medium leading-[1.05] text-fg mt-4"
          >
            {project.title}
          </h1>
          <p className="text-fg-muted text-lg leading-relaxed mt-6">
            {project.summary}
          </p>
        </div>

        <div className="mt-12 aspect-[16/9] relative overflow-hidden rounded-[var(--radius-card)] bg-surface border border-deep">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mt-14 max-w-4xl">
          <div className="md:col-span-8">
            <p className="text-fg-muted text-base leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
            {project.result && (
              <p className="text-fg text-base leading-relaxed mt-6 border-l-2 border-accent/60 pl-4">
                {project.result}
              </p>
            )}
          </div>

          <div className="md:col-span-4">
            <h2 className="text-xs font-medium uppercase tracking-[0.14em] text-fg-subtle mb-3">
              Hizmetler
            </h2>
            <ul className="space-y-2">
              {project.services.map((service) => (
                <li key={service} className="text-fg-muted text-sm">
                  {service}
                </li>
              ))}
            </ul>
            {project.externalUrl && (
              <a
                href={project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 text-sm text-accent hover:underline"
              >
                Projeyi görüntüle →
              </a>
            )}
          </div>
        </div>

        {project.gallery && project.gallery.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-14">
            {project.gallery.map((image) => (
              <div
                key={image}
                className="aspect-[4/3] relative overflow-hidden rounded-[var(--radius-card)] bg-surface border border-deep"
              >
                <Image src={image} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
    </PageTransition>
  );
}
