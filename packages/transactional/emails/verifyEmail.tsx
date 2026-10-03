import * as React from "react";
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
} from "react-email";

export interface VerifyEmailProps {
  url: string;
  name?: string;
}

const sans =
  "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const mono =
  "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace";

// Depth comes from layered surfaces (page → frame → card → bands → inset box),
// translucent borders, and soft shadows. Shadows are progressive enhancement:
// clients that strip them still get the layering.
const cardShadow = {
  boxShadow:
    "0 1px 2px rgba(10,10,20,0.05), 0 16px 40px -12px rgba(10,10,20,0.12)",
};
const buttonShadow = {
  boxShadow:
    "0 1px 2px rgba(0,0,0,0.30), 0 4px 12px -2px rgba(0,0,0,0.20), inset 0 1px 0 rgba(255,255,255,0.18)",
};
const markShadow = {
  boxShadow: "0 1px 2px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.22)",
  width: 28,
  height: 28,
};

export default function VerifyEmail({ url, name }: VerifyEmailProps) {
  return (
    <Tailwind>
      <Html lang="en">
        <Head>
          <meta name="color-scheme" content="light dark" />
          <meta name="supported-color-schemes" content="light dark" />
          {/* react-email's <Body> copies its bg onto an inner <td>, so a
              `dark:` class on Body can't override it. Set the page bg here. */}
          <style>{`
            :root { color-scheme: light dark; supported-color-schemes: light dark; }
            body { background-color: #f0f0f3; }
            @media (prefers-color-scheme: dark) {
              body { background-color: #000000 !important; }
            }
          `}</style>
        </Head>

        <Preview>Confirm your email to start jamming on Doodle Jam</Preview>

        <Body className="m-0" style={{ fontFamily: sans }}>
          <Section className="px-4 py-12">
            {/* Outer frame: a translucent shell that makes the card feel lifted */}
            <Container className="mx-auto max-w-[540px] rounded-[20px] border border-solid border-[rgba(10,10,20,0.07)] bg-[rgba(10,10,20,0.045)] dark:border-[rgba(255,255,255,0.07)] dark:bg-[rgba(255,255,255,0.04)]">
              <Row>
                <Column className="p-[6px]">
                  {/* Card */}
                  <Section
                    className="overflow-hidden rounded-[14px] border border-solid border-[rgba(10,10,20,0.08)] bg-white dark:border-[rgba(255,255,255,0.08)] dark:bg-[#0a0a0a]"
                    style={cardShadow}
                  >
                    {/* Header band */}
                    <Section className="bg-[#f9f9fb] px-8 py-[18px] dark:bg-[#101012]">
                      <Row>
                        <Column width="28">
                          <div
                            className="rounded-lg bg-[#0a0a0a] text-center dark:bg-white"
                            style={markShadow}
                          >
                            <Text className="m-0 text-[14px] font-bold leading-7 text-white dark:text-black">
                              ✎
                            </Text>
                          </div>
                        </Column>
                        <Column className="pl-[10px] align-middle">
                          <Text className="m-0 text-[15px] font-semibold leading-7 tracking-[-0.01em] text-[#0a0a0a] dark:text-white">
                            Doodle Jam
                          </Text>
                        </Column>
                      </Row>
                    </Section>

                    <Hr className="m-0 border-0 border-t border-solid border-[rgba(10,10,20,0.06)] dark:border-[rgba(255,255,255,0.07)]" />

                    {/* Content */}
                    <Section className="px-8 pb-9 pt-10">
                      <Heading
                        as="h1"
                        className="m-0 text-[24px] font-semibold leading-[30px] tracking-[-0.035em] text-[#0a0a0a] dark:text-white"
                      >
                        Verify your email address
                      </Heading>

                      <Text className="mb-0 mt-5 text-[15px] font-medium leading-6 text-[#18181b] dark:text-[#ededed]">
                        {name ? `Hi ${name},` : "Hello,"}
                      </Text>

                      <Text className="mb-0 mt-2 text-[15px] leading-[24px] text-[#63636e] dark:text-[#a1a1a8]">
                        Thanks for signing up for Doodle Jam. Confirm your email
                        address to finish setting up your account and start
                        drawing.
                      </Text>

                      <Section className="mt-8">
                        <Button
                          href={url}
                          className="box-border rounded-[10px] border border-solid border-[#0a0a0a] bg-[#0a0a0a] px-6 py-[13px] text-[14px] font-medium leading-5 text-white no-underline dark:border-white dark:bg-white dark:text-black"
                          style={buttonShadow}
                        >
                          Verify email
                        </Button>
                      </Section>

                      {/* Inset fallback link */}
                      <Section className="mt-9 rounded-[10px] border border-solid border-[rgba(10,10,20,0.07)] bg-[rgba(10,10,20,0.03)] px-4 py-[14px] dark:border-[rgba(255,255,255,0.08)] dark:bg-[rgba(255,255,255,0.04)]">
                        <Text className="m-0 text-[12px] leading-4 text-[#8b8b95]">
                          Button not working? Paste this link into your browser:
                        </Text>
                        <Link
                          href={url}
                          className="mt-[6px] block break-all text-[12px] leading-[18px] text-[#52525b] underline dark:text-[#a1a1a8]"
                          style={{ fontFamily: mono }}
                        >
                          {url}
                        </Link>
                      </Section>
                    </Section>

                    <Hr className="m-0 border-0 border-t border-solid border-[rgba(10,10,20,0.06)] dark:border-[rgba(255,255,255,0.07)]" />

                    {/* Footer band */}
                    <Section className="bg-[#f9f9fb] px-8 py-5 dark:bg-[#101012]">
                      <Text className="m-0 text-[12px] leading-[18px] text-[#8b8b95]">
                        If you didn&apos;t create this account, you can safely
                        ignore this email.
                      </Text>
                    </Section>
                  </Section>
                </Column>
              </Row>
            </Container>

            {/* Page footer */}
            <Container className="mx-auto max-w-[540px]">
              <Section className="px-2 pt-6 text-center">
                <Text className="m-0 text-[12px] leading-5 text-[#8b8b95]">
                  © {new Date().getFullYear()} Doodle Jam
                </Text>
                <Text className="m-0 text-[12px] leading-5 text-[#a9a9b2]">
                  Sketch together, in real time.
                </Text>
              </Section>
            </Container>
          </Section>
        </Body>
      </Html>
    </Tailwind>
  );
}

VerifyEmail.PreviewProps = {
  url: "https://doodlejam.app/verify?token=8f3a1c9e2b7d4f60a1c5e8d9b2347f10",
  name: "Avi",
} satisfies VerifyEmailProps;