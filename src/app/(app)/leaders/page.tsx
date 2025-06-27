import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Image from 'next/image';

const leaders = [
    {
        name: 'K. M. Munshi',
        imageUrl: 'https://placehold.co/120x120.png',
        birth: {
            date: 'December 30, 1887',
            place: 'Bharuch, Gujarat',
        },
        education: 'Studied at Baroda College and was a lawyer by profession. He was a prolific writer and an active participant in the Indian independence movement.',
        contribution: 'A prominent member of the Drafting Committee, he emphasized the need for a strong, unified central government. Munshi was instrumental in drafting provisions related to fundamental rights and was a key figure in the integration of the princely states into the Indian union.',
    },
    {
        name: 'N. Gopalaswami Ayyangar',
        imageUrl: 'https://placehold.co/120x120.png',
        birth: {
            date: 'March 31, 1882',
            place: 'Tanjore District, Madras Presidency',
        },
        education: 'Educated at Wesley School, Presidency College, and Madras Law College. He had a distinguished career as a civil servant before joining politics.',
        contribution: 'As a member of the Drafting Committee, his vast administrative experience was invaluable. Ayyangar played a crucial role in structuring the relationship between the central government and the states, and he is particularly remembered for his work in drafting Article 370 of the Constitution.',
    },
    {
        name: 'Sir Syed Muhammad Saadulla',
        imageUrl: 'https://placehold.co/120x120.png',
        birth: {
            date: 'May 21, 1885',
            place: 'Guwahati, Assam',
        },
        education: 'Graduated from Cotton College, Guwahati, and Presidency College, Calcutta. He served as the Prime Minister of Assam during British rule.',
        contribution: 'The only member of the Drafting Committee from Northeast India, Saadulla brought a unique perspective to the assembly. He contributed significantly to the provisions concerning the welfare of minorities and the administrative structure of the states in the Northeast.',
    },
    {
        name: 'Alladi Krishnaswami Ayyar',
        imageUrl: 'https://placehold.co/120x120.png',
        birth: {
            date: 'May 14, 1883',
            place: 'Pudur, Madras Presidency',
        },
        education: 'Graduated from Madras Christian College and became a leading advocate, serving as the Advocate-General of the Madras Presidency.',
        contribution: 'A legal titan, his intellectual contributions to the Drafting Committee were immense. Dr. Ambedkar himself acknowledged Ayyar\'s crucial role. He was instrumental in shaping the provisions on Fundamental Rights, Directive Principles, and the powers of the judiciary, strongly defending a powerful central government and a robust system of judicial review.',
    },
    {
        name: 'B. L. Mitter',
        imageUrl: 'https://placehold.co/120x120.png',
        birth: {
            date: '1875',
            place: 'Calcutta, Bengal Presidency',
        },
        education: 'A brilliant legal mind who served as the Advocate-General of Bengal and worked as the law member for several princely states.',
        contribution: 'Initially a member of the Drafting Committee, Mitter\'s sharp legal acumen and experience with the governance of princely states were highly valuable. Due to ill health, he had to resign and was replaced by Madhav Rao. His early contributions helped set the foundation for the committee\'s work.',
    },
    {
        name: 'D. P. Khaitan',
        imageUrl: 'https://placehold.co/120x120.png',
        birth: {
            date: 'August 14, 1888',
            place: 'Calcutta, Bengal Presidency',
        },
        education: 'A lawyer and a pioneering industrialist who co-founded the Federation of Indian Chambers of Commerce & Industry (FICCI).',
        contribution: 'As a member of the Drafting Committee, Khaitan brought the perspective of trade and industry to the constitutional debates. He contributed to the economic provisions of the constitution. He passed away in 1948 and was replaced on the committee by T. T. Krishnamachari.',
    },
];

export default function LeadersPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">Architects of the Constitution</h1>
        <p className="max-w-3xl mx-auto mt-4 text-lg text-muted-foreground">
          Meet the key figures of the Drafting Committee who meticulously crafted the foundational document of India.
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {leaders.map((leader, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader className="items-center text-center">
              <Image
                src={leader.imageUrl}
                alt={`Portrait of ${leader.name}`}
                width={120}
                height={120}
                className="rounded-full mb-4"
                data-ai-hint="portrait man"
              />
              <CardTitle className="text-xl text-primary">{leader.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value={`item-${index}`} className="border-b-0">
                  <AccordionTrigger className="text-base justify-center hover:no-underline">View Biography</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-4 pt-4 text-left leading-relaxed">
                    <div>
                      <h3 className="font-semibold text-card-foreground">Born</h3>
                      <p>{leader.birth.date} in {leader.birth.place}.</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-card-foreground">Education</h3>
                      <p>{leader.education}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-card-foreground">Constitutional Contribution</h3>
                      <p>{leader.contribution}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
