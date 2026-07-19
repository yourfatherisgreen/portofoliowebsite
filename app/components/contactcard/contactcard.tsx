'use client';
import { ContactProfileCard } from '@app/components/form/contactform';

export default function ContactCard() {
  return (
    <div className="flex justify-center items-center py-20 px-4 min-h-screen">
      <div className="w-full max-w-[440px]">
        <ContactProfileCard />
      </div>
    </div>
  );
}
