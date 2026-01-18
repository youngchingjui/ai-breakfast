import type { Metadata } from 'next'
import Link from 'next/link'
import { Globe, Linkedin, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Members Showcase',
  description:
    'Discover standout professionals from the AI Breakfast community — browse profiles and connect via LinkedIn, email, or portfolio links.',
}

type MemberLinks = {
  linkedin?: string
  website?: string
  email?: string
}

type MemberProfile = {
  id: string
  name: string
  headline: string
  bio: string
  location: string
  availability: string
  skills: string[]
  links: MemberLinks
}

const sampleMembers: MemberProfile[] = [
  {
    id: 'sara-chen',
    name: 'Sara Chen',
    headline: 'Applied ML Engineer • GenAI for Customer Support',
    bio: 'Builds retrieval-augmented generation (RAG) assistants and evaluation pipelines that reduce support ticket volume and time-to-resolution.',
    location: 'Shanghai',
    availability: 'Open to consulting, contract',
    skills: ['Python', 'PyTorch', 'RAG', 'Vector DBs', 'Evaluation'],
    links: {
      linkedin: 'https://www.linkedin.com/in/example-sara-chen',
      website: 'https://sara.example.com',
      email: 'sara@example.com',
    },
  },
  {
    id: 'diego-ramos',
    name: 'Diego Ramos',
    headline: 'Product Designer • AI UX & Prototyping',
    bio: 'Designs human-in-the-loop AI interfaces with rapid prototyping workflows to validate value and reduce model misuse.',
    location: 'Remote (GMT+8)',
    availability: 'Open to freelance, speaking',
    skills: ['AI UX', 'Prototyping', 'User Research', 'Design Systems'],
    links: {
      linkedin: 'https://www.linkedin.com/in/example-diego-ramos',
      website: 'https://diego.example.com',
      email: 'diego@example.com',
    },
  },
  {
    id: 'meera-kapoor',
    name: 'Meera Kapoor',
    headline: 'Data Scientist • Experimentation & Causal Inference',
    bio: 'Leads A/B testing and uplift modeling for growth teams; partners with engineering to productionize metrics and guardrails.',
    location: 'Shanghai / Singapore',
    availability: 'Open to full-time',
    skills: ['Python', 'SQL', 'Experimentation', 'Causal Inference', 'Dashboards'],
    links: {
      linkedin: 'https://www.linkedin.com/in/example-meera-kapoor',
      website: 'https://meera.example.com',
      email: 'meera@example.com',
    },
  },
  {
    id: 'alex-morozov',
    name: 'Alex Morozov',
    headline: 'MLOps Engineer • LLM Infra & Observability',
    bio: 'Sets up prompt/version tracking, evals, and cost/perf monitoring for LLM apps to ship faster with fewer regressions.',
    location: 'Shanghai',
    availability: 'Open to contract',
    skills: ['Kubernetes', 'LLMOps', 'Observability', 'Tracing', 'CI/CD'],
    links: {
      linkedin: 'https://www.linkedin.com/in/example-alex-morozov',
      website: 'https://alex.example.com',
      email: 'alex@example.com',
    },
  },
  {
    id: 'lina-wu',
    name: 'Lina Wu',
    headline: 'Technical Writer • AI Docs & Developer Education',
    bio: 'Creates API docs, tutorials, and in-product help for AI tooling — translating complex features into clear, actionable guides.',
    location: 'Shanghai',
    availability: 'Open to freelance, part-time',
    skills: ['Docs', 'API Guides', 'Tutorials', 'Content Strategy'],
    links: {
      linkedin: 'https://www.linkedin.com/in/example-lina-wu',
      website: 'https://lina.example.com',
      email: 'lina@example.com',
    },
  },
]

function Avatar({ name }: { name: string }) {
  // Simple initial-based avatar for now
  const initial = name.charAt(0).toUpperCase()
  return (
    <div
      aria-hidden
      className="flex h-10 w-10 select-none items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-white font-semibold shadow"
      title={name}
    >
      {initial}
    </div>
  )
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
      {children}
    </span>
  )
}

export default function MembersPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h1 className="text-2xl font-bold">Members Showcase</h1>
        <p className="text-muted-foreground">
          A curated directory of professionals from the AI Breakfast community. Explore profiles, see what people
          specialize in, and connect directly.
        </p>
      </section>

      <section aria-label="Members" className="grid gap-4 sm:grid-cols-2">
        {sampleMembers.map((m) => (
          <article key={m.id} className="rounded-lg border border-border bg-card p-4 shadow-sm">
            <header className="flex items-start gap-3">
              <Avatar name={m.name} />
              <div className="min-w-0">
                <h2 className="truncate text-lg font-semibold">{m.name}</h2>
                <p className="text-sm text-muted-foreground">{m.headline}</p>
              </div>
            </header>

            <p className="mt-3 text-sm leading-relaxed">{m.bio}</p>

            <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div>
                <dt className="text-muted-foreground">Location</dt>
                <dd>{m.location}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Availability</dt>
                <dd>{m.availability}</dd>
              </div>
            </dl>

            <div className="mt-3 flex flex-wrap gap-2">
              {m.skills.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-3">
              {m.links.linkedin && (
                <Link
                  href={m.links.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                >
                  <Linkedin className="h-4 w-4" aria-hidden />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              )}
              {m.links.website && (
                <Link
                  href={m.links.website}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                >
                  <Globe className="h-4 w-4" aria-hidden />
                  <span className="sr-only">Website</span>
                </Link>
              )}
              {m.links.email && (
                <Link
                  href={`mailto:${m.links.email}`}
                  className="group inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                >
                  <Mail className="h-4 w-4" aria-hidden />
                  <span className="sr-only">Email</span>
                </Link>
              )}
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-md border border-dashed border-border p-4 text-sm text-muted-foreground">
        Want to be featured here? Come say hi at AI Breakfast and let an organizer know you’d like to be added to the
        showcase.
      </section>
    </div>
  )
}

