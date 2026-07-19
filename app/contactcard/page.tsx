import ContactCard from '@app/components/contactcard/contactcard';
import Background from '@app/components/Background';

export default function ContactCardPage() {
  return (
    <section className="relative min-h-screen w-full ">
      <Background />
      <ContactCard />
    </section>
  );
}
