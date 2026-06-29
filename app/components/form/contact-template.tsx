import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface ContactEmailProps {
  senderName: string;
  senderEmail: string;
  message: string;
}

export const ContactEmail = ({
  senderName = 'Someone',
  senderEmail = 'unknown@example.com',
  message = 'No message provided.',
}: ContactEmailProps) => {
  const previewText = `New message from ${senderName} via your portfolio`;

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>{previewText}</Preview>
        <Container style={container}>
          {/* ── Header ── */}
          <Section style={headerSection}>
            <Text style={logoText}>MA</Text>
            <Heading style={heading}>New Contact Message</Heading>
            <Text style={subheading}>
              Someone reached out through your portfolio
            </Text>
          </Section>

          <Hr style={divider} />

          {/* ── Sender Info ── */}
          <Section style={infoSection}>
            <Text style={labelText}>FROM</Text>
            <Text style={senderNameText}>{senderName}</Text>
            <Link href={`mailto:${senderEmail}`} style={emailLink}>
              {senderEmail}
            </Link>
          </Section>

          <Hr style={divider} />

          {/* ── Message ── */}
          <Section style={messageSection}>
            <Text style={labelText}>MESSAGE</Text>
            <Container style={messageBox}>
              <Text style={messageText}>{message}</Text>
            </Container>
          </Section>

          {/* ── Reply Button ── */}
          <Section style={buttonSection}>
            <Button
              href={`mailto:${senderEmail}?subject=Re: Your message on my portfolio&body=%0A%0A---%0AOriginal message from ${encodeURIComponent(senderName)}:%0A${encodeURIComponent(message)}`}
              style={replyButton}
            >
              Reply to {senderName}
            </Button>
          </Section>

          <Hr style={divider} />

          {/* ── Footer ── */}
          <Section style={footerSection}>
            <Text style={footerText}>
              This message was sent via the contact form on your portfolio
              website.
            </Text>
            <Link href="https://muhammadazmi.my.id" style={footerLink}>
              muhammadazmi.my.id
            </Link>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

/* ── Styles ── */

const main: React.CSSProperties = {
  backgroundColor: '#0a0a0a',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
  padding: '40px 0',
};

const container: React.CSSProperties = {
  maxWidth: '520px',
  margin: '0 auto',
  backgroundColor: '#111111',
  borderRadius: '16px',
  border: '1px solid #1e1e1e',
  overflow: 'hidden',
};

const headerSection: React.CSSProperties = {
  padding: '40px 32px 24px',
  textAlign: 'center' as const,
};

const logoText: React.CSSProperties = {
  fontSize: '28px',
  fontWeight: 800,
  background: 'linear-gradient(135deg, #6C63FF, #00C9A7)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  color: '#6C63FF', // fallback for email clients that don't support gradient text
  margin: '0 0 16px',
  letterSpacing: '-0.02em',
};

const heading: React.CSSProperties = {
  fontSize: '22px',
  fontWeight: 700,
  color: '#ffffff',
  margin: '0 0 8px',
  letterSpacing: '-0.01em',
};

const subheading: React.CSSProperties = {
  fontSize: '14px',
  color: '#888888',
  margin: '0',
};

const divider: React.CSSProperties = {
  borderColor: '#1e1e1e',
  borderWidth: '1px',
  margin: '0',
};

const infoSection: React.CSSProperties = {
  padding: '24px 32px',
};

const labelText: React.CSSProperties = {
  fontSize: '10px',
  fontWeight: 700,
  color: '#00C9A7',
  letterSpacing: '0.15em',
  textTransform: 'uppercase' as const,
  margin: '0 0 8px',
};

const senderNameText: React.CSSProperties = {
  fontSize: '18px',
  fontWeight: 600,
  color: '#ffffff',
  margin: '0 0 4px',
};

const emailLink: React.CSSProperties = {
  fontSize: '14px',
  color: '#6C63FF',
  textDecoration: 'none',
};

const messageSection: React.CSSProperties = {
  padding: '24px 32px',
};

const messageBox: React.CSSProperties = {
  backgroundColor: '#0a0a0a',
  borderRadius: '12px',
  border: '1px solid #1e1e1e',
  padding: '20px',
};

const messageText: React.CSSProperties = {
  fontSize: '14px',
  lineHeight: '24px',
  color: '#cccccc',
  margin: '0',
  whiteSpace: 'pre-wrap' as const,
};

const buttonSection: React.CSSProperties = {
  padding: '8px 32px 32px',
  textAlign: 'center' as const,
};

const replyButton: React.CSSProperties = {
  backgroundColor: '#6C63FF',
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: 600,
  padding: '14px 32px',
  borderRadius: '12px',
  textDecoration: 'none',
  display: 'inline-block',
};

const footerSection: React.CSSProperties = {
  padding: '24px 32px',
  textAlign: 'center' as const,
};

const footerText: React.CSSProperties = {
  fontSize: '12px',
  color: '#555555',
  margin: '0 0 8px',
};

const footerLink: React.CSSProperties = {
  fontSize: '12px',
  color: '#00C9A7',
  textDecoration: 'none',
};

export default ContactEmail;
