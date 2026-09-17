"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Container, SectionHeading } from "@/components/ui/Section";
import { Section } from "@/components/ui/Section";
import type { SiteContent } from "@/content/types";
import { ChevronDown } from "lucide-react";

type FaqProps = {
  content: SiteContent;
};

export function Faq({ content }: FaqProps) {
  const items = Array.isArray(content.faq.items) ? content.faq.items : [];

  return (
    <Section id="sss" className="bg-pt-bg pt-reveal">
      <Container className="max-w-3xl">
        <SectionHeading>{content.faq.title}</SectionHeading>
        <Accordion.Root
          type="single"
          collapsible
          defaultValue={items[0]?.id}
          className="mt-8 divide-y divide-pt-border rounded-xl border border-pt-border bg-pt-surface"
        >
          {items.map((item) => (
            <Accordion.Item key={item.id} value={item.id}>
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 px-4 py-4 text-left font-medium text-pt-aws-ink hover:bg-pt-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-pt-emerald-600">
                  {item.question}
                  <ChevronDown
                    className="h-5 w-5 shrink-0 transition-transform duration-[var(--pt-dur-normal)] group-data-[state=open]:rotate-180"
                    aria-hidden
                  />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <p className="px-4 pb-4 text-sm leading-relaxed text-pt-slate-600">
                  {item.answer}
                </p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </Container>
    </Section>
  );
}
